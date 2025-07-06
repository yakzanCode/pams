import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const whatsappNumber = '+96176717279'; // Your WhatsApp number

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now just simulate submission
    setSubmitted(true);
    // You can add API call or email sending here if you want later
  };

  return (
    <div className="container my-5" style={{ maxWidth: '600px' }}>
      <h1 className="mb-4 text-center">Contact Us</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name *</label>
            <input 
              type="text" 
              className="form-control" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email *</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message *</label>
            <textarea 
              className="form-control" 
              id="message" 
              name="message" 
              rows="5" 
              value={formData.message} 
              onChange={handleChange} 
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Send Message</button>
        </form>
      ) : (
        <div className="alert alert-success text-center" role="alert">
          Thank you for reaching out! We will get back to you soon.
        </div>
      )}

      <hr className="my-5" />

      <div className="text-center">
        <p>Or contact us directly on WhatsApp:</p>
        <a
          href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success"
        >
          <i className="bi bi-whatsapp"></i> Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}

export default Contact;
