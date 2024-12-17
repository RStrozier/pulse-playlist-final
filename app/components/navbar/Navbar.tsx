"use client"; 

import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Link from "next/link"; 
import "./navbar.css";

const Navbar = () => {
 const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown") {
      const keyboardEvent = event as React.KeyboardEvent;
      if (keyboardEvent.key === "Tab" || keyboardEvent.key === "Shift") {
        return;
      }
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className="drawerList"
    >
      <List>
        <ListItem>
          <Link href="/about" passHref>
            <ListItemText primary="About Pulse" className="drawerItem" />
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/favorite-songs" passHref>
            <ListItemText primary="My Favorite Songs" className="drawerItem" />
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/my-playlists" passHref>
            <ListItemText primary="My Playlists" className="drawerItem" />
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/my-top-tracks" passHref>
            <ListItemText primary="My Top 5 Tracks" className="drawerItem" />
          </Link>
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <div className="appBar">
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon sx={{ fontSize: "36px" }} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/home" passHref>
                <span className="header-roboto navbar-logo-text">
                  <span className="text-red-600">Pulse </span>Playlist
                </span>
              </Link>
            </Typography>
            <Link href="/my-playlists" passHref>
              <div className="nav-list-item default-font">My Playlists</div>
            </Link>
          </Toolbar>
        </Container>
      </div>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
};

export default Navbar;