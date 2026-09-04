// src/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // Guardar la cookie en la solicitud
            req.cookies.set(name, value)
            // También en la respuesta
            res.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Rutas protegidas
  const protectedRoutes = [
    '/dashboard',
    '/mis-recetas',
    '/crear-receta',
    '/editar-receta',
    '/favoritos'
  ]
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  // Si es ruta protegida y no hay sesión, redirigir a login
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Si ya hay sesión y está en login o registro, redirigir a dashboard
  if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/registro')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/dashboard',
    '/mis-recetas',
    '/crear-receta',
    '/editar-receta/:path*',
    '/favoritos',
    '/login',
    '/registro'
  ]
}