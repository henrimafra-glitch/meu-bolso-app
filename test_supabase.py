import urllib.request
import json

anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZXJwZ3dtcmptanlxa25veWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzODUzMTgsImV4cCI6MjEwMzk2MTMxOH0.r2tzNdLvxCqyWraFQ1SFnJqYUVwocP9HDctygxZyQxQ'

for ep in ['profiles', 'families', 'categories', 'transactions', 'goals']:
    url = f'https://pnerpgwmrjmjyqknoyik.supabase.co/rest/v1/{ep}?select=*&limit=1'
    req = urllib.request.Request(url, headers={
        'apikey': anon_key,
        'Authorization': f'Bearer {anon_key}'
    })
    try:
        with urllib.request.urlopen(req) as resp:
            print(f'{ep}: Status {resp.status} - {resp.read().decode("utf-8")}')
    except urllib.error.HTTPError as e:
        print(f'{ep}: HTTP {e.code} - {e.read().decode("utf-8")}')
