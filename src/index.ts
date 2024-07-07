import { parse } from "https://deno.land/std@0.83.0/flags/mod.ts";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import { writeText } from "https://deno.land/x/copy_paste/mod.ts";

import { generateNewToken } from "./generate-new-token.ts";
import { sendVerificationCode } from "./send-verification-code.ts";
import { signInWithPhone } from "./sign-in-with-phone.ts";
import { updateProfile } from "./update-profile.ts";
import { overrideConsole } from "./console-override.ts";

const env = await load({ envPath: "../.env" });
const apiKey = env["API_KEY"];

const { profile, debug, clipboard, noCache } = parse(Deno.args);

overrideConsole();

if (!profile) {
    throw new Error("profile is required");
}

export const debugFlag = debug;
console.debug(`Getting id token for ${profile}...`);

const profileData = JSON.parse(
    await Deno.readTextFile(`../profiles/${profile}.json`),
);

if (!profileData.phoneNumber || !profileData.otp) {
    throw new Error("profile should have phoneNumber and otp");
}
const phoneNumber = profileData.phoneNumber;
const otp = profileData.otp;

const sessionInfo = await sendVerificationCode({
    apiKey: apiKey,
    phoneNumber: phoneNumber,
});


const refreshToken = await signInWithPhone(
    {
        apiKey: apiKey,
        sessionInfo: sessionInfo,
        phoneNumber: phoneNumber,
        code: otp,
        profile: profile,
        noCache: noCache,
    },
);


const idToken = await generateNewToken({
    refreshToken: refreshToken,
    apiKey: apiKey,
});

await updateProfile({
    profile: profile,
    refreshToken: refreshToken,
    idToken: idToken,
});

if (clipboard) {
    await writeText(idToken);
    console.info("idToken copied to clipboard");
}

console.info(`Profile updated at profiles/${profile}.json`);
