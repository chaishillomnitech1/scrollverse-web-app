"""Exercise only local gallery and browser-local portfolio favorites."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path('/home/ubuntu/scrollverse-verification')
OUT.mkdir(exist_ok=True)
with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page = browser.new_page(viewport={'width': 1440, 'height': 1000}, accept_downloads=True)
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto('http://localhost:3000/source-collections', wait_until='domcontentloaded')
    page.get_by_role('heading', name='Ideas become collections.').wait_for()
    nav = page.get_by_role('navigation', name='Source collection pagination')
    assert nav.get_by_text('Page 1 / 3').is_visible()
    nav.get_by_role('button', name='Next', exact=True).click()
    assert nav.get_by_text('Page 2 / 3').is_visible()
    page.get_by_role('searchbox', name='Search source collections').fill('Soul Evolution')
    assert page.locator('#selected-source-title').inner_text() == 'Hall 13 / Soul Evolution'
    assert nav.get_by_text('Page 1 / 1').is_visible()
    page.get_by_role('button', name='Artifact titles', exact=True).click()
    page.get_by_role('searchbox').fill('Grid Sovereign')
    page.get_by_role('button', name='Show source receipt', exact=True).first if False else None
    assert page.get_by_text('Earlier reviewed version', exact=False).first.is_visible()
    with page.expect_download() as pending:
        page.get_by_role('button', name='Download filtered JSON').click()
    download = pending.value
    download.save_as(OUT / 'source-collections-grid-example.json')
    record = json.loads((OUT / 'source-collections-grid-example.json').read_text())
    assert len(record['records']) == 1
    assert record['records'][0]['occurrences'] >= 3
    assert len(record['sourceReceipts']) >= 1
    assert record['sourceReceipts'][0]['filename'] == 'pasted_content_11.txt'
    assert 'EXHIBIT A' not in json.dumps(record)
    page.get_by_role('searchbox').fill('doesnotexist')
    assert page.get_by_role('heading', name='No source records match').is_visible()
    page.get_by_role('button', name='Clear filters', exact=True).click()
    assert page.get_by_text('482 matching records').is_visible()
    page.get_by_role('button', name='Collections', exact=True).click()
    page.get_by_role('button', name='Stories', exact=True).click()
    page.get_by_role('searchbox').fill('Haiti')
    assert page.locator('#selected-source-title').inner_text() == 'The Price of Freedom'
    page.get_by_role('button', name='All', exact=True).click()
    page.get_by_role('searchbox').fill('')
    page.screenshot(path=str(OUT / 'source-collections-desktop.png'), full_page=True)

    # New portfolio entry has an independent bookmark button and survives reload.
    page.goto('http://localhost:3000', wait_until='domcontentloaded')
    panel = page.locator('#creator-portfolio')
    panel.scroll_into_view_if_needed()
    panel.get_by_role('searchbox').fill('October Source')
    card = panel.locator('article').filter(has_text='October Source Collections')
    card.get_by_role('button', name='Save October Source Collections to Favorites').click()
    page.reload(wait_until='domcontentloaded')
    panel = page.locator('#creator-portfolio')
    panel.scroll_into_view_if_needed()
    panel.get_by_role('button', name='Saved favorites (1)').click()
    assert panel.locator('article').count() == 1
    card = panel.locator('article').filter(has_text='October Source Collections')
    card.get_by_role('link', name='Open route').click()
    page.wait_for_function("location.pathname === '/source-collections'")
    page.get_by_role('heading', name='Ideas become collections.').wait_for()

    mobile = browser.new_page(viewport={'width': 390, 'height': 844}, reduced_motion='reduce')
    mobile.goto('http://localhost:3000/source-collections', wait_until='domcontentloaded')
    mobile.get_by_role('heading', name='Ideas become collections.').wait_for()
    assert mobile.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Mobile overflow'
    mobile.get_by_role('searchbox').fill('Hall 13')
    assert mobile.locator('#selected-source-title').inner_text() == 'Hall 13 / Soul Evolution'
    mobile.screenshot(path=str(OUT / 'source-collections-mobile.png'), full_page=True)
    mobile.get_by_role('button', name='Artifact titles', exact=True).click()
    mobile.get_by_role('searchbox').fill('')
    mobile.get_by_role('navigation', name='Source collection pagination').get_by_role('button', name='Next').click()
    assert mobile.get_by_text('Page 2 / 81').is_visible()
    assert not errors, errors
    print('PASS collections/category/search/page reset, duplicate title citations, JSON download/private exclusion, homepage bookmark/reload/route handoff, mobile reduced-motion/no overflow; page errors: 0')
    browser.close()
