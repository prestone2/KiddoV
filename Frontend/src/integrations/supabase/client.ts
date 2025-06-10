import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xubgwftwnebwljhykqlc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1Ymd3ZnR3bmVid2xqaHlrcWxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NDkyODQsImV4cCI6MjA2NTEyNTI4NH0.GLSgUoyaYYsYnfZp0ceSM-pxR_QHiZERLElZd5VZwGw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);