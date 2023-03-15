"use client";

import { useEffect, useState } from "react";
import { configureAbly } from "@ably-labs/react-hooks";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";

// export const metadata = {
//   title: 'Nested Layouts',
// };

function Layouts({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const { user } = useAuth0();

  if (!user) throw new Error("no user");

  useEffect(() => {
    const ably = configureAbly({
      authUrl: "http://localhost:3000/api/auth",
      token: user["ably-token"],
    });
    setLoaded(true);
  }, [user]);

  if (!loaded) return null;

  return <div>{children}</div>;
}

export default withAuthenticationRequired(Layouts, {
  onRedirecting: () => <Loading />,
});
