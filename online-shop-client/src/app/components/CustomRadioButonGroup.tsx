import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

interface Props {
  options: any[];
  onChange: (event: any) => void;
  selectedValue: string;
}
export default function CustomRadioButonGroup({
  options,
  onChange,
  selectedValue,
}: Props) {
  return (
    <>
      <FormLabel id="demo-radio-buttons-group-label">Sort by</FormLabel>
      <RadioGroup onChange={onChange} value={selectedValue}>
        {options.map(({ value, lable }) => (
          <FormControlLabel
            value={value}
            control={<Radio />}
            label={lable}
            key={value}
          />
        ))}
      </RadioGroup>
    </>
  );
}
