import Header from './Header';
import '../css/book.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AvailableBooks = () => {
  const [books, setBooks] = useState([]);
  const serverOrigin = process.env.REACT_APP_SERVER_ORIGIN;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${serverOrigin}/books`);
        setBooks(res.data);
      } catch (err) {
        console.log('Error fetching the books data:', err);
      }
    };

    fetchBooks();
  }, []);

  console.log('Books:', books);
  return (
    <div>
      <Header />
      <div className="book-body">
        <h1>
          {' '}
          Hey there, Welcome to our
          <span> books collection!! </span>
        </h1>
        <div className="all-books">
          {books.map((book, index) => (
            <div className="book-container" key={index}>
              <a href={book.fileUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={book.fileUrl}
                  alt={book.bookname}
                  className="book-logos"
                />
              </a>
              <h4>
                <a
                  href={book.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {book.bookname}
                </a>
              </h4>
              <p>By {book.author}</p>
              <p>{book.description}</p>
            </div>
          ))}
        </div>
        (Development Mode: ON, will upload other books soon)
      </div>
    </div>
  );
};

export default AvailableBooks;
