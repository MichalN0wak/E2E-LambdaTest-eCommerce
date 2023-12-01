import { Page } from "@playwright/test";

export class HomePageComponent {
  homeLogo = this.page.locator("#entry_217821");
  topProductsSection = this.page.locator("#entry_213257");
  cartButton = this.page.locator("#entry_217825");
  editCartButton = this.page.locator("#entry_217850");
  viewCartButton = this.page.getByRole("link", { name: "View Cart" });

  constructor(private page: Page) {}
}
