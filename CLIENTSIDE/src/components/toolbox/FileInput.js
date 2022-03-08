/* @author : istiklal */
// react-hook

import React from "react";

const FileInput = ({ name, label, onChange, placeholder, value, error }) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="file"
          name={name}
          id={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {/* hata varsa && ve operatörü true döndürecek ve içteki div görünür olacak !! */}
        {error&&<div className="alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default FileInput;