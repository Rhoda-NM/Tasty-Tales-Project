import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container className="mt-4">
      {/* Title Card */}
      <Row className="justify-content-center">
        <Col>
          <Card bg="secondary" text="white">
            <Card.Body className="text-center">
              <Card.Title className="display-4 fw-bold" style={{ color: 'purple' }}>
                Tasty Tales
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Description */}
      <Row className="mt-4 justify-content-center">
        <Col className="text-center">
          <p>
            Tasty Tales is a Recipe Management Platform dedicated to exploring culinary experiences and sharing stories behind delicious recipes. Through engaging content and informative resources, Tasty Tales connects food enthusiasts with diverse cuisines, cooking techniques, and the rich cultural narratives that make every dish unique. Whether you're a seasoned chef or an aspiring home cook, Tasty Tales invites you to discover new flavors, learn from culinary experts, and embark on a flavorful journey of exploration and inspiration.
          </p>
        </Col>
      </Row>

      {/* Logo */}
      <Row className="mt-4 justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <Col xs="auto" className="text-center">
          <div className="rounded-circle" style={{ backgroundColor: 'yellowgreen', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h2 className="text-black text-center mb-0">
              WELCOME!
            </h2>
          </div>
        </Col>
      </Row>

      {/* View Recipes and Contact Us Cards */}
      <Row className="mt-4 justify-content-center">
        {/* View Recipes Card */}
        <Col md="6">
          <Card>
            <Card.Body>
              <Card.Title>View Recipes</Card.Title>
              <Card.Text>
                Explore our collection of mouth-watering recipes.
              </Card.Text>
              <Link to="/recipes">
                <Button variant="info">View Recipes</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Contact Us Card */}
        <Col md="6">
          <Card>
            <Card.Body>
              <Card.Title>Contact Us</Card.Title>
              <Card.Text>
                Contact us for inquiries or give feedback.
              </Card.Text>
              <Link to="/contact">
                <Button variant="info">Contact Us</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Login and Signup Buttons */}
      <Row className="mt-4 justify-content-center">
        <Col md="6" className="text-center">
          <Link to="/login">
            <Button variant="primary">Login</Button>
          </Link>
        </Col>
        <Col md="6" className="text-center">
          <Link to="/signup">
            <Button variant="success">Signup</Button>
          </Link>
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        <Col md="6" className='text-center'>
          <Link to="/recipeform">
            <Button>Add Recipe</Button>
          </Link>
        </Col>
      </Row>

    </Container>
  );
};

export default Home;
