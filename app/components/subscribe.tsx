import React, { useState } from 'react';
import { useAlert } from '../context/AlertContext';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const showAlert = useAlert();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Türü belirledik
    e.preventDefault();
    try {
      const response = await fetch('https://esyala-backend-production.up.railway.app/main/subscribe/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.status) {
        showAlert('success', data.messages || 'Abonelik başarılı!');
      } else {
        showAlert('warning', data.messages || 'Bir hata oluştu.');
      }
    } catch {
      showAlert('error', 'Abone olurken bir hata oluştu.');
    }
  };

  return (
    <>
      <div className="holder">
        <form className="newsletter-form form2" method="POST" onSubmit={handleSubmit}>
          <fieldset>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="E-posta Adresinizi Girin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Abone Ol</button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
