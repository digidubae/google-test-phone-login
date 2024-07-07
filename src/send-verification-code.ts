import { invokeApi } from "./invoke-api.ts";

export async function sendVerificationCode(
  { apiKey, phoneNumber }: { apiKey: string; phoneNumber: string },
): Promise<string> {
  return await invokeApi({
    apiKey: apiKey,
    endPoint:
      "https://identitytoolkit.googleapis.com/v1/accounts:sendVerificationCode",
    body: { phoneNumber: phoneNumber },
    requiredKey: "sessionInfo",
  });
}
