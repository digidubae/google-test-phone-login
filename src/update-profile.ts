export async function updateProfile({ profile, refreshToken, idToken }: {
    profile: string;
    refreshToken: string;
    idToken: string;
}) {
    const profileData = JSON.parse(
        await Deno.readTextFile(`../profiles/${profile}.json`),
    );
    profileData.refreshToken = refreshToken;
    profileData.idToken = idToken;
    await Deno.writeTextFile(`../profiles/${profile}.json`, JSON.stringify(profileData, null, 2));
}
