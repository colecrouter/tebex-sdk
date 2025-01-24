declare namespace Tebex {
	namespace Checkout {
		interface FetchBasketResponse {
			ident: string;
			expire: string;
			price: number;
			priceDetails: PriceDetails;
			isPaymentMethodUpdate: boolean;
			returnUrl: string | null;
			complete: boolean;
			tax: number;
			username: string | null;
			discounts: Discount[];
			coupons: Coupon[];
			giftcards: GiftCard[];
			address: Address;
			rows: BasketRow[];
			fingerprint: string | null;
			creator_code: string;
			roundup: boolean | null;
			cancel_url: string;
			complete_url: string | null;
			complete_auto_redirect: boolean;
			custom: object | null;
			links: BasketLinks;
		}

		interface CreateBasketRequest {
			return_url: string;
			complete_url: string;
			custom?: object;
			first_name: string;
			last_name: string;
			email: string;
			expires_at: string;
			complete_auto_redirect: boolean;
			country: string;
			creator_code: string;
			ip: string;
		}

		interface AddPackageRequest {
			package: Package;
			qty: number;
			type: "single" | "subscription";
			revenue_share?: RevenueShare[] | null;
		}

		interface AddSaleRequest {
			name: string;
			discount_type: "percentage" | "amount";
			amount: number;
		}

		interface CheckoutRequest {
			basket: CreateBasketRequest;
			items: CheckoutItem[];
			Sale?: Sale;
		}

		interface Error {
			type: string;
			title: string;
			status: number;
			detail: string;
			instance: string;
		}

		interface PaymentResponse {
			transaction_id: string;
			status: {
				id: number;
				description: string;
			};
			payment_sequence: string;
			created_at: string;
			price: {
				amount: number;
				currency: string;
			};
			fees: {
				tax: {
					amount: number;
					currency: string;
				};
				gateway: {
					amount: number;
					currency: string;
				};
			};
			customer: {
				first_name: string;
				last_name: string;
				email: string;
				ip: string;
				username: string;
				marketing_consent: boolean;
				country: string;
				postal_code: string;
			};
			products: Array<{
				id: string;
				name: string;
				quantity: number;
				base_price: {
					amount: number;
					currency: string;
				};
				paid_price: {
					amount: number;
					currency: string;
				};
				variables: string[];
				expires_at: string;
				username: string;
			}>;
			coupons: Coupon[];
			gift_cards: GiftCard[];
			recurring_payment_reference: string | null;
		}

		interface RefundPaymentResponse extends PaymentResponse {}

		interface RecurringPaymentResponse {
			id: number;
			created_at: string;
			updated_at: string;
			paused_at: string | null;
			paused_until: string | null;
			next_payment_date: string;
			reference: string;
			account_id: number;
			interval: string;
			cancelled_at: string | null;
			cancellation_requested_at: string | null;
			status: {
				id: number;
				class: string;
				description: string;
				active: number;
			};
			amount: {
				amount: number;
				tax: number;
				period: string;
			};
			cancel_reason: string | null;
			links: {
				initial_payment: string;
				payment_history: string[];
			};
		}

		interface UpdateRecurringPaymentRequest {
			items: CheckoutItem[];
		}

		interface PauseRecurringPaymentRequest {
			status: "Paused" | "Active";
			paused_until?: string;
		}
	}
}
