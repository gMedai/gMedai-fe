import React,{ useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

const states = [
  {
    value: "TPHCM",
    label: "Công an TP.HCM",
  },
  {
    value: "quan1",
    label: "Quận 1",
  },
  {
    value: "quan2",
    label: "Quận 2",
  },
  {
    value: "quan3",
    label: "Quận 3",
  },
  {
    value: "quan4",
    label: "Quận 4",
  },
  {
    value: "quan5",
    label: "Quận 5",
  },
];

export const StructureAdd = (props) => {
  const [values, setValues] = useState({
    nameUnit: "",
    codeUnit:"",
    nameAbbreviations: "",
    numericalOrder:"",
    organizationLevel: "",
    belongingToUnit: "",
    address: "",
    unitLeader: "",
    mandates:"",
    
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    alert('An essay was submitted: ' + JSON.stringify(values));
    event.preventDefault();

  };

  return (
    <form autoComplete="off" noValidate {...props} onSubmit={handleSubmit}>
      <Card sx={{ width: 700 }}>
        <CardHeader subheader="The information can be edited" title="Add Unit Structure" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Name unit"
                name="nameUnit"
                onChange={handleChange}
                required
                value={values.nameUnit}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Code unit"
                name="codeUnit"
                onChange={handleChange}
                required
                value={values.codeUnit}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Name abbreviations"
                name="nameAbbreviations"
                onChange={handleChange}
                required
                value={values.nameAbbreviations}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Numerical order"
                name="numericalOrder"
                onChange={handleChange}
                required
                value={values.numericalOrder}
                variant="outlined"
              />
            </Grid>
            {/* organization level */}
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Organization level"
                name="organizationLevel"
                onChange={handleChange}
                required
                value={values.organizationLevel}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Belonging to unit"
                name="belongingToUnit"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.belongingToUnit}
                variant="outlined"
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                onChange={handleChange}
                required
                value={values.address}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Unit leader"
                name="unitLeader"
                onChange={handleChange}
                required
                value={values.unitLeader}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Mandates"
                name="mandates"
                onChange={handleChange}
                required
                value={values.mandates}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" type="submit" onClick={handleSubmit}>
            Add
          </Button>
        </Box>
      </Card>
    </form>
  );
};
