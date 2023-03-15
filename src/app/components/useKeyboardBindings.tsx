import { useEffect } from 'react'

export default function useKeyboardBindings(spriteMap: { [key: string]: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: { key: string | number }) => {
      const handler = spriteMap[e.key]
      
      if (typeof handler === 'function') {
        handler()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [spriteMap])
}

// Implementation Ref:
  // useKeyboardBindings({
  //   a: () => {
  //     //   play({ id: "kick" });
  //     channel.publish({
  //       name: "drum-pad",
  //       data: {
  //         type: "noteon",
  //         name: "C3",
  //         velocity: 50,
  //         mode: "keyboard",
  //       },
  //     });
  //   },
  //   s: () => {
  //     //   play({ id: "hihat" });
  //     channel.publish({
  //       name: "drum-pad",
  //       data: {
  //         type: "noteon",
  //         name: "D3",
  //         velocity: 50,
  //         mode: "keyboard",
  //       },
  //     });
  //   },
  //   d: () => {
  //     //   play({ id: "snare" });
  //     channel.publish({
  //       name: "drum-pad",
  //       data: {
  //         type: "noteon",
  //         name: "E3",
  //         velocity: 50,
  //         mode: "keyboard",
  //       },
  //     });
  //   },
  //   f: () => {
  //     //   play({ id: "cowbell" });
  //     channel.publish({
  //       name: "drum-pad",
  //       data: {
  //         type: "noteon",
  //         name: "F3",
  //         velocity: 50,
  //         mode: "keyboard",
  //       },
  //     });
  //   },
  // });
