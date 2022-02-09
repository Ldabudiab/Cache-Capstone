import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { login } from "../modules/authManager";
import "./Styling/auth.css"
import logolog from "../pics/logolog.png"

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Login Failed"));
  };
  return (
    <Form onSubmit={loginSubmit}>

      

      <fieldset className="login-form">
      <div className="loglogo"><img src={logolog} alt="cache-logo" className="app-login" /></div>
        <FormGroup className="Input-box">
          <Label for="email">Email</Label>
          <Input id="email" type="text" autoFocus onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup className="Input-box">
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Login</Button>
        </FormGroup>
        <em>
          Not registered? <Link to="register">Register</Link>
        </em>
      </fieldset>
    </Form>
  );
}