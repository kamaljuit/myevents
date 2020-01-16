import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { format } from "date-fns";
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

function returnFormattedDate(string) {
  const date = new Date(string);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function EventCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        title={props.event.title}
        subheader={format(new Date(props.event.startDate), "MM/dd/yyyy")}
      />
      <CardContent>
        <div>
          <p>
            <span>
              From: {format(new Date(props.event.startTime), "h 'o''clock'")}
              <br />
              To: {format(new Date(props.event.endTime), "h 'o''clock")}
            </span>
          </p>
        </div>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.event.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
