import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';

const Home = () => {
  const placeholderImageUrl = 'https://via.placeholder.com/400x250.png?text=Recipe+Image';
  const img1 = "https://www.themealdb.com/images/media/meals/vdwloy1713225718.jpg"
  const img2 = "https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg"
  const img3 = "https://www.themealdb.com/images/media/meals/0206h11699013358.jpg"
  const img4 = "https://www.themealdb.com/images/media/meals/jcr46d1614763831.jpg"


  return (
    <>
      <Navbar />
      <Container className="mt-4">
        <div className='row justify content-center'>
        <div className="col-4 card mb-4">
            {/* Display the image if available, otherwise show placeholder */}
            {img1 ? (
                <img src={img1} className="card-img-top" alt="img" />
            ) : (
                <img src={placeholderImageUrl} style={{width: 40, height: 30}} className="card-img-top" alt="img" />
            )}
            <div className="card-body">
                <h5 className="card-title">Summer Recipes</h5>
            </div>
          </div>
          <div className="col-4 card mb-4">
            {/* Display the image if available, otherwise show placeholder */}
            {img3 ? (
                <img src={img3} className="card-img-top" alt="img" />
            ) : (
                <img src={placeholderImageUrl} style={{width: 40, height: 30}} className="card-img-top" alt="img" />
            )}
            <div className="card-body">
                <h5 className="card-title">Tasty Breakfast</h5>
            </div>
          </div>
          <div className="col-4 card mb-4">
            {/* Display the image if available, otherwise show placeholder */}
            {img4 ? (
                <img src={img4} className="card-img-top" alt="img" />
            ) : (
                <img src={placeholderImageUrl} style={{width: 40, height: 30}} className="card-img-top" alt="img" />
            )}
            <div className="card-body">
                <h5 className="card-title">Hearty Meals</h5>
            </div>
          </div>
        </div>
        <div className='row justify-content' style={{background: "#eeeeea"}}>
          <div className='col-6'>
    
            <Card  text="white">
              <Row className="mt-4 justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                    <Col xs="auto" className="text-center">
                      <div className="rounded-circle" style={{ backgroundColor: 'yellowgreen', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h2 className="text-black text-center mb-0">
                          WELCOME!
                        </h2>
                      </div>
                    </Col>
                  </Row>
                <Card.Body className="text-center">
                  <Card.Title className="display-4 fw-bold" style={{ color: '#3e8484' }}>
                    Tasty Tales
                  </Card.Title>
                </Card.Body>      {/* Logo */}
    
              </Card>
            </div>
            <div className='col-6'>
              <h3>About Us</h3>
              <p>Explore diverse cuisine, cooking techniques and connect with other food enthusiasts
                <br/>Whether you are a seasoned chef or an aspiring home cook discover new flavors, 
                learn from culinary experts and embark on a flavorful journey.
                <br />
                <span style={{padding: 20, color: '#3e8484'}}>Tasty Tales is a recipe platform dedicated to providing unique culinary experiences</span>
              </p>
          </div>
        </div>
        <div className='row justify-content'>
          <h2>Explore Our Recipes</h2>
          <div></div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Home;