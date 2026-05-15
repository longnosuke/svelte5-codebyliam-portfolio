import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

const DEFAULT_URL = 'https://pikanqwsioklmctfmhjn.supabase.co';
const DEFAULT_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpa2FucXdzaW9rbG1jdGZtaGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzODMwNTQsImV4cCI6MjA4MDk1OTA1NH0.shb6zONtH1fPIJ1fEa8NrRK-UsUclWybJgkJvTJNqRQ';

/** GitHub Actions secrets resolve to "" when unset; ?? does not fall through for empty strings. */
function publicEnv(value: string | undefined, fallback: string): string {
	const trimmed = value?.trim();
	return trimmed ? trimmed : fallback;
}

const url = publicEnv(env.PUBLIC_SUPABASE_URL, DEFAULT_URL);
const key = publicEnv(env.PUBLIC_SUPABASE_ANON_KEY, DEFAULT_KEY);

export const supabase = createClient(url, key);
