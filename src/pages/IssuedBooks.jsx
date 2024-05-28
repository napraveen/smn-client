import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import GetUserDetails from '../functions/GetUserDetails';

const IssuedBooks = () => {
  const { userDetails } = GetUserDetails();
  const [issuedBooks, setIssuedBooks] = useState([]);

  const serverOrigin = process.env.REACT_APP_SERVER_ORIGIN;

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const res = await axios.get(`${serverOrigin}/issued-books`);
        const issuedBooksData = res.data;

        const bookNamePromises = issuedBooksData.map(async (issuedBook) => {
          const bookId = issuedBook.bookname;
          const response = await axios.get(
            `${serverOrigin}/find-bookname/${bookId}`
          );
          return { ...issuedBook, bookname: response.data };
        });
        const updatedIssuedBooks = await Promise.all(bookNamePromises);

        setIssuedBooks(updatedIssuedBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchIssuedBooks();
  }, []);

  return (
    <div>
      {userDetails ? (
        <>
          {' '}
          <Header />
          <table border="1">
            <thead>
              <tr>
                <th>Book</th>
                <th>Issued to </th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {issuedBooks.map((issuedBook, index) => (
                <tr key={index}>
                  <td>{issuedBook.bookname}</td>
                  <td>{issuedBook.availedUser}</td>
                  <td>
                    {issuedBook.date
                      .substring(0, 10)
                      .split('-')
                      .reverse()
                      .join('-')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default IssuedBooks;
