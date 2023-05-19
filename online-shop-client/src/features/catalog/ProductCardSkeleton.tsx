import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Skeleton,
} from "@mui/material";

export default function ProductCardSkeleton() {
  return (
    <Grid item xs component={Card}>
      {/* <CardHeader
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
      /> */}
      <Skeleton sx={{ height: 230 }} animation="wave" variant="rectangular" />
      <CardContent>
        <>
          <Skeleton
            animation="wave"
            height={15}
            width="90%"
            style={{ marginBottom: 6 }}
          />
          <Skeleton
            animation="wave"
            height={15}
            width="75%"
            style={{ marginBottom: 6 }}
          />
          <Skeleton
            animation="wave"
            height={15}
            width="60%"
            style={{ marginBottom: 6 }}
          />
        </>
      </CardContent>
      <CardActions>
        <>
          <Skeleton animation="wave" height={15} width="40%" />
          <Skeleton animation="wave" height={15} width="20%" />
        </>
      </CardActions>
    </Grid>
  );
}
