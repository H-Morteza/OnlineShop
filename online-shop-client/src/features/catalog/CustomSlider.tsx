import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Slider,
  debounce,
  styled,
} from "@mui/material";
import { debug } from "console";
import { useState } from "react";

const PrettoSlider = styled(Slider)({
  color: "secondary",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

interface Props {
  minPrice: number;
  maxPrice: number;
  selectMax?: number;
  selectMin?: number;
  onChange: (min: number, max: number) => void;
}

export default function CustomSlider({
  minPrice,
  maxPrice,
  selectMax,
  selectMin,
  onChange,
}: Props) {
  const initialMin = selectMin ?? minPrice;
  const initialMax = selectMax ?? maxPrice;

  const [value, setValue] = useState([initialMin, initialMax]);
  const [minInput, setMinInput] = useState(initialMin.toString());
  const [maxInput, setMaxInput] = useState(initialMax.toString());

  const handleChange = (event: Event, newValue: number | number[]) => {
    const [newMin, newMax] = newValue as number[];
    setValue([newMin, newMax]);
    setMinInput(newMin.toString());
    setMaxInput(newMax.toString());
  };
  const handleMouseUp = () => {
    debugger;
    onChange(value[0], value[1]);
  };
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isMin: boolean
  ) => {
    const inputValue = event.target.value;
    const parsedInput = parseFloat(inputValue);
    const [currentMin, currentMax] = isMin
      ? [parsedInput, value[1]]
      : [value[0], parsedInput];

    if (!inputValue) {
      setMinInput("");
      setMaxInput("");
      return;
    }

    if (isMin) {
      if (parsedInput <= currentMax && parsedInput >= minPrice) {
        setValue([parsedInput, currentMax]);
        debouncedSearch(parsedInput, currentMax);
      } else if (parsedInput >= currentMax) {
        setValue([currentMax - 1, currentMax]);
        debouncedSearch(currentMax - 1, currentMax);
      }
      setMinInput(parsedInput.toString());
    } else {
      if (parsedInput <= maxPrice && parsedInput >= currentMin) {
        setValue([currentMin, parsedInput]);
        debouncedSearch(currentMin, parsedInput);
      } else if (parsedInput >= maxPrice) {
        setValue([currentMin, maxPrice]);
        debouncedSearch(currentMin, maxPrice);
      }
      setMaxInput(parsedInput.toString());
    }
  };

  const debouncedSearch = debounce((min: number, max: number) => {
    onChange(min, max);
  }, 100);
  return (
    <Box sx={{ padding: "5px 25px 0 5px" }}>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="min-price-input">Min Price</InputLabel>
        <Input
          id="min-price-input"
          value={minInput}
          onChange={(e) => handleInputChange(e, true)}
          type="number"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="max-price-input">Max Price</InputLabel>
        <Input
          id="max-price-input"
          value={maxInput}
          onChange={(e) => handleInputChange(e, false)}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <Box sx={{ padding: "15px 0 0 18px" }}>
        <PrettoSlider
          onChange={handleChange}
          value={value}
          onMouseUp={handleMouseUp}
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          min={minPrice}
          max={maxPrice}
        />
      </Box>
    </Box>
  );
}
