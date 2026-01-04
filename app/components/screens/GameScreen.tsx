import Title from "../shared/Title";
import { PhotoshopPicker } from 'react-color';

type Colour = {
    r: string
    g: string
    b: string
}

type Props = {
    numGuesses: number
    targetColour: { name: string, value: string }
    formAction: () => void
    colour: string
    setColour: () => void
    pastEvals: Array<Colour>
    getColourDiffClass: (arg0: number) => string
}

export default function GameScreen({ numGuesses, targetColour, formAction, colour, setColour, pastEvals, getColourDiffClass }: Props) {

    return (
        <div className="page-content">
            <Title />
            <h3>Select the colour with this name from the picker:</h3>
            {
                targetColour ?
                    <h2 className="target-colour">{targetColour.name}</h2> :
                    <></>
            }
            <h3>You have <b>{5 - numGuesses}</b> guesses left - {Array(5).fill(null).map((_, i) => (<span key={i}>{i < 5 - numGuesses ? '❤️' : '🩶'}</span>))}</h3>

            <form action={formAction}>
                <div className="colour-picker">
                    <PhotoshopPicker key={numGuesses} color={colour} onChange={(c) => setColour(c.hex)}/>
                </div>
                <input type="submit" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"></input>
                {pastEvals.length > 0 ?
                    <>
                    <h3 className="past-guesses">Past Guesses:</h3>
                    {pastEvals.map((guess, index) => (<div key={`guess-${index}`} className="colour-diffs">
                        <div className={`colour-label ${getColourDiffClass(parseInt(guess.r))}`}><h2 >R: {guess.r}</h2></div>
                        <div className={`colour-label ${getColourDiffClass(parseInt(guess.g))}`}><h2 >G: {guess.g}</h2></div>
                        <div className={`colour-label ${getColourDiffClass(parseInt(guess.b))}`}><h2 >B: {guess.b}</h2></div>
                    </div>))}
                    </>
                    :
                    (<></>)
                }
            </form>
        </div>
    )
}