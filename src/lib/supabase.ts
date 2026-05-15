import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

const url =
	env.PUBLIC_SUPABASE_URL ?? 'https://pikanqwsioklmctfmhjn.supabase.co';
const key =
	env.PUBLIC_SUPABASE_ANON_KEY ??
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpa2FucXdzaW9rbG1jdGZtaGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzODMwNTQsImV4cCI6MjA4MDk1OTA1NH0.shb6zONtH1fPIJ1fEa8NrRK-UsUclWybJgkJvTJNqRQ';

export const supabase = createClient(url, key);
