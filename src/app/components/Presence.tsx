// create a component that renders presence data with the usePresence react Ably hook

import React, { useEffect } from "react";
import { usePresence } from "@ably-labs/react-hooks";
import { useAuth0 } from "@auth0/auth0-react";

export default function Presence() {
  const [presenceData, updateStatus] = usePresence("chat-demo");
  const { user } = useAuth0();

  if (!user) throw new Error("no user");

  useEffect(() => {
      updateStatus({ action: "enter", data: user.name});
  }, []);

  return (
    <div>
      <h1>Presence</h1>
      <ul>
        {presenceData.map((member, index) => (
          <li key={index}>
            <b>{member.clientId}</b> is {member.action}
          </li>
        ))}
      </ul>
    </div>
  );
}
