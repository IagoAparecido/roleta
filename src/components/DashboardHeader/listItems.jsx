import * as React from "react";
import "./styles.css";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import PieChartIcon from "@mui/icons-material/PieChart";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

export const mainListItems = (
  <React.Fragment>
    <a href="/dashboard">
      <ListItemButton>
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary="Lista" />
      </ListItemButton>
    </a>
    <a href="/dashboard/roleta">
      <ListItemButton>
        <ListItemIcon>
          <PieChartIcon />
        </ListItemIcon>
        <ListItemText primary="Roleta" />
      </ListItemButton>
    </a>
    <a href="/dashboard/usuarios">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuários" />
      </ListItemButton>
    </a>
  </React.Fragment>
);
