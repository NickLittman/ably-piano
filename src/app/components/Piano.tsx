// build a react component that accepts props and returns a keyboard element with keys highlighted based on the props. Each key element should be referenceable by an id such as C4, F#3, etc. The keyboard should be able to be rendered in any orientation, and should be able to be rendered with any number of octaves.

import { useEffect, useState, useCallback, useRef } from "react";
import { Flex, Box } from "@react-three/flex";
import "../../../globals.css";

type NoteColors = {
  [key: string]: {
    h: number;
    s: number;
    l: number;
  };
};

type RenderingInfo = {
  note: string;
  velocity: number;
  created: number;
};

// const noteColors: NoteColors = {
//   C1: "#FF0000", // red
//   "C#1": "#FF4000",
//   D1: "#FF8000",
//   "D#1": "#FFBF00",
//   E1: "#FFFF00", // yellow
//   "E#1": "#BFFF00",
//   F1: "#80FF00",
//   "F#1": "#40FF00",
//   G1: "#00FF00", // green
//   "G#1": "#00FF40",
//   A1: "#00FF80",
//   "A#1": "#00FFBF",
//   B1: "#00FFFF", // blue
//   C2: "#0080FF",
//   "C#2": "#0040FF",
//   D2: "#0000FF", // indigo
//   "D#2": "#4000FF",
//   E2: "#8000FF",
//   "E#2": "#BF00FF",
//   F2: "#FF00FF", // violet
//   "F#2": "#FF00BF",
//   G2: "#FF0080",
//   "G#2": "#FF0040",
//   A2: "#FF0000", // back to red
//   "A#2": "#FF4000",
//   B2: "#FF8000",
//   C3: "#FFBF00",
//   "C#3": "#FFFF00",
//   D3: "#BFFF00",
//   "D#3": "#80FF00",
//   E3: "#40FF00",
//   "E#3": "#00FF00",
//   F3: "#00FF40",
//   "F#3": "#00FF80",
//   G3: "#00FFBF",
//   "G#3": "#00FFFF",
//   A3: "#0080FF",
//   "A#3": "#0040FF",
//   B3: "#0000FF",
//   C4: "#4000FF",
//   "C#4": "#8000FF",
//   D4: "#BF00FF",
//   "D#4": "#FF00FF",
//   E4: "#FF00BF",
//   "E#4": "#FF0080",
//   F4: "#FF0040",
//   "F#4": "#FF0000",
//   G4: "#FF4000",
//   "G#4": "#FF8000",
//   A4: "#FFBF00",
//   "A#4": "#FFFF00",
//   B4: "#BFFF00",
//   C5: "#80FF00",
//   "C#5": "#40FF00",
//   D5: "#00FF00",
//   "D#5": "#00FF40",
//   E5: "#00FF80",
//   F5: "#00FFBF",
//   "F#5": "#00FFFF",
//   G5: "#0080FF",
//   "G#5": "#0040FF",
//   A5: "#0000FF",
//   "A#5": "#4000FF",
//   B5: "#8000FF",
//   C6: "#BF00FF",
//   "C#6": "#FF00FF",
//   D6: "#FF00BF",
//   "D#6": "#FF0080",
//   E6: "#FF0040",
//   F6: "#FF0000",
//   "F#6": "#FF4000",
//   G6: "#BB8340",
//   "G#6": "#BA813D",
//   A6: "#B97E3A",
//   "A#6": "#B87B37",
//   B6: "#B77934",
//   C7: "#B67632",
//   "C#7": "#B5732F",
//   D7: "#B4702C",
//   "D#7": "#B36D29",
//   E7: "#B26B26",
//   F7: "#B16824",
//   "F#7": "#B06521",
//   G7: "#AF621E",
//   "G#7": "#AE5F1B",
//   A7: "#AD5D19",
//   "A#7": "#AC5A16",
//   B7: "#AB5713",
// };

