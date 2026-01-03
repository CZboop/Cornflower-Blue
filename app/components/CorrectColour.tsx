type Props = {
    targetColour: { name: string, value: string }
    targetColourRGB: { r: string, g: string, b: string }
}


export default function CorrectColour({ targetColour, targetColourRGB }: Props) {
    return (
        <div className="page-content">
            <div className="colour-diffs">
                <h2 className="colour-label">R: {targetColourRGB.r}</h2>
                <h2 className="colour-label">G: {targetColourRGB.g}</h2>
                <h2 className="colour-label">B: {targetColourRGB.b}</h2>
            </div>
            <div className="colour-picker">
                <input type="color" id="picker-input" name="picker-input" value={targetColour.value} disabled={true} />
            </div>
        </div>
    )
}