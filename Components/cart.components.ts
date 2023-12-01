import { Page } from "@playwright/test";

export class CartComponent {
  removeFromCartButton = this.page.locator(".btn-danger");
  emptyCartContent = this.page.locator("#content");
  emptyCartExpectedMessage = "Your shopping cart is empty!";

  constructor(private page: Page) {}
}
