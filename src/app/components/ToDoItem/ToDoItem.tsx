import { ToDoContext } from "@/app/context/ToDoContext";
import { ToDoItem as ToDoItemType } from "@/app/types/ToDo";
import { Box, Checkbox, ListItem, Typography, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = { item: ToDoItemType };

export const ToDoItem: React.FC<Props> = ({ item }) => {
  const { editToDoItem, removeToDoItem } = useContext(ToDoContext);

  const {
    palette: { grey },
  } = useTheme();

  const { checked, title, id } = item;

  const handleChange = () => editToDoItem({ ...item, checked: !checked });

  const handleRemove = () => removeToDoItem({ id });

  return (
    <ListItem>
      <Box display="flex" width="100%">
        <Box display="flex" alignItems="center" flex="1">
          <Checkbox checked={checked} onChange={handleChange} />
          <Typography
            variant="subtitle1"
            style={
              checked
                ? {
                    textDecoration: "line-through",
                    color: grey[600],
                  }
                : {}
            }
          >
            {title}
          </Typography>
        </Box>
        <IconButton onClick={handleRemove} color="secondary">
          <DeleteIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
};
