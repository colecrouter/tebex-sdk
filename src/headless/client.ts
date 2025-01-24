export class HeadlessAPI {
	#token: string;

	constructor(token: string) {
		this.#token = token;
	}

	/**
	 * Fetch a webstore by its identifier
	 * `GET https://headless.tebex.io/api/accounts/{token}`
	 */
	async getWebstore(): Promise<Tebex.Headless.Accounts.WebstoreResponse> {
		const response = await fetch(
			`https://headless.tebex.io/api/accounts/${this.#token}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		return response.json();
	}

	/**
	 * Fetch the custom pages associated with the store
	 * `GET https://headless.tebex.io/api/accounts/{token}/pages`
	 */
	async getCustomPages(): Promise<Tebex.Headless.Accounts.PagesResponse> {
		const response = await fetch(
			`https://headless.tebex.io/api/accounts/${this.#token}/pages`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		return response.json();
	}

	/**
	 * Fetch a basket by its identifier
	 * `GET https://headless.tebex.io/api/accounts/{token}/baskets/{basketIdent}`
	 */
	async getBasket(
		basketIdent: string,
	): Promise<Tebex.Headless.Baskets.BasketResponse> {
		const response = await fetch(
			`https://headless.tebex.io/api/accounts/${this.#token}/baskets/${basketIdent}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		return response.json();
	}

	/**
	 * Create a new basket
	 * `POST https://headless.tebex.io/api/accounts/{token}/baskets`
	 */
	async createBasket(
		completeUrl: string,
		cancelUrl: string,
		custom: Record<string, unknown> = {},
		completeAutoRedirect = false,
	): Promise<Tebex.Headless.Baskets.BasketResponse> {
		const body = {
			complete_url: completeUrl,
			cancel_url: cancelUrl,
			custom,
			complete_auto_redirect: completeAutoRedirect,
		};
		const response = await fetch(
			`https://headless.tebex.io/api/accounts/${this.#token}/baskets`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			},
		);
		return response.json();
	}

	/**
	 * Get authentication links for a basket
	 * `GET https://headless.tebex.io/api/accounts/{token}/baskets/{basketIdent}/auth?returnUrl={returnUrl}`
	 */
	async getBasketAuth(
		basketIdent: string,
		returnUrl: string,
	): Promise<Tebex.Headless.Baskets.AuthResponse[]> {
		const response = await fetch(
			`https://headless.tebex.io/api/accounts/${this.#token}/baskets/${basketIdent}/auth?returnUrl=${encodeURIComponent(
				returnUrl,
			)}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		return response.json();
	}

	/**
	 * Get all categories
	 * `GET https://headless.tebex.io/api/accounts/{token}/categories`
	 */
	async getCategories(
		includePackages = false,
	): Promise<Tebex.Headless.Categories.CategoriesResponse> {
		const url = includePackages
			? `https://headless.tebex.io/api/accounts/${this.#token}/categories?includePackages=1`
			: `https://headless.tebex.io/api/accounts/${this.#token}/categories`;
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.json();
	}

	/**
	 * Get a specific category
	 * `GET https://headless.tebex.io/api/accounts/{token}/categories/{categoryId}`
	 */
	async getCategory(
		categoryId: number,
		includePackages = false,
	): Promise<Tebex.Headless.Categories.Category> {
		const url = includePackages
			? `https://headless.tebex.io/api/accounts/${this.#token}/categories/${categoryId}?includePackages=1`
			: `https://headless.tebex.io/api/accounts/${this.#token}/categories/${categoryId}`;
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.json();
	}

	/**
	 * Fetch a package by its identifier
	 * `GET https://headless.tebex.io/api/accounts/{token}/packages/{packageId}`
	 */
	async getPackage(
		packageId: number,
		ipAddress?: string,
		basketIdent?: string,
	): Promise<Tebex.Headless.Packages.Package> {
		let url = `https://headless.tebex.io/api/accounts/${this.#token}/packages/${packageId}`;
		const params = [];
		if (ipAddress)
			params.push(`ipAddress=${encodeURIComponent(ipAddress)}`);
		if (basketIdent)
			params.push(`basketIdent=${encodeURIComponent(basketIdent)}`);
		if (params.length > 0) {
			url += `?${params.join("&")}`;
		}
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.json();
	}

	/**
	 * Fetch all packages
	 * `GET https://headless.tebex.io/api/accounts/{token}/packages`
	 */
	async getAllPackages(
		ipAddress?: string,
		basketIdent?: string,
	): Promise<Tebex.Headless.Packages.Package[]> {
		let url = `https://headless.tebex.io/api/accounts/${this.#token}/packages`;
		const params = [];
		if (ipAddress)
			params.push(`ipAddress=${encodeURIComponent(ipAddress)}`);
		if (basketIdent)
			params.push(`basketIdent=${encodeURIComponent(basketIdent)}`);
		if (params.length > 0) {
			url += `?${params.join("&")}`;
		}
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.json();
	}

	/**
	 * Apply a creator code to a basket
	 * `POST https://headless.tebex.io/api/accounts/{token}/baskets/{basketIdent}/creator-codes`
	 */
	async applyCreatorCode(
		basketIdent: string,
		creatorCode: string,
	): Promise<Tebex.Headless.CreatorCodes.ApplyCreatorCodeResponse> {
		const body = { creator_code: creatorCode };
		const response = await fetch(
			`https://headless.tebex.io/api/accounts/${this.#token}/baskets/${basketIdent}/creator-codes`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			},
		);
		return response.json();
	}

	/**
	 * Remove a creator code from the basket
	 * `POST https://headless.tebex.io/api/accounts/{token}/baskets/{basketIdent}/creator-codes/remove`
	 */
	async removeCreatorCode(
		basketIdent: string,
	): Promise<Tebex.Headless.Baskets.BasketResponse> {
		const response = await fetch(
			`https://headless.tebex.io/api/accounts/${this.#token}/baskets/${basketIdent}/creator-codes/remove`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		return response.json();
	}

	/**
	 * Apply a gift card to a basket
	 * `POST https://headless.tebex.io/api/accounts/{token}/baskets/{basketIdent}/giftcards`
	 */
	async applyGiftCard(
		basketIdent: string,
		cardNumber: string,
	): Promise<Tebex.Headless.GiftCards.ApplyGiftCardResponse> {
		const body = { card_number: cardNumber };
		const response = await fetch(
			`https://headless.tebex.io/api/accounts/${this.#token}/baskets/${basketIdent}/giftcards`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			},
		);
		return response.json();
	}

	/**
	 * Remove a gift card from the basket
	 * `POST https://headless.tebex.io/api/accounts/{token}/baskets/{basketIdent}/giftcards/remove`
	 */
	async removeGiftCard(
		basketIdent: string,
		cardNumber: string,
	): Promise<void> {
		const body = { card_number: cardNumber };
		await fetch(
			`https://headless.tebex.io/api/accounts/${this.#token}/baskets/${basketIdent}/giftcards/remove`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			},
		);
	}

	/**
	 * Apply a coupon to a basket
	 * `POST https://headless.tebex.io/api/accounts/{token}/baskets/{basketIdent}/coupons`
	 */
	async applyCoupon(
		basketIdent: string,
		couponCode: string,
	): Promise<Tebex.Headless.Coupons.ApplyCouponResponse> {
		const body = { coupon_code: couponCode };
		const response = await fetch(
			`https://headless.tebex.io/api/accounts/${this.#token}/baskets/${basketIdent}/coupons`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			},
		);
		return response.json();
	}

	/**
	 * Remove a coupon from the basket
	 * `POST https://headless.tebex.io/api/accounts/{token}/baskets/{basketIdent}/coupons/remove`
	 */
	async removeCoupon(basketIdent: string): Promise<void> {
		await fetch(
			`https://headless.tebex.io/api/accounts/${this.#token}/baskets/${basketIdent}/coupons/remove`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}

	/**
	 * Add a package to a basket
	 * `POST https://headless.tebex.io/api/baskets/{basketIdent}/packages`
	 */
	async addPackage(
		basketIdent: string,
		packageId: number,
		quantity = 1,
	): Promise<Tebex.Headless.Baskets.BasketResponse> {
		const body = {
			package_id: packageId,
			quantity,
		};
		const response = await fetch(
			`https://headless.tebex.io/api/baskets/${basketIdent}/packages`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			},
		);
		return response.json();
	}

	/**
	 * Remove a package from a basket
	 * `POST https://headless.tebex.io/api/baskets/{basketIdent}/packages/remove`
	 */
	async removePackage(
		basketIdent: string,
		packageId: number,
	): Promise<Tebex.Headless.Baskets.BasketResponse> {
		const body = {
			package_id: packageId,
		};
		const response = await fetch(
			`https://headless.tebex.io/api/baskets/${basketIdent}/packages/remove`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			},
		);
		return response.json();
	}

	/**
	 * Update the quantity of a package in the basket
	 * `PUT https://headless.tebex.io/api/baskets/{basketIdent}/packages/{packageId}`
	 */
	async updatePackageQuantity(
		basketIdent: string,
		packageId: number,
		quantity: number,
	): Promise<Tebex.Headless.Baskets.BasketResponse> {
		const body = { quantity };
		const response = await fetch(
			`https://headless.tebex.io/api/baskets/${basketIdent}/packages/${packageId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			},
		);
		return response.json();
	}
}
