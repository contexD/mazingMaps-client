import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(2),
  },
  item: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
}));

export default function Graph(props) {
  const classes = useStyles();
  const sizeActionButton = "small";

  return (
    <div>
      <ListItem className={classes.root}>
        <ListItemAvatar>
          <Avatar>
            <AccountTreeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.name} className={classes.item} />
        <Fab
          color="secondary"
          aria-label="edit"
          className={classes.item}
          size={sizeActionButton}
          component={RouterLink}
          to={"/map/" + props.id}
        >
          <EditIcon />
        </Fab>
        <Fab
          color="secondary"
          aria-label="edit"
          onClick={() => props.delete(props.id)}
          className={classes.item}
          size={sizeActionButton}
        >
          <DeleteIcon />
        </Fab>
      </ListItem>
    </div>
  );
}
