import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React, { ReactNode } from "react";
import { ToDoForm } from "./ToDoForm";
import { ToDoContext } from "../../context/ToDoContext";
import { makeToDoItem } from "../../__mocks__/makeToDo";

jest.mock("uuid", () => ({ v4: () => "mock-uuid" }));

const mockContext = {
  editToDoItem: jest.fn(),
  pushToDoItem: jest.fn(),
  removeToDoItem: jest.fn(),
  toDoItems: [makeToDoItem()],
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <ToDoContext.Provider value={mockContext}>{children}</ToDoContext.Provider>
);

describe("<ToDoForm />", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should add new to do item", async () => {
    render(<ToDoForm />, { wrapper });

    const field = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button");

    fireEvent.change(field, { target: { value: "Test to do" } });
    fireEvent.click(submitButton);

    waitFor(() => {
      expect(mockContext.pushToDoItem).toHaveBeenCalledWith({
        id: "mock-uuid",
        checked: false,
        title: "test to do",
      });
    });

    waitFor(() => {
      expect(field).toHaveValue("");
    });
  });

  it("should display error message not add new to do item if the title is empty", async () => {
    render(<ToDoForm />, { wrapper });

    const field = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button");

    fireEvent.change(field, { target: { value: "" } });
    fireEvent.click(submitButton);

    waitFor(() => {
      expect(mockContext.pushToDoItem).not.toHaveBeenCalled();
      expect(screen.getByText("Title is required")).toBeInTheDocument();
    });
  });
});
