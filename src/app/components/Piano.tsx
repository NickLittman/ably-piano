// build a react component that accepts props and returns a keyboard element with keys highlighted based on the props. Each key element should be referenceable by an id such as C4, F#3, etc. The keyboard should be able to be rendered in any orientation, and should be able to be rendered with any number of octaves.

import { useEffect, useState } from "react";
import "../../../globals.css";

type NoteColors = {
  [note: string]: string;
};

const noteColors: NoteColors = {
  C1: "#FF0000", // red
  "C#1": "#FF4000",
  D1: "#FF8000",
  "D#1": "#FFBF00",
  E1: "#FFFF00", // yellow
  "E#1": "#BFFF00",
  F1: "#80FF00",
  "F#1": "#40FF00",
  G1: "#00FF00", // green
  "G#1": "#00FF40",
  A1: "#00FF80",
  "A#1": "#00FFBF",
  B1: "#00FFFF", // blue
  C2: "#0080FF",
  "C#2": "#0040FF",
  D2: "#0000FF", // indigo
  "D#2": "#4000FF",
  E2: "#8000FF",
  "E#2": "#BF00FF",
  F2: "#FF00FF", // violet
  "F#2": "#FF00BF",
  G2: "#FF0080",
  "G#2": "#FF0040",
  A2: "#FF0000", // back to red
  "A#2": "#FF4000",
  B2: "#FF8000",
  C3: "#FFBF00",
  "C#3": "#FFFF00",
  D3: "#BFFF00",
  "D#3": "#80FF00",
  E3: "#40FF00",
  "E#3": "#00FF00",
  F3: "#00FF40",
  "F#3": "#00FF80",
  G3: "#00FFBF",
  "G#3": "#00FFFF",
  A3: "#0080FF",
  "A#3": "#0040FF",
  B3: "#0000FF",
  C4: "#4000FF",
  "C#4": "#8000FF",
  D4: "#BF00FF",
  "D#4": "#FF00FF",
  E4: "#FF00BF",
  "E#4": "#FF0080",
  F4: "#FF0040",
  "F#4": "#FF0000",
  G4: "#FF4000",
  "G#4": "#FF8000",
  A4: "#FFBF00",
  "A#4": "#FFFF00",
  B4: "#BFFF00",
  C5: "#80FF00",
  "C#5": "#40FF00",
  D5: "#00FF00",
  "D#5": "#00FF40",
  E5: "#00FF80",
  F5: "#00FFBF",
  "F#5": "#00FFFF",
  G5: "#0080FF",
  "G#5": "#0040FF",
  A5: "#0000FF",
  "A#5": "#4000FF",
  B5: "#8000FF",
  C6: "#BF00FF",
  "C#6": "#FF00FF",
  D6: "#FF00BF",
  "D#6": "#FF0080",
  E6: "#FF0040",
  F6: "#FF0000",
  "F#6": "#FF4000",
  G6: "#BB8340",
  "G#6": "#BA813D",
  A6: "#B97E3A",
  "A#6": "#B87B37",
  B6: "#B77934",
  C7: "#B67632",
  "C#7": "#B5732F",
  D7: "#B4702C",
  "D#7": "#B36D29",
  E7: "#B26B26",
  F7: "#B16824",
  "F#7": "#B06521",
  G7: "#AF621E",
  "G#7": "#AE5F1B",
  A7: "#AD5D19",
  "A#7": "#AC5A16",
  B7: "#AB5713",
};

export default function Piano(props: { state: Map<string, boolean> }) {
  const [keyState, setKeyState] = useState(props.state);
  // console.log(keyState);
  const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const keys = [];

  useEffect(() => {}, [props.state]);

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < notes.length; j++) {
      keys.push(notes[j] + (i + 1));
    }
  }
  return (
    <div className="grid grid-cols-12 gap-4">
      {keys.map((key) => (
        <div
          className={"col-span-1 bg-gray-200 p-4 border"}
          key={key}
          id={key}
          style={{
            backgroundColor:
              keyState.get(key) === true ? noteColors[key] : "white",
          }}
        >
          {/* {key} */}
        </div>
      ))}
    </div>
  );
}
