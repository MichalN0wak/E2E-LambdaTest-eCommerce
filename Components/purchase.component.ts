import { Page, Locator, selectors } from "@playwright/test";
import { HomePageComponent } from "../Components/homePage.component";

export class PurchaseComponent {
  topProductsSection: Locator;
  topProductsNames: string[] = ["iMac", "HTC Touch HD", "HP LP3065"];
  topProductsSelectors: string[] = Array.from(
    { length: 10 },
    (_, i) => `#mz-product-listing-image-37213259-0-${i}`
  );
  topProducts: ReturnType<Page["locator"]>[] = [];
  topProduct1 = this.page.locator("#mz-product-listing-image-37213259-0-0");
  topProduct2 = this.page.locator("#mz-product-listing-image-37213259-0-1");
  // topProduct10 = this.page.locator("mz-product-listing-image-37213259-0-9");
  addToCartButtonTopProduct1: Locator;
  addToCartButtonTopProduct2: Locator;
  topProductsAddToCartButtonsSelectors: string[] = Array.from(
    { length: 10 },
    (_, i) => `.cart-${107 - i}[title="Add to Cart"]`
  );
  topProductsAddToCartButtons: ReturnType<Page["locator"]>[] = [];
  toastMessage = this.page.locator(
    "div.toast-body > div.d-flex.mb-3.align-items-start > p"
  );

  constructor(private page: Page, homePageComponent: HomePageComponent) {
    this.topProductsSection = homePageComponent.topProductsSection;
    this.topProducts = this.topProductsSelectors.map((selector) =>
      this.page.locator(selector)
    );
    this.topProductsAddToCartButtons =
      this.topProductsAddToCartButtonsSelectors.map((selector) =>
        this.page.locator(selector)
      );
  }

  async clickAddToCartButton(addToCartButtonLocator: Locator): Promise<void> {
    await this.topProductsSection.locator(addToCartButtonLocator).click();
  }
}