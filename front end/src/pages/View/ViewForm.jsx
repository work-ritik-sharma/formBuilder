import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewForm = () => {
    const { id } = useParams(); 
    const [fields, setFields] = useState([]);
    const [formHeader, setFormHeader] = useState('');
    const [formFooter, setFormFooter] = useState('');
    const [formValues, setFormValues] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const response = await axios.post('http://192.168.245.97:7000/form/fetchAform', {
                    formId: id
                });
                const { formHeader, formFooter, fields } = response.data.data;
    
                setFormHeader(formHeader);
                setFormFooter(formFooter);
                setFields(fields);
                
                const initialValues = {};
                fields.forEach(field => {
                    initialValues[field.inputLabel] = '';
                });
                setFormValues(initialValues);
            } catch (error) {
                console.error('Error fetching form data:', error.message);
            }
        };
        fetchFormData();
    }, [id]);

    const validate = () => {
        const newErrors = {};
        fields.forEach(field => {
            if (!formValues[field.inputLabel]) {
                newErrors[field.inputLabel] = 'This field is required';
            } else if (field.inputType === 'email' && !/\S+@\S+\.\S+/.test(formValues[field.inputLabel])) {
                newErrors[field.inputLabel] = 'Invalid email address';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            alert('Submitted successfully')
        }
    };

    return (
        <div className="container mt-5 shadow-sm">
            <div className="card border p-4">
                <form onSubmit={handleSubmit}>
                    {formHeader && <h4 className="mb-4 text-center">{formHeader}</h4>}
                    <div className="row">
                        {fields.map((field, index) => (
                            <div key={index} className="mb-3 text-start col-md-10">
                                <label className="form-label">{field.inputLabel}</label>
                                <input
                                    type={field.inputType}
                                    placeholder={field.inputPlaceholder}
                                    name={field.inputLabel}
                                    value={formValues[field.inputLabel] || ''}
                                    onChange={handleChange}
                                    className={`form-control ${errors[field.inputLabel] ? 'is-invalid' : ''}`}
                                />
                                {errors[field.inputLabel] && (
                                    <div className="invalid-feedback">
                                        {errors[field.inputLabel]}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {formFooter && <p className="mt-4 text-center">{formFooter}</p>}
                    <div className="d-flex justify-content-center mt-4">
                        <button type="submit" className="btn btn-primary">
                            Update Form
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ViewForm;
