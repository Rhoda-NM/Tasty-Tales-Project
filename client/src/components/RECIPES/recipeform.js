import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';

const RecipeForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      imgUrl: '',
      description: '',
      ingredients: '',
      instructions: '',
      tags: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      imgUrl: Yup.string().url('Invalid URL'),
      description: Yup.string().required('Description is required'),
      ingredients: Yup.string().required('Ingredients are required'),
      instructions: Yup.string().required('Instructions are required'),
      tags: Yup.string(),
    }),
    onSubmit: async (values) => {
      if (!user) {
        navigate('/login');
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        navigate(`/recipes/${data.id}`);
      } else {
        console.error('Failed to add recipe');
      }
    },
  });

  // Background image style
  const backgroundImageStyle = {
    backgroundImage: 'url("https://images.pexels.com/photos/7615463/pexels-photo-7615463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={backgroundImageStyle}>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div>{formik.errors.title}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="imgUrl">Image URL</label>
          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.imgUrl}
          />
          {formik.touched.imgUrl && formik.errors.imgUrl ? (
            <div>{formik.errors.imgUrl}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div>{formik.errors.description}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ingredients}
          />
          {formik.touched.ingredients && formik.errors.ingredients ? (
            <div>{formik.errors.ingredients}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.instructions}
          />
          {formik.touched.instructions && formik.errors.instructions ? (
            <div>{formik.errors.instructions}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tags}
          />
          {formik.touched.tags && formik.errors.tags ? (
            <div>{formik.errors.tags}</div>
          ) : null}
        </div>

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
