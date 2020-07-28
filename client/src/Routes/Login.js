import React, { Component } from "react";
import { loginAction } from "../store/AccountActions"
import Cookies from "universal-cookie"

export default class Login extends Component {

    state = {
        email: "",
        password: "",
        loginError: false,
    }

    change = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    isFormValid = () => {
      const {email, password} = this.state

      return email && password
    }

    handleSubmit = async () => {
      var uid = await loginAction(this.state)
      if (uid) {
        const cookies = new Cookies();
        cookies.set("uid", uid, { path: '/' });
        this.props.history.push("/home")
      }
    }

    render() {
    return (
      <div className="auth-inner">
        <form onSubmit={this.handleSubmit}>
          <h3>Sign In</h3>

          <div className="form-group">
            <label>Email address</label>
            <input type="email" onChange={this.change} id="email" className="form-control" placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" onChange={this.change} id="password" className="form-control" placeholder="Enter password" />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            </div>
          </div>

          <button type="submit" disabled={!this.isFormValid()} onClick={e => {e.preventDefault(); this.handleSubmit()}} className="btn btn-primary btn-block">Submit</button>
          <p className="forgot-password text-right">
            Forgot <a href={"/sign-up"}>password?</a>
          </p>
        </form>
      </div>
    );
  }
}
