import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { register } from "../modules/authManager";
import "./Styling/auth.css"
import logolog from "../pics/logolog.png"

export default function Register() {
    const history = useHistory();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    
    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match.");
        } else {
            const userProfile = { firstName, lastName, userName, email };
            register(userProfile, password)
                .then(() => history.push("/"));
        }
    };

    return (
        <Form onSubmit={registerClick}>


            <fieldset className="reg-form">
                <div className="loglogo"><img src={logolog} alt="cache-logo" className="app-login" /></div>
                <FormGroup>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" type="text" autoFocus onChange={e => setFirstName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" type="text" autoFocus onChange={e => setLastName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="userName">UserName</Label>
                    <Input id="userName" type="text" autoFocus onChange={e => setUserName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <button className="btn-can">Register</button>
                    <button
                    className="btn-can"
                    variant="secondary"
                    onClick={() => history.push("/")}
                    >
                        Cancel
                    </button>
                </FormGroup>
            </fieldset>
        </Form>
    );
}