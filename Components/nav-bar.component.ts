import { Page } from "@playwright/test";

export class NavBarComponent {
  constructor(private page: Page) {}

  myAccountButton = this.page.getByRole("button", { name: "My account" });
  loginButton = this.page.getByRole("link", { name: "Login" });
}
