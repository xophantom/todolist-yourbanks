import { test, expect } from "@playwright/test";
import { env } from "./env";
import { ToDoPage } from "./pages/todo.page";

test("has title", async ({ page }) => {
  await page.goto(env.URL);

  await expect(page).toHaveTitle("Todo list");

  await expect(page.getByText("To do list")).toBeVisible();
});

test("has a few to do items", async ({ page }) => {
  await page.goto(env.URL);

  const toDoPage = new ToDoPage(page);

  await expect(toDoPage.getCheckbox("Do the laundry")).not.toBeChecked();

  await expect(toDoPage.getCheckbox("Wash dishes")).toBeChecked();
});

test("can check and uncheck an item", async ({ page }) => {
  await page.goto(env.URL);

  const toDoPage = new ToDoPage(page);

  await toDoPage.getCheckbox("Do the laundry").check();

  await expect(toDoPage.getCheckbox("Do the laundry")).toBeChecked();

  await toDoPage.getCheckbox("Do the laundry").uncheck();

  await expect(toDoPage.getCheckbox("Do the laundry")).not.toBeChecked();
});

test("can create, check, uncheck and delete an item", async ({ page }) => {
  const itemName = "test item";

  await page.goto(env.URL);

  const toDoPage = new ToDoPage(page);

  await toDoPage.createItem(itemName);

  await expect(toDoPage.getItem(itemName)).toBeVisible();

  await toDoPage.getCheckbox(itemName).check();

  await expect(toDoPage.getCheckbox(itemName)).toBeChecked();

  await toDoPage.getCheckbox(itemName).uncheck();

  await expect(toDoPage.getCheckbox(itemName)).not.toBeChecked();

  await toDoPage.deleteItem(itemName);

  await expect(toDoPage.getItem(itemName)).not.toBeVisible();
});
