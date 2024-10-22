import React, { useState } from 'react';
import './styles/contact.css';
import { useWallet } from './context/WalletContext';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const { isWalletConnected } = useWallet();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isWalletConnected) {
      alert('Devi connettere il tuo wallet per inviare il modulo.');
      return;
    }

    const templateParams = {
      name,
      email,
      phone,
      description,
    };

    // Invia l'email
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then((response) => {
        console.log('Email inviata con successo!', response.status, response.text);
        setName('');
        setEmail('');
        setPhone('');
        setDescription('');
      }, (error) => {
        console.error('Errore nell\'invio dell\'email:', error);
      });
  };

  return (
    <div className="contact-form-container">
      <h2 className="form-title">Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name (optional)</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            placeholder="Your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="Your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone number (optional)</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-input"
            placeholder="Your phone number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Inquiry</label>
          <textarea
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            placeholder="Describe your inquiry..."
          />
        </div>
        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
