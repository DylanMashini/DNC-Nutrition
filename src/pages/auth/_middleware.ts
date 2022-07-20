import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { server } from "../../utils/server";
export function middleware(req: NextRequest, ev: NextFetchEvent) {
	return new Promise<any>(resolve => {
		const loggingIn =
			req.nextUrl.pathname == "/auth/login" ||
			req.nextUrl.pathname == "/auth/register"
				? true
				: false;
		if (req.cookies.user) {
			const cookie = JSON.parse(req.cookies.user);
			const session = cookie.session;
			const email = cookie.email;

			fetch(`${server}/api/verifyCookie`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: email, session: session }),
			})
				.then(res => res.json())
				.then(res => {
					if (res["auth"]) {
						if (loggingIn) {
							resolve(
								NextResponse.redirect(`${server}/auth/profile`)
							);
						} else {
							resolve(null);
						}
					} else {
						if (loggingIn) {
							resolve(null);
						} else {
							resolve(
								NextResponse.redirect(`${server}/auth/login`)
							);
						}
					}
				});
		} else {
			//user not authenticated
			if (loggingIn) {
				resolve(null);
			} else {
				resolve(NextResponse.redirect(`${server}/auth/login`));
			}
		}
	});
}
