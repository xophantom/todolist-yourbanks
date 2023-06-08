import { useState } from "react";
import { ToDoItem } from "../types/ToDo";
import { v4 as uuidv4 } from "uuid";

export const useToDoList = (items?: ToDoItem[]) => {
  const orderItems = (toDoItems: ToDoItem[]) =>
    toDoItems.sort((a, b) => Number(a.checked) - Number(b.checked));

  const [toDoItems, setToDoItems] = useState<ToDoItem[]>(
    orderItems(
      items ?? [
        {
          checked: false,
          id: uuidv4(),
          title: "Do the laundry",
        },
        {
          checked: true,
          id: uuidv4(),
          title: "Wash dishes",
        },
      ]
    )
  );

  const pushToDoItem = (toDoItem: ToDoItem) =>
    setToDoItems((toDoItems) => orderItems([...toDoItems, toDoItem]));

  const removeToDoItem = ({ id: selectedId }: Pick<ToDoItem, "id">) =>
    setToDoItems((toDoItems) =>
      orderItems([...toDoItems].filter((item) => item.id !== selectedId))
    );

  const editToDoItem = (toDoItem: ToDoItem) =>
    setToDoItems((toDoItems) => {
      const nextToDoItems = [...toDoItems];

      const selectedItemIndex = nextToDoItems.findIndex(
        (item) => item.id === toDoItem.id
      );

      if (selectedItemIndex < 0) {
        throw new Error("To do item ID being edited does not exist!");
      }

      nextToDoItems.splice(selectedItemIndex, 1, toDoItem);

      return orderItems(nextToDoItems);
    });

  return { toDoItems, pushToDoItem, removeToDoItem, editToDoItem };
};
