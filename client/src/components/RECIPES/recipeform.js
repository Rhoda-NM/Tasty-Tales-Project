import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';
import Login from '../USER/login';

const AddRecipeForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const initialValues = {
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        tags: ''
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        ingredients: Yup.string().required('Ingredients are required'),
        instructions: Yup.string().required('Instructions are required'),
        tags: Yup.string().required('Tags are required')
    });

    const handleSubmit = (values, { setSubmitting }) => {
        const formattedRecipe = {
            ...values,
            tags: values.tags.split(',').map(item => item.trim())
        };

        axios.post('/api/recipes', formattedRecipe)
            .then(response => {
                alert('Recipe added successfully!');
                // Optionally, redirect to another page after successful submission
                navigate('/recipes');
            })
            .catch(error => {
                console.error('There was an error adding the recipe!', error);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    if (!user) {
        return (
            <>
                <h3>You need to login to add a recipe</h3>
                <Login />
            </>
        );
    }

    return (
        <div>
            <h1 className="text-center mb-4" style={{ fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', color: '#333' }}>Add a Recipe</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <Form>
                        <div>
                            <h3 style={{ textAlign: 'center' }}>Recipe Form</h3>
                        </div>
                        <div style={{ gap: '10px', paddingTop: '20px', width: '100%', padding: '30px', backgroundColor: 'rgba(123, 106, 106, 0.4)', borderRadius: '20px' }}>
                            <h6>Title:</h6>
                            <Field type="text" name="title" placeholder="Title" className="form-control" />
                            <ErrorMessage name="title" component="div" className="error-message" />

                            <h6>Description:</h6>
                            <Field as="textarea" name="description" placeholder="Description" className="form-control" />
                            <ErrorMessage name="description" component="div" className="error-message" />

                            <h6>Ingredients:</h6>
                            <Field as="textarea" name="ingredients" placeholder="Ingredients" className="form-control" />
                            <ErrorMessage name="ingredients" component="div" className="error-message" />

                            <h6>Instructions:</h6>
                            <Field as="textarea" name="instructions" placeholder="Instructions" className="form-control" />
                            <ErrorMessage name="instructions" component="div" className="error-message" />

                            <h6>Tags:</h6>
                            <Field type="text" name="tags" placeholder="Tags (comma-separated)" className="form-control" />
                            <ErrorMessage name="tags" component="div" className="error-message" />

                            <div style={{ alignContent: 'center', width: '90px', height: '30px' }}>
                                <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>Add</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddRecipeForm;
