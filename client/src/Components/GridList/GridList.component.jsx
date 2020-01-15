/**
 * MaterialUI GridList modified for project's Use case.
 * Accpets data:[] as a prop and renders a single column list
 */

import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import "./GridList.styles.scss";
import Event from "../Event/Event.component";

export default function EventGridList(props) {
  return (
    <div className="grid-list-root">
      <GridList cols={1}>
        <GridListTile
          key="Subheader"
          cols={1}
          style={{ height: "unset" }}
        ></GridListTile>
        {props.data.map(event => (
          <GridListTile key={event._id} style={{ height: "unset" }}>
            <Event event={event} />
            <hr />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
