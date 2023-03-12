"use client";

import { useState, useEffect } from "react";

function b64_to_utf8(str: string) {
  return decodeURIComponent(escape(window.atob(str)));
}

export default function Temp() {
  const [temp, setTemp] = useState("");

  useEffect(() => {
    const eventSource = new EventSource(
      "https://realtime.ably.io/sse?key=UJmgTQ.381ZMA:Dsv1_zxtGjoVfBLPHibO-W-jTtCtGdjRQFnS6CEOAKU&channels=temp_data&v=1.1"
    );
    eventSource.onmessage = (e) => {
      let parsedData = JSON.parse(e.data);
      let decodedTempString: string = b64_to_utf8(parsedData.data);
      setTemp(decodedTempString);
    };
  }, []);

  return (
    <div>
      <h1>Temperature</h1>
      <p>{temp}</p>
    </div>
  );
}
