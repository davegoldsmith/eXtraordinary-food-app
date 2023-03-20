import * as React from "react";
import {
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText
} from "@mui/material";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface MultipleSelectWithCheckboxesProps {
  selectItems: Array<string>;
  selectedValues: Array<string>;
  setSelectedValues: (values: Array<string>) => void;
  inputLabel: string;
}

const MultipleSelectWithCheckboxes: React.FC<
  MultipleSelectWithCheckboxesProps
> = (props: MultipleSelectWithCheckboxesProps) => {
  const {
    selectItems,
    selectedValues,
    setSelectedValues: setSelectedvalues,
    inputLabel,
  } = props;
  const handleChange = (event: SelectChangeEvent<typeof selectItems>) => {
    const {
      target: { value },
    } = event;
    setSelectedvalues(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const inputId = `${inputLabel.toLowerCase()}-multi-checkbox`;
  const inputLabelId = `${inputId}-label`;

  return (
    <div>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id={inputLabelId}>{inputLabel}</InputLabel>
        <Select
          labelId={inputLabelId}
          id={inputId}
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={<OutlinedInput label={inputLabel} />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {selectItems.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={selectedValues.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelectWithCheckboxes;
