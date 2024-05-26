import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [books, setBooks] = useState([]);

  const serverOrigin = process.env.REACT_APP_SERVER_ORIGIN;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', 'My Book Title');
      formData.append('author', 'My Book Author');

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
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${serverOrigin}/books`);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Image Upload</h2>
      <form onSubmit={handleUpload}>
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {imageUrl && (
        <div>
          <h3>Uploaded Image</h3>
          <img
            src={imageUrl}
            alt="Uploaded file"
            style={{ maxWidth: '100%' }}
          />
        </div>
      )}
      <h3>Uploaded Books</h3>
      <div>
        {books.map((book) => (
          <div key={book._id}>
            <h4>{book.title}</h4>
            <p>{book.author}</p>
            <img
              src={book.fileUrl}
              alt={book.title}
              style={{ maxWidth: '100%' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
