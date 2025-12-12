"use client";

import { useState } from 'react';



export default function Home() {
  const [colour, setColour] = useState("#ffffffff")

  function handleColourPicker(event: React.ChangeEvent<HTMLInputElement>) {
    setColour(event.target.value)
  }

  const formAction = async (formData: FormData) => {
    let pickerInput = formData.get("picker-input")
    console.log(pickerInput);
  }

  return (
    <div className="page-content">
      <h1>Colour Guesser 🎨</h1>
      <form action={formAction}>
        <div className="colour-picker">
          <input type="color" id="picker-input" name="picker-input" value={colour} onChange={handleColourPicker} />
        </div>
        <input type="submit"></input>
      </form>
    </div>
  );
}
