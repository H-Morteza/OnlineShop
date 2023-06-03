import {
  Box,
  FormControlLabel,
  FormGroup,
  TextField,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
interface Props {
  customLists: string[];
  checked?: string[];
  onChange: (Items: string[]) => void;
}

export default function CustomFilterList({
  customLists,
  checked,
  onChange,
}: Props) {
  const [searchList, setSearchList] = useState(customLists);
  const [checkedItems, setCheckedItems] = useState(checked || []);

  function handelCheced(value: string) {
    const currentIndex = checkedItems.findIndex((item) => item === value);
    let newChecked: string[];
    if (currentIndex === -1) newChecked = [...checkedItems, value];
    else newChecked = checkedItems.filter((item) => item !== value);
    setCheckedItems(newChecked);
    onChange(newChecked);
  }
  function search(e: any) {
    let searchValue = e.target.value;
    let newList = customLists.filter((list) =>
      list.toLowerCase().includes(searchValue)
    );
    setSearchList(newList);
  }
  function check(item: string): boolean {
    let t = checkedItems.indexOf(item) !== -1;
    return t;
  }
  return (
    <Box sx={{ padding: "15px 15px 0 15px" }}>
      <TextField
        sx={{ paddingBottom: 2 }}
        id="outlined-search"
        label="Search types"
        type="search"
        onChange={(e) => {
          search(e);
        }}
        fullWidth
      />
      <FormGroup
        sx={{
          maxBlockSize: 150,
          overflowY: "auto",
          display: "grid",
        }}
      >
        {searchList.map((item) => (
          <FormControlLabel
            control={
              <Checkbox
                onClick={() => handelCheced(item)}
                checked={check(item)}
              />
            }
            label={item}
            key={item}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
