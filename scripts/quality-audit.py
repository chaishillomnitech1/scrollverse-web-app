#!/usr/bin/env python3
"""Repeatable local quality audit: axe-core rules, keyboard focus, and load metrics.

Usage: python3 scripts/quality-audit.py [base_url] [output_json]
Requires axe-core at AXE_PATH (default /tmp/a11y-tools/node_modules/axe-core/axe.min.js).
Media and third-party frames are intercepted so the audit never plays external media.
"""
import json
import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:4173"
OUT = Path(sys.argv[2] if len(sys.argv) > 2 else "/tmp/quality-audit.json")
AXE = Path(os.environ.get("AXE_PATH", "/tmp/a11y-tools/node_modules/axe-core/axe.min.js"))
ROUTES = ["/", "/source-collections", "/synchronization-video-library"]
VIEWPORTS = {"desktop": {"width": 1366, "height": 900}, "mobile": {"width": 390, "height": 844}}

METRICS_INIT = """
window.__sv = {lcp: 0, cls: 0, longTasks: 0, tbt: 0};
new PerformanceObserver(l => { for (const e of l.getEntries()) window.__sv.lcp = e.startTime; })
  .observe({type: 'largest-contentful-paint', buffered: true});
new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__sv.cls += e.value; })
  .observe({type: 'layout-shift', buffered: true});
new PerformanceObserver(l => { for (const e of l.getEntries()) { window.__sv.longTasks++; window.__sv.tbt += Math.max(0, e.duration - 50); } })
  .observe({type: 'longtask', buffered: true});
"""


def block_media(route):
    url = route.request.url
    if route.request.resource_type in {"media"} or "youtube" in url or "ytimg" in url:
        return route.abort()
    return route.continue_()


def audit(page, path, label):
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto(BASE + path, wait_until="load", timeout=90000)
    page.wait_for_timeout(3500)
    nav = page.evaluate(
        """() => {
      const n = performance.getEntriesByType('navigation')[0];
      const fcp = performance.getEntriesByName('first-contentful-paint')[0];
      const res = performance.getEntriesByType('resource');
      const js = res.filter(r => r.initiatorType === 'script' || r.name.endsWith('.js'));
      return {
        ttfb: n ? n.responseStart : null,
        domContentLoaded: n ? n.domContentLoadedEventEnd : null,
        load: n ? n.loadEventEnd : null,
        documentBytes: n ? n.encodedBodySize : null,
        fcp: fcp ? fcp.startTime : null,
        lcp: window.__sv.lcp, cls: window.__sv.cls,
        longTasks: window.__sv.longTasks, tbt: window.__sv.tbt,
        jsRequests: js.length,
        jsEncodedBytes: js.reduce((s, r) => s + (r.encodedBodySize || 0), 0),
        imageRequests: res.filter(r => r.initiatorType === 'img').length,
        domNodes: document.getElementsByTagName('*').length,
      };
    }"""
    )
    page.add_script_tag(path=str(AXE))
    axe = page.evaluate(
        """async () => {
      const r = await axe.run(document, {runOnly: {type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}, resultTypes: ['violations']});
      return r.violations.map(v => ({id: v.id, impact: v.impact, help: v.help, count: v.nodes.length,
        nodes: v.nodes.slice(0, 6).map(n => ({target: n.target.join(' '), html: n.html.slice(0, 220), summary: (n.failureSummary || '').slice(0, 260)}))}));
    }"""
    )
    structure = page.evaluate(
        """() => ({
      lang: document.documentElement.lang,
      title: document.title,
      mains: document.querySelectorAll('main').length,
      h1: [...document.querySelectorAll('h1')].map(h => h.textContent.trim().slice(0, 80)),
      skipLink: !!document.querySelector('a[href^="#"][class*="skip"], a[href="#main-content"], a[href="#main"]'),
      viewport: document.querySelector('meta[name=viewport]')?.content,
      overflowX: document.documentElement.scrollWidth - window.innerWidth,
      smallTargets: [...document.querySelectorAll('a[href],button,input,select,textarea,[role=button]')]
        .filter(el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el);
          return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && (r.width < 24 || r.height < 24) && s.display !== 'inline'; })
        .slice(0, 12).map(el => ({tag: el.tagName, text: (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 50), w: Math.round(el.getBoundingClientRect().width), h: Math.round(el.getBoundingClientRect().height)})),
    })"""
    )
    # Keyboard: first 12 Tab stops and whether each has a visible focus indicator.
    page.evaluate("() => { window.scrollTo(0, 0); document.activeElement && document.activeElement.blur(); }")
    stops = []
    for _ in range(12):
        page.keyboard.press("Tab")
        stops.append(
            page.evaluate(
                """() => { const el = document.activeElement; if (!el || el === document.body) return null;
          const s = getComputedStyle(el); const r = el.getBoundingClientRect();
          const visible = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || (s.boxShadow && s.boxShadow !== 'none');
          return {tag: el.tagName, name: (el.getAttribute('aria-label') || el.innerText || el.value || '').trim().slice(0, 50),
            focusVisible: visible, inViewport: r.top >= 0 && r.bottom <= window.innerHeight }; }"""
            )
        )
    return {"route": path, "viewport": label, "metrics": nav, "axe": axe, "structure": structure, "tabStops": stops, "pageErrors": errors[:5]}


def main():
    results = []
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path="/usr/bin/chromium", args=["--no-sandbox"])
        for label, vp in VIEWPORTS.items():
            for path in ROUTES:
                ctx = browser.new_context(viewport=vp, reduced_motion="reduce" if label == "mobile" else "no-preference")
                ctx.add_init_script(METRICS_INIT)
                ctx.route("**/*", block_media)
                page = ctx.new_page()
                try:
                    results.append(audit(page, path, label))
                except Exception as exc:  # keep auditing other routes
                    results.append({"route": path, "viewport": label, "error": str(exc)[:400]})
                ctx.close()
        browser.close()
    OUT.write_text(json.dumps(results, indent=2))
    for r in results:
        if "error" in r:
            print(r["viewport"], r["route"], "ERROR", r["error"])
            continue
        m = r["metrics"]
        print(f"{r['viewport']:7} {r['route']:32} FCP {m['fcp'] and round(m['fcp'])}ms LCP {round(m['lcp'])}ms CLS {m['cls']:.3f} TBT {round(m['tbt'])}ms "
              f"JS {m['jsRequests']} req/{m['jsEncodedBytes']//1024}KB doc {m['documentBytes'] and m['documentBytes']//1024}KB nodes {m['domNodes']} "
              f"axe {sum(v['count'] for v in r['axe'])} ({', '.join(v['id'] + ':' + str(v['count']) for v in r['axe'])}) overflow {r['structure']['overflowX']} errors {len(r['pageErrors'])}")
    print("wrote", OUT)


if __name__ == "__main__":
    main()
