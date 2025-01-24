export class CheckoutAPI {
	#username: string;
	#password: string;

	constructor(username: string, password: string) {
		this.#username = username;
		this.#password = password;
	}

	private getHeaders(): Headers {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append(
			"Authorization",
			`Basic ${btoa(`${this.#username}:${this.#password}`)}`,
		);
		return headers;
	}

	private async fetchWithErrorHandling<T>(
		input: RequestInfo,
		init: RequestInit,
	): Promise<T> {
		const updatedInit = {
			...init,
			headers: {
				...this.getHeaders(),
				...init.headers,
			},
		};
		const response = await fetch(input, updatedInit);
		if (!response.ok) {
			throw (await response.json()) as Tebex.Checkout.Error;
		}
		return response.json();
	}

	/**
	 * Fetch a basket by its identifier
	 * `GET https://checkout.tebex.io/api/baskets/{ident}`
	 * @throws {Tebex.Checkout.Error}
	 */
	async fetchBasket(
		ident: string,
	): Promise<Tebex.Checkout.FetchBasketResponse> {
		return this.fetchWithErrorHandling(
			`https://checkout.tebex.io/api/baskets/${ident}`,
			{
				method: "GET",
			},
		);
	}

	/**
	 * Create a new basket
	 * `POST https://checkout.tebex.io/api/baskets`
	 * @throws {Tebex.Checkout.Error}
	 */
	async createBasket(
		request: Tebex.Checkout.CreateBasketRequest,
	): Promise<Tebex.Checkout.FetchBasketResponse> {
		return this.fetchWithErrorHandling<Tebex.Checkout.FetchBasketResponse>(
			"https://checkout.tebex.io/api/baskets",
			{
				method: "POST",
				body: JSON.stringify(request),
			},
		);
	}

	/**
	 * Add a package to the basket
	 * `POST https://checkout.tebex.io/api/baskets/{ident}/packages`
	 * @throws {Tebex.Checkout.Error}
	 */
	async addPackage(
		ident: string,
		request: Tebex.Checkout.AddPackageRequest,
	): Promise<Tebex.Checkout.FetchBasketResponse> {
		return this.fetchWithErrorHandling<Tebex.Checkout.FetchBasketResponse>(
			`https://checkout.tebex.io/api/baskets/${ident}/packages`,
			{
				method: "POST",
				body: JSON.stringify(request),
			},
		);
	}

	/**
	 * Remove a row from the basket
	 * `DELETE https://checkout.tebex.io/api/baskets/{ident}/packages/{rowId}`
	 * @throws {Tebex.Checkout.Error}
	 */
	async removeRow(ident: string, rowId: number): Promise<void> {
		return this.fetchWithErrorHandling(
			`https://checkout.tebex.io/api/baskets/${ident}/packages/${rowId}`,
			{
				method: "DELETE",
			},
		);
	}

	/**
	 * Add a sale to the basket
	 * `POST https://checkout.tebex.io/api/baskets/{ident}/sales`
	 * @throws {Tebex.Checkout.Error}
	 */
	async addSale(
		ident: string,
		request: Tebex.Checkout.AddSaleRequest,
	): Promise<Tebex.Checkout.FetchBasketResponse> {
		return this.fetchWithErrorHandling<Tebex.Checkout.FetchBasketResponse>(
			`https://checkout.tebex.io/api/baskets/${ident}/sales`,
			{
				method: "POST",
				body: JSON.stringify(request),
			},
		);
	}

	/**
	 * Create a checkout request
	 * `POST https://checkout.tebex.io/api/checkout`
	 * @throws {Tebex.Checkout.Error}
	 */
	async createCheckout(
		request: Tebex.Checkout.CheckoutRequest,
	): Promise<Tebex.Checkout.FetchBasketResponse> {
		return this.fetchWithErrorHandling<Tebex.Checkout.FetchBasketResponse>(
			"https://checkout.tebex.io/api/checkout",
			{
				method: "POST",
				body: JSON.stringify(request),
			},
		);
	}

	/**
	 * Fetch a payment by its transaction ID
	 * `GET https://checkout.tebex.io/api/payments/{txnId}?type=txn_id`
	 * @throws {Tebex.Checkout.Error}
	 */
	async fetchPayment(txnId: string): Promise<Tebex.Checkout.PaymentResponse> {
		return this.fetchWithErrorHandling<Tebex.Checkout.PaymentResponse>(
			`https://checkout.tebex.io/api/payments/${txnId}?type=txn_id`,
			{
				method: "GET",
			},
		);
	}

	/**
	 * Refund a payment by its transaction ID
	 * `POST https://checkout.tebex.io/api/payments/{txnId}/refund?type=txn_id`
	 * @throws {Tebex.Checkout.Error}
	 */
	async refundPayment(
		txnId: string,
	): Promise<Tebex.Checkout.RefundPaymentResponse> {
		return this.fetchWithErrorHandling<Tebex.Checkout.RefundPaymentResponse>(
			`https://checkout.tebex.io/api/payments/${txnId}/refund?type=txn_id`,
			{
				method: "POST",
			},
		);
	}

	/**
	 * Fetch a recurring payment by its reference
	 * `GET https://checkout.tebex.io/api/recurring-payments/{reference}`
	 * @throws {Tebex.Checkout.Error}
	 */
	async fetchRecurringPayment(
		reference: string,
	): Promise<Tebex.Checkout.RecurringPaymentResponse> {
		return this.fetchWithErrorHandling<Tebex.Checkout.RecurringPaymentResponse>(
			`https://checkout.tebex.io/api/recurring-payments/${reference}`,
			{
				method: "GET",
			},
		);
	}

	/**
	 * Update a subscription with a new product
	 * `PUT https://checkout.tebex.io/api/recurring-payments/{reference}`
	 * @throws {Tebex.Checkout.Error}
	 */
	async updateRecurringPayment(
		reference: string,
		request: Tebex.Checkout.UpdateRecurringPaymentRequest,
	): Promise<Tebex.Checkout.RecurringPaymentResponse> {
		return this.fetchWithErrorHandling<Tebex.Checkout.RecurringPaymentResponse>(
			`https://checkout.tebex.io/api/recurring-payments/${reference}`,
			{
				method: "PUT",
				body: JSON.stringify(request),
			},
		);
	}

	/**
	 * Cancel a recurring payment
	 * `DELETE https://checkout.tebex.io/api/recurring-payments/{reference}`
	 * @throws {Tebex.Checkout.Error}
	 */
	async cancelRecurringPayment(
		reference: string,
	): Promise<Tebex.Checkout.RecurringPaymentResponse> {
		return this.fetchWithErrorHandling<Tebex.Checkout.RecurringPaymentResponse>(
			`https://checkout.tebex.io/api/recurring-payments/${reference}`,
			{
				method: "DELETE",
			},
		);
	}

	/**
	 * Pause or reactivate a recurring payment
	 * `PUT https://checkout.tebex.io/api/recurring-payments/{reference}/status`
	 * @throws {Tebex.Checkout.Error}
	 */
	async updateRecurringPaymentStatus(
		reference: string,
		request: Tebex.Checkout.PauseRecurringPaymentRequest,
	): Promise<Tebex.Checkout.RecurringPaymentResponse> {
		return this.fetchWithErrorHandling<Tebex.Checkout.RecurringPaymentResponse>(
			`https://checkout.tebex.io/api/recurring-payments/${reference}/status`,
			{
				method: "PUT",
				body: JSON.stringify(request),
			},
		);
	}

	/**
	 * Register a new webhook endpoint
	 * `POST https://checkout.tebex.io/api/webhooks/endpoints`
	 * @throws {Tebex.Checkout.Error}
	 */
	async registerWebhookEndpoint(request: {
		url: string;
		types: string[];
	}): Promise<void> {
		await this.fetchWithErrorHandling(
			"https://checkout.tebex.io/api/webhooks/endpoints",
			{
				method: "POST",
				body: JSON.stringify(request),
			},
		);
	}
}
