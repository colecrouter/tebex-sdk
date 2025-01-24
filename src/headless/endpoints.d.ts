declare namespace Tebex {
	namespace Headless {
		namespace Accounts {
			interface WebstoreResponse {
				data: {
					schema: {
						id: number;
						description: string;
						name: string;
						webstore_url: string;
						currency: string;
						lang: string;
						logo: string;
						platform_type: string;
						platform_type_id: string;
						created_at: string;
					};
				};
			}

			interface PagesResponse {
				data: CMSPage[];
			}

			interface CMSPage {
				id: number;
				created_at: string;
				updated_at: string;
				account_id: number;
				title: string;
				slug: string;
				private: boolean;
				hidden: boolean;
				disabled: boolean;
				sequence: boolean;
				content: string;
			}
		}

		namespace Baskets {
			interface BasketResponse {
				data: Basket;
			}

			interface Basket {
				id: number;
				ident: string;
				complete: boolean;
				email: string | null;
				username: string | null;
				coupons: Coupon[];
				giftcards: GiftCard[];
				creator_code: string;
				cancel_url: string;
				complete_url: string | null;
				complete_auto_redirect: boolean;
				country: string;
				ip: string;
				username_id: number;
				base_price: number;
				sales_tax: number;
				total_price: number;
				currency: string;
				packages: BasketPackage[];
				custom: Record<string, unknown>;
				links: BasketLinks;
			}

			interface BasketPackage {
				qty: number;
				type: string;
				revenue_share: RevenueShare[];
			}

			interface RevenueShare {
				wallet_ref: string;
				amount: number;
				gateway_fee_percent: number;
			}

			interface BasketLinks {
				payment: string;
				checkout: string;
			}

			interface AuthResponse {
				name: string;
				url: string;
			}
		}

		namespace Categories {
			interface CategoriesResponse {
				data: Category[];
			}

			interface Category {
				id: number;
				name: string;
				slug: string;
				description: string;
				packages: Package[];
				order: number;
				display_type: string;
			}
		}

		namespace Packages {
			interface PackageResponse {
				data: Package[];
			}

			interface Package {
				id: number;
				name: string;
				description: string;
				image: string | null;
				type: string;
				category: {
					id: number;
					name: string;
				};
				base_price: number;
				sales_tax: number;
				total_price: number;
				currency: string;
				discount: number;
				disable_quantity: boolean;
				disable_gifting: boolean;
				expiration_date: string | null;
				created_at: string;
				updated_at: string;
			}
		}

		namespace CreatorCodes {
			interface ApplyCreatorCodeResponse {
				data: Baskets.Basket;
			}
		}

		namespace GiftCards {
			interface ApplyGiftCardResponse {
				data: Baskets.Basket;
			}
		}

		namespace Coupons {
			interface ApplyCouponResponse {
				data: Baskets.Basket;
			}
		}
	}
}
