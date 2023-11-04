import { test, expect } from "@playwright/test";
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

  test("login_when_credentials_are_correct", async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.login(loginData.userEmail, loginData.userPassword);

    // Assert
    await expect(page).toHaveURL(loginPage.expectedUrl);
  });
});
