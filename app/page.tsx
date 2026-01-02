"use client";

import { useState } from 'react';
import colourMap from './colours/html_colour_map.json';

// TODO:
// - label channel when show difference in r/g/b
// - max number of guesses


export default function Home() {
  const [colour, setColour] = useState("#ffffff");
  const [targetColour, setTargetColour] = useState(() => getRandomColour(colourMap));
  const [colourEvalR, setColourEvalR] = useState("");
  const [colourEvalG, setColourEvalG] = useState("");
  const [colourEvalB, setColourEvalB] = useState("");

  function splitCamelCase(text: string): string {
    let splitWords: string[] = text.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return splitWords.join(" ")
  }

  function getRandomColour(colourMap: Record<string, string>) {
    const keys = Object.keys(colourMap);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return { name: splitCamelCase(randomKey), value: colourMap[randomKey] };
  }


  function handleColourPicker(event: React.ChangeEvent<HTMLInputElement>) {
    setColour(event.target.value)
  }

  function hexToRgb(hex: string) {
    // slice if alpha, will have two extra digits
    hex = hex.slice(0, 7);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) {
      throw new Error(`Invalid hex colour: ${hex}, could not convert to RGB`);
    }
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
  }

  function evaluateColours() {
    // get colour differences in RGB and show
    try {
      let targetColourRGB = hexToRgb(targetColour.value);
      let pickedColourRGB = hexToRgb(colour);

      let colourDiffR = Math.abs(targetColourRGB.r - pickedColourRGB.r)
      let colourDiffG = Math.abs(targetColourRGB.g - pickedColourRGB.g)
      let colourDiffB = Math.abs(targetColourRGB.b - pickedColourRGB.b)

      return {
        r: colourDiffR,
        g: colourDiffG,
        b: colourDiffB
      };
    } catch (e: any) {
      console.error(e.message);
    }
  }

  const formAction = async (formData: FormData) => {
    let pickerInput = formData.get("picker-input")
    console.log(pickerInput);
    let colourEval = evaluateColours();
    setColourEvalR(colourEval.r);
    setColourEvalG(colourEval.g);
    setColourEvalB(colourEval.b);
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
        {/* TODO: don't show until submitted */}
        {/* TODO: stack past guesses? */}
        {/* TODO: define how close to be correct, orange, red? test with some colours and see if feels close enough */}
        <div className="colour-diffs">
          <h2>R: {colourEvalR}</h2>
          <h2>G: {colourEvalG}</h2>
          <h2>B: {colourEvalB}</h2>
        </div>
      </form>
    </div>
  );
}
