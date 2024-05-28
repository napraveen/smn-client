import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/upload.css';
import Header from './Header';

import GetUserDetails from '../functions/GetUserDetails';
import PageNotFound from './PageNotFound';
const ImageUpload = () => {
  const { userDetails } = GetUserDetails();

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [bookData, setBookData] = useState({
    bookname: '',
    author: '',
    description: '',
  });
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const serverOrigin = process.env.REACT_APP_SERVER_ORIGIN;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('bookname', bookData.bookname);
      formData.append('author', bookData.author);
      formData.append('description', bookData.description);

      const response = await axios.post(
        `${serverOrigin}/api/upload-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Image uploaded successfully:', response.data.imageUrl);
      setImageUrl(response.data.imageUrl);
      setBookData({ bookname: '', author: '', description: '' });
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${serverOrigin}/books`);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
      setLoading(false);
    };

    fetchBooks();
  }, []);

  return (
    <div>
      {userDetails && userDetails.username === 'admin' ? (
        <>
          {' '}
          <Header />
          <div className="upload-container">
            {' '}
            <h2>Image Upload</h2>
            <form onSubmit={handleUpload}>
              <input type="file" name="file" onChange={handleFileChange} />
              <input
                type="text"
                name="bookname"
                value={bookData.bookname}
                onChange={handleChange}
                placeholder="Book Name"
              />
              <input
                type="text"
                name="author"
                value={bookData.author}
                onChange={handleChange}
                placeholder="Author"
              />
              <input
                type="text"
                name="description"
                value={bookData.description}
                onChange={handleChange}
                placeholder="Description"
              />
              <button type="submit">Upload</button>
            </form>
          </div>
        </>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
};

export default ImageUpload;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../css/upload.css';
// import Header from './Header';

// const ImageUpload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState('');
//   const [bookData, setBookData] = useState({
//     bookname: '',
//     author: '',
//     description: '',
//   });
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const serverOrigin = process.env.REACT_APP_SERVER_ORIGIN;

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setBookData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleUpload = async (event) => {
//     event.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('file', selectedFile);
//       formData.append('bookname', bookData.bookname);
//       formData.append('author', bookData.author);
//       formData.append('description', bookData.description);

//       const response = await axios.post(
//         `${serverOrigin}/api/upload-image`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       console.log('Image uploaded successfully:', response.data.imageUrl);
//       setImageUrl(response.data.imageUrl);
//       setBookData({ bookname: '', author: '', description: '' });
//       setSelectedFile(null);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchBooks = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${serverOrigin}/books`);
//         setBooks(response.data);
//       } catch (error) {
//         console.error('Error fetching books:', error);
//       }
//       setLoading(false);
//     };

//     fetchBooks();
//   }, []);

//   return (
//     <div>
//       <Header />
//       <div className="upload-container">
//         {' '}
//         <h2>Image Upload</h2>
//         <form onSubmit={handleUpload}>
//           <input type="file" name="file" onChange={handleFileChange} />
//           <input
//             type="text"
//             name="bookname"
//             value={bookData.bookname}
//             onChange={handleChange}
//             placeholder="Book Name"
//           />
//           <input
//             type="text"
//             name="author"
//             value={bookData.author}
//             onChange={handleChange}
//             placeholder="Author"
//           />
//           <input
//             type="text"
//             name="description"
//             value={bookData.description}
//             onChange={handleChange}
//             placeholder="Description"
//           />
//           <button type="submit">Upload</button>
//         </form>
//         {imageUrl && (
//           <div>
//             <h3>Uploaded Image</h3>
//             <img
//               src={imageUrl}
//               alt="Uploaded file"
//               style={{ maxWidth: '100%' }}
//             />
//           </div>
//         )}
//         <h3>Uploaded Books</h3>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div>
//             {books.map((book) => (
//               <div key={book._id}>
//                 <h4>{book.bookname}</h4>
//                 <p>{book.author}</p>
//                 <p>{book.description}</p>
//                 <img
//                   src={book.fileUrl}
//                   alt={book.bookname}
//                   style={{ maxWidth: '100%' }}
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;
