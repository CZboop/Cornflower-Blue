import { PhotoshopPicker } from 'react-color';
import ResponsivePhotoshopPicker from './ColourPicker/ResponsivePhotoshopPicker';

type Props = {
    targetColour: Colour
    targetColourRGB: ColourRGB
}

/** Disabled colour picker to display exact correct colour on end of game */
export default function CorrectColour({ targetColour, targetColourRGB }: Readonly<Props>) {
    return (
        <div className="page-content">
            <div className="colour-diffs">
                <h2 className="colour-label">R: {targetColourRGB.r}</h2>
                <h2 className="colour-label">G: {targetColourRGB.g}</h2>
                <h2 className="colour-label">B: {targetColourRGB.b}</h2>
            </div>
            <div className="colour-picker">
                <ResponsivePhotoshopPicker color={targetColour.value} />
            </div>
        </div>
    )
}