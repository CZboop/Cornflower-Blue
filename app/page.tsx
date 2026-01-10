"use client";

import { useState, useEffect } from 'react';
import colourMap from './colours/html_colour_map.json';
import GameScreen from './components/screens/GameScreen';
import EndScreen from './components/screens/EndScreen';


// Functions

/** Splits camel case into words (for colour names) */
function splitCamelCase(text: string): string {
  let splitWords: string[] = text.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  return splitWords.join(" ")
}

/** Converts a hex colour string to RGB values */
function hexToRgb(hex: string): ColourRGB {
  // slice if alpha, will have two extra digits
  hex = hex.slice(0, 7);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex colour: ${hex}, could not convert to RGB`);
  }
  return {
    r: Number.parseInt(result[1], 16),
    g: Number.parseInt(result[2], 16),
    b: Number.parseInt(result[3], 16)
  };
}

// Main page component
export default function Home() {
  const bounds = { "green": 25, "orange": 75 };

  const [colour, setColour] = useState("#ffffff");
  const [targetColourRGB, setTargetColourRGB] = useState<ColourRGB | null>(null);
  const [targetColour, setTargetColour] = useState<Colour | null>(null);
  const [pastEvals, setPastEvals] = useState<Evals[]>([]);
  const [numGuesses, setNumGuesses] = useState(0);
  const [guessedCorrect, setGuessedCorrect] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [gameMode, setGameMode] = useState<string | null>(null);

  /** On-load useeffect w no dependency */
  useEffect(() => {
    const savedMode = localStorage.getItem('gameMode') || 'daily';
    setGameMode(savedMode);
  }, []);

  /** Game mode switching handler - mainly to store daily mode state */
  useEffect(() => {
    if (gameMode === null) return;
    const randomColour = getColour(colourMap, "daily");
    setTargetColour(randomColour);
    // store game mode in local storage so can refresh e.g. if playing random and want different colours
    localStorage.setItem('gameMode', gameMode);
    if (gameMode === "daily") {
      // switching to daily, restore saved state if from today
      const saved = localStorage.getItem('dailyGameState');
      if (saved) {
        const { date, numGuesses: savedGuesses, pastEvals: savedEvals, guessedCorrect: savedCorrect } = JSON.parse(saved);
        const today = new Date().toISOString().split('T')[0];
        if (date === today) {
          setNumGuesses(savedGuesses);
          setPastEvals(savedEvals);
          setGuessedCorrect(savedCorrect);
          return; // don't reset state
        }
      }
    }
    else {
      // switching to random/from daily, save daily, start random fresh
      // save current daily state to local storage before switching
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('dailyGameState', JSON.stringify({
        date: today,
        numGuesses,
        pastEvals,
        guessedCorrect
      }));

      // reset state for random mode
      setPastEvals([]);
      setNumGuesses(0);
      setGuessedCorrect(false);

      const randomColour = getColour(colourMap, "random");
      setTargetColour(randomColour);
    }
  }, [gameMode])

  /** Store date in localstorage when game complete, for daily play */
  function endGame() {
    // update dailystate
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('dailyGameState', JSON.stringify({
      date: today,
      numGuesses,
      pastEvals,
      guessedCorrect
    }));
  }

  /** Clears game state, selects new colour if in random mode */
  function resetGame() {
    setPastEvals([]);
    setNumGuesses(0);
    setGuessedCorrect(false);
    setColour("#ffffff");

    // new colour if random mode
    if (gameMode === "random") {
      const newColour = getColour(colourMap, "random");
      setTargetColour(newColour);
    }
    // otherwise don't reset
  }

  /** Sets target colour, using date hash if daily, otherwise random */
  function getColour(colourMap: Record<string, string>, mode: string) {
    if (mode === "daily") {
      const today = new Date().toISOString().split('T')[0] // format = "2026-01-03"

      // hash date string to get consistent random index
      let hash = 0
      for (let i = 0; i < today.length; i++) {
        hash = (hash * 31) + (today.codePointAt(i) ?? 0)
        hash = Math.trunc(hash)
      }

      const keys = Object.keys(colourMap)
      const index = Math.abs(hash) % keys.length
      const hashKey = keys[index]

      const randomColour = colourMap[hashKey];
      setTargetColourRGB(hexToRgb(randomColour));
      return { name: splitCamelCase(hashKey), value: randomColour };
    } else {
      const keys = Object.keys(colourMap);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      const randomColour = colourMap[randomKey];
      setTargetColourRGB(hexToRgb(randomColour));
      return { name: splitCamelCase(randomKey), value: randomColour };
    }
  }

  /** Gets difference in target vs selected colour across each R, G, B */
  function evaluateColours() {
    // early return if null nothing to evaluate
    if (!targetColourRGB) return;
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
        r_val: pickedColourRGB.r,
        g_val: pickedColourRGB.g,
        b_val: pickedColourRGB.b,
        r_diff: colourDiffR,
        g_diff: colourDiffG,
        b_diff: colourDiffB
      };
    } catch (e: any) {
      console.error(e.message);
    }
  }

  /** Uses colour difference value to return a class name for styling */
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

  /** Handles submitting a guess, evaluates it, updates past guesses, increments guess counter */
  const formAction = async (formData: FormData) => {
    let pickerInput = formData.get("picker-input")
    let colourEval = evaluateColours();
    if (!colourEval) { return; }
    setPastEvals([...pastEvals, { "r_diff": colourEval.r_diff, "g_diff": colourEval.g_diff, "b_diff": colourEval.b_diff, "r_val": colourEval.r_val, "g_val": colourEval.g_val, "b_val": colourEval.b_val }]);
    setNumGuesses(numGuesses + 1);
  }

  // Early returns to handle screen rendering w multiple conditions:

  // Missing state, return loading
  if (gameMode === null || targetColour === null || targetColourRGB === null) {
    return <div>Loading...</div>;
  }
  // End game if turn limit reached or guessed correct
  if (guessedCorrect || numGuesses >= 5) {
    endGame();
    return <EndScreen targetColour={targetColour} targetColourRGB={targetColourRGB} gameMode={gameMode} setGameMode={setGameMode} resetGame={resetGame} guessedCorrect={guessedCorrect} />
  }
  // Play if still turns left
  if (numGuesses < 5) {
    return <GameScreen numGuesses={numGuesses} targetColour={targetColour} formAction={formAction} colour={colour} setColour={setColour} pastEvals={pastEvals} getColourDiffClass={getColourDiffClass} showInfo={showInfo} setShowInfo={setShowInfo} gameMode={gameMode} setGameMode={setGameMode} bounds={bounds} />
  }

}
