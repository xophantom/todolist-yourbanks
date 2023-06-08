export type ToDoItem = {
  id: string;
  title: string;
  checked: boolean;
};

export type ToDoForm = {
  title: string;
};

export type ToDoList = {
  items: ToDoItem[];
};
