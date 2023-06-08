import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { TextField, ListItem, Box, IconButton } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToDoForm as ToDoFormType } from "@/app/types/ToDo";
import { ToDoContext } from "@/app/context/ToDoContext";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@mui/icons-material/Add";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

export const ToDoForm = () => {
  const { pushToDoItem } = useContext(ToDoContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ToDoFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (data: ToDoFormType) => {
    pushToDoItem({ ...data, id: uuidv4(), checked: false });
    reset();
  };

  return (
    <ListItem>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Box
          display="flex"
          height="36px"
          gap="16px"
          justifyContent="space-between"
        >
          <TextField
            label="Title"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            size="small"
          />

          <IconButton type="submit" color="primary">
            <AddIcon />
          </IconButton>
        </Box>
      </form>
    </ListItem>
  );
};
