import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  Toolbar,
  Paper,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import NotificationsNone from "@material-ui/icons/NotificationsNone";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import PersonIcon from "@material-ui/icons/Person";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  gridBorder: {
    border: "1px solid #fff",
  },
  root: {
    background: "#fff",
    transform: "translateZ(0)",
  },
  leftPadding: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
  },
  marginright: {
    marginright: theme.spacing(20),
  },
}));
const Header = () => {
  const classes = useStyle();
  const [powerOff, setPowerOff] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <AppBar position="static" className={classes.root} position="fixed">
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item sm={true}></Grid>
            <Grid item>
              {/* <IconButton>
                <Badge badgeContent={5} color="secondary">
                  <NotificationsNone fontSize="small"></NotificationsNone>
                </Badge>
              </IconButton>
              <IconButton>
                <PersonIcon fontSize="small" />
              </IconButton> */}
              <IconButton
                onClick={() => {
                  setPowerOff(!powerOff);
                }}
              >
                <PowerSettingsNewIcon fontSize="small" />
              </IconButton>
            </Grid>
            {powerOff ? (
              <Paper
                elevation={0}
                square
                sx={{
                  alignItem: "center",
                  textAlign: "right",
                  width: 20,
                  mr: 500,
                  p: 1 / 50,
                }}
              >
                <MenuList>
                  <MenuItem
                    className={classes.marginright}
                    onClick={() => {
                      // console.log(document.cookie);
                      navigate("/");
                    }}
                  >
                    Log Out
                  </MenuItem>
                </MenuList>
              </Paper>
            ) : (
              ""
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Header;
