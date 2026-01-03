import CorrectColour from "../shared/CorrectColour";
import Title from "../shared/Title";

type Props = {
    targetColour: { name: string, value: string }
    targetColourRGB: { r: string, g: string, b: string }
}

export default function LoseScreen({ targetColour, targetColourRGB }: Props) {

    return (
        <div className="page-content">
            <Title />
            <p>You ran out of guesses.</p>
            <p>The correct colour for "{targetColour.name}" was:</p>
            <CorrectColour targetColour={targetColour} targetColourRGB={targetColourRGB} />
        </div>
    )
}