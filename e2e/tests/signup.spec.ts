import { test, expect } from '@playwright/test';

test('Deve criar uma conta', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
    await page.locator(".input-name").fill("John Doe");
    await page.locator(".input-email").fill("john.doe@example.com");
    await page.locator(".input-document").fill("123.456.789-09");
    await page.locator(".input-password").fill("THOmoraes123");
    await page.locator(".button-signup").click();
  
    await page.waitForTimeout(200); 
  
    expect(page.locator(".span-message")).toHaveText('success');
});

test('Não deve criar uma conta se nome for inválido', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
    await page.locator(".input-name").fill("John");
    await page.locator(".input-email").fill("john.doe@example.com");
    await page.locator(".input-document").fill("123.456.789-09");
    await page.locator(".input-password").fill("THOmoraes123");
    await page.locator(".button-signup").click();
  
    await page.waitForTimeout(200); 
  
    expect(page.locator(".span-message")).toHaveText('Invalid name');
});