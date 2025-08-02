import React, { useState } from "react";
import axios from "axios";

const FormulaireQR = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    cin: "",
    email: "",
    tel: "",
    date_naissance: "",
  });

  const [errors, setErrors] = useState({});
  const [qrImage, setQrImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isQrVisible, setIsQrVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis.";
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis.";
    if (!formData.cin.trim()) newErrors.cin = "Le CIN est requis.";
    if (!formData.email.trim()) newErrors.email = "L'email est requis.";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
      newErrors.email = "Format d'email invalide.";
    if (!formData.date_naissance.trim())
      newErrors.date_naissance = "La date de naissance est requise.";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("https://qr-id-web-5.onrender.com/generate", formData);
      setQrImage(res.data.qrImage);
      setIsQrVisible(true);
    } catch (err) {
      alert("Erreur lors de la génération !");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImprimer = () => {
    if (!qrImage) return;
    const win = window.open();
    win.document.write(`<img src="${qrImage}" style="width:300px;height:300px" />`);
    win.print();
    win.close();
  };

  const handleRetour = () => {
    setIsQrVisible(false);
    setQrImage(null);
    setFormData({
      nom: "",
      prenom: "",
      cin: "",
      email: "",
      tel: "",
      date_naissance: "",
    });
    setErrors({});
  };

  return (
    <>
      <style>{`
/* FormulaireQR.css - Version optimisée */
.container {
  max-width: 600px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  animation: fadeIn 0.8s ease forwards;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.1);
  width: 100%;
  box-sizing: border-box;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-size: clamp(1.5rem, 4vw, 1.75rem);
  color: #4f46e5;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="date"] {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
  box-sizing: border-box;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
input[type="date"]:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 8px rgba(79, 70, 229, 0.3);
}

.error-msg {
  color: #dc2626;
  font-size: 0.8125rem;
  margin-top: 0.25rem;
  font-weight: 600;
  font-style: italic;
}

button {
  width: 100%;
  padding: 0.9375rem;
  background: linear-gradient(90deg, #4f46e5, #9333ea);
  border: none;
  border-radius: 14px;
  color: white;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(147, 51, 234, 0.6);
  transition: all 0.3s ease;
  user-select: none;
}

button:hover:not(:disabled) {
  background: linear-gradient(90deg, #6d28d9, #a855f7);
  transform: scale(1.02);
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.qr-result {
  text-align: center;
  animation: fadeIn 0.8s ease forwards;
  padding: 1rem;
}

.qr-result h3 {
  color: #4f46e5;
  margin-bottom: 1.25rem;
  font-weight: 700;
  font-size: 1.5rem;
}

.qr-image {
  max-width: 100%;
  height: auto;
  margin: 0 auto 1.875rem;
  border-radius: 25px;
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.2);
  background: white;
  padding: 0.75rem;
  display: block;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.btn-group button,
.btn-group a {
  flex: 1 1 7.5rem;
  min-width: 7.5rem;
  padding: 0.875rem 1.25rem;
  font-weight: 700;
  font-size: 1rem;
  border-radius: 14px;
  cursor: pointer;
  text-decoration: none;
  color: white;
  background: linear-gradient(90deg, #4f46e5, #9333ea);
  box-shadow: 0 4px 12px rgba(147, 51, 234, 0.7);
  transition: all 0.3s ease;
  user-select: none;
  border: none;
  text-align: center;
}

.btn-group button:hover,
.btn-group a:hover {
  background: linear-gradient(90deg, #6d28d9, #a855f7);
  transform: scale(1.05);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Mobile */
@media (max-width: 768px) {
  .container {
    padding: 1.5rem;
    border-radius: 15px;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
  }

  .form-grid {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  input[type="text"],
  input[type="email"],
  input[type="tel"],
  input[type="date"] {
    padding: 0.625rem 0.875rem;
    font-size: 0.9375rem;
  }

  button {
    padding: 0.875rem;
    font-size: 1rem;
  }

  .qr-image {
    max-width: 80%;
    margin-bottom: 1.5rem;
  }

  .btn-group {
    flex-direction: column;
    gap: 0.75rem;
  }

  .btn-group button,
  .btn-group a {
    width: 100%;
    flex: none;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 1.25rem;
    border-radius: 12px;
  }

  .qr-image {
    max-width: 100%;
    padding: 0.5rem;
  }

  .btn-group button,
  .btn-group a {
    padding: 0.75rem;
    font-size: 0.9375rem;
  }
}
      `}</style>

      <div className="container">
        {!isQrVisible ? (
          <>
            <h2>Formulaire Utilisateur</h2>
            <div className="form-grid">
              <InputField name="nom" value={formData.nom} onChange={handleChange} error={errors.nom} placeholder="Nom" />
              <InputField name="prenom" value={formData.prenom} onChange={handleChange} error={errors.prenom} placeholder="Prénom" />
              <InputField name="cin" value={formData.cin} onChange={handleChange} error={errors.cin} placeholder="CIN" />
              <InputField name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="Email" />
              <input type="tel" name="tel" placeholder="Téléphone" onChange={handleChange} value={formData.tel} />
              <InputField name="date_naissance" type="date" value={formData.date_naissance} onChange={handleChange} error={errors.date_naissance} />
            </div>
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? "Génération en cours..." : "Confirmer"}
            </button>
          </>
        ) : (
          <div className="qr-result">
            <h3>QR Code Généré ✅</h3>
            <img src={qrImage} alt="QR Code" className="qr-image" />
            <div className="btn-group">
              <button onClick={handleImprimer}>🖨️ Imprimer</button>
              <button onClick={handleRetour}>🏠 Retour</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Champ de formulaire avec erreur si besoin
const InputField = ({ name, type = "text", placeholder, value, onChange, error }) => (
  <div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      aria-describedby={`${name}Error`}
      aria-invalid={!!error}
    />
    {error && (
      <p id={`${name}Error`} className="error-msg">
        {error}
      </p>
    )}
  </div>
);

export default FormulaireQR;
