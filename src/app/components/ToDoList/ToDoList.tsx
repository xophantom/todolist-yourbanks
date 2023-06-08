import React, { useContext } from "react";
import { List } from "@mui/material";
import { ToDoItem } from "../ToDoItem/ToDoItem";
import { ToDoForm } from "../ToDoForm/ToDoForm";
import { ToDoContext } from "../../context/ToDoContext";

export const ToDoList: React.FC = () => {
  const { toDoItems } = useContext(ToDoContext);

  return (
    <List>
      {toDoItems.map((item) => (
        <ToDoItem key={item.id} item={item} />
      ))}
      <ToDoForm />
    </List>
  );
};
