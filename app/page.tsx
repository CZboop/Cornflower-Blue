"use client";

import { useState } from 'react';



export default function Home() {
  const [colour, setColour] = useState("#ffffffff")

  function handleColourPicker(event: React.ChangeEvent<HTMLInputElement>) {
    setColour(event.target.value)
  }

  return (
    <div className="page-content">
      <h1>Colour Guesser 🎨</h1>
      <div className="colour-picker">
        <input type="color" id="picker-input" name="picker-input" value={colour} onChange={handleColourPicker} />
      </div>
      {/* <input type="submit">Submit</input> */}
    </div>
  );
}
