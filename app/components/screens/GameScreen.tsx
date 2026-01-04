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

            <form action={formAction}>
                <div className="colour-picker">
                    <PhotoshopPicker key={numGuesses} color={colour} onChange={(c) => setColour(c.hex)} />
                </div>
                <input type="submit"></input>
                <h3>You have <b>{5 - numGuesses}</b> guesses left - {Array(5).fill(null).map((_, i) => (<span key={i}>{i < 5 - numGuesses ? '❤️' : '🩶'}</span>))}</h3>
                {pastEvals.length > 0 ?
                    <>
                        <h3 className="past-guesses">Past Guesses:</h3>
                        {pastEvals.map((guess, index) => (
                            <div key={`guess-${index}`} className="guess-row">
                                <span className={`colour-label ${getColourDiffClass(parseInt(guess.r))}`}>R: {guess.r}</span>
                                <span className={`colour-label ${getColourDiffClass(parseInt(guess.g))}`}>G: {guess.g}</span>
                                <span className={`colour-label ${getColourDiffClass(parseInt(guess.b))}`}>B: {guess.b}</span>
                            </div>
                        ))}
                    </>
                    :
                    (<></>)
                }
            </form>
        </div>
    )
}