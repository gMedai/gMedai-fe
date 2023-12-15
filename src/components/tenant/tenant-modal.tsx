import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import roleService from "@services/roleService";
import { ModalWorkUnitRoot } from "./tenant-modal-work";
import organizationService from "@services/organizationService";

export interface CustomerModalProps {
  onCreateCustomer?: (customer: any) => void;
  updateCustomer?: any;
  onUpdateCustomer?: (customer: any) => void;
}

export const CustomerModal = ({
  onCreateCustomer,
  updateCustomer,
  onUpdateCustomer,
}: CustomerModalProps) => {
  const [roles, setRoles] = useState([]);
  const [organization, setOrganization] = useState([]);

  const [values, setValues] = useState(
    updateCustomer || {
      firstName: "Chau",
      lastName: "Phu Thinh",
      email: "thinh@gmail.com",
      phone: "+84989989989",
      dateOfBirth: "2022-12-16",
      address: "Tan Binh District, HCM City",
      gender: "female",
      workUnit: {
        struct: [],
        path: "",
      },
      jobPosition: "",
      directManagement: "",
      titles: "",
      probationDay: "",
      officialDate: "",
      role: {
        id: "",
        name: "",
      },
    }
  );

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeRole = (event) => {
    const role = roles.filter((role) => role.id === event.target.value);
    console.log("role: ", role);
    setValues({
      ...values,
      role: {
        id: role[0].id,
        name: role[0].name,
      },
    });
  };

  const handleChangeWorkUnit = (event) => {
    console.log("event: ", event);
  };

  const handleAddSubmit = () => {
    onCreateCustomer(values);
  };

  const handleUpdateSubmit = () => {
    onUpdateCustomer(values);
  };

  useEffect(() => {
    const fetchRoles = async () => {
      const rolesRes = await roleService.getAll();
      if (!rolesRes.length) return;
      setRoles(rolesRes);
      setValues({
        ...values,
        role: { id: rolesRes[0].id, name: rolesRes[0].name },
      });
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchOrgs = async () => {
      const orgsRes = await organizationService.getTree();
      if (!orgsRes.length) return;
      setOrganization(orgsRes);
    };

    fetchOrgs();
  }, []);

  return (
    <form autoComplete="off" noValidate>
      <Card sx={{ width: 1000, height: 600, overflowY: "scroll" }}>
        {updateCustomer ? (
          <CardHeader subheader="The information can be edited" title="Update profile" />
        ) : (
          <CardHeader subheader="The information can be edited" title="Add profile" />
        )}

        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                // helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText
                InputLabelProps={{
                  shrink: true,
                }}
                label="Date of birth"
                name="dateOfBirth"
                onChange={handleChange}
                type="date"
                required
                value={values.dateOfBirth}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup defaultValue="female" name="gender" row onChange={handleChange}>
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
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
            <Grid item md={12} xs={12}>
              {!!organization.length && (
                <ModalWorkUnitRoot onChange={handleChangeWorkUnit} orgs={organization} />
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Job position"
                name="jobPosition"
                onChange={handleChange}
                required
                value={values.jobPosition}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Direct management"
                name="directManagement"
                onChange={handleChange}
                required
                value={values.directManagement}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Titles"
                name="titles"
                onChange={handleChange}
                required
                value={values.titles}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText
                InputLabelProps={{
                  shrink: true,
                }}
                label="Probation Day"
                name="probationDay"
                onChange={handleChange}
                type="date"
                required
                value={values.probationDay}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText
                InputLabelProps={{
                  shrink: true,
                }}
                label="Official date"
                name="officialDate"
                onChange={handleChange}
                type="date"
                required
                value={values.officialDate}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Role"
                name="role"
                onChange={handleChangeRole}
                required
                select
                SelectProps={{ native: true }}
                value={values.role.id}
                variant="outlined"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </TextField>
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
          {updateCustomer ? (
            <Button color="primary" variant="contained" onClick={handleUpdateSubmit}>
              Save
            </Button>
          ) : (
            <Button color="primary" variant="contained" onClick={handleAddSubmit}>
              Add
            </Button>
          )}
        </Box>
      </Card>
    </form>
  );
};
