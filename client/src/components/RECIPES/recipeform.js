import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';
import NavBar from '../navbar';
import Footer from '../footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../form.css';

const RecipeForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      imgLink: '',
      description: '',
      ingredients: '',
      instructions: '',
      tags: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Recipe Title is required'),
      imgLink: Yup.string().url('Invalid link'),
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
    minHeight: '100vh',
    backgroundImage: 'url(https://images.creativemarket.com/0.1.0/ps/106400/1360/1924/m1/fpnw/wm1/ivphkooyxa5a2riftjbhe9r3zbipqlfc4wvwflk7o0xk0xfqrfb45nywjoukmedn-.jpg?1399222065&s=792b3e1cc37d2bbf9408ae4455aec6c6)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const formContainerStyle = {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Increased transparency
    backdropFilter: 'blur(5px)', // Blur effect for the background
    borderRadius: '10px', // Rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    padding: '20px',
  };

  return (
    <>
      <NavBar />
      <div
        className="d-flex justify-content-center align-items-center"
        style={backgroundImageStyle}
      >
        <div className="p-5 rounded shadow" style={formContainerStyle}>
          <h1 className="text-center mb-4">Add New Recipe</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="title">Recipe Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="text-danger">{formik.errors.title}</div>
              ) : null}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="imgLink">Image Link</label>
              <input
                type="text"
                id="imgLink"
                name="imgLink"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.imgLink}
              />
              {formik.touched.imgLink && formik.errors.imgLink ? (
                <div className="text-danger">{formik.errors.imgLink}</div>
              ) : null}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-danger">{formik.errors.description}</div>
              ) : null}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="ingredients">Ingredients</label>
              <textarea
                id="ingredients"
                name="ingredients"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ingredients}
              />
              {formik.touched.ingredients && formik.errors.ingredients ? (
                <div className="text-danger">{formik.errors.ingredients}</div>
              ) : null}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="instructions">Instructions</label>
              <textarea
                id="instructions"
                name="instructions"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.instructions}
              />
              {formik.touched.instructions && formik.errors.instructions ? (
                <div className="text-danger">{formik.errors.instructions}</div>
              ) : null}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="tags">Tags (comma-separated)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tags}
              />
              {formik.touched.tags && formik.errors.tags ? (
                <div className="text-danger">{formik.errors.tags}</div>
              ) : null}
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-secondary text-dark">
                Add Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecipeForm;
