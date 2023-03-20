import React, { useState } from "react";
import {
  InputLabel,
  ListItem,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
} from "@mui/material";

// very similar to the <TextInput> props - see comments there.
export interface SelectProps {
  id: string;
  name: string;
  label: string;
  options: string[];
  value: string;
  onChangeHandler: (newValue: string) => void;
}

export const SelectInput: React.FC<SelectProps> = ({
  id,
  name,
  label,
  onChangeHandler,
  value,
  options,
}) => {
  const selectLabel = `${label}-select-label`;
  return (
    <>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id={selectLabel}>{label}</InputLabel>
        <Select
          value={value}
          onChange={(e) => {
            onChangeHandler(e.target.value);
          }}
          labelId={selectLabel}
          label={label}
          fullWidth
          input={<OutlinedInput label={label} />}
        >
          {options.map((value, index) => {
            return (
              <MenuItem key={`select-${name}-o-${index}`} value={value}>
                {value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};
