import { Page } from "@playwright/test";

export class HomePageComponent {
  homeLogo = this.page.locator("#entry_217821");
  topProductsSection = this.page.locator("#entry_213257");

  constructor(private page: Page) {}
}
