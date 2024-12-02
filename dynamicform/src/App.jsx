import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [formType, setFormType] = useState('');
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);

  
  const apiResponses = {
    userInfo: {
      fields: [
        { name: "firstName", type: "text", label: "First Name", required: true },
        { name: "lastName", type: "text", label: "Last Name", required: true },
        { name: "age", type: "number", label: "Age", required: true },
      ]
    },
    addressInfo: {
      fields: [
        { name: "street", type: "text", label: "Street", required: true },
        { name: "city", type: "text", label: "City", required: true },
        { name: "state", type: "dropdown", label: "State", options: ["California", "Texas", "New York"], required: true },
        { name: "zipCode", type: "text", label: "Zip Code", required: true },
      ]
    },
    paymentInfo: {
      fields: [
        { name: "cardNumber", type: "text", label: "Card Number", required: true },
        { name: "expiryDate", type: "date", label: "Expiry Date", required: true },
        { name: "cvv", type: "password", label: "CVV", required: true },
        { name: "cardholderName", type: "text", label: "Cardholder Name", required: true }
      ]
    }
  };

  useEffect(() => {
    if (formType) {
      setFormFields(apiResponses[formType]?.fields || []);
    }
  }, [formType]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};
    let progressValue = 0;
   
    formFields.forEach(field => {
      if (field.required && !formData[field.name]) {
        formErrors[field.name] = `${field.label} is required.`;
      } else if (field.type === 'number' && isNaN(formData[field.name])) {
        formErrors[field.name] = `${field.label} must be a number.`;
      } else {
        progressValue++;
      }
    });

    setErrors(formErrors);
    setProgress(Math.round((progressValue / formFields.length) * 100));

    if (Object.keys(formErrors).length === 0) {
      alert('Form Submitted Successfully!');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDropdownChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormTypeChange = (e) => {
    setFormType(e.target.value);
    setFormData({});
    setErrors({});
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Dynamic Form Example</h1>
      </header>

      <div className="form-container">
        <select onChange={handleFormTypeChange} value={formType} className="dropdown">
          <option value="">Select Form Type</option>
          <option value="userInfo">User Information</option>
          <option value="addressInfo">Address Information</option>
          <option value="paymentInfo">Payment Information</option>
        </select>

        {formFields.length > 0 && (
          <form onSubmit={handleFormSubmit}>
            {formFields.map((field) => (
              <div key={field.name} className="form-field">
                <label>{field.label}</label>
                {field.type === 'text' || field.type === 'number' || field.type === 'password' || field.type === 'date' ? (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                  />
                ) : field.type === 'dropdown' ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleDropdownChange}
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option, idx) => (
                      <option key={idx} value={option}>{option}</option>
                    ))}
                  </select>
                ) : null}
                {errors[field.name] && <div className="error">{errors[field.name]}</div>}
              </div>
            ))}
            <button type="submit" className="submit-button">Submit</button>
          </form>
        )}

        {formFields.length > 0 && <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>}
      </div>

      <footer className="footer">
        <p>&copy; Dynamic Form </p>
      </footer>
    </div>
  );
};

export default App;