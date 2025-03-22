import { execSync } from "child_process";

/**
 * Generates a secure authentication secret.
 *
 * This function attempts to generate a random secret using `openssl rand -base64 32`.
 * If the command fails (e.g., `openssl` is not installed), it falls back to a less secure method
 * by generating a base64-encoded string derived from a random number and the current timestamp.
 *
 * @returns {string} A base64-encoded secret string.
 *
 * @example
 * ```ts
 * const secret = generateBetterAuthSecret();
 * console.log(secret); // Random base64 string
 * ```
 */
export const generateBetterAuthSecret = (): string => {
  try {
    const secret = execSync("openssl rand -base64 32", {
      encoding: "utf-8",
    }).trim();

    return secret;
  } catch {
    console.warn(
      "Failed to generate BETTER_AUTH_SECRET using openssl. Using a fallback value."
    );
    return Buffer.from(
      Math.random().toString(36).slice(2) + Date.now().toString(36)
    )
      .toString("base64")
      .slice(0, 43);
  }
};
