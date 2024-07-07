import { debugFlag } from "./index.ts";

export async function invokeApi(
    { apiKey, endPoint, body, requiredKey }: {
        apiKey: string;
        endPoint: string;
        body: Record<string, unknown>;
        requiredKey: string;
    },
) {
    console.debug(`Invoking url: ${endPoint}..`);

    const url = new URL(
        endPoint,
    );
    url.searchParams.append("key", apiKey);
    const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    console.debug(`response: ${JSON.stringify(data)}`);

    if (!data[requiredKey]) {
        throw new Error(
            `Could not find ${requiredKey} in response.  Response: ${
                JSON.stringify(data)
            }`,
        );
    }
    return data[requiredKey];
}
