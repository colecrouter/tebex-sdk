declare namespace Tebex {
	namespace Checkout {
		interface FetchBasketResponse {
			/** Unique basket identifier. Example: `"1a-55fff4107740a1f40d844ff89607557f45bfafb3"` */
			ident: string;
			/** Example: `"2022-10-25 15:15:40"` */
			expire: string;
			/** (float) Example: `1.27` */
			price: number;
			/** Detailed pricing information. */
			priceDetails: PriceDetails;
			/** Indicates if the payment method was updated. */
			isPaymentMethodUpdate: boolean;
			/** A return URL. Example: `"https://example.com/return"` */
			returnUrl: string | null;
			/** Indicates if the basket is complete. */
			complete: boolean;
			/** (integer) Example: `0` */
			tax: number;
			username: string | null;
			/** Array of discount objects. */
			discounts: Discount[];
			/** Array of coupon objects. */
			coupons: Coupon[];
			/** Array of gift card objects. */
			giftcards: GiftCard[];
			/** Address information. */
			address: Address;
			rows: BasketRow[];
			/** A unique fingerprint for the basket. */
			fingerprint: string | null;
			/** Creator code applied. Example: `"text"` */
			creator_code: string;
			/** Enables rounding up. */
			roundup: boolean | null;
			/** Cancel URL. Example: `"https://example.com/cancel"` */
			cancel_url: string;
			/** Completion URL. Example: `"https://example.com/thank-you"` */
			complete_url: string | null;
			/** Auto redirect on completion. */
			complete_auto_redirect: boolean;
			/** Any custom data for the basket. */
			custom: object | null;
			/** Basket links object. */
			links: BasketLinks;
		}

		interface CreateBasketRequest {
			return_url: string;
			complete_url: string;
			custom?: object;
			/** Example: `"Neil"` */
			first_name: string;
			/** Example: `"McNeil"` */
			last_name: string;
			/** Example: `"example@tebex.io"` */
			email: string;
			/** Example: `"2025-01-27T18:09:51Z"` */
			expires_at: string;
			complete_auto_redirect: boolean;
			/** Example: `"US"` */
			country: string;
			/** Example: `"text"` */
			creator_code: string;
			/** Example: `"1.2.3.4"` */
			ip: string;
			/** IP address of the user. Example: `"1.2.3.4"` */
		}

		interface AddPackageRequest {
			/** Package details to add. */
			package: Package;
			/** (integer) Example: `2` */
			qty: number;
			/** Package type: `"single"` or `"subscription"`. */
			type: "single" | "subscription";
			/** Revenue share details. */
			revenue_share?: RevenueShare[] | null;
		}

		interface AddSaleRequest {
			/** Example: `"Test Sale"` */
			name: string;
			discount_type: "percentage" | "amount";
			/** Discount amount. Example: `4.99` */
			amount: number;
		}

		interface CheckoutRequest {
			basket: CreateBasketRequest;
			/** Array of items to be added to the basket. */
			items: CheckoutItem[];
			Sale?: Sale;
		}

		interface Error {
			type: string;
			title: string;
			status: number;
			detail: string;
			/** URL identifying the error instance. */
			instance: string;
		}

		interface PaymentResponse {
			/** Example: `"tbx-26929122a56954-0e15be"` */
			transaction_id: string;
			/** Payment status object. */
			status: {
				id: number;
				description: string;
			};
			payment_sequence: string;
			created_at: string;
			price: Price;
			fees: {
				tax: Price;
				gateway: Price;
			};
			/** Customer data. */
			customer: {
				first_name: string;
				last_name: string;
				email: string;
				ip: string;
				username: string;
				/** Indicates if the customer has given marketing consent. */
				marketing_consent: boolean;
				country: string;
				postal_code: string;
			};
			products: Array<Product>;
			coupons: Coupon[];
			gift_cards: GiftCard[];
			recurring_payment_reference: string | null;
		}

		/** Represents a single product in the payment. */
		interface Product {
			id: string;
			name: string;
			/** (integer) Example: `2`  */
			quantity: number;
			base_price: Price;
			paid_price: Price;
			variables: string[];
			/** Expiration date/time. Example: `"2025-01-27T14:58:00.254Z"` */
			expires_at: string;
			username: string;
		}

		interface RefundPaymentResponse extends PaymentResponse {}

		interface RecurringPaymentResponse {
			id: number;
			created_at: string;
			updated_at: string;
			paused_at: string | null;
			paused_until: string | null;
			/** Example: `"2022-12-30T16:43:06"` */
			next_payment_date: string;
			/** Example:"88" */
			reference: string;
			account_id: number;
			/** Two-character payment interval. Example: `"P2W"` */
			interval: string;
			cancelled_at: string | null;
			cancellation_requested_at: string | null;
			status: {
				id: number;
				class: string;
				description: string;
				active: number;
			};
			amount: RecurringPrice;
			cancel_reason: string | null;
			links: {
				initial_payment: string;
				payment_history: string[];
			};
		}

		/** Request body for updating recurring payments. */
		interface UpdateRecurringPaymentRequest {
			/** Items to update in the recurring payment. */
			items: CheckoutItem[];
		}

		interface PauseRecurringPaymentRequest {
			/** String status. `"Paused"` or `"Active"`. */
			status: "Paused" | "Active";
			/** Optional date/time to resume. */
			paused_until?: string;
		}

		interface Price {
			/** (float) Monetary amount. Example: `5.35` */
			amount: number;
			/** Three-letter currency code. Example: `"USD"` */
			currency: string;
		}

		interface RecurringPrice extends Price {
			/** Interval period. Example: `"P2W"` */
			period: string;
		}
	}
}
