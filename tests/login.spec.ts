import { test, expect, chromium } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../Pages/login.page";
import { NavBarComponent } from "../Components/nav-bar.component";

test.describe("Login tests", () => {
  let navBar: NavBarComponent;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    const navBar = new NavBarComponent(page);

    await page.goto("/");
    await navBar.myAccountButton.hover();
    await page.getByRole("link", { name: "Login" }).click();
  });

  test.afterEach('Status check', async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} test with status ${testInfo.status}`);
  
    if (testInfo.status !== testInfo.expectedStatus)
      console.log(`Failed ${testInfo.title} test`);
  });

  test("login_when_credentials_are_correct", async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.login(loginData.userEmail, loginData.userPassword);

    // Assert
    await expect(page).toHaveURL(loginPage.expectedUrl);
  });

  test("display_message_when_password_is_wrong", async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.login(loginData.userEmail, "");

    // Assert
    await expect(loginPage.errorMessageBar).toHaveText(
      "Warning: No match for E-Mail Address and/or Password."
    );
  });

  test("display_message_when_exeeded_login_attempts", async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.exeedLoginAttempts(loginData.userEmailExeed, 6);

    // Assert
    await expect(loginPage.errorMessageBar).toHaveText(
      "Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour."
    );
  });
});
