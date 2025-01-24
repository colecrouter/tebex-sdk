# tebex-sdk

A TypeScript SDK for interacting with Tebex's APIs, including Headless, Checkout, and Webhook functionality.

Browser friendly, no NodeJS packages, no dependencies.

## Installation

```sh
npm install tebex-sdk
```

## Features

- Headless API Client: Interact with Tebex's Headless API for webstore management
- Checkout API Client: Handle payments and basket operations
- Webhook Handler: Process and validate Tebex webhooks securely

## Usage

### Headless API Client

```typescript
import { HeadlessAPI } from "tebex-sdk";

const headless = new HeadlessAPI("your-token");
```

### Checkout API Client

```typescript
import { CheckoutAPI } from "tebex-sdk";

const checkout = new CheckoutAPI("username", "password");
```

### Webhook Handler

```typescript
import { WebhookHandler } from 'tebex-sdk';

const handler = new WebhookHandler('your-secret');

...

handler.handleRequest(req, ip);
```
