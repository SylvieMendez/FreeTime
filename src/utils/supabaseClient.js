import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nichvkphpacxrhgruaud.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pY2h2a3BocGFjeHJoZ3J1YXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MzA5NDgsImV4cCI6MjA3OTAwNjk0OH0.n-NMJcwm27vf4m6svXDFID8Mou6yVsaOytA4HrLNo6Q';
const supabase = createClient(supabaseUrl, supabaseKey);
export { supabase };
