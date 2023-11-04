import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  loginInput = this.page.locator("#input-email");
  passwordInput = this.page.locator("#input-password");
  executeLoginButton = this.page.getByRole("button", { name: "Login" });
  expectedUrl =
    "https://ecommerce-playground.lambdatest.io/index.php?route=account/account";
  // errorMessageBar = this.page.getByRole('link', { name: ' Warning: No match for E-Mail Address and/or Password.'});
  errorMessageBar = this.page.locator(
    "#account-login > div.alert.alert-danger.alert-dismissible"
  );

  async fillingCredentials(
    userEmail: string,
    userPassword: string
  ): Promise<void> {
    await this.loginInput.fill(userEmail);
    await this.passwordInput.fill(userPassword);
    await this.passwordInput.blur();
  }

  async login(userEmail: string, userPassword: string): Promise<void> {
    await this.fillingCredentials(userEmail, userPassword);
    await this.executeLoginButton.click();
  }

  async exeedLoginAttempts(
    userEmail: string,
    numberOfAttempts: number
  ): Promise<void> {
    await this.fillingCredentials(userEmail, "");
    for (let i = 0; i < numberOfAttempts; i++) {
      await this.executeLoginButton.click();
    }
  }
}
