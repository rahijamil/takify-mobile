import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_NATIVE_SUPABSAE_URL || "https://thsxckfxdvapgsajhycb.supabase.co"
const supabaseAnonKey = process.env.REACT_NATIVE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoc3hja2Z4ZHZhcGdzYWpoeWNiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5OTQ2ODgyMSwiZXhwIjoyMDE1MDQ0ODIxfQ.pwHtU91kHpVpSUiNmWMV1xoda_9QOLh-ZD5rHNoV-Es"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})