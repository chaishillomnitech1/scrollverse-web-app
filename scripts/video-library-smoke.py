"""Test local pages only; intercept YouTube iframe loads instead of playing media."""
from pathlib import Path
import json
from playwright.sync_api import sync_playwright

OUT = Path('/home/ubuntu/scrollverse-verification')
OUT.mkdir(exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    for width, height, name in [(1440,1000,'desktop'),(390,844,'mobile')]:
        page = browser.new_page(viewport={'width':width,'height':height}, reduced_motion='reduce')
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.route('**/www.youtube-nocookie.com/**',lambda route:route.fulfill(status=200,content_type='text/html',body='<p>Playback intentionally intercepted for local test</p>'))
        page.goto('http://localhost:3000/synchronization-video-library', wait_until='domcontentloaded')
        page.get_by_role('heading',name='Follow the signal. Keep the source.').wait_for()
        assert page.locator('iframe').count()==0
        page.get_by_role('button',name='Load selected video').click()
        page.locator('iframe').wait_for()
        assert 'autoplay=0' in page.locator('iframe').get_attribute('src')
        page.get_by_role('button',name='Unload player').click()
        assert page.locator('iframe').count()==0
        page.get_by_role('button',name='Next',exact=True).click()
        page.get_by_role('searchbox').fill('W_4ckPnSgt4')
        assert page.locator('#video-reference-title').inner_text()=='YouTube · W_4ckPnSgt4'
        assert page.get_by_role('button',name='Previous',exact=True).is_disabled()
        page.get_by_role('searchbox').fill('no-such-video')
        assert page.get_by_role('heading',name='No video references match').is_visible()
        page.get_by_role('button',name='Clear search').click()
        assert page.locator('iframe').count()==0
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        page.screenshot(path=str(OUT/f'video-library-{name}.png'),full_page=True)
        page.goto('http://localhost:3000',wait_until='domcontentloaded')
        page.locator('#creator-portfolio').wait_for()
        page.locator('#creator-portfolio').scroll_into_view_if_needed()
        page.wait_for_timeout(1500)
        page.locator('#creator-portfolio').screenshot(path=str(OUT/f'portfolio-{name}.png'))
        # Scroll all homepage sections to trigger lazy images, without activating media.
        page.evaluate('''async()=>{for(let y=0;y<document.body.scrollHeight;y+=750){scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}scrollTo(0,0);}''')
        page.wait_for_timeout(1500)
        broken=page.evaluate('''()=>Array.from(document.images).filter(i=>i.complete&&i.naturalWidth===0&&getComputedStyle(i).display!=='none').map(i=>({src:i.getAttribute('src'),alt:i.alt}))''')
        (OUT/f'homepage-broken-images-{name}.json').write_text(json.dumps(broken,indent=2)+'\n')
        page.screenshot(path=str(OUT/f'homepage-{name}.png'),full_page=True)
        assert not errors,errors
        print(name,'PASS video load/unload, no autoplay, pagination/search/reset, no overflow, errors 0; visible broken homepage images',len(broken))
        page.close()
    browser.close()
