"use client";

import { useState, useEffect } from 'react';
import colourMap from './colours/html_colour_map.json';
import GameScreen from './components/GameScreen';
import WinScreen from './components/WinScreen';
import LostScreen from './components/LostScreen';
import LoseScreen from './components/LoseScreen';


export default function Home() {
  const [colour, setColour] = useState("#ffffff");
  const [targetColourRGB, setTargetColourRGB] = useState({});
  const [targetColour, setTargetColour] = useState(null);
  const [pastEvals, setPastEvals] = useState([]);
  const [numGuesses, setNumGuesses] = useState(0);
  const [bounds, setBounds] = useState({ "green": 25, "orange": 75 });
  const [guessedCorrect, setGuessedCorrect] = useState(false);

  useEffect(() => {
    const randomColour = getRandomColour(colourMap);
    setTargetColour(randomColour);
  }, [])

  function splitCamelCase(text: string): string {
    let splitWords: string[] = text.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return splitWords.join(" ")
  }

  function getRandomColour(colourMap: Record<string, string>) {
    const keys = Object.keys(colourMap);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const randomColour = colourMap[randomKey];
    setTargetColourRGB(hexToRgb(randomColour));
    return { name: splitCamelCase(randomKey), value: randomColour };
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
      let pickedColourRGB = hexToRgb(colour);

      let colourDiffR = Math.abs(targetColourRGB.r - pickedColourRGB.r)
      let colourDiffG = Math.abs(targetColourRGB.g - pickedColourRGB.g)
      let colourDiffB = Math.abs(targetColourRGB.b - pickedColourRGB.b)

      if ([colourDiffR, colourDiffG, colourDiffB].every((diff) => { return diff <= bounds.green })) {
        setGuessedCorrect(true);
      }

      return {
        r: colourDiffR,
        g: colourDiffG,
        b: colourDiffB
      };
    } catch (e: any) {
      console.error(e.message);
    }
  }

  function getColourDiffClass(guessDiff: number) {
    let className;
    if (guessDiff <= bounds.green) {
      className = "bg-green-diff";
    }
    else if (guessDiff <= bounds.orange) {
      className = "bg-orange-diff";
    }
    else {
      className = "bg-red-diff";
    }
    return className;
  }

  const formAction = async (formData: FormData) => {
    let pickerInput = formData.get("picker-input")
    console.log(pickerInput);
    let colourEval = evaluateColours();
    setPastEvals([...pastEvals, { "r": colourEval.r, "g": colourEval.g, "b": colourEval.b }]);
    setNumGuesses(numGuesses + 1);
  }

  // early returns to handle screen rendering w multiple conditions
  if (guessedCorrect) {
    return <WinScreen targetColour={targetColour} targetColourRGB={targetColourRGB} handleColourPicker={handleColourPicker} />
  }

  if (numGuesses < 5) {
    return <GameScreen numGuesses={numGuesses} targetColour={targetColour} formAction={formAction} colour={colour} handleColourPicker={handleColourPicker} pastEvals={pastEvals} getColourDiffClass={getColourDiffClass} />
  }

  return (
    <LoseScreen targetColour={targetColour} targetColourRGB={targetColourRGB} />
  );
}
