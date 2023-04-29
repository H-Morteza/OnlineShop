import {
  Box,
  FormControlLabel,
  FormGroup,
  TextField,
  Checkbox,
} from "@mui/material";
import CustomSlider from "../catalog/CustomSlider";
interface Props {
  customLists: string[];
}
export default function CustomFilterList({ customLists }: Props) {
  return (
    <Box sx={{ padding: "15px 15px 0 15px" }}>
      <Box sx={{ padding: "15px 15px 0 15px" }}>
        <TextField
          sx={{ paddingBottom: 2 }}
          id="outlined-search"
          label="Search types"
          type="search"
          fullWidth
        />
        <FormGroup
          sx={{
            maxBlockSize: 150,
            overflowY: "auto",
            display: "grid",
          }}
        >
          {customLists.map((customList) => (
            <FormControlLabel
              control={<Checkbox />}
              label={customList}
              key={customList}
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  );
}
