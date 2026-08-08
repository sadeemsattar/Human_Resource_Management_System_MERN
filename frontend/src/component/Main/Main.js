import React from "react";
import ChartBar from "../Chart/Chart";
import ChartPie from "../Chart/ChartPie";
import PersonIcon from "@material-ui/icons/Person";
import { Paper, Grid, Card, Typography, makeStyles } from "@material-ui/core";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fdfdff",
  },
  leftPadding: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
  },
  topMargin: {
    marginTop: theme.spacing(2),
  },

  pageIcon: {
    display: "block",

    padding: theme.spacing(2),
    border: "none",
    boxShadow: "none",
    "&:hover": {
      color: "#00C853",
    },
  },
  ChartContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  chartDiv: {
    display: "inline-block",
    height: "600px",
  },
}));

export default function Main(props) {
  const { name, Items } = props;
  const classes = useStyles();
  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.leftPadding}>
        <Typography variant="h6" component="div">
          Hi, Welcome Back! {name}
        </Typography>
        <Grid item className={classes.topMargin} container spacing={3}>
          {Items
            ? Items.map((obj) => (
                <Grid item xs={12} lg={3} sm={12} md={6}>
                  <Card
                    className={classes.pageIcon}
                    style={{
                      background: obj.background,
                      borderRadius: "12px 12px",
                    }}
                  >
                    <ListItemIcon>{obj.icon}</ListItemIcon>
                    <ListItemText primary={obj.text}></ListItemText>
                  </Card>
                </Grid>
              ))
            : ""}
        </Grid>
      </div>
      <div className={classes.ChartContainer} style={{ marginTop: "100px" }}>
        <div className={classes.chartDiv}> {<ChartBar />}</div>
        <div className={classes.chartDiv}>{<ChartPie />}</div>
      </div>
    </Paper>
  );
}
