import Layout from '../../layouts/Main';
import Link from 'next/link';
import { server } from '../../utils/server';
import {useState} from "react";
import {useRouter} from "next/router";
import {useCookies} from "react-cookie";
const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookie, setCookie] = useCookies(["user"]);
  const router = useRouter();

  return(
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/products">
              <a><i className="icon-left"></i> Back to store</a>
            </Link>
          </div>

          <div className="form-block">
            <h2 className="form-block__title">Create an account and discover the benefits</h2>
            {/* <p className="form-block__description">Lorem Ipsum is simply dummy text of the printing 
            and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p> */}
            
            <form className="form">
              <div className="form__input-row">
                <input className="form__input" placeholder="First Name" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
              </div>
              
              <div className="form__input-row">
                <input className="form__input" placeholder="Last Name" type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
              </div>
              <div className="form__input-row">
                <input className="form__input" placeholder="Adress Line 1" type="text" value={line1} onChange={e => setLine1(e.target.value)} />
              </div>
              <div className="form__input-row">
                <input className="form__input" placeholder="Adress Line 2" type="text" value={line2} onChange={e => setLine2(e.target.value)} />
              </div>
              <div className="form__input-row">
                <input className="form__input" placeholder="City" type="text" value={city} onChange={e => setCity(e.target.value)} />
              </div>
              <div className="form__input-row">
                <input className="form__input" placeholder="state" type="text" value={state} onChange={e => setState(e.target.value)} />
              </div>
              <div className="form__input-row">
                <input className="form__input" placeholder="Email" type="text" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              
              <div className="form__input-row">
                <input className="form__input" type="Password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>

              <div className="form__info">
                <p style={{
							color: "red",
							fontSize: "12px",
							textAlign: "center",
							marginBottom: "10px"
						}}>
              {error}
              </p>
              </div>

              <button type="button" className="btn btn--rounded btn--yellow btn-submit" onClick={() => {
              console.log("here")
              if (!(firstName && lastName && email && password)) {
                setError("Please fill all the fields");
                return
              }
              fetch(`${server}/api/register`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: password
                })
              }).then(res => res.json())
              .then(
                (res) => {
                  if (res.auth) {
                    setError("");
                    setCookie("user", JSON.stringify({email: email, session: res.session}), {path: "/", maxAge: 86400, sameSite: true})
                    router.push("/auth/profile")

                    return
                  } else {
                    const errorMessage = res.message;
                    setError(errorMessage);
                  }
                }
              )
            }}>Sign up</button>

              <p className="form__signup-link">
                <Link href="/auth/login">
                  <a href="#">Are you already a member?</a>
                </Link>
              </p>
            </form>
          </div>

        </div>
      </section>
    </Layout>
  )
}
  
export default RegisterPage
  