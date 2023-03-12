import {SignJWT} from 'jose';

export async function GET(request: Request) {

  if (!process.env.ABLY_KEY_VALUE || !process.env.ABLY_UN) throw new Error("ABLY_ not configured")

  var header = {
    typ: "JWT",
    alg: "HS256",
    kid: process.env.ABLY_UN,
  };
  var claims = {
    "x-ably-capability": JSON.stringify({
      "*": ["publish", "subscribe", "presence"],
    }),
  };

  const key = new TextEncoder().encode(process.env.ABLY_KEY_VALUE)

  const jwt = await new SignJWT({ "x-ably-capability": JSON.stringify({ "*": ["publish", "subscribe", "presence"] })})
    .setProtectedHeader({ typ: "JWT", alg: "HS256", kid: process.env.ABLY_UN })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime("1h")
    .sign(key);


  return new Response(jwt);
}