import assert from "node:assert";
import { beforeEach, test } from "node:test";
import { WebhookHandler } from "./client";

let webhookHandler: WebhookHandler;
const webhookSecret = "secretKey";
const validIp1 = "18.209.80.3";
const validIp2 = "54.87.231.232";
const invalidIp = "192.168.1.1";

const validRawBody = JSON.stringify({
	id: "123",
	type: "payment.completed",
	date: "2023-10-10T12:21:47+00:00",
	subject: {
		transaction_id: "tbx-xxxxxxxx",
		// ... other properties
	},
});

const mockHeaders = new Headers();
mockHeaders.set("X-Signature", "validsignature");

beforeEach(() => {
	webhookHandler = new WebhookHandler(webhookSecret);
});

test("should process a valid webhook request", async () => {
	// Mock verifySignature to return true
	webhookHandler.verifySignature = async () => true;

	const request = new Request("https://example.com/webhook", {
		method: "POST",
		headers: mockHeaders,
		body: validRawBody,
	});

	const result = await webhookHandler.handleRequest(request, validIp1);

	assert.deepStrictEqual(result, JSON.parse(validRawBody));
});

test("should throw an error for invalid IP address", async () => {
	const request = new Request("https://example.com/webhook", {
		method: "POST",
		headers: mockHeaders,
		body: validRawBody,
	});
	try {
		await webhookHandler.handleRequest(request, invalidIp);
		assert.fail("Expected error was not thrown");
	} catch (error) {
		if (!(error instanceof Error)) throw error;
		assert.strictEqual(error.message, "Invalid IP address");
	}
});

test("should throw an error for missing signature", async () => {
	const headers = new Headers();
	const request = new Request("https://example.com/webhook", {
		method: "POST",
		headers,
		body: validRawBody,
	});
	try {
		await webhookHandler.handleRequest(request, validIp1);
		assert.fail("Expected error was not thrown");
	} catch (error) {
		if (!(error instanceof Error)) throw error;
		assert.strictEqual(error.message, "Invalid signature");
	}
});

test("should throw an error for invalid signature", async () => {
	// Mock verifySignature to return false
	webhookHandler.verifySignature = async () => false;
	const headers = new Headers();
	headers.set("X-Signature", "invalidsignature");
	const request = new Request("https://example.com/webhook", {
		method: "POST",
		headers,
		body: validRawBody,
	});
	try {
		await webhookHandler.handleRequest(request, validIp1);
		assert.fail("Expected error was not thrown");
	} catch (error) {
		if (!(error instanceof Error)) throw error;
		assert.strictEqual(error.message, "Invalid signature");
	}
});

test("verifySignature should return true for a valid signature", async () => {
	const bodyHash = await crypto.subtle.digest(
		"SHA-256",
		new TextEncoder().encode(validRawBody),
	);
	const key = await crypto.subtle.importKey(
		"raw",
		new TextEncoder().encode(webhookSecret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"],
	);
	const hmac = await crypto.subtle.sign("HMAC", key, bodyHash);

	// Convert HMAC to hex string
	const hmacArray = Array.from(new Uint8Array(hmac));
	const hmacHex = hmacArray
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");

	const result = await webhookHandler.verifySignature(validRawBody, hmacHex);

	assert.strictEqual(result, true);
});

test("verifySignature should return false for an invalid signature", async () => {
	const result = await webhookHandler.verifySignature(
		validRawBody,
		"invalidsignature",
	);
	assert.strictEqual(result, false);
});
