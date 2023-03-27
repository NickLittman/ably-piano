// build a react component that accepts props and returns a keyboard element with keys highlighted based on the props. Each key element should be referenceable by an id such as C4, F#3, etc. The keyboard should be able to be rendered in any orientation, and should be able to be rendered with any number of octaves.

import {useState} from "react";


// const Piano = ({octaves, orientation}) => {
//     const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
//     const keys = [];
//     for (let i = 0; i < octaves; i++) {
//         for (let j = 0; j < notes.length; j++) {
//         keys.push(notes[j] + (i + 1));
//         }
//     }
//     return (
//         <div className="piano">
//         {keys.map((key) => (
//             <div className="key" key={key} id={key}>
//             {key}
//             </div>
//         ))}
//         </div>
//     );
//     };
// rewrite the above code to add handlers to each key element that will set its state when the component receives a prop that indicates that the key should be highlighted.
export default function Piano(props: {state: Map <string, boolean>}) {
    const [keyState, setKeyState] = useState(props.state);
    // console.log(keyState);
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const keys = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < notes.length; j++) {
        keys.push(notes[j] + (i + 1));
    }
}
    return (
        <div className="piano">
        {keys.map((key) => (
            <div className="key" key={key} id={key} style={{backgroundColor: (keyState.get(key) === true) ? "red" : "white"}}>
                {key}
            </div>
        ))}
        </div>
    );
    };
