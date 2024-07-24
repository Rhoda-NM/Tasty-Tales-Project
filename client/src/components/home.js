import React, {useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Navbar from './navbar';
import Footer from './footer';

const Home = () => {
  const placeholderImageUrl = 'https://via.placeholder.com/400x250.png?text=Recipe+Image';
  const img1 = "https://www.themealdb.com/images/media/meals/vdwloy1713225718.jpg";
  const img3 = "https://www.themealdb.com/images/media/meals/0206h11699013358.jpg";
  const img4 = "https://www.themealdb.com/images/media/meals/jcr46d1614763831.jpg";
  const welcomeImageUrl = "https://images.pexels.com/photos/5898313/pexels-photo-5898313.jpeg?auto=compress&cs=tinysrgb&w=800";
  

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <>
      <Navbar />
      <Container className="home mt-4"
        style={{
          minHeight: '100vh',
          backgroundImage: 'url("https://st4.depositphotos.com/9012638/30613/i/450/depositphotos_306130638-stock-photo-herb-and-spices-cooking-background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
      }}
      >
      <Row class=" justify-content-center hero" aria-label="banner">

        <div class="banner-card">
          <h1 class="display-large">Your desired dish?</h1>

          <div class="search-wrapper" data-search-form>

            <div className="search-bar ms-3" >
                <form onSubmit={handleSearch} className="d-flex search-field body-medium" style={{display: "flex"}}>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search recipes..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className=" search-submit btn ">
                    Search
                  </button>
                </form>
              </div>

          </div>
          <p class="label-medium">
            Search any recipe e.g: burger, pizza, sandwich, toast.
          </p>
        </div>
      </Row>
        
        <Row className='justify-content-center' style={{ background: "#eeeeea", padding: "20px 0" }}>
          <Col sm={6} style={{
            color: 'black',
            fontWeight: 'bold',
            padding: '20px',
            borderRadius: '10px'
          }}>
            <div>
              <h3>About Us</h3>
              <p className="lead">
                Explore diverse cuisine, cooking techniques, and connect with other food enthusiasts. Whether you are a seasoned chef or an aspiring home cook, discover new flavors, learn from culinary experts, and embark on a flavorful journey.
              </p>
              <p>
                <span style={{ color: 'black', fontWeight: 'bold' }}>Tasty Tales</span> is a recipe platform dedicated to providing unique culinary experiences.
              </p>
            </div>
          </Col>
          <Col sm={6}>
            <Card text="white">
              <Row className="justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                <Col xs="auto" className="text-center">
                  <div className="rounded-circle" style={{ backgroundColor: 'yellowgreen', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img src={welcomeImageUrl} style={{ width: '100%', height: 'auto' }} alt="Welcome" />
                  </div>
                </Col>
              </Row>
              <Card.Body className="text-center">
                <Card.Title className="display-4 fw-bold" style={{ color: '#3e8484' }}>
                  Tasty Tales
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <h2>Explore Our Recipes</h2>
        </Row>
        <Row className='justify-content-center'>
          <Col sm={4} className="card mb-4">
            {img1 ? (
              <img src={img1} className="card-img-top" alt="Summer Recipes" />
            ) : (
              <img src={placeholderImageUrl} className="card-img-top" alt="Placeholder" />
            )}
            <div className="card-body">
              <h5 className="card-title">Summer Recipes</h5>
            </div>
          </Col>
          <Col sm={4} className="card mb-4">
            {img3 ? (
              <img src={img3} className="card-img-top" alt="Tasty Breakfast" />
            ) : (
              <img src={placeholderImageUrl} className="card-img-top" alt="Placeholder" />
            )}
            <div className="card-body">
              <h5 className="card-title">Tasty Breakfast</h5>
            </div>
          </Col>
          <Col sm={4} className="card mb-4">
            {img4 ? (
              <img src={img4} className="card-img-top" alt="Hearty Meals" />
            ) : (
              <img src={placeholderImageUrl} className="card-img-top" alt="Placeholder" />
            )}
            <div className="card-body">
              <h5 className="card-title">Hearty Meals</h5>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
