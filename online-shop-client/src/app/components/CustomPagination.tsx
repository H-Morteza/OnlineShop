import { Box, Pagination, Typography } from "@mui/material";

interface Props {
  curentPage: number;
  count: number;
  pageSize?: number;
  totalItem?: number;
  onPageChange: (pageNumber: number) => void;
}
export default function CustomPagination({
  curentPage,
  count,
  pageSize,
  totalItem,
  onPageChange,
}: Props) {
  function display(): string {
    let result = "";
    if (pageSize && totalItem)
      result = `Displaying ${(curentPage - 1) * pageSize + 1} - ${
        curentPage * pageSize > totalItem ? totalItem : curentPage * pageSize
      } of ${totalItem} Items`;
    return result;
  }
  if (!totalItem) return <></>;
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography>{display()}</Typography>
        <Pagination
          variant="outlined"
          color="primary"
          size="large"
          page={curentPage}
          count={count}
          onChange={(event, value) => onPageChange(value)}
        />
      </Box>
    </>
  );
}
