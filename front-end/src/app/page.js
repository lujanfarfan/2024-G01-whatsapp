"use client";
import { useState } from "react";
import Button from "./components/button";

export default function Home() {
  return (
    <div>
      <form>
        <label>Ingrese su número de teléfono:</label>
        <input type="number" value={phoneNumber}/>
        <Button text="Iniciar sesión" type="submit" />
      </form>
    </div>
  );
}