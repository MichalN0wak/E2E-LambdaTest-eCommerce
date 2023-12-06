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

  async selectRandomTopProduct(): Promise<number> {
    let randomIndex = Math.floor(Math.random() * this.topProducts.length);
    return randomIndex;
  }

  async clickAddToCartButtonOfRandomProduct(
    randomProduct: Locator
  ): Promise<void> {
    await this.topProductsSection.locator(randomProduct).click();
  };

  async amountOfProductsToAddToCart(): Promise<number> {
    let productsAmount = Math.floor(Math.random() * this.topProducts.length);
    return productsAmount;
  }
}
