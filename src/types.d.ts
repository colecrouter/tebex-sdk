declare namespace Tebex {
	interface PriceDetails {
		subtotal: number;
		tax: number;
		total: number;
		currency: string;
	}

	interface Discount {
		type: "percentage" | "amount";
		value: number;
		description: string;
	}

	interface Coupon {
		code: string;
		discount: Discount;
		expirationDate: string;
	}

	interface GiftCard {
		cardNumber: string;
		balance: number;
	}

	interface Address {
		street: string;
		city: string;
		state: string;
		postalCode: string;
		country: string;
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
