"use client";
import { useState } from "react";
import Button from "./components/button";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleInputChange = (event) => {
    setPhoneNumber(event.target.value);
    setError("");
    setIsValid(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (!response.ok) {
        throw new Error('Error');
      }
      const data = await response.json();
      if (data.exists) {
        const loginResponse = await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phoneNumber }),
        });

        if (!loginResponse.ok) {
          console.log('Error en el inicio de sesión');
        }

        const loginData = await loginResponse.json();
        setIsLoggedIn(true);

      } else {
        console.log("El número de teléfono no está registrado.");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="phone">Ingrese su número de teléfono:</label>
        <input
          type="number"
          value={phoneNumber}
          onChange={handleInputChange}
        />
        <Button text="Iniciar sesión" type="submit" />
      </form>
    </div>
  );
}