import { Alert, Button, ButtonGroup, Typography } from "@mui/material";
import { Container } from "@mui/system";
import apiHelper from "../../app/api/apiHelper";

export default function AboutPage() {
  return (
    <Container>
      <Typography gutterBottom variant="h2">
        Errors for test
      </Typography>
      {/* <Alert severity="error">This is an error message!</Alert>
      {
        <ButtonGroup fullWidth>
          <Button
            variant="contained"
            onClick={() =>
              apiHelper.TestErrors.get400Error().catch((error) =>
                console.log(error)
              )
            }
          >
            Test 400
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              apiHelper.TestErrors.get401Error().catch((error) =>
                console.log(error)
              )
            }
          >
            Test 401
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              apiHelper.TestErrors.get404Error().catch((error) =>
                console.log(error)
              )
            }
          >
            Test 404
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              apiHelper.TestErrors.get500Error().catch((error) =>
                console.log(error)
              )
            }
          >
            Test 500
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              apiHelper.TestErrors.getValidationError().catch((error) =>
                console.log(error)
              )
            }
          >
            Test validation
          </Button>
        </ButtonGroup>
      } */}
    </Container>
  );
}
