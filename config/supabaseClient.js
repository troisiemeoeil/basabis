import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://eencnukfilboslmuzsbm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlbmNudWtmaWxib3NsbXV6c2JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM0NDI2ODUsImV4cCI6MjAxOTAxODY4NX0.ljRdsDQlsjHiaxRJ5ZPCrRhvxgipnR1PZOJIoYZkcSw'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
