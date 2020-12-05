import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import {getChronicles} from '../../actions/chronicleActions'
import {getTales} from '../../actions/taleActions'
import ErrorMessages from '../ErrorMessages'


const SignUpForm = ({authenticated, setAuthenticated}) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("@gmail.com");
  const [password, setPassword] = useState("password");
  const [repeatPassword, setRepeatPassword] = useState("password");
  const [errors, setErrors] = useState([])

const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const content = await signUp(username, email, password);
      if (!content.errors) {
        setAuthenticated(true);
        console.log("we signed up? user:", content.chronicles)
        dispatch(getChronicles(content.chronicles))
        dispatch(getTales(content.tales))
      } else {
        setErrors(content.errors)
      }
    }
  }
  
  if (authenticated) return <Redirect to="/" />

  const updateUsername = (e) => setUsername(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateRepeatPassword = (e) => setRepeatPassword(e.target.value);

  if (authenticated) return <Redirect to="/" />

  return (
    <form onSubmit={onSignUp}>
      <ErrorMessages errors={errors} />
      <div>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
