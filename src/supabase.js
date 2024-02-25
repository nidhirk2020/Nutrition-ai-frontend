import { createClient } from "@supabase/supabase-js";
const url = process.env.REACT_APP_SUPABASE_URL;
const key = process.env.REACT_APP_SUPABASE_KEY;
console.log(key);

const supabase = createClient(url, key);

export { supabase };
