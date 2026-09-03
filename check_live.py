import urllib.request
import re

req = urllib.request.Request('https://meu-bolso-t1k.pages.dev', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8')
        js_matches = re.findall(r'/assets/[a-zA-Z0-9_\-]+\.js', html)
        css_matches = re.findall(r'/assets/[a-zA-Z0-9_\-]+\.css', html)
        print("LIVE_JS:", js_matches)
        print("LIVE_CSS:", css_matches)
except Exception as e:
    print("ERROR:", e)
