import Head from "next/head";
import { DashboardLayout } from "../components/dashboard-layout";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useAuthContext } from "../contexts/auth-context";
import { useEffect } from "react";
const TenantBox = ({ tenant, onTenantClick, isSelected }) => {
  return (
    <div
      style={{
        border: "1px solid #3498db",
        padding: "8px 16px",
        margin: "8px 8px",
        display: "block",
        borderRadius: "5px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease",
        cursor: "pointer",
        backgroundColor: isSelected ? "rgb(21, 52, 98)" : "inherit",
        color: isSelected ? "#fff" : "inherit",
      }}
      onClick={() => onTenantClick(tenant)}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "18px", fontWeight: "500", margin: "4px 0" }}>
          {tenant && tenant.tenantName}
        </div>
      </div>
    </div>
  );
};

const ListTenantBox = ({ tenants, handleTenantClick, selectedTenant }) => {
  console.log(selectedTenant);
  
  return (
    <Box sx={{ maxWidth: "600px" }}>
      {tenants.map((tenant, index) => (
        <TenantBox
          key={index}
          tenant={tenant}
          onTenantClick={handleTenantClick}
          isSelected={selectedTenant === tenant.tenantId}
        />
      ))}
    </Box>
  );
};

const Page = () => {
  const [selectedTenant, setselectedTenant] = useState("1");

  const authContext: any = useAuthContext();
  useEffect(() => {
    setselectedTenant(authContext.tenantId || "1");
  }, []);

  const tenants = [
    {
      tenantId: "1",
      tenantName: "Nguyen Tri Phương Hospital",
      isRegis: true,
    },
    {
      tenantId: "2",
      tenantName: "Cho Ray Hospital",
      isRegis: true,
    },
    {
      tenantId: "3",
      tenantName: "115 People's Hospital",
      isRegis: false,
    },
    {
      tenantId: "4",
      tenantName: "Orthopedic Clinic - Dr. Che Thanh Doan",
      isRegis: true,
    },
    { tenantId: "5", tenantName: "University Medical Center, Ho Chi Minh City", isRegis: false },
  ];


  const handleTenantClick = (tenant) => {
    setselectedTenant(tenant.tenantId);
    authContext.changeTenant(tenant.tenantId);
  };

  return (
    <>
      <Head>
        <title>Dashboard | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
          pl: 4,
        }}
      >
        <h1>Tenant Management</h1>
        <Box >
          <ListTenantBox
            tenants={tenants}
            handleTenantClick={handleTenantClick}
            selectedTenant={selectedTenant}
          />
        </Box>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
