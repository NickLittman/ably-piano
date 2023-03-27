import React from "react";


const Hero = () => (
  <div className="text-center hero my-5">
    {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
    <h1 className="mb-4">Ably Piano</h1>

    <p className="lead">
      Welcome to the Ably Piano. This is a demonstration of how leveraging Ably&apos;s low latency, guaranteed QoS, and presence features can be used to create a collaborative piano.
    </p>
  </div>
);

export default Hero;
