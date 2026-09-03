#!/usr/bin/env python3
"""
Supabase Anti-Pause Keep-Alive Script
Executa pings periódicos nos serviços do Supabase (PostgREST e Auth)
para evitar a pausa automática do plano gratuito (Free Tier após 7 dias).
Custo: R$ 0,00 (100% Always-Free).
"""

import urllib.request
import urllib.error
import time
import json
import sys

SUPABASE_URL = "https://pnerpgwmrjmjyqknoyik.supabase.co"
SUPABASE_ANON_KEY = (
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
    "eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZXJwZ3dtcmptanlxa25veWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzODUzMTgsImV4cCI6MjEwMzk2MTMxOH0."
    "r2tzNdLvxCqyWraFQ1SFnJqYUVwocP9HDctygxZyQxQ"
)

def ping_endpoint(name: str, path: str, headers: dict) -> bool:
    url = f"{SUPABASE_URL}{path}"
    start = time.perf_counter()
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            latency = (time.perf_counter() - start) * 1000
            print(f"[PASS] {name} -> Status: {resp.status} ({latency:.1f}ms)")
            return resp.status in [200, 206]
    except urllib.error.HTTPError as e:
        latency = (time.perf_counter() - start) * 1000
        print(f"[FAIL] {name} -> HTTP {e.code} ({latency:.1f}ms): {e.read().decode('utf-8', errors='ignore')[:150]}")
        return False
    except Exception as e:
        print(f"[ERROR] {name} -> {e}")
        return False

def main():
    print("=" * 60)
    print("INICIANDO SUPABASE ANTI-PAUSE (KEEP-ALIVE)")
    print(f"Projeto: {SUPABASE_URL}")
    print("=" * 60)

    auth_headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "User-Agent": "MeuBolso-AntiPause/1.0"
    }

    # 1. Ping no PostgREST
    p1 = ping_endpoint("PostgREST (Tabela categories)", "/rest/v1/categories?select=id&limit=1", auth_headers)

    # 2. Ping na Tabela transactions
    p2 = ping_endpoint("PostgREST (Tabela transactions)", "/rest/v1/transactions?select=id&limit=1", auth_headers)

    # 3. Ping no Healthcheck do Auth
    p3 = ping_endpoint("Supabase Auth Healthcheck", "/auth/v1/health", {"apikey": SUPABASE_ANON_KEY})

    print("=" * 60)
    if p1 and p2:
        print("[SUCESSO] Supabase mantido ativo! Contador de inatividade zerado.")
        return 0
    else:
        print("[ALERTA] Algumas requisições falharam. Verifique o status do projeto.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
