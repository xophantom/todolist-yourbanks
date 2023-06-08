import { Page } from "playwright";

export class ToDoPage {
  constructor(private page: Page) {}

  getItem(name: string) {
    return this.page.getByRole("listitem").filter({ hasText: name });
  }

  getCheckbox(name: string) {
    return this.getItem(name).getByRole("checkbox");
  }

  deleteItem(name: string) {
    return this.getItem(name).getByRole("button", { name: "Delete" }).click();
  }

  async createItem(name: string) {
    await this.page.getByLabel("Title").click();

    await this.page.getByLabel("Title").fill("test item");
    await this.page.getByRole("button", { name: "Add" }).click();

    return this.getItem(name);
  }
}
