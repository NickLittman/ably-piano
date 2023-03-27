"use client";

import AblyChatComponent from "../components/AblyChatComponent";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import Presence from "../components/Presence";
import DrumPad from "../components/DrumPad";

// export const metadata = {
//   title: "Nick's Chat Page",
//   description: "Look at me, chatting away!",
// };

function LoggedIn() {

  return (
        <>
          <DrumPad />
          {/* <AblyChatComponent /> */}
          <Presence />
        </>
  );
}

export default withAuthenticationRequired(LoggedIn, {
  onRedirecting: () => <Loading />,
});
