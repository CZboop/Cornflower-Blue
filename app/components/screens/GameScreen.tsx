import Title from "../shared/Title";
import ResponsivePhotoshopPicker from "../shared/ColourPicker/ResponsivePhotoshopPicker";
import { ColorResult } from "react-color";

type Props = {
    numGuesses: number
    targetColour: Colour
    formAction: (formData: FormData) => Promise<void>
    colour: string
    setColour: (colour: string) => void
    pastEvals: Array<Evals>
    getColourDiffClass: (colourDiff: number) => string
    showInfo: boolean
    setShowInfo: (showInfo: boolean) => void
    gameMode: string
    setGameMode: (gameMode: string) => void
    bounds: Bounds
}

 /** Main game screen with colour picker and guess feedback */
export default function GameScreen({ numGuesses, targetColour, formAction, colour, setColour, pastEvals, getColourDiffClass, showInfo, setShowInfo, gameMode, setGameMode, bounds }: Readonly<Props>) {

    return (
        <div className="page-content">
            <Title gameMode={gameMode} setGameMode={setGameMode} />
            <h3>Select the colour with this name from the picker:</h3>
            {
                targetColour ?
                    <h2 className="target-colour">{targetColour.name}</h2> :
                    <></>
            }

            <form action={formAction}>
                <div className="colour-picker">
                    <ResponsivePhotoshopPicker key={numGuesses} color={colour} onChange={(c: ColorResult) => setColour(c.hex)} />
                </div>
                <input type="submit"></input>
                <h3>You have <b>{5 - numGuesses}</b> guesses left - {new Array(5).fill(null).map((_, i) => (<span key={`life-${i}`}>{i < 5 - numGuesses ? '❤️' : '🩶'}</span>))}</h3>


                        <h3 className="past-guesses">Past Guesses: <button type="button" className="info-icon" onClick={() => setShowInfo(!showInfo)}>ℹ️</button>
                        </h3>

                        {showInfo && (
                            <div className="info-box">
                                <p>Each number shows the R, G, or B value of the guess. The colours show roughly how far the guess was from being correct across each colour channel.</p>
                                <ul>
                                    <li>🟢 Green: Correct, or close enough (within {bounds.green})</li>
                                    <li>🟠 Orange: Close (within {bounds.orange})</li>
                                    <li>🔴 Red: Far off ({bounds.orange}+)</li>
                                </ul>
                                <p>Click the top ℹ️ icon again to close these details.</p>
                            </div>
                        )}
                        {pastEvals.map((guess: Evals, index) => (
                            <div key={`guess-${index}`} className="guess-row">
                                <div>R: <span className={`colour-label ${getColourDiffClass(guess.r_diff)} w-[7ch] text-center`}>{guess.r_val}</span></div>
                                <div>G: <span className={`colour-label ${getColourDiffClass(guess.g_diff)} w-[7ch] text-center`}>{guess.g_val}</span></div>
                                <div>B: <span className={`colour-label ${getColourDiffClass(guess.b_diff)} w-[7ch] text-center`}>{guess.b_val}</span></div>
                            </div>
                        ))}
                        {new Array(5 - pastEvals.length).fill(null).map((_, index) => (
                            <div key={`guess-${index}`} className="guess-row">
                                <div className="greyed-div">R: <span className="colour-label greyed-guess w-[7ch] text-center">___</span></div>
                                <div className="greyed-div">G: <span className="colour-label greyed-guess w-[7ch] text-center">___</span></div>
                                <div className="greyed-div">B: <span className="colour-label greyed-guess w-[7ch] text-center">___</span></div>
                            </div>
                        ))

                        }
                    
            </form>
        </div>
    )
}