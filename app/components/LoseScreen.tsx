import CorrectColour from "./CorrectColour";

type Props = {
    targetColour: { name: string, value: string }
    targetColourRGB: { r: string, g: string, b: string }
}

export default function LoseScreen({ targetColour, targetColourRGB }: Props) {

    return (
        <>
            <p>You ran out of guesses.</p>
            <p>The correct colour for "{targetColour.name}" was:</p>
            <CorrectColour targetColour={targetColour} targetColourRGB={targetColourRGB} />
        </>
    )
}