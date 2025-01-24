export class WebhookHandler {
	#secret: string;

	// https://docs.tebex.io/developers/webhooks/overview#verifying-webhook-authenticity
	static #allowedIPs = ["18.209.80.3", "54.87.231.232"];

	constructor(secret: string) {
		this.#secret = secret;
	}

	/**
	 * Handle a webhook request.
	 * @throws {Error} If the IP address is not allowed or the signature is invalid.
	 */
	async handleRequest(
		request: Request,
		ip: string,
	): Promise<Tebex.Webhooks.WebhookResponse<Tebex.Webhooks.WebhookType>> {
		if (!WebhookHandler.#allowedIPs.includes(ip)) {
			throw new Error("Invalid IP address");
		}

		const signature = request.headers.get("X-Signature");
		const body = await request.text();
		if (!signature || !(await this.verifySignature(body, signature))) {
			throw new Error("Invalid signature");
		}

		return JSON.parse(body);
	}

	/**
	 * Helper function to verify the signature of a webhook request.
	 * @returns {boolean} Whether the signature is valid.
	 */
	async verifySignature(
		rawBody: string,
		signature: string,
	): Promise<boolean> {
		const encoder = new TextEncoder();
		const secretKey = encoder.encode(this.#secret);

		// Import the secret key
		const key = await crypto.subtle.importKey(
			"raw",
			secretKey,
			{ name: "HMAC", hash: "SHA-256" },
			false,
			["sign"],
		);

		// Hash the raw body
		const bodyHash = await crypto.subtle.digest(
			"SHA-256",
			encoder.encode(rawBody),
		);

		// Generate HMAC
		const hmac = await crypto.subtle.sign("HMAC", key, bodyHash);

		// Convert HMAC to hex string
		const hmacArray = Array.from(new Uint8Array(hmac));
		const hmacHex = hmacArray
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("");

		return hmacHex === signature;
	}
}
