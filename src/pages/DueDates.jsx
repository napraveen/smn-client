import React, { useEffect, useState } from 'react';
import Header from './Header';
import GetUserDetails from '../functions/GetUserDetails';
import axios from 'axios';
import PageNotFound from './PageNotFound';
const DueDates = () => {
  const { userDetails } = GetUserDetails();
  const [issuedBooks, setIssuedBooks] = useState([]);

  const serverOrigin = process.env.REACT_APP_SERVER_ORIGIN;

  useEffect(() => {
    if (userDetails && userDetails.username) {
      const fetchIssuedBooks = async () => {
        try {
          const response = await axios.get(
            `${serverOrigin}/mybooks/${userDetails.username}`
          );
          const issuedBooksData = response.data;

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
          console.error('Error fetching issued books:', error);
        }
      };

      fetchIssuedBooks();
    }
  }, [userDetails, serverOrigin]);
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().substring(0, 10);
  };

  return (
    <div>
      {userDetails &&
      userDetails.verified !== '' &&
      userDetails.username !== 'admin' ? (
        <>
          {' '}
          <Header />
          <h2 style={{marginLeft:"30px"}}>Issued Books</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Issue Date </th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {issuedBooks.map((book, index) => (
                <tr key={index}>
                  <td>{book.bookname}</td>
                  <td>
                    {' '}
                    {book.date.substring(0, 10).split('-').reverse().join('-')}
                  </td>
                  <td>
                    {addDays(book.date, 14).split('-').reverse().join('-')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
};

export default DueDates;
