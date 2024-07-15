import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    title: '',
    description: '',
    ingredients: '',
    steps: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    ingredients: Yup.string().required('Required'),
    steps: Yup.string().required('Required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/recipes', values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      navigate('/recipes');
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
    setSubmitting(false);
  };

  if (!user) {
    return <div>Please log in to add a recipe.</div>;
  }

  return (
    <div>
      <h1>Add a Recipe</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="title">Title</label>
              <Field type="text" id="title" name="title" />
              <ErrorMessage name="title" component="div" />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Field type="text" id="description" name="description" />
              <ErrorMessage name="description" component="div" />
            </div>
            <div>
              <label htmlFor="ingredients">Ingredients</label>
              <Field type="text" id="ingredients" name="ingredients" />
              <ErrorMessage name="ingredients" component="div" />
            </div>
            <div>
              <label htmlFor="steps">Steps</label>
              <Field type="text" id="steps" name="steps" />
              <ErrorMessage name="steps" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Add Recipe
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRecipeForm;