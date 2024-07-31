"use client"
import { useState } from 'react';

interface VideoFormProps {
  cedula: string;
}

export const VideoForm: React.FC<VideoFormProps> = ({ cedula }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('cedula', cedula);

    try {
      const response = await fetch('/api/uploadVideo', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error uploading file');
      }

      const data = await response.json();
      setSuccess('File uploaded successfully!');
      setError(null);
    } catch (err) {
      setError('Error uploading file. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="video">Upload Video:</label>
          <input type="file" id="video" accept="video/*" onChange={handleFileChange} />
        </div>
        <button type="submit" className="mt-2 p-2 bg-blue-500 text-white">Upload</button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};


