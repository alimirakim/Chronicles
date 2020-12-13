import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { getCreations } from '../../actions/userActions'
import ErrorMessages from '../ErrorMessages'

export default function LoginForm({ authenticated, setAuthenticated }) {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("demo@aa.io");
  const [password, setPassword] = useState("password");

  const onLogin = async (e) => {
    e.preventDefault();
    const content = await login(email, password);
    if (!content.errors) {
      setAuthenticated(true)
      // TODO Refactor this into one dispatch!
      dispatch(getCreations(content))
    } else {
      setErrors(content.errors);
    }
  };

  const updateEmail = (e) => setEmail(e.target.value)
  const updatePassword = (e) => setPassword(e.target.value)

  if (authenticated) return <Redirect to="/" />

  return (<>
    <form onSubmit={onLogin} className="lo-box-med">
    <h2>Login</h2>
      <ErrorMessages errors={errors} />
      <div>
        <label htmlFor="email" className="lo-txt-con">Email
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
        </label>
      </div>
      <div>
        <label htmlFor="password" className="lo-txt-con">Password
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        </label>
        <button type="submit" className="lo-wow">Login</button>
      </div>
    </form>
  </>)
}
