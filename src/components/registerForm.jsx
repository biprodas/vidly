import React from 'react';
import Joi from 'joi-browser';
import Form from './form/form';


class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string().required().email().label('Username'),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().min(2).label("Name")
  };

  doSubmit = () =>{
    console.log("register clicked");
  };

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
              {this.renderInput("name", "Name")}
              <div className="text-center">
                {this.renderButton("Register")}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterForm;