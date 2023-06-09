<h1>Collaborative Piano Demo with Ably</h1>
<p>This project is a demo of how Ably's low latency, guaranteed Quality of Service (QoS), and presence features can be used to create a collaborative piano that allows multiple users to play together in real-time.</p>
<h2>Technologies Used</h2>
<p>The following technologies were used to build this demo:</p>
<ul>
  <li>Ably: A realtime messaging platform that provides low-latency pub/sub messaging, presence, and QoS guarantees.</li>
  <li>Next.js 13: A server-side rendering (SSR) React framework that allows for easy creation of complex web applications.</li>
  <li>Auth0: A platform that provides secure authentication and authorization services for web applications.</li>
  <li>WebAudio API: A high-level JavaScript API for processing and synthesizing audio in web applications.</li>
  <li>ToneJS: A JavaScript library for creating interactive music in the browser.</li>
  <li>Canvas2D: A 2D drawing API for HTML5 canvas that allows for the creation of graphical elements and animations.</li>
</ul>
<h2>Getting Started</h2>
<p>To run this project locally, follow these steps:</p>
<ol>
  <li>Clone the repository: <code>git clone https://github.com/NickLittman/ably-piano.git</code></li>
  <li>Install dependencies: <code>pnpm install</code></li>
  <li>Create a free account on Ably and get your API key.</li>
  <li>Create a free account on Auth0 and get your client ID and secret.</li>
  <li>Create a <code>.env.local</code> file in the root of your project with the following variables:</li>
  <code>
  AUTH0_SCOPE='openid profile email read:shows'
  ABLY_AUTH_TOKEN=&lt;your-ably-api-key&gt;<br>
  AUTH0_CLIENT_SECRET=&lt;your-auth0-client-secret&gt;<br>
  AUTH0_DOMAIN=&lt;your-auth0-domain&gt;<br>
  NEXT_PUBLIC_DOMAIN=&lt;your-auth0-domain&gt;<br>
  NEXT_PUBLIC_CLIENT_ID=&lt;your-auth0-client-id&gt;<br>
  NEXT_PUBLIC_AUDIENCE=&lt;your-auth0-audience&gt;<br>
  NEXT_PUBLIC_APP_ORIGIN=&lt;your-configured-auth0-app-origin&gt;<br>
  </code>
  <li>Run the development server: <code>npm run dev</code></li>
  <li>Open your browser and go to <code>http://localhost:3000</code></li>
</ol>
<h2>License</h2>
<p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for more information.</p>



