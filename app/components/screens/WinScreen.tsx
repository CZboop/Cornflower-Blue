import Confetti from 'react-confetti';
import CorrectColour from '../shared/CorrectColour';
import Title from '../shared/Title';

type Props = {
    targetColour: { name: string, value: string }
    targetColourRGB: { r: string, g: string, b: string }
    gameMode: string
    setGameMode: () => void
}

export default function WinScreen({ targetColour, targetColourRGB, gameMode, setGameMode }: Props) {

    return (
        <div className="page-content">
            <Title gameMode={gameMode} setGameMode={setGameMode} />
            <Confetti />
            <h2>Correct!</h2>
            <p>The exact colour for "{targetColour.name}" was:</p>
            <CorrectColour targetColour={targetColour} targetColourRGB={targetColourRGB} />
        </div>
    )
}