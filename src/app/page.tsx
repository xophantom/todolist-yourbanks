"use client";

import { Container, CssBaseline } from "@mui/material";
import React from "react";
import { ToDoList } from "./components/ToDoList/ToDoList";
import { useToDoList } from "./hooks/useToDoList";
import { ToDoContext } from "./context/ToDoContext";

export default function Home() {
  const toDo = useToDoList();

  return (
    <ToDoContext.Provider value={toDo}>
      <CssBaseline />
      <Container maxWidth="sm">
        <h1>To Do List</h1>
        <ToDoList />
      </Container>
    </ToDoContext.Provider>
  );
}
