const { test, expect } = require('@playwright/test');

test.describe('Testes de Login', () => {
    test('Login com credenciais válidas', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Login com credenciais inválidas', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', 'invalid_user');
        await page.fill('#password', 'invalid_password');
        await page.click('#login-button');
        await expect(page.locator('.error-message-container')).toBeVisible();
    });
});

test.describe('Testes de Carrinho', () => {
    test('Adicionar item ao carrinho', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await page.click('text=Add to cart');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    test('Remover item do carrinho', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await page.click('text=Add to cart');
        await page.click('text=Remove');
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    });

    test('Compra de um item com sucesso', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await page.waitForSelector('button[id^="add-to-cart"]');
        await page.click('button[id^="add-to-cart"]');
        await page.click('.shopping_cart_link');
        await page.click('text=Checkout');
        await page.fill('#first-name', 'John');
        await page.fill('#last-name', 'Doe');
        await page.fill('#postal-code', '12345');
        await page.click('text=Continue');
        await page.waitForSelector('button:has-text("Finish")');
        await page.click('button:has-text("Finish")');
        await page.waitForSelector('.complete-header');
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!', { ignoreCase: true });
        await page.waitForSelector('#back-to-products');
        await page.click('#back-to-products');
    });

    test('Finalização da compra com dados incompletos (falha)', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await page.click('text=Add to cart');
        await page.click('.shopping_cart_link');
        await page.click('text=Checkout');
        await page.fill('#first-name', 'John');
        await page.click('text=Continue');
        await expect(page.locator('.error-message-container')).toBeVisible();
    });

    test('Tentativa de compra sem adicionar itens ao carrinho (falha)', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await page.click('.shopping_cart_link');
        await page.click('text=Checkout');
        await expect(page.locator('.error-message-container')).toBeVisible();
    });
});

test('Visualizar detalhes de um item', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('.inventory_item_name');
    await expect(page.locator('.inventory_details_name')).toBeVisible();
});

test.describe('Testes de Funcionalidade', () => {
    test('Alteração da ordem dos itens', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await page.selectOption('.product_sort_container', 'lohi');
        const firstItemPrice = await page.locator('.inventory_item_price').first().textContent();
        expect(firstItemPrice).toBe('$7.99');
    });

    test('Logout com sucesso', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await page.click('#react-burger-menu-btn');
        await page.click('#logout_sidebar_link');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
});
