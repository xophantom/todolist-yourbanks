import { useEffect, useState } from "react";
import { ToDoItem } from "../types/ToDo";
import { v4 as uuidv4 } from "uuid";

export const useToDoList = () => {
  const [toDoItems, setToDoItems] = useState<ToDoItem[]>([
    {
      checked: true,
      id: uuidv4(),
      title: "Wash dishes",
    },
    {
      checked: false,
      id: uuidv4(),
      title: "Do the laundry",
    },
  ]);

  useEffect(() => {
    const orderedToDoItems = [...toDoItems].sort(
      (a, b) => Number(a.checked) - Number(b.checked)
    );

    if (JSON.stringify(orderedToDoItems) !== JSON.stringify(toDoItems)) {
      setToDoItems(orderedToDoItems);
    }
  }, [toDoItems, setToDoItems]);

  const pushToDoItem = (toDoItem: ToDoItem) =>
    setToDoItems((toDoItems) => [...toDoItems, toDoItem]);

  const removeToDoItem = ({ id: selectedId }: Pick<ToDoItem, "id">) =>
    setToDoItems((toDoItems) =>
      toDoItems.filter((item) => item.id !== selectedId)
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

      return nextToDoItems;
    });

  return { toDoItems, pushToDoItem, removeToDoItem, editToDoItem };
};
