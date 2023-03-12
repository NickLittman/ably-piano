import useKeyboardBindings from "./useKeyboardBindings";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
} from "reactstrap";
import { useChannel } from "@ably-labs/react-hooks";
import { WebMidi} from "webmidi";
import { useEffect, useState } from "react";
import * as Tone from "tone";

//import all mp3s from assets/sounds

const effectNames = [
  "autoWah",
  "vibrato",
  "phaser",
  "tremolo",
  "reverb",
  "delay",
] as const;

type Effects = typeof effectNames[number]

// here is how you create a reverb effect
// const reverb = new Tone.Reverb().toDestination();
// sampler.connect(reverb);

export default function DrumPad() {
  const [webMidi, setWebMidi] = useState<typeof WebMidi | null>(null);
  // ISSUE: using an array to store notes causes issues because I'm reseting the entire array on noteoff
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(true);
  const [selectedEffects, setSelectedEffects] = useState(new Map<Effects, Tone.ToneAudioNode>());

  const sampler = new Tone.Sampler({
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
  }).toDestination();

  const toggle = () => setModal(!modal);

  // React to incoming messages, play through setNote[]

  const [channel] = useChannel("drum-pad", (message) => {
    let { type, name, velocity, mode } = message.data;
    if (type === "noteon") {
      console.info(type);
      sampler.triggerAttack(name);
    } else if (type === "noteoff") {
      console.info(type);
      sampler.triggerRelease(name, Tone.now());
    }
  });

  const autoWah = new Tone.AutoWah().toDestination();
  sampler.connect(autoWah);
  sampler.disconnect(autoWah);

  function createEffect(effect: Effects) {
    // write a switch statement to return a new effect depending on the effect name
    switch (effect) {
      case "autoWah":
        return new Tone.AutoWah().toDestination();
      case "vibrato":
        return new Tone.Vibrato().toDestination();
      case "phaser":
        return new Tone.Phaser().toDestination();
      case "tremolo":
        return new Tone.Tremolo().toDestination();
      case "reverb":
        return new Tone.Reverb().toDestination();
      case "delay":
        return new Tone.FeedbackDelay().toDestination();
  }
}


  // make the act of enabling webmidi a useEffect
  useEffect(() => {
    async function enableWebMidi() {
      const midi = await WebMidi.enable();
      setWebMidi(midi);
    }
    enableWebMidi();
  }, []);

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

  useKeyboardBindings({
    a: () => {
      //   play({ id: "kick" });
      channel.publish({
        name: "drum-pad",
        data: {
          type: "noteon",
          name: "C3",
          velocity: 50,
          mode: "keyboard",
        },
      });
    },
    s: () => {
      //   play({ id: "hihat" });
      channel.publish({
        name: "drum-pad",
        data: {
          type: "noteon",
          name: "D3",
          velocity: 50,
          mode: "keyboard",
        },
      });
    },
    d: () => {
      //   play({ id: "snare" });
      channel.publish({
        name: "drum-pad",
        data: {
          type: "noteon",
          name: "E3",
          velocity: 50,
          mode: "keyboard",
        },
      });
    },
    f: () => {
      //   play({ id: "cowbell" });
      channel.publish({
        name: "drum-pad",
        data: {
          type: "noteon",
          name: "F3",
          velocity: 50,
          mode: "keyboard",
        },
      });
    },
  });

  const onCheckboxBtnClick = (selected: Effects) => {
    if (selectedEffects.has(selected)) { // clean up from tone js + remove : // create object, add to map, attach to tonejs
      selectedEffects.set(selected, createEffect(selected));
    } else {
      selectedEffects.delete(selected);
    }
  };

  return (
    <>
      <Modal isOpen={modal}>
        <ModalBody>
          Hello, welcome to my demo. Please don&apos;t try and break it until after
          my demo. Thank you so much and enjoy!
        </ModalBody>
        <ModalFooter>
          <Button onClick={modalHandler}>
            I will break this, accidentally
          </Button>
          <Button onClick={modalHandler}>I will break this, on purpose</Button>
        </ModalFooter>
      </Modal>

      <h5>Piano Filters</h5>
      <ButtonGroup>
        {effectNames.map((effect) => (
          <Button
            key={effect}
            color="primary"
            outline
            onClick={() => onCheckboxBtnClick(effect)}
            active={selectedEffects.has(effect)}
          >
            {effect}
          </Button>
        ))}
      </ButtonGroup>
      <p>Selected: {JSON.stringify(selectedEffects)}</p>
    </>
  );
}
