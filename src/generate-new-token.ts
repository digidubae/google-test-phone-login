import { invokeApi } from "./invoke-api.ts";

export async function generateNewToken(
  { refreshToken, apiKey }: { refreshToken: string; apiKey: string },
) {
  return await invokeApi({
    apiKey: apiKey,
    endPoint: "https://securetoken.googleapis.com/v1/token",
    body: {
      grant_type: "refresh_token",
      refreshToken: refreshToken,
    },
    requiredKey: "id_token",
  });
}
