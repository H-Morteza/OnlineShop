import { Box, Pagination, Typography } from "@mui/material";

interface Props {
  page: number;
  count: number;
  fromItem?: number;
  toItem?: number;
  totalItem?: number;
  onChange: (pageNumber: number) => void;
}
export default function CustomPagination({
  page,
  count,
  fromItem,
  toItem,
  totalItem,
  onChange,
}: Props) {
  function display(): string {
    debugger;
    let result = "";
    if (fromItem && toItem && totalItem)
      result = `Displaying ${fromItem} to ${toItem} of ${totalItem} Items`;
    return result;
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography>{display()}</Typography>
        <Pagination
          variant="outlined"
          color="primary"
          size="large"
          page={page}
          count={count}
          onChange={(event, value) => onChange(value)}
        />
      </Box>
    </>
  );
}
