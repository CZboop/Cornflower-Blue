"use client";

import { useState, useEffect } from 'react';
import colourMap from './colours/html_colour_map.json';
import GameScreen from './components/GameScreen';
import WinScreen from './components/WinScreen';
import LostScreen from './components/LostScreen';


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

  return (
    <div className="page-content">
      <h1>Colour Guesser 🎨</h1>
      {
        guessedCorrect ?
          <WinScreen targetColour={targetColour} targetColourRGB={targetColourRGB} handleColourPicker={handleColourPicker} />
          :
          <>
          </>
      }
      {numGuesses < 5 ?
        <>
          <h3>You have {5 - numGuesses} guesses left.</h3>
          <h3>Select the colour with this name from the picker:</h3>
          {
            targetColour ?
              <h2>{targetColour.name}</h2> :
              <></>
          }

          <form action={formAction}>
            <div className="colour-picker">
              <input type="color" id="picker-input" name="picker-input" value={colour} onChange={handleColourPicker} />
            </div>
            <input type="submit"></input>
            {pastEvals.length !== 0 ?
              pastEvals.map((guess, index) => (<div key={`guess-${index}`} className="colour-diffs">
                <div className={`colour-label ${getColourDiffClass(parseInt(guess.r))}`}><h2 >R: {guess.r}</h2></div>
                <div className={`colour-label ${getColourDiffClass(parseInt(guess.g))}`}><h2 >G: {guess.g}</h2></div>
                <div className={`colour-label ${getColourDiffClass(parseInt(guess.b))}`}><h2 >B: {guess.b}</h2></div>
              </div>))
              :
              (<></>)
            }
          </form>
        </>
        : !guessedCorrect ?
          <>
            <p>You ran out of guesses.</p>
            <p>The correct colour for "{targetColour.name}" was:</p>
            <>
              <div className="colour-diffs">
                <h2 className="colour-label">R: {targetColourRGB.r}</h2>
                <h2 className="colour-label">G: {targetColourRGB.g}</h2>
                <h2 className="colour-label">B: {targetColourRGB.b}</h2>
              </div>
              <div className="colour-picker">
                <input type="color" id="picker-input" name="picker-input" value={targetColour.value} onChange={handleColourPicker} disabled={true} />
              </div>
            </>
          </>
          :
          <></>
      }
    </div>

  );
}
