import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = [
	"/splash",
	"/onboarding",
	"/login",
	"/signup",
	"/otp",
	"/location",
	"/terms",
	"/conditions",
];

const PROTECTED_ROUTES = [
	"/home",
	"/explore",
	"/search",
	"/category",
	"/product",
	"/cart",
	"/favourites",
	"/account",
	"/order-success",
	"/track-order",
	"/checkout",
];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Read auth from cookie
	const isAuthenticated = request.cookies.get("nectar_auth")?.value === "true";
	const hasLocation = request.cookies.get("nectar_location")?.value;

	// Root redirect
	if (pathname === "/") {
		return NextResponse.redirect(new URL("/splash", request.url));
	}

	// Protected route without auth → login
	if (PROTECTED_ROUTES.some((r) => pathname.startsWith(r))) {
		if (!isAuthenticated) {
			return NextResponse.redirect(new URL("/login", request.url));
		}

		// Auth but no location → location screen
		if (!hasLocation && pathname !== "/location") {
			return NextResponse.redirect(new URL("/location", request.url));
		}
	}

	// Auth user accessing public auth routes → home
	if (PUBLIC_ROUTES.includes(pathname) && isAuthenticated && hasLocation) {
		if (pathname !== "/splash" && pathname !== "/terms" && pathname !== "/conditions") {
			return NextResponse.redirect(new URL("/home", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
