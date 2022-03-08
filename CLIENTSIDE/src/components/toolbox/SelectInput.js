/* @author : istiklal */
// react-hook

import React from "react";

const SelectInput = ({
  name,
  label,
  onChange,
  defaultOption,
  value,
  error,
  options,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      >
        <option key="0" value="">{defaultOption}</option>
        {options.map(optionItem=>{
          return (
            <option key={optionItem.value} value={optionItem.value}>
              {optionItem.text}
            </option>
          );
        })}
      </select>
      {/* hata varsa && ve operatörü true döndürecek ve içteki div görünür olacak !! */}
      {error&&<div className="alert-danger">{error}</div>}
    </div>
  );
};

export default SelectInput;
