/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import { ToDoList } from "./ToDoList";
import React, { ReactNode } from "react";
import { ToDoContext } from "../../context/ToDoContext";
import { makeToDoItem } from "../../__mocks__/makeToDo";

jest.mock("../ToDoForm/ToDoForm", () => ({
  ToDoForm: () => <h1>To Do Form</h1>,
}));
jest.mock("../ToDoItem/ToDoItem", () => ({
  ToDoItem: () => <h1>To Do Item</h1>,
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <ToDoContext.Provider
    value={{
      editToDoItem: jest.fn(),
      pushToDoItem: jest.fn(),
      removeToDoItem: jest.fn(),
      toDoItems: [makeToDoItem()],
    }}
  >
    {children}
  </ToDoContext.Provider>
);

describe("<ToDoList />", () => {
  it("should always render to do form", () => {
    render(<ToDoList />, { wrapper });

    expect(screen.getByText("To Do Form")).toBeInTheDocument();
  });

  it("should render to do items", () => {
    render(<ToDoList />, { wrapper });

    expect(screen.getByText("To Do Item")).toBeInTheDocument();
  });
});
