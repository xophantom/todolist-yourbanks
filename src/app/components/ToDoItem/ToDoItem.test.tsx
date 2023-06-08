import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToDoItem } from "./ToDoItem";
import React, { ReactNode } from "react";
import { makeToDoItem } from "../../__mocks__/makeToDo";
import { ToDoContext } from "../../context/ToDoContext";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useTheme: () => ({ palette: { grey: { 600: "grey" } } }),
}));

const defaultProps: React.ComponentProps<typeof ToDoItem> = {
  item: makeToDoItem(),
};

const mockContext = {
  editToDoItem: jest.fn(),
  pushToDoItem: jest.fn(),
  removeToDoItem: jest.fn(),
  toDoItems: [makeToDoItem()],
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <ToDoContext.Provider value={mockContext}>{children}</ToDoContext.Provider>
);

describe("<ToDoItem />", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render to do item title", () => {
    render(<ToDoItem {...defaultProps} />, { wrapper });

    expect(screen.getByText(defaultProps.item.title)).toBeInTheDocument();
  });

  it("should render checked checkbox", () => {
    render(<ToDoItem item={{ ...defaultProps.item, checked: true }} />, {
      wrapper,
    });

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("should render unchecked checkbox", () => {
    render(<ToDoItem item={{ ...defaultProps.item, checked: false }} />, {
      wrapper,
    });

    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("should gray out and strikethrough the title of an unchecked item", () => {
    render(<ToDoItem item={{ ...defaultProps.item, checked: true }} />, {
      wrapper,
    });

    const title = screen.getByText(defaultProps.item.title);

    expect(getComputedStyle(title).color).toEqual("grey");
    expect(getComputedStyle(title).textDecoration).toEqual("line-through");
  });

  it("should not gray out and strikethrough the title of an checked item", () => {
    render(<ToDoItem item={{ ...defaultProps.item, checked: false }} />, {
      wrapper,
    });

    const title = screen.getByText(defaultProps.item.title);

    expect(getComputedStyle(title).color).toEqual("");
    expect(getComputedStyle(title).textDecoration).toEqual("");
  });

  it("should delete the to do item", async () => {
    render(<ToDoItem item={{ ...defaultProps.item }} />, { wrapper });

    screen.getByLabelText("Delete").click();

    waitFor(() =>
      expect(mockContext.removeToDoItem).toHaveBeenCalledWith({
        id: defaultProps.item.id,
      })
    );
  });

  it("should trigger onChange when clicking on the checkbox", async () => {
    render(<ToDoItem item={{ ...defaultProps.item }} />, { wrapper });

    screen.getByRole("checkbox").click();

    waitFor(() =>
      expect(mockContext.editToDoItem).toHaveBeenCalledWith({
        ...defaultProps.item,
        checked: !defaultProps.item.checked,
      })
    );
  });
});
