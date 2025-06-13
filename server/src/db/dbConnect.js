import { createClient } from '@supabase/supabase-js';
import dotenv from "dotenv";
dotenv.config();
const supabase = createClient(process.env.DB_URI, process.env.PUBLIC_ANON_KEY);
export {supabase};