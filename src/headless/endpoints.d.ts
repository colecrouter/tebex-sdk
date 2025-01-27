declare namespace Tebex {
	namespace Headless {
		namespace Accounts {
			interface WebstoreResponse {
				data: {
					schema: {
						/** The numeric ID of the store. Example: `1` */
						id: number;
						/** HTML description of the store. Example: `"<p>Lorem ipsum...</p>"` */
						description: string;
						/** The store's display name. Example: `"Minecraft Store"` */
						name: string;
						/** URL of the webstore. Example: `"https://example.tebex.io"` */
						webstore_url: string;
						/** Currency code. Example: `"USD"` */
						currency: string;
						/** Language code. Example: `"en"` */
						lang: string;
						/** Logo URL. Example: `"https://example.com/img.png"` */
						logo: string;
						/** Platform description. Example: `"Minecraft: Java Edition"` */
						platform_type: string;
						/** The platform's internal ID. Example: `"minecraft"` */
						platform_type_id: string;
						/** Creation timestamp. Example: `"2023-05-25T09:49:37+00:00"` */
						created_at: string;
					};
				};
			}

			interface PagesResponse {
				/** Array of CMS pages. */
				data: CMSPage[];
			}

			interface CMSPage {
				/** The page's numeric ID. Example: `127` */
				id: number;
				/** Creation date. Example: `"2023-11-13T20:59:54.000000Z"` */
				created_at: string;
				/** Last update date. Example: `"2023-11-13T20:59:54.000000Z"` */
				updated_at: string;
				/** Numeric ID of the account. Example: `244` */
				account_id: number;
				/** The page's title. Example: `"About"` */
				title: string;
				/** The page's slug. Example: `"about"` */
				slug: string;
				/** Indicates if the page is private. */
				private: boolean;
				/** Indicates if the page is hidden. */
				hidden: boolean;
				/** Indicates if the page is disabled. */
				disabled: boolean;
				/** Sequence number. */
				sequence: boolean;
				/** Page content in HTML. */
				content: string;
			}
		}

		namespace Baskets {
			interface BasketResponse {
				/** Basket data. */
				data: Basket;
			}

			interface Basket {
				/** Numeric ID of the basket. Example: `244127617` */
				id: number;
				/** Unique basket identifier. Example: `"1a-55fff..."` */
				ident: string;
				/** Indicates if checkout is complete. */
				complete: boolean;
				/** Basket email. Example: `"support@tebex.io"` */
				email: string | null;
				/** Basket username. */
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
				/** Taxes applied. Example: `0.11` */
				sales_tax: number;
				/** Total basket price. Example: `1.38` */
				total_price: number;
				/** Currency code. Example: `"USD"` */
				currency: string;
				packages: BasketPackage[];
				custom: Record<string, unknown>;
				links: BasketLinks;
			}

			interface BasketPackage {
				/** Quantity. Example: `2` */
				qty: number;
				/** Package type. Example: `"single"` */
				type: string;
				/** Revenue share settings. */
				revenue_share: RevenueShare[];
			}

			interface RevenueShare {
				/** Destination wallet reference. */
				wallet_ref: string;
				/** Absolute amount. Example: `0.5` */
				amount: number;
				/** Gateway fee in percent. Example: `50` */
				gateway_fee_percent: number;
			}

			interface BasketLinks {
				/** Payment URL. */
				payment: string;
				/** Checkout URL. */
				checkout: string;
			}

			interface AuthResponse {
				/** Platform name. Example: `"FiveM"` */
				name: string;
				/** Auth URL. Example: `"https://ident.tebex.io/"` */
				url: string;
			}
		}

		namespace Categories {
			interface CategoriesResponse {
				data: Category[];
			}

			interface Category {
				/** Numeric ID of the category. Example: `2678660` */
				id: number;
				/** Name of the category. Example: `"Test"` */
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
				/** Numeric ID of the package. Example: `6276316` */
				id: number;
				/** Name of the package. Example: `"Test Package"` */
				name: string;
				/** HTML package description. Example: `"<p>This is a test...</p>"` */
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
				/** Currency code. Example: `"USD"` */
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
				/** The updated basket. */
				data: Baskets.Basket;
			}
		}

		namespace GiftCards {
			interface ApplyGiftCardResponse {
				/** The updated basket. */
				data: Baskets.Basket;
			}
		}

		namespace Coupons {
			interface ApplyCouponResponse {
				/** The updated basket. */
				data: Baskets.Basket;
			}
		}
	}
}
