import { v4 as uuidv4 } from "uuid";
import { ToDoItem } from "../types/ToDo";

export const makeToDoItem = (obj?: Partial<ToDoItem>): ToDoItem => ({
  checked: false,
  id: uuidv4(),
  title: "Do the laundry",
  ...obj,
});
