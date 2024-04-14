import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const MainPage = () => {
  const BOOKS = [
    {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "category": "Classic",
      "isbn": "9780743273565",
      "publish_date": "1925-04-10",
      "description": "The Great Gatsby, F. Scott Fitzgerald’s third book, stands as the supreme achievement of his career.",
      "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
    },
    {
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "category": "Classic",
      "isbn": "9780061120084",
      "publish_date": "1960-07-11",
      "description": "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.",
      "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvUNHsoC5r4meXkAMnw9zwwwDak2KlNSxZZCAzcjYe-QS23ns9"
    },
    {
      "title": "1984",
      "author": "George Orwell",
      "category": "Dystopian",
      "isbn": "9780451524935",
      "publish_date": "1949-06-08",
      "description": "Nineteen Eighty-Four, often referred to as 1984, is a dystopian social science fiction novel by the English novelist George Orwell.",
      "image_url": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQEeRMssBuZ0uXNsZYdamS75DAY1BgL6xlzkVVoJIfGT8Ye--bA"
    }
  ];

  return (
    <Container>
      <h1 className="mt-4 mb-4">Book Collection</h1>
      <Row>
        {BOOKS.map((book, index) => (
          <Col key={index} md={4}>
            <Card className="mb-4" style={{ height: '100%' }}>
              <Card.Img
                variant="top"
                src={book.image_url}
                alt={book.title}
                style={{ maxHeight: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  <strong>Author:</strong> {book.author}
                  <br />
                  <strong>Category:</strong> {book.category}
                  <br />
                  <strong>ISBN:</strong> {book.isbn}
                  <br />
                  <strong>Publish Date:</strong> {book.publish_date}
                  <br />
                  {book.description}
                </Card.Text>
                <Button variant="primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MainPage;
