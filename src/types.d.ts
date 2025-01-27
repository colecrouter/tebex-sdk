declare namespace Tebex {
	interface PriceDetails {
		/** (float) Example: `1.27` */
		subTotal: number;
		/** (float) Example: `1.4` */
		fullPrice: number;
		discounts: Discount[];
		/** (float) Example: `0.13` */
		tax: number;
		/** (float) Example: `1.4` */
		total: number;
		surcharges?: unknown[];
		balance?: number;
		sales?: Sale[];
		giftcards?: GiftCard[];
		roundUp?: boolean | null;
	}

	/** Unfortunately this object is not documented anywhere in the Tebex API documentation. If you know more, please open a PR! */
	// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
	interface Discount {}

	interface Coupon {
		couponCode: string;
	}

	interface GiftCard {
		cardNumber: string;
	}

	interface Address {
		street: string;
		city: string;
		state: string;
		postalCode: string;
		country: string;
		name?: string;
		first_name?: string;
		last_name?: string;
		email?: string;
		state_id?: string | null;
		address?: string;
	}

	interface BasketRow {
		id: number;
		name: string;
		quantity: number;
		price: number;
		total: number;
	}

	interface BasketLinks {
		self: string;
		checkout: string;
		cancel: string;
		payment?: string;
	}

	interface RevenueShare {
		partnerId: string;
		percentage: number;
	}

	interface Package {
		id: number;
		name: string;
		price: number;
		description: string;
	}

	interface Sale {
		id: number;
		name: string;
		discountType: "percentage" | "amount";
		amount: number;
	}

	interface CheckoutItem {
		packageId: number;
		quantity: number;
	}
}
