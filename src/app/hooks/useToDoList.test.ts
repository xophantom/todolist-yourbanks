import { act, renderHook } from "@testing-library/react";
import { useToDoList } from "./useToDoList";
import { ToDoItem } from "../types/ToDo";
import { makeToDoItem } from "../__mocks__/makeToDo";

const orderAndCompare = (toDoItems: ToDoItem[]) => {
  const sortedToDoItems = [...toDoItems].sort(
    (a, b) => Number(a.checked) - Number(b.checked)
  );
  return JSON.stringify(sortedToDoItems) === JSON.stringify(toDoItems);
};

describe("useToDoList()", () => {
  it("should start with at least 2 ordered items", () => {
    const { result } = renderHook(() => useToDoList());
    expect(orderAndCompare(result.current.toDoItems)).toBeTruthy();
    expect(result.current.toDoItems.length > 1).toBeTruthy();
  });

  it("should add new to do items in order", () => {
    const { result } = renderHook(() => useToDoList());
    act(() => {
      result.current.pushToDoItem({
        checked: false,
        id: "mock-uuid",
        title: "test unchecked to do item",
      });
      result.current.pushToDoItem({
        checked: true,
        id: "mock-uuid",
        title: "test checked to do item",
      });
    });

    expect(
      orderAndCompare(result.current.toDoItems) &&
        result.current.toDoItems.find(
          (item) => item.title === "test unchecked to do item"
        ) &&
        result.current.toDoItems.find(
          (item) => item.title === "test checked to do item"
        )
    ).toBeTruthy();
  });

  it("should edit to do items in order", () => {
    const items = [makeToDoItem(), makeToDoItem()];
    items[0].id = "mock-uuid-1";
    items[1].id = "mock-uuid-2";

    const { result } = renderHook(() => useToDoList(items));

    act(() => {
      result.current.editToDoItem({
        checked: true,
        id: items[0].id,
        title: items[0].title,
      });
      result.current.editToDoItem({
        checked: false,
        id: items[1].id,
        title: items[1].title,
      });
    });

    expect(
      orderAndCompare(result.current.toDoItems) &&
        result.current.toDoItems.find((item) => item.id === items[0].id) &&
        result.current.toDoItems.find((item) => item.id === items[1].id)
    ).toBeTruthy();
  });

  it("should remove to do items in order", () => {
    const items = [makeToDoItem(), makeToDoItem(), makeToDoItem()];
    items[0].id = "mock-uuid-1";
    items[1].id = "mock-uuid-2";
    items[2].id = "mock-uuid-3";
    const { result } = renderHook(() => useToDoList(items));

    act(() => {
      result.current.removeToDoItem({
        id: items[1].id,
      });
    });

    expect(
      orderAndCompare(result.current.toDoItems) &&
        !result.current.toDoItems.find((item) => item.id === items[1].id)
    ).toBeTruthy();
  });
});
