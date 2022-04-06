import Layout from "../../layouts/Main";
import Link from "next/link";
import { server } from "../../utils/server";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"

const LoginPage = () => {
	
	const [error, setError] = useState("");
	const [emailRequired, setEmailRequierd] = useState(false);
	const [passwordRequired, setPasswordRequired] = useState(false);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [cookie, setCookie] = useCookies(["user"]);
	const [auth, setAuth] = useState(false);
	const router = useRouter()
	if (!auth) {
		setCookie("user", null, {path: "/", maxAge: -1, sameSite: true})
	}

	return (
		<Layout>
			<section className="form-page">
				<div className="container">
					<div className="back-button-section">
						<Link href="/products/1">
							<a>
								<i className="icon-left"></i> Back to store
							</a>
						</Link>
					</div>

					<div className="form-block">
						<h2 className="form-block__title">Log in</h2>
						{/* <p className="form-block__description">
							Lorem Ipsum is simply dummy text of the printing and
							typesetting industry. Lorem Ipsum has been the
							industry's standard dummy text ever since the 1500s
						</p> */}
						
						<form
							className="form"
							onSubmit={(event) => {
							//prevent page from refreshing
							event.preventDefault();
							//make sure no fields are blank
							if (email === "" || password === "") {
								setError("Please fill in all fields");
								return
							}
							//call api
							fetch(`${server}/api/login/`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({email: email, password: password}),
						}).then(res => res.json())
						.then(
							res => {
								//get response body
								
								if (res.auth) {
									//sucsessful authentication, set jwt
									setError("");
									setAuth(true);
									setCookie("user", JSON.stringify({email: email, session: res.session}), {path: "/", maxAge: 86400, sameSite: true})
									router.push("/auth/profile")
								} else {
									//get error message
									const errorMessage = res["message"];
									//log json body
									console.error(errorMessage)
									//check if error is user not found
									if (errorMessage == "user not found") {
										//set client side error message
										setError("User Not Found");
									} else if (errorMessage == "invalid password") {
										//set client side error message
										setError("Invalid Password");
									} 
								}
							}	
						);
							}}
						>
							<div className="form__input-row">
								<input
									className="form__input"
									placeholder="email"
									type="text"
									// name="email"
									value={email}
									onChange={e => {
										setEmail(e.target.value);
									}}

								/>

								{ emailRequired ?
								<p className="message message--error">
									This field is required
								</p>
								: null
								}


								
							</div>

							<div className="form__input-row">
								<input
									className="form__input"
									type="password"
									placeholder="Password"
									// name="password"
									value={password}
									onChange={e => {
										setPassword(e.target.value);
									}}

								/>
								{ passwordRequired ?
								<p className="message message--error">
									This field is required
								</p>
								: null
								}
							</div>

							<div className="form__info">
								{/* <div className="checkbox-wrapper">
									<label
										htmlFor="check-signed-in"
										className={`checkbox checkbox--sm`}
									>
										<input
											type="checkbox"
											name="keepSigned"
											id="check-signed-in"
										/>
										<span className="checkbox__check"></span>
										<p>Keep me signed in</p>
									</label>
								</div> */}
								<a
									href="/forgot-password"
									className="form__info__forgot-password"
								>
									Forgot password?
								</a>
							</div>
								<p style={{
							color: "red",
							fontSize: "12px",
							textAlign: "center",
							marginBottom: "10px"

						}}>
							{error}
						</p>
							{/* <div className="form__btns">
								<button
									type="button"
									className="btn-social fb-btn"
								>
									<i className="icon-facebook"></i>Facebook
								</button>
								<button
									type="button"
									className="btn-social google-btn"
								>
									<img
										src="/images/icons/gmail.svg"
										alt="gmail"
									/>{" "}
									Gmail
								</button>
							</div> */}

							<button
								type="submit"
								className="btn btn--rounded btn--yellow btn-submit"
							>
								Sign in
							</button>

							<p className="form__signup-link">
								Not a member yet?{" "}
								<a href="/auth/register">Sign up</a>
							</p>
						</form>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default LoginPage;
