import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Graph(props) {
  return (
    <div>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountTreeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.name} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => props.delete(props.id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}
