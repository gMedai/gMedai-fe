import useDidUpdate from "@hooks/useDidUpdate";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export interface Org {
  id: string;
  name: string;
  children: Org[];
}

export interface ModalWorkUnitProps {
  orgCurrent: Org;
  onChange: (x: any) => void;
}

export function ModalWorkUnit({ orgCurrent, onChange }: ModalWorkUnitProps) {
  const [orgSelected, setOrgSelected] = useState<Org>(null);

  const handleChangeWorkUnit = (event) => {
    const childrenId = event.target.value;
    const orgMatch = orgCurrent.children.find((chil) => chil.id === childrenId);
    setOrgSelected(orgMatch);

    onChange({
      id: childrenId,
      name: orgMatch.name,
    });
  };

  const hasChildren = () => {
    return orgSelected ? !!orgSelected.children.length : false;
  };

  useDidUpdate(() => {
    setOrgSelected(null);
  }, [orgCurrent]);

  return (
    <>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select or leave blank</InputLabel>
        <Select
          label="Select or leave blank"
          value={orgSelected?.id || ""}
          onChange={handleChangeWorkUnit}
        >
          <MenuItem value="">Select or leave blank</MenuItem>
          {orgCurrent.children.map((chil) => {
            return (
              <MenuItem key={chil.id} value={chil.id}>
                {chil.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {hasChildren() && <ModalWorkUnit onChange={onChange} orgCurrent={orgSelected} />}
    </>
  );
}

export function ModalWorkUnitRoot({ onChange, orgs }) {
  const root = orgs[0];
  const [path, setPath] = useState(root.name);

  const hasChildren = () => {
    return root ? !!root.children.length : false;
  };

  const handleOnChange = (value) => {
    setPath((prev) => prev + " / " + value.name);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Work Unit</InputLabel>
        <Select label="Work Unit" value={root.id}>
          <MenuItem value={root.id}>{path}</MenuItem>
        </Select>
      </FormControl>
      {hasChildren() && <ModalWorkUnit onChange={handleOnChange} orgCurrent={root} />}
    </Box>
  );
}
