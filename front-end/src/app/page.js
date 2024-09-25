"use client";
import { useState } from "react";
import Button from "./components/button";
import Link from 'next/link'

export default function Home() {
  async function chats() {
    const [number, setNumber] = useState()
    const response = await fetch('http://localhost:4000/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Cotent-Type': 'application/json'
      },
      body: JSON.stringify()
    });
    if (response != 0) {
      <Link href="/chats">
      </Link>
    }
    else {
      console.log("no existe")
    }}

    return (
      <div>
        <form>
          <label>Ingrese su número de teléfono:</label>
          <input type="number" onChange={(event) => setNumber(event.target.value)} />
          <Button text="Iniciar sesión" onClick={chats} />
        </form>
      </div>
    );
  }