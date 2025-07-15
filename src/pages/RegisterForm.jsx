import React, { useState } from 'react';

const RegisterForm = () => {
  const [idImage, setIdImage] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('idImage', idImage);
    formData.append('userPhoto', userPhoto);
    alert('Submitted registration form');
  };

  return (
    <div>
      <h2>Register</h2>
      <p>Upload Aadhaar / Passport / DL (front or back):</p>
      <input type="file" accept="image/*" onChange={e => setIdImage(e.target.files[0])} />

      <p>Upload Your Photo:</p>
      <input type="file" accept="image/*" onChange={e => setUserPhoto(e.target.files[0])} />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default RegisterForm;
