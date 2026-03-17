import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qoqndrehdwvzoxzodlyv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvcW5kcmVoZHd2em94em9kbHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNTE0MzksImV4cCI6MjA4ODYyNzQzOX0.dp7JGeKd-ruEokTo_PCzlqR8kZmG4R4FaZfFHgU7HRo';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
