import { Page } from "@playwright/test";

export class CartComponent {
  removeFromCartButton = this.page.locator(".btn-danger");
  emptyCartContent = this.page.locator("#content");
  emptyCartExpectedMessage = "Your shopping cart is empty!";
  cartModificationSuccessAlert = this.page.locator(".alert-success");

  async countRemoveButtons(): Promise<number> {
    await this.page.waitForSelector(".btn-danger", { state: "attached" });
    const numberOfRemoveButtons = await this.removeFromCartButton.count();
    return numberOfRemoveButtons;
  }

  constructor(private page: Page) {}
}
