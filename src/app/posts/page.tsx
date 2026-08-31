import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
export async function middleware(request: NextRequest) {
let response = NextResponse.next({ request })
const supabase = createServerClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
{
cookies: {
getAll() { return request.cookies.getAll() },
setAll(cookiesToSet) {
cookiesToSet.forEach(({ name, value }) =>
request.cookies.set(name, value))
response = NextResponse.next({ request })
},
},
}
)
const { data: { user } } = await supabase.auth.getUser()
// Proteger /dashboard: sin sesion, redirige a /login
if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
return NextResponse.redirect(new URL('/login', request.url))
}
return response
}
export const config = {
matcher: ['/dashboard/:path*'],
}