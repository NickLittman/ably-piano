"use client";

import Presence from "../../components/Presence";
import DrumPad from "../../components/DrumPad";

// export const metadata = {
//   title: "Nick's Chat Page",
//   description: "Look at me, chatting away!",
// };

export default function Music() {
  return (
    <div>
        <>
          <DrumPad />
          <Presence />
        </>
    </div>
  );
}