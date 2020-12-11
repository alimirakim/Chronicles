import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { getCreations } from '../../actions/chronicleActions'
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
    <h2>Login</h2>
    <form onSubmit={onLogin}>
      <ErrorMessages errors={errors} />
      <div>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <button type="submit">Login</button>
      </div>
    </form>
  </>)
}