const noteColors: NoteColors = {
  C0: { h: 0, s: 100, l: 50 }, // red
  "C#0": { h: 15, s: 100, l: 50 },
  D0: { h: 30, s: 100, l: 50 },
  "D#0": { h: 45, s: 100, l: 50 },
  E0: { h: 60, s: 100, l: 50 }, // yellow
  "E#0": { h: 75, s: 100, l: 50 },
  F0: { h: 90, s: 100, l: 50 },
  "F#0": { h: 105, s: 100, l: 50 },
  G0: { h: 120, s: 100, l: 50 }, // green
  "G#0": { h: 135, s: 100, l: 50 },
  A0: { h: 150, s: 100, l: 50 },
  "A#0": { h: 165, s: 100, l: 50 },
  B0: { h: 180, s: 100, l: 50 },
  C1: { h: 195, s: 100, l: 50 }, // red
  "C#1": { h: 210, s: 100, l: 50 },
  D1: { h: 225, s: 100, l: 50 },
  "D#1": { h: 240, s: 100, l: 50 },
  E1: { h: 255, s: 100, l: 50 }, // yellow
  "E#1": { h: 270, s: 100, l: 50 },
  F1: { h: 285, s: 100, l: 50 },
  "F#1": { h: 300, s: 100, l: 50 },
  G1: { h: 315, s: 100, l: 50 }, // green
  "G#1": { h: 330, s: 100, l: 50 },
  A1: { h: 345, s: 100, l: 50 },
  "A#1": { h: 360, s: 100, l: 50 },
  B1: { h: 345, s: 100, l: 50 }, // blue
  C2: { h: 315, s: 100, l: 50 },
  "C#2": { h: 300, s: 100, l: 50 },
  D2: { h: 285, s: 100, l: 50 }, // indigo
  "D#2": { h: 270, s: 100, l: 50 },
  E2: { h: 255, s: 100, l: 50 },
  "E#2": { h: 240, s: 100, l: 50 },
  F2: { h: 225, s: 100, l: 50 }, // violet
  "F#2": { h: 210, s: 100, l: 50 },
  G2: { h: 195, s: 100, l: 50 },
  "G#2": { h: 180, s: 100, l: 50 },
  A2: { h: 165, s: 100, l: 50 }, // back to red
  "A#2": { h: 150, s: 100, l: 50 },
  B2: { h: 135, s: 100, l: 50 },
  C3: { h: 120, s: 100, l: 50 },
  "C#3": { h: 105, s: 100, l: 50 },
  D3: { h: 90, s: 100, l: 50 },
  "D#3": { h: 75, s: 100, l: 50 },
  E3: { h: 60, s: 100, l: 50 },
  "E#3": { h: 45, s: 100, l: 50 },
  F3: { h: 30, s: 100, l: 50 },
  "F#3": { h: 15, s: 100, l: 50 },
  G3: { h: 0, s: 100, l: 50 },
  "G#3": { h: 15, s: 100, l: 50 },
  A3: { h: 30, s: 100, l: 50 },
  "A#3": { h: 45, s: 100, l: 50 },
  B3: { h: 60, s: 100, l: 50 },
  C4: { h: 75, s: 100, l: 50 },
  "C#4": { h: 90, s: 100, l: 50 },
  D4: { h: 105, s: 100, l: 50 },
  "D#4": { h: 120, s: 100, l: 50 },
  E4: { h: 135, s: 100, l: 50 },
  "E#4": { h: 150, s: 100, l: 50 },
  F4: { h: 165, s: 100, l: 50 },
  "F#4": { h: 180, s: 100, l: 50 },
  G4: { h: 195, s: 100, l: 50 },
  "G#4": { h: 210, s: 100, l: 50 },
  A4: { h: 225, s: 100, l: 50 },
  "A#4": { h: 240, s: 100, l: 50 },
  B4: { h: 255, s: 100, l: 50 },
  C5: { h: 270, s: 100, l: 50 },
  "C#5": { h: 285, s: 100, l: 50 },
  D5: { h: 300, s: 100, l: 50 },
  "D#5": { h: 315, s: 100, l: 50 },
  E5: { h: 330, s: 100, l: 50 },
  F5: { h: 345, s: 100, l: 50 },
  "F#5": { h: 360, s: 100, l: 50 },
  G5: { h: 345, s: 100, l: 50 },
  "G#5": { h: 315, s: 100, l: 50 },
  A5: { h: 300, s: 100, l: 50 },
  "A#5": { h: 285, s: 100, l: 50 },
  B5: { h: 270, s: 100, l: 50 },
  C6: { h: 255, s: 100, l: 50 },
  "C#6": { h: 240, s: 100, l: 50 },
  D6: { h: 225, s: 100, l: 50 },
  "D#6": { h: 210, s: 100, l: 50 },
  E6: { h: 195, s: 100, l: 50 }, // red
  "E#6": { h: 180, s: 100, l: 50 },
  F6: { h: 165, s: 100, l: 50 },
  "F#6": { h: 150, s: 100, l: 50 },
  G6: { h: 135, s: 100, l: 50 }, // green
  "G#6": { h: 120, s: 100, l: 50 },
  A6: { h: 105, s: 100, l: 50 },
  "A#6": { h: 90, s: 100, l: 50 },
  B6: { h: 75, s: 100, l: 50 }, // blue
  C7: { h: 60, s: 100, l: 50 },
  "C#7": { h: 45, s: 100, l: 50 },
  D7: { h: 30, s: 100, l: 50 }, // indigo
  "D#7": { h: 15, s: 100, l: 50 },
  E7: { h: 0, s: 100, l: 50 },
  "E#7": { h: 15, s: 100, l: 50 },
  F7: { h: 30, s: 100, l: 50 }, // violet
  "F#7": { h: 45, s: 100, l: 50 },
  G7: { h: 60, s: 100, l: 50 },
  "G#7": { h: 75, s: 100, l: 50 },
  A7: { h: 90, s: 100, l: 50 }, // red
  "A#7": { h: 105, s: 100, l: 50 },
  B7: { h: 120, s: 100, l: 50 },
};

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export default function Piano(props: {
  keyState: Map<string, boolean>;
  pianoCssState: Map<string, string>;
  renderingQueueState: Array<RenderingInfo>;
  onRemoveQueueItem: (item: RenderingInfo) => void;
}) {
  const [keyState, setKeyState] = useState(props.keyState);
  const [pianoCssState, setPianoCssState] = useState(props.pianoCssState);
  //   const [renderingQueueState, setRenderingQueue] = useState(props.renderingQueueState);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  // quueue array and each item is a state object that has note, when it started, and the pressure
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

  useEffect(() => {
    if (!canvas.current) return;

    const ctx = canvas.current.getContext("2d")!;

    const dpr = window.devicePixelRatio;
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    canvas.current.width = cw * dpr;
    canvas.current.height = ch * dpr;
    ctx.scale(dpr, dpr);
    setCtx(ctx);
  }, [canvas]);

  useEffect(() => {
    if (!ctx || !props.renderingQueueState) return;
    const render = (time: number) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.lineWidth = 10;
      // console.log('renderingQueueState', props.renderingQueueState);
      // ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
      for (let i = 0; i < props.renderingQueueState.length; i++) {
        // ctx.fillStyle = `hsl(${props.renderingQueueState[i].color}, 100%, 50%)`;
        let item = props.renderingQueueState[i];
        let noteColor = noteColors[item.note];
        let age = time - item.created;
        const fadeDuration = 2000;
        if (age >= fadeDuration) {
          props.onRemoveQueueItem(item);
          continue;
        }

        let alpha = 1 - age / fadeDuration;
        ctx.fillStyle = `hsla(${noteColor.h}, ${noteColor.s}%, ${noteColor.l}%, ${alpha})`;
        // use the item.note to determine a value between 1 and 96 - 1 is C1, 96 is B7
        const [, note, octave] = item.note.match(/([a-zA-Z]#?)(\d)/);

        const noteIndex = notes.indexOf(note);
        const position = noteIndex + 12 * octave;
        const margin = 100;

        ctx.save();

        ctx.translate(
          margin * 0.5 + (ctx.canvas.width - margin) * (position / 96),
          0
        );
        ctx.fillRect(0, 190, (ctx.canvas.width - margin) / 96, 80);

        ctx.restore();
      }
      frame = window.requestAnimationFrame(render);
    };
    let frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [props.renderingQueueState, ctx]);

  return (
    <canvas id="test" ref={canvas} width="1" height="500"></canvas>
  );
}
