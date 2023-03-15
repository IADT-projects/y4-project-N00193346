import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

const Navbar = (props) => {
  const navigate = useNavigate();

  const logout = () => {
    props.onAuthenticated(false);
    navigate("/");
  };

  const login = () => {
    navigate("/login");
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Grid item xs={12}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Intelligent Instruments Interface
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}>
              {props.authenticated ? (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar src="/static/images/avatar/1.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography
                        component={Link}
                        to={`/users/${props.authenticated._id}`}
                        textAlign="center"
                      >
                        Profile
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography onClick={logout} textAlign="center">
                        Log Out
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button color="inherit" onClick={login}>
                    Login
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Grid>
  );
};

export default Navbar;
