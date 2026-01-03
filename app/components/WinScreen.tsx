import Confetti from 'react-confetti';

type Props = {
    targetColour: { name: string, value: string }
    targetColourRGB: { r: string, g: string, b: string }
    handleColourPicker: () => void
}

export default function WinScreen({ targetColour, targetColourRGB, handleColourPicker }: Props) {

    return (
        <>
            <h1>Colour Guesser 🎨</h1>
            <Confetti />
            <h2>Correct!</h2>
            <p>The exact colour for "{targetColour.name}" was:</p>
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
    )
}