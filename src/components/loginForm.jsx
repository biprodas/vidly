import React from 'react';
import Form from './form/form';

class LoginForm extends Form {

  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  doSubmit = () => {

    console.log("login clicked");
  }

  render() {

    return (
      <div className="row">
        <div className="col-md-3"></div>
        <div className="card col-md-6 border border-white shadow">
          <div className="card-body">
            <h4 className="card-title text-center text-muted font-weight-bold">Register</h4>
            <form onSubmit={this.handleSubmit} className="p-4">
              {this.renderInput("username", "Username")}
              { this.renderInput("password", "Password", "password")}
              <div className="text-center">
                {this.renderButton("Login")}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm;