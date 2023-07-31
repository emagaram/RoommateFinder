import { CognitoJwtVerifier } from "aws-jwt-verify";
import { JwtExpiredError } from "aws-jwt-verify/error";

import { env } from "~/env.mjs";
export default async function verifyAuth(jwt: string) {
  // Verifier that expects valid access tokens:
  const verifier = CognitoJwtVerifier.create({
    userPoolId: env.COGNITO_POOL_ID,
    clientId: env.COGNITO_CLIENT_ID,
    tokenUse: "access",
    includeRawJwtInErrors: true,
  });

  try {
    const payload = await verifier.verify(
      jwt // the JWT as string
    );
    console.log("Token is valid. Payload:", payload);
    return payload;
  } catch (err) {
    if (err instanceof JwtExpiredError) {
      console.error("JWT expired!");
    } else {
      console.error("Token not valid!");
    }
    return undefined;
  }
}
