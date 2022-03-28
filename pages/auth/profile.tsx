import Layout from "../../layouts/Main";
import cookie from "cookie"
import { server } from "../../utils/server";
import { useState } from "react";
import { Input, Button, Loading } from "@nextui-org/react";
import Router from "next/router";
export default function Profile({userFirstName, userLastName, userEmail, session, userLine1, userLine2, userCity, userState, userZip}) {
    type colorType = "default" | "primary" | "secondary" | "success" | "warning" | "error" | "gradient";
    const [email, setEmail] = useState(userEmail)
    const [firstName, setFirstName] = useState(userFirstName)
    const [lastName, setLastName] = useState(userLastName)
    const [line1, setLine1] = useState("")
    const [line2, setLine2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [loading, setLoading] = useState(false)
    const [buttonWord, setButtonWord] = useState("Submit");
    const [buttonColor, setButtonColor] = useState<colorType>("default");
    const sucsess = async () => {
        setButtonWord("Sucsess")
        setButtonColor("success")
        setTimeout(() => {
            setButtonWord("Submit")
            setButtonColor("default")
        } , 3000)
    }
    return(
        <Layout>
            <h1 style={{
                marginTop: "10px",
                textAlign: "center"
            }}>Profile Page</h1>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop:"10px",
            }}>
                <ul>    
                    <li>
                        <Input label="email" value={email} size="md" width="20em" onChange={e => setEmail(e.target.value)}/>
                    </li>
                <li>
                        <Input label="First Name" value={firstName} width={"20em"} onChange={e => setFirstName(e.target.value)}/>
                    </li>
                    <li>
                        <Input label="Last Name" value={lastName} width={"20em"} onChange={e => setLastName(e.target.value)}/>
                    </li>
                    <li>
                        <Input label="Adress Line 1" value={line1} width={"20em"} onChange={e => setLine1(e.target.value)}/>
                    </li>
                    <li>
                        <Input label="Adress Line 2" value={line2} width={"20em"} onChange={e => setLine2(e.target.value)}/>
                    </li>
                    <li>
                        <Input label="City" value={city} width={"20em"} onChange={e => setCity(e.target.value)}/>
                    </li>
                    <li>
                        <Input label="State" value={state} width={"20em"} onChange={e => setState(e.target.value)}/>
                    </li>
                    <li>
                        <Button type="submit"css={{marginTop:"10px"}} color={buttonColor} onClick={() => {
                            setLoading(true)
                            fetch(`${server}/api/updateUser`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({userEmail: userEmail, email: email, session: session, firstName: firstName, lastName: lastName})
                            }).then(
                                res => res.json()
                            ).then(
                                res => {
                                    if (res.auth) {
                                        setLoading(false)
                                        sucsess()
                                        if (email != userEmail) {
                                            window.location.href = '/auth/login'
                                        }
                                    }
                                }
                            )
                        }}>
                            {loading ? <Loading color={"white"} size="sm" /> : buttonWord}
                        </Button>
                        
                    </li>
                
                </ul>
            </div>
           
            
        </Layout>
    )   
}

export function getServerSideProps(context) {
    return new Promise((resolve, reject) => {
        const cookies = (cookie.parse(context.req.headers.cookie));
        const user = JSON.parse(cookies.user);
        const email = user["email"];
        const session = user["session"];
        fetch(`${server}/api/getUserInfo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email:email, session:session})
        }).then(res => res.json()).then(res => {
            resolve({
            props: {
                userFirstName: res.user.firstName,
                userLastName: res.user.lastName,
                userEmail: res.user.email,
                line1: res.user.line1,
                line2: res.user.line2,
                city: res.user.city,
                state: res.user.state,
                zip: res.user.zip,
                session: session
            }
        })
        })
        
    })
    
}