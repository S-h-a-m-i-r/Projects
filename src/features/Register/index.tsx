import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";
import SignupForm from "./components/SignupForm";

const RegisterPage: React.FC = () => {
  return (
    <Stack direction="row" justifyContent="center">
      <Stack
        alignItems="center"
        flex={1}
        direction="column"
        sx={{ backgroundColor: "bw.grey" }}
        spacing={15}
      >
        <Box component="div" mt={20}>
          <img
            src="/images/logo/teo.png"
            alt="teo-logo"
            width={200}
            height={104}
          />
        </Box>
        <Typography
          variant="h4"
          //   fontWeight={(theme) => theme.typography.fontWeightBold}
        >
          Signup
        </Typography>
        <SignupForm />
      </Stack>
      <Stack flex={1}>
        <img src="/images/signup.png" alt="" style={{ width: "100%" }} />
      </Stack>
    </Stack>
  );
};

export default RegisterPage;
