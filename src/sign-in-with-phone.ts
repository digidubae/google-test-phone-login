import { invokeApi } from "./invoke-api.ts";

export async function signInWithPhone(
  { sessionInfo, code, phoneNumber, apiKey, profile, noCache }: {
    sessionInfo: string;
    code: string;
    phoneNumber: string;
    apiKey: string;
    profile: string;
    noCache: boolean;
  },
): Promise<string> {
  if (!noCache) {
    try {
      const profileData = JSON.parse(
        await Deno.readTextFile(`../profiles/${profile}.json`),
      );
      if (profileData.refreshToken) {
        console.debug(`Returning refresh token from profiles/${profile}.json`);
        return profileData.refreshToken;
      }
    } catch (e) {
      if (!(e instanceof Deno.errors.NotFound)) {
        throw new Error(`Error reading profile file:`, e);
      }
    }
  } else {
    console.debug("Skipping cache checking")
  }

  return await invokeApi({
    apiKey: apiKey,
    endPoint:
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPhoneNumber",
    body: {
      phoneNumber: phoneNumber,
      sessionInfo: sessionInfo,
      code: code,
    },
    requiredKey: "refreshToken",
  });
}
