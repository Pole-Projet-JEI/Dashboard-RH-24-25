import { Box, Grid, Typography, useTheme,Drawer } from "@mui/material";
import ScheduleInterview from "../../Components/Recrutement/ScheduleInterview";
import React from "react";

import AllTicketsKPI from "../../Components/AllTicketsKPI";
import MembersByCategory from "../../Components/Dashboard/MembersByCategory";
import MembersByGender from "../../Components/Dashboard/MembersByGender";
import Schedule from "../../Components/Dashboard/Schedule";
import ScheduleButton from "../../Components/ScheduleButton";

const Dashboard = () => {
  const handleDateChange = (newDate) => {
    console.log("Selected Date:", newDate);
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const DrawerContent = (
    <ScheduleInterview close={toggleDrawer(false)}/>
  );

  return (
    <Box
      sx={{
        margin: 2,
        padding: 2,
      }}
    >
       <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'
       sx={{
        '& .MuiBackdrop-root': {
          backdropFilter:'blur(5px)'
        },
        '& .MuiDrawer-paper': {
            padding: 2, 
          },
      }}>
        {DrawerContent}
      </Drawer>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} >
          <Typography fontSize={26} fontWeight={theme.typography.extraMeduim}>
            Dashboard
          </Typography>
        </Grid>

        <Grid item xs={6} md={2}>
          <ScheduleButton
            onClick={toggleDrawer(true)}
            variant="text"
            schedule="Schedule interview" 
            sx={{
              color:theme.palette.primary.main
            }}
          />
        </Grid>

        <Grid item xs={6} md={2}>
          <ScheduleButton
            variant="contained"  
            schedule="Schedule meeting" 
            
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <AllTicketsKPI />
        </Grid>

        <Grid item xs={12} md={4}>
          <MembersByCategory />
        </Grid>

        <Grid item xs={12} md={4}>
          <MembersByGender />
        </Grid>

        <Grid item xs={12} md={4}>
          <Schedule />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
