import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './form/input';

class LoginForm extends Component {

  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label("Password")
  };

  validate = () => {
    const options = { abortEarly: false }
    const { error } = Joi.validate(this.state.account, this.schema, options);
    //console.log(result);
    if(!error) return null;

    const errors = {};
    for(let item of error.details){
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    errorMessage ? errors[input.name] = errorMessage : delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  }

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if(errors) return;

    console.log("Submited");
  }

  render() {

    const { account, errors }  = this.state;

    return (
      <div className="row">
        <div className="col-md-3"></div>
        <div className="card col-md-6 border border-white shadow">
          <div className="card-body">
            <h4 className="card-title text-center text-muted font-weight-bold">Login form</h4>
            <form onSubmit={this.handleSubmit} className="p-4">
              <Input 
                type="text"
                label="Username"
                name="username"
                value={account.username}
                onChange={this.handleChange}
                error={errors.username}
              />
              <Input 
                type="password"
                label="Password"
                name="password"
                value={account.password}
                onChange={this.handleChange}
                error={errors.password}
              />
              <div className="text-center">
                <button 
                  disabled={this.validate()}
                  className="btn btn-primary px-4 font-weight-bold mt-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm;