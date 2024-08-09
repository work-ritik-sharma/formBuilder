import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        fetchForms(); 
    }, []);

    const fetchForms = async () => {
        try {
            const response = await axios.get('http://192.168.245.97:7000/form/fetchAllForms');
            setFormData(response.data.data); 
        } catch (error) {
            console.error('Error fetching forms:', error.message);
        }
    };

    const handleAddClick = () => {
        navigate('/add'); 
    };

    const handleEditClick = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleViewClick = (id) => {
        navigate(`/view/${id}`);
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await axios.delete(`http://192.168.245.97:7000/form/deleteForm/${id}`);
            alert("Deleted Successfully");
        } catch (error) {
            console.error('Error deleting form:', error.message);
        }
    }
    

    return (
        <div className="container mt-4">
            <h1 className="text-dark mb-4">Welcome to Form Builder</h1>
            <div className="d-flex justify-content-end mb-4">
                <button className="btn btn-success" onClick={handleAddClick}>Add Form</button>
            </div>
            <div className="row">
                {formData.length > 0 ? (
                    formData.map((form, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-header bg-primary text-white">
                                    <h5 className="mb-0">{form.formHeader}</h5>
                                </div>
                                <div className="card-body">
                                    <p>To preview the form, click on <b>View</b>, and to edit, click on <b>Edit</b></p>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => handleEditClick(form._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleViewClick(form._id)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteClick(form._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p className="text-center">No forms available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
