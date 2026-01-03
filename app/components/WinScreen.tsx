import Confetti from 'react-confetti';
import CorrectColour from './CorrectColour';

type Props = {
    targetColour: { name: string, value: string }
    targetColourRGB: { r: string, g: string, b: string }
}

export default function WinScreen({ targetColour, targetColourRGB }: Props) {

    return (
        <div className="page-content">
            <h1>Colour Guesser 🎨</h1>
            <Confetti />
            <h2>Correct!</h2>
            <p>The exact colour for "{targetColour.name}" was:</p>
            <CorrectColour targetColour={targetColour} targetColourRGB={targetColourRGB} />
        </div>
    )
}