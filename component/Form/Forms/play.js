import React, { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [option, setOption] = useState("");
  const [errors, setErrors] = useState({});

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      // form is valid, do something with the data
    } else {
      setErrors(errors);
    }
  };

  const validate = () => {
    const errors = {};
    const namePattern = /^[A-Za-z]+$/;
    const phonePattern = /^\d{10}$/;

    if (!name.trim().match(namePattern)) {
      errors.name = "Please enter a valid name (letters only)";
    }

    if (!phoneNumber.match(phonePattern)) {
      errors.phoneNumber = "Please enter a valid phone number (10 digits)";
    }

    if (option === "") {
      errors.option = "Please select an option";
    }

    return errors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>

      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        {errors.phoneNumber && (
          <div className="error">{errors.phoneNumber}</div>
        )}
      </div>

      <div>
        <label htmlFor="option">Option:</label>
        <select id="option" name="option" value={option} onChange={handleOptionChange}>
          <option value="">Select an option</option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
        {errors.option && <div className="error">{errors.option}</div>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;


