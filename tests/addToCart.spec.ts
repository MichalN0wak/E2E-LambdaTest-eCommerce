import { test, expect, Locator } from "@playwright/test";
import { NavBarComponent } from "../Components/nav-bar.component";
import { LoginPage } from "../Pages/login.page";
import { loginData } from "../test-data/login.data";
import { HomePageComponent } from "../Components/homePage.component";
import { PurchaseComponent } from "../Components/purchase.component";

test.describe("Product search and add to cart tests", () => {
  let navBar: NavBarComponent;
  let loginPage: LoginPage;
  let homePageComponent: HomePageComponent;
  let purchaseComponent: PurchaseComponent;

  test.beforeEach(async ({ page }) => {
    navBar = new NavBarComponent(page);
    loginPage = new LoginPage(page);
    homePageComponent = new HomePageComponent(page);
    purchaseComponent = new PurchaseComponent(page, homePageComponent);

    await page.goto("/");
    await navBar.myAccountButton.hover();
    await navBar.loginButton.click();
    await loginPage.login(loginData.userEmail, loginData.userPassword);
    await homePageComponent.homeLogo.click();
  });

  test.afterEach('Status check', async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} test with status ${testInfo.status}`);
  
    if (testInfo.status !== testInfo.expectedStatus)
      console.log(`Failed ${testInfo.title} test`);
  });

  test("add_first_top_product_to_cart", async ({ page }) => {
    // Arrange
    const buyedProduct = purchaseComponent.topProducts[0];
    const buyedProductName = purchaseComponent.topProductsNames[0];
    // Act
    await homePageComponent.topProductsSection.scrollIntoViewIfNeeded();
    await buyedProduct.hover();
    await purchaseComponent.clickAddToCartButton(
      purchaseComponent.topProductsAddToCartButtons[0]
    );

    // Assert
    await expect(purchaseComponent.toastMessage).toHaveText(
      `Success: You have added ${buyedProductName} to your shopping cart!`
    );
  });

  test("add_selected_top_product_to_cart", async ({ page }) => {
    // Arrange
    const buyedProduct = purchaseComponent.topProducts[6];
    const buyedProductName = purchaseComponent.topProductsNames[1];
    // Act
    await homePageComponent.topProductsSection.scrollIntoViewIfNeeded();
    await buyedProduct.hover();
    await purchaseComponent.clickAddToCartButton(
      purchaseComponent.topProductsAddToCartButtons[6]
    );

    // Assert
    await expect(purchaseComponent.toastMessage).toHaveText(
      `Success: You have added ${buyedProductName} to your shopping cart!`
    );
  });

  test("add_random_top_product_to_cart", async ({ page }) => {
    // Arrange
    let buyedProduct: Locator;
    let randomProductIndex: number =
      await purchaseComponent.selectRandomTopProduct();
    buyedProduct = purchaseComponent.topProducts[randomProductIndex];
    let buyedProductName =
      purchaseComponent.topProductsNames[randomProductIndex];

    // Act
    await homePageComponent.topProductsSection.scrollIntoViewIfNeeded();
    await buyedProduct.hover();
    await purchaseComponent.clickAddToCartButton(
      purchaseComponent.topProductsAddToCartButtons[randomProductIndex]
    );

    // Assert
    if (randomProductIndex >= 0 && randomProductIndex < 4) {
      await expect(purchaseComponent.toastMessage).toHaveText(
        `Success: You have added ${purchaseComponent.topProductsNames[0]} to your shopping cart!`
      );
    } else if (randomProductIndex >= 4 && randomProductIndex < 8) {
      await expect(purchaseComponent.toastMessage).toHaveText(
        `Success: You have added ${purchaseComponent.topProductsNames[1]} to your shopping cart!`
      );
    } else if (randomProductIndex >= 8 && randomProductIndex < 10) {
      await expect(purchaseComponent.toastMessage).toHaveText(
        `Success: You have added ${purchaseComponent.topProductsNames[2]} to your shopping cart!`
      );
    } else {
      console.log("out of index");
    }
  });
});
