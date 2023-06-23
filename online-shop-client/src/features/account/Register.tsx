import {
  Avatar,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import apiHelper from "../../app/api/apiHelper";
import { useState } from "react";
import { error } from "console";
import { toast } from "react-toastify";

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "all",
  });

  function handleApiErrors(er: any) {
    Object.keys(er.data.errors).forEach((key) => {
      er.data.errors[key].forEach((error: string) => {
        if (error.includes("Password")) {
          setError("password", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        } else if (error.includes("Username")) {
          setError("username", { message: error });
        }
      });
    });
  }

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit((data) =>
          apiHelper.Account.register(data)
            .then(() => {
              toast.success("Registration successful - you can now login");
              navigate(location.state?.from?.pathname || "/login");
            })
            .catch((errors) => handleApiErrors(errors))
        )}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          label="Username"
          autoFocus
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={<>{errors?.username?.message}</>}
        />

        <TextField
          margin="normal"
          fullWidth
          label="Email Address"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={<>{errors?.email?.message}</>}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={<>{errors?.password?.message}</>}
        />

        <LoadingButton
          disabled={!isValid}
          loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, height: 50 }}
        >
          Register
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to="/login">{"Already have an account? Sign In"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
