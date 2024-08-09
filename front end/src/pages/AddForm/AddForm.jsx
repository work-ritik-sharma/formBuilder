import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddForm = () => {
  const [fields, setFields] = useState([]);
  const [formHeader, setFormHeader] = useState('');
  const [formFooter, setFormFooter] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  const addField = (type) => {
    setFields([...fields, { type, placeholder: '', label: '' }]);
  };

  const handleInputChange = (index, event) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, [event.target.name]: event.target.value } : field
    );
    setFields(updatedFields);
  };

  const removeField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!formHeader) {
      errors.formHeader = 'Header is required';
      isValid = false;
    }

    if (!formFooter) {
      errors.formFooter = 'Footer is required';
      isValid = false;
    }

    if (fields.length === 0) {
      errors.noFields = 'At least one input field is required';
      isValid = false;
    }

    fields.forEach((field, index) => {
      if (!field.label) {
        errors[`label_${index}`] = `Label for field ${index + 1} is required`;
        isValid = false;
      }
      if (!field.placeholder) {
        errors[`placeholder_${index}`] = `Placeholder for field ${index + 1} is required`;
        isValid = false;
      }
    });

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://192.168.245.97:7000/form/addForm', {
        formHeader,
        formFooter,
        fields: fields.map((field) => ({
          inputType: field.type,
          inputLabel: field.label,
          inputPlaceholder: field.placeholder,
        })),
      });
      alert('form added successfully')
      navigate('/add'); 
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  return (
    <div className="d-flex p-3">
      <div className="flex-fill me-3 card shadow-sm border p-3">
        <div className="card-header mb-3">
          <h4>Form Preview</h4>
        </div>
        <form onSubmit={handleSubmit}>
          {formHeader && <h4>{formHeader}</h4>}
          {fields.map((field, index) => (
            <div key={index} className="mb-3 text-start card-body">
              {field.label && <label className="form-label">{field.label}</label>}
              <input
                type={field.type}
                placeholder={field.placeholder}
                name={field.label}
                className="form-control"
                readOnly
              />
            </div>
          ))}
          {formFooter && <p>{formFooter}</p>}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      <div className="flex-fill border card shadow-sm p-3">
        <div className="card-header mb-3">
          <h4>Add Form Fields</h4>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <div className="mb-3 text-start">
              <label className="form-label">Header</label>
              <input
                type="text"
                value={formHeader}
                onChange={(e) => setFormHeader(e.target.value)}
                placeholder="Enter form header"
                className="form-control mb-2"
              />
              {errors.formHeader && <div className="text-danger">{errors.formHeader}</div>}
            </div>
            <div className="mb-3 text-start">
              <label className="form-label">Footer</label>
              <input
                type="text"
                value={formFooter}
                onChange={(e) => setFormFooter(e.target.value)}
                placeholder="Enter form footer"
                className="form-control mb-2"
              />
              {errors.formFooter && <div className="text-danger">{errors.formFooter}</div>}
            </div>
            {errors.noFields && <div className="text-danger">{errors.noFields}</div>}
          </div>

          {fields.map((field, index) => (
            <div key={index} className="card mb-3 shadow-sm">
              <div className="card-body position-relative">
                <button
                  type="button"
                  onClick={() => removeField(index)}
                  className="btn btn-link position-absolute top-0 end-0 p-2"
                  style={{ color: 'red' }}
                >
                  <i className="fas fa-times"></i>
                </button>

                <div className="mb-3 text-start">
                  <label className="form-label">Label</label>
                  <input
                    type="text"
                    name="label"
                    value={field.label}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Enter label"
                    className="form-control mb-2"
                  />
                  {errors[`label_${index}`] && <div className="text-danger">{errors[`label_${index}`]}</div>}
                </div>
                <div className="mb-3 text-start">
                  <label className="form-label">Placeholder</label>
                  <input
                    type="text"
                    name="placeholder"
                    value={field.placeholder}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Enter placeholder"
                    className="form-control mb-2"
                  />
                  {errors[`placeholder_${index}`] && <div className="text-danger">{errors[`placeholder_${index}`]}</div>}
                </div>
              </div>
            </div>
          ))}

          <div className="mt-3">
            {['text', 'email', 'password', 'number', 'file'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => addField(type)}
                className="btn btn-secondary me-2"
              >
                Add {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
