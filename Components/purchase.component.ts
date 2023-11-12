import { Page, Locator } from "@playwright/test";
import { HomePageComponent } from "../Components/homePage.component";

export class PurchaseComponent {
  topProductsSection: Locator;
  topProductsNames: Array<string> = [];
  firstTopProduct = this.page.locator("#mz-product-listing-image-37213259-0-0");
  addToCartButton: Locator;
  toastMessage = this.page.locator(
    "div.toast-body > div.d-flex.mb-3.align-items-start > p"
  );

  constructor(private page: Page, homePageComponent: HomePageComponent) {
    this.topProductsSection = homePageComponent.topProductsSection;
    this.addToCartButton = this.topProductsSection.locator(
      '.cart-107[title="Add to Cart"]'
    );
    this.topProductsNames = ["iMac", "HTC Touch HD", "HP LP3065"];
  }
}
