/**
 * Supabase Client & Anti-Pause Keep-Alive
 * Mantém a conexão ativa com o banco PostgreSQL no Supabase (Always-Free).
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://pnerpgwmrjmjyqknoyik.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZXJwZ3dtcmptanlxa25veWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzODUzMTgsImV4cCI6MjEwMzk2MTMxOH0.r2tzNdLvxCqyWraFQ1SFnJqYUVwocP9HDctygxZyQxQ';

export async function pingSupabase(): Promise<boolean> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/categories?select=id&limit=1`, {
      method: 'GET',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });
    return res.ok;
  } catch (err) {
    // Falha silenciosa para não travar a aplicação caso haja restrição de rede
    return false;
  }
}
