import Title from "../shared/Title"

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
    handleColourPicker: () => void
    pastEvals: Array<Colour>
    getColourDiffClass: (arg0: number) => string
}

export default function GameScreen({ numGuesses, targetColour, formAction, colour, handleColourPicker, pastEvals, getColourDiffClass }: Props) {

    return (
        <div className="page-content">
            <Title />
            <h3>Select the colour with this name from the picker:</h3>
            {
                targetColour ?
                    <h2>{targetColour.name}</h2> :
                    <></>
            }
            <h3>You have {5 - numGuesses} guesses left.</h3>

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
        </div>
    )
}