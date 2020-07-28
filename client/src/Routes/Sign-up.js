import React, { Component } from "react";
import { registerAction } from "../store/AccountActions"
import Cookies from "universal-cookie"

export default class SignUp extends Component {

    state = {
        email: '',
        password: '',
        confirmPassword: '',
        pseudo: '',
    }

    change = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    isFormValid = () => {
      const {email, password, confirmPassword} = this.state

      return email && password && confirmPassword
    }

    handleSubmit = async () => {
        if (this.state.password !== this.state.confirmPassword)
            alert("Passwords don't match");
        else {
            var uid = await registerAction(this.state)
            if (uid) {
              const cookies = new Cookies();
              cookies.set("uid", uid, { path: '/' });
              this.props.history.push("/home");
            }
        }
    }

    render() {
      return (
      <div className="auth-inner">
        <form onSubmit={this.handleSubmit}>
          <h3>Sign Up</h3>

          <div className="form-group">
            <label>Email address</label>
            <input type="email" onChange={this.change} id="email" className="form-control" placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label>Pseudo</label>
            <input type="pseudo" onChange={this.change} id="pseudo" className="form-control" placeholder="Your pseudo" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" onChange={this.change} id="password" className="form-control" placeholder="Enter password" />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" onChange={this.change} id="confirmPassword" className="form-control" placeholder="Same password" />
          </div>

          <button type="submit" disabled={!this.isFormValid()} onClick={e => {e.preventDefault(); this.handleSubmit()}} className="btn btn-primary btn-block">Sign Up</button>
          <p className="forgot-password text-right">
            Already registered <a href={"/sign-in"}>sign in?</a>
          </p>
        </form>
      </div>
);
  }
}