import type { NextFetchEvent, NextRequest } from 'next/server';
import { server } from '../../utils/server';
import { NextResponse } from 'next/server'
import { serialize } from 'cookie';

//NEEDS TESTED
export function middleware(req: NextRequest, ev: NextFetchEvent) {
    return new Promise((resolve, reject) => {
        const cookie = JSON.parse(req.cookies.user);
        const session = cookie.session;
        const email = cookie.email;
        //check if cookie exists
        if (req.cookies.user) {
            //verify cookie
            fetch(`${server}/api/getUserInfo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, session: session })
            }).then(
                res => res.json()
            ).then(
                res => {
                    
                    if (res["auth"]) {
                        //cookie exists and is valid
                        const user = res["user"];
                        //add user info into cookie
                        
                        if (user == {} || user == null) {
                            return null;
                        }
                        let response = NextResponse.next()
                        response.cookie('userInfo', JSON.stringify(user), {
                            path: "/",
                            maxAge: 3600, //1 hour
                            sameSite: true,
                            secure: false,
                        });
                        resolve(response);

                    } else {
                        console.log("user auth failed")
                        return null;
                    }
                }
            )
        } else {
            return null;
        }
    })
}