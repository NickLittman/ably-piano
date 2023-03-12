'use client';

import { useEffect, useState } from "react";
import AblyChatComponent from "../components/AblyChatComponent";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import { configureAbly } from "@ably-labs/react-hooks";
import Presence from "../components/Presence";
import DrumPad from "../components/DrumPad";

// export const metadata = {
//   title: "Nick's Chat Page",
//   description: "Look at me, chatting away!",
// };



function Chat() {
  const [loaded, setLoaded] = useState(false);
  const { user } = useAuth0();

  if (!user) throw new Error("no user");

  useEffect(() => {
    const ably = configureAbly({
      authUrl: "http://localhost:3001/auth/ably-token",
      // authHeaders: {
      //   Authorization: "Bearer " + (token),
      // },
      token: user["ably-token"],
    });
    setLoaded(true);
    console.log(ably)
  }, []);


  if (!loaded) return <div>loading...</div>;
  return (
    <div>
      <DrumPad />
      <AblyChatComponent />
      <Presence />
    </div>
  );
}

export default withAuthenticationRequired(Chat, {
  onRedirecting: () => <Loading />,
});