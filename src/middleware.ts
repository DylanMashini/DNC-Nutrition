import { server } from "./utils/server";
import { NextResponse } from "next/server";

export default function Middleware(req) {
	if (req.nextUrl.pathname.startsWith("/auth")) {
		return new Promise<any>(resolve => {
			const loggingIn =
				req.nextUrl.pathname == "/auth/login" ||
				req.nextUrl.pathname == "/auth/register"
					? true
					: false;
			if (req.cookies.get().user) {
				const cookie = JSON.parse(req.cookies.get().user);
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
									NextResponse.redirect(
										`${server}/auth/profile`
									)
								);
							} else {
								resolve(null);
							}
						} else {
							if (loggingIn) {
								resolve(null);
							} else {
								resolve(
									NextResponse.redirect(
										`${server}/auth/login`
									)
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
	} else if (req.nextUrl.pathname.startsWith("/cart")) {
		console.log("MIDDLEWARE");
		return new Promise((resolve, reject) => {
			//check if cookie exists
			let user;
			try {
				user = req.cookies.get().user;
			} catch (e) {}
			if (user) {
				//verify cookie
				const cookie = JSON.parse(req.cookies.get().user);
				const session = cookie.session;
				const email = cookie.email;
				fetch(`${server}/api/getUserInfo`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email: email, session: session }),
				})
					.then(res => res.json())
					.then(res => {
						if (res["auth"]) {
							//cookie exists and is valid
							const user = res["user"];
							//add user info into cookie

							if (user == {} || user == null) {
								resolve(null);
							}
							let response = NextResponse.next();
							response.cookies.set(
								"userInfo",
								JSON.stringify(user),
								{
									path: "/",
									maxAge: 3600, //1 hour
									sameSite: true,
									secure: false,
								}
							);
							resolve(response);
						} else {
							console.log("user auth failed");
							resolve(null);
						}
					});
			} else {
				resolve(null);
			}
		});
	}
}
