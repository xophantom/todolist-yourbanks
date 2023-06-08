import { createContext } from "react";
import { useToDoList } from "../hooks/useToDoList";

type ContextType = ReturnType<typeof useToDoList>;

const fallbackFunction = () => console.error("Context not initialized!");

export const ToDoContext = createContext<ContextType>({
  editToDoItem: fallbackFunction,
  pushToDoItem: fallbackFunction,
  removeToDoItem: fallbackFunction,
  toDoItems: [],
});
