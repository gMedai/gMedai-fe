import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

export const TotalDisease = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            TOTAL DISEASE
          </Typography>
          <Typography color="textPrimary" variant="h4">
            1
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "warning.main",
              height: 56,
              width: 56,
            }}
          >
            <LocalHospitalIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
