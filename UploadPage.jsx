import React, { useState } from 'react';
import './UploadPage.css';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState("aadhar");
  const [ocrResult, setOcrResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setOcrResult(null);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("docType", docType);

    try {
      const res = await fetch("http://localhost:8080/api/upload", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      try {
        const json = JSON.parse(text);
        setOcrResult(json);
      } catch {
        setError(text);
      }
    } catch (e) {
      setError("Upload failed: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (error) return <p className="error">{error}</p>;
    if (!ocrResult) return null;

    return (
      <div className="ocr-result">
        <h3>OCR Result</h3>
        <p><strong>Document Type:</strong> {ocrResult.docType}</p>
        <p><strong>First Name:</strong> {ocrResult.firstName}</p>
        <p><strong>Last Name:</strong> {ocrResult.lastName}</p>
        <p><strong>Gender:</strong> {ocrResult.gender}</p>
        <p><strong>Date of Birth:</strong> {ocrResult.dob || "N/A"}</p>
        <p><strong>Expiry Date:</strong> {ocrResult.expiryDate || "N/A"}</p>
        <p><strong>Nationality:</strong> {ocrResult.nationality}</p>
        <p><strong>Country:</strong> {ocrResult.country}</p>
        <p><strong>Document Number:</strong> 
          {ocrResult.aadharNumber || ocrResult.passportNumber || ocrResult.dlNumber || "N/A"}
        </p>
      </div>
    );
  };

  return (
    <div className="upload-container">
      <h2>Upload Document for OCR</h2>

      <div className="dropdown-section">
        <label>Select Document Type:</label>
        <select value={docType} onChange={(e) => setDocType(e.target.value)}>
          <option value="aadhar">Aadhar</option>
          <option value="passport">Passport</option>
          <option value="rsa">RSA (South Africa ID)</option>
        </select>
      </div>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Processing..." : "Upload & Extract"}
      </button>

      {renderResult()}
    </div>
  );
}

export default UploadPage;
