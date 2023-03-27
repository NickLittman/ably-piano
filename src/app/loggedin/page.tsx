"use client";

import AblyChatComponent from "../components/AblyChatComponent";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import Presence from "../components/Presence";
import DrumPad from "../components/DrumPad";


function LoggedIn() {

  return (
        <>
        <head>
          <title>Logged In</title>
        </head>
          <DrumPad />
          {/* <AblyChatComponent /> */}
          <Presence />
        </>
  );
}

export default withAuthenticationRequired(LoggedIn, {
  onRedirecting: () => <Loading />,
});
