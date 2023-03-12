"use client";
import useKeyboardBindings from "./useKeyboardBindings";

import { Modal, Button, ButtonGroup, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

import { useChannel } from "@ably-labs/react-hooks";
import { WebMidi } from "webmidi";
import { useEffect, useState, useMemo } from "react";
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

type Effects = typeof effectNames[number];

// here is how you create a reverb effect
// const reverb = new Tone.Reverb().toDestination();
// sampler.connect(reverb);

export default function DrumPad() {
  const [webMidi, setWebMidi] = useState<typeof WebMidi | null>(null);
  // ISSUE: using an array to store notes causes issues because I'm reseting the entire array on noteoff
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(true);
  const [selectedEffects, setSelectedEffects] = useState(
    new Map<Effects, Tone.ToneAudioNode>()
  );
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
    if (type === "noteon") {
      console.info(type);
      sampler.triggerAttack(name);
    } else if (type === "noteoff") {
      console.info(type);
      sampler.triggerRelease(name, Tone.now());
    }
  });

  function createEffect(effect: Effects) {
    // write a switch statement to return a new effect depending on the effect name
    switch (effect) {
      case "autoWah":
        return new Tone.AutoWah(50, 6, -30).toDestination();
      case "vibrato":
        return new Tone.Vibrato().toDestination();
      case "phaser":
        return new Tone.Phaser({
          frequency: 15,
          octaves: 5,
          baseFrequency: 1000,
        }).toDestination();
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
    console.debug("onCheckboxBtnClick", selected, selectedEffects.has(selected))
    if (!selectedEffects.has(selected)) {
      console.debug("creating effect", selected)
      // clean up from tone js + remove : // create object, add to map, attach to tonejs
      const effect = createEffect(selected);
      selectedEffects.set(selected, effect);
      sampler.connect(effect);
    } else {
      console.debug("removing effect", selected)
      sampler.disconnect(selectedEffects.get(selected));
      selectedEffects.delete(selected);
    }
  };

  const selectedEffectsNames = useMemo(() => Array.from(selectedEffects.keys()), [selectedEffects]);

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

      <h5>Piano Filters</h5>
      <ButtonGroup>
        {effectNames.map((effect) => (
          <Button
            key={effect}
            variant="outline-primary"
            onClick={() => onCheckboxBtnClick(effect)}
            active={selectedEffects.has(effect)}
          >
            {effect}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
}
