declare namespace Tebex {
	namespace Webhooks {
		interface WebhookResponse<T extends WebhookType> {
			id: string;
			type: T;
			date: string;
			subject: WebhookSubject<T>;
		}

		interface PaymentWebhookSubject {
			transaction_id: string;
			status: Status;
			payment_sequence: string;
			created_at: string;
			price: {
				amount: number;
				currency: string;
			};
			price_paid: {
				amount: number;
				currency: string;
			};
			payment_method: {
				name: string;
				refundable: boolean;
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
				username: {
					id: string;
					username: string;
				};
				marketing_consent: boolean;
				country: string;
				postal_code: string;
			};
			products: Array<{
				id: number;
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
				variables: Array<{
					identifier: string;
					option: string;
				}>;
				expires_at: string | null;
				custom: object | null;
				username: {
					id: string;
					username: string;
				};
			}>;
			coupons: Coupon[];
			gift_cards: GiftCard[];
			recurring_payment_reference: string | null;
			decline_reason: {
				code: string;
				message: string;
			};
		}

		interface RecurringPaymentWebhookSubject {
			reference: string;
			created_at: string;
			next_payment_at: string;
			status: {
				id: number;
				description: string;
			};
			initial_payment: PaymentWebhookSubject;
			last_payment: PaymentWebhookSubject;
			fail_count: number;
			price: {
				amount: number;
				currency: string;
			};
			cancelled_at: string | null;
			cancel_reason: string | null;
		}

		type WebhookType =
			| "payment.completed"
			| "payment.declined"
			| "payment.refunded"
			| "payment.dispute.opened"
			| "payment.dispute.won"
			| "payment.dispute.lost"
			| "payment.dispute.closed"
			| "recurring-payment.started"
			| "recurring-payment.renewed"
			| "recurring-payment.ended"
			| "recurring-payment.cancellation.requested"
			| "recurring-payment.cancellation.aborted"
			| "validation.webhook";

		type WebhookSubject<T> = T extends `payment.${infer U}`
			? { type: `payment.${U}`; subject: PaymentWebhookSubject }
			: T extends `recurring-payment.${infer U}`
				? {
						type: `recurring-payment.${U}`;
						subject: RecurringPaymentWebhookSubject;
					}
				: T extends `validation.${infer U}`
					? { type: `validation.${U}`; subject: unknown }
					: never;
	}

	type Status =
		| {
				id: 2;
				description: "Active";
		  }
		| {
				id: 3;
				description: "Overdue";
		  }
		| {
				id: 4;
				description: "Expired";
		  }
		| {
				id: 5;
				description: "Cancelled";
		  }
		| {
				id: 7;
				description: "Pending Downgrade";
		  };
}
