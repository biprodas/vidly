import React from 'react';

const Input = ({ label, type, name, value, onChange, error, info }) => {
  return (
    <div className="form-group">
      <label className="text-muted" htmlFor={name}>{label}</label>
      <input 
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      />
      {error && <span className="text-danger">{error}</span>}
      {info && <span className="text-info">{info}</span>}
    </div>
  )
}

export default Input;