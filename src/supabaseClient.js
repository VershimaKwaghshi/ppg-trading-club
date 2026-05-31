import { createClient } from '@supabase/supabase-js';

// Replace these placeholders with your actual Supabase Project URL and API Anon Key
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
