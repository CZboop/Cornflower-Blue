import Image from "next/image";

export default function Home() {
  return (
    <div className="page-content">
      <h1>Colour Guesser 🎨</h1>
      <div className="colour-picker">
        <input type="color" id="picker-input" name="picker-input" value="#ffffffff" />
      </div>
    </div>
  );
}
