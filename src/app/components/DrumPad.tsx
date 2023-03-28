"use client";
import useKeyboardBindings from "./useKeyboardBindings";

import { Modal, Button } from "react-bootstrap";

import { useChannel } from "@ably-labs/react-hooks";
import { WebMidi } from "webmidi";
import { useEffect, useState, useCallback } from "react";
import * as Tone from "tone";
import Piano from "../components/Piano";

//import all mp3s from assets/sounds

const effectNames = [
  "autoWah",
  "vibrato",
  "phaser",
  "tremolo",
  "reverb",
  "delay",
] as const;

type Effects = typeof effectNames[number];

type RenderingInfo = {
  note: string;
  velocity: number;
  created: number;
}

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
const initKeyState = new Map<string, boolean>();
const initPianoCssState = new Map<string, string>();

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < notes.length; j++) {
    initKeyState.set(notes[j] + (i + 1), false);
    initPianoCssState.set(notes[j] + (i + 1), "col-span-1 bg-gray-200 p-4");
  }
}

export default function DrumPad() {
  const [webMidi, setWebMidi] = useState<typeof WebMidi | null>(null);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(true);
  const [selectedEffects, setSelectedEffects] = useState(
    new Map<Effects, Tone.ToneAudioNode>()
  );
  const [noteNumber, setNoteNumber] = useState(0);

  
  const [keyState, setKeyState] = useState(initKeyState);
  const [pianoCssState, setPianoCssState] = useState(initPianoCssState);
  const [renderingQueue, setRenderingQueue] = useState<RenderingInfo[]>([]);

  const [sampler] = useState(
    new Tone.Sampler({
      urls: {
        A0: "A0.mp3",
        C1: "C1.mp3",
        "D#1": "Ds1.mp3",
        "F#1": "Fs1.mp3",
        A1: "A1.mp3",
        C2: "C2.mp3",
        "D#2": "Ds2.mp3",
        "F#2": "Fs2.mp3",
        A2: "A2.mp3",
        C3: "C3.mp3",
        "D#3": "Ds3.mp3",
        "F#3": "Fs3.mp3",
        A3: "A3.mp3",
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
        C5: "C5.mp3",
        "D#5": "Ds5.mp3",
        "F#5": "Fs5.mp3",
        A5: "A5.mp3",
        C6: "C6.mp3",
        "D#6": "Ds6.mp3",
        "F#6": "Fs6.mp3",
        A6: "A6.mp3",
        C7: "C7.mp3",
        "D#7": "Ds7.mp3",
        "F#7": "Fs7.mp3",
        A7: "A7.mp3",
        C8: "C8.mp3",
      },
      release: 1,
      baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination()
  );

  const toggle = () => setModal(!modal);

  // React to incoming messages, play through setNote[]

  const [channel] = useChannel("drum-pad", (message) => {
    let { type, name, velocity, mode } = message.data;
    console.info(message.data);
    if (type === "noteon") {
      console.info(type);
      sampler.triggerAttack(name);
      setKeyState(new Map(keyState.set(name, true)));
      setPianoCssState(new Map(pianoCssState.set(name, "col-span-1 bg-red-200 p-4 animate-bounce")));
      const [, note, octave] = name.match(/([a-zA-Z]#?)(\d)/);
      if (octave < 8 && octave > -1) setRenderingQueue((prevQueue) => [...prevQueue, { note: name, velocity: velocity, created: window.performance.now() }]);
      // console.log(keyState);
    } else if (type === "noteoff") {
      console.info(type);
      sampler.triggerRelease(name, Tone.now());
      setKeyState(new Map(keyState.set(name, false)));
      setPianoCssState(new Map(pianoCssState.set(name, "col-span-1 bg-gray-200 p-4")));
      // console.log(keyState);
    }
  });

  const removeQueueItem = useCallback((item: RenderingInfo) => {
    setRenderingQueue((prevQueue) => prevQueue.filter((i) => i !== item));
  });

  function createEffect(effect: Effects) {
    // write a switch statement to return a new effect depending on the effect name
    switch (effect) {
      case "autoWah":
        return new Tone.AutoWah({
          baseFrequency: 100,
          octaves: 6,
          sensitivity: 0,
        }).toDestination();
      case "vibrato":
        return new Tone.Vibrato({
          frequency: 5,
          depth: 1,
        }).toDestination();
      case "phaser":
        return new Tone.Phaser({
          frequency: 15,
          octaves: 5,
          baseFrequency: 1000,
        }).toDestination();
      case "tremolo":
        return new Tone.Tremolo({
          frequency: 10,
          type: "sine",
          depth: 0.5,
        }).toDestination();
      case "reverb":
        return new Tone.Reverb({
          decay: 4,
          preDelay: 0.01,
        }).toDestination();
      case "delay":
        return new Tone.FeedbackDelay({
          delayTime: 0.25,
          feedback: 0.5,
        }).toDestination();
    }
  }

  // make the act of enabling webmidi a useEffect
  useEffect(() => {
    if (!WebMidi.supported) {
      console.warn("WebMidi is not supported in this browser");
      return;
    }
    async function enableWebMidi() {
      const midi = await WebMidi.enable();
      setWebMidi(midi);
    }
    enableWebMidi();
  }, [WebMidi.supported]);

  useEffect(() => {
    if (webMidi && channel) {
      webMidi.inputs.forEach((input) => {
        console.info("Detected input: ", input.name);
        input.addListener("noteon", (e) => {
          channel.publish({
            name: "drum-pad",
            data: {
              type: e.type,
              name: e.note.identifier,
              velocity: e.rawValue,
              mode: "piano",
            },
          });
        });
        input.addListener("noteoff", (e) => {
          channel.publish({
            name: "drum-pad",
            data: {
              type: e.type,
              name: e.note.identifier,
              velocity: e.rawValue,
              mode: "piano",
            },
          });
        });
      });
      return () => {
        if (webMidi) {
          webMidi.inputs.forEach((input) => {
            input.removeListener();
          });
        }
      };
    }
  }, [webMidi, channel]);

  function modalHandler() {
    toggle();
    setShow(true);
  }

  const onCheckboxBtnClick = (selected: Effects) => {
    console.debug(
      "onCheckboxBtnClick",
      selected,
      selectedEffects.has(selected)
    );
    if (!selectedEffects.has(selected)) {
      console.debug("creating effect", selected);
      // clean up from tone js + remove : // create object, add to map, attach to tonejs
      const effect = createEffect(selected);
      selectedEffects.set(selected, effect);
      setSelectedEffects(new Map(selectedEffects.set(selected, effect)));
      sampler.connect(effect);
    } else {
      console.debug("removing effect", selected);
      sampler.disconnect(selectedEffects.get(selected));
      selectedEffects.delete(selected);
      setSelectedEffects(new Map(selectedEffects));
    }
  };

  return (
    <>
      <Modal show={modal} onHide={modalHandler}>
        <Modal.Body>
          Hello, welcome to my demo. Please don&apos;t try and break it until
          after my demo. Thank you so much and enjoy!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            I will break this, accidentally
          </Button>
          <Button variant="primary" onClick={modalHandler}>
            I will break this, on purpose
          </Button>
        </Modal.Footer>
      </Modal>

      <h5 className="text-lg font-medium">Piano Filters</h5>
      <div className="flex flex-wrap gap-2">
        {effectNames.map((effect) => (
          <button
            key={effect}
            className={`px-4 py-2 rounded-lg border-2 border-primary text-primary
                  ${selectedEffects.has(effect) ? "bg-secondary" : ""}`}
            onClick={() => onCheckboxBtnClick(effect)}
          >
            {effect}
          </button>
        ))}
      </div>
      <h5>Selected Filters</h5>
      <ul>
        {Array.from(selectedEffects.values()).map((selectedEffect, key) => (
          <li key={key}>{selectedEffect.name}</li>
        ))}
      </ul>
      <h5>Piano</h5>
      <Piano keyState={keyState} pianoCssState={pianoCssState} renderingQueueState={renderingQueue} onRemoveQueueItem={removeQueueItem}/>
    </>
  );
}
