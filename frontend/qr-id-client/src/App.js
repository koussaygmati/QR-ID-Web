import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormulaireQR from "./components/FormulaireQR";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="main-container">
              <div className="form-section">
                <FormulaireQR />
              </div>
              <div className="info-section">
                <h1 className="animated-title">QR-ID Web</h1>
                <p className="animated-slogan">
                  Générez votre carte d'identité numérique facilement.
                </p>
                <p className="animated-description">
                  Notre plateforme vous permet de créer rapidement un QR code unique associé à toutes vos informations personnelles.
                  Utilisez-le pour simplifier vos interactions et partager vos données en toute sécurité.
                </p>
                <footer>&copy; 2025 QR-ID</footer>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
