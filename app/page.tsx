"use client";

import { useState } from 'react';
import colourMap from './colours/html_colour_map.json';

// console.log(colourMap);


export default function Home() {
  const [colour, setColour] = useState("#ffffffff")
  const [targetColour, setTargetColour] = useState(() => getRandomColour(colourMap))

  function getRandomColour(colourMap: Record<string, string>) {
    const keys = Object.keys(colourMap);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return { name: randomKey, value: colourMap[randomKey] };
  }

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
      <h3>Select the colour with this name from the picker:</h3>
      <h2>{targetColour.name}</h2>
      {/* TODO: useeffect or something to prevent this changing on load */}
      <form action={formAction}>
        <div className="colour-picker">
          <input type="color" id="picker-input" name="picker-input" value={colour} onChange={handleColourPicker} />
        </div>
        <input type="submit"></input>
      </form>
    </div>
  );
}
