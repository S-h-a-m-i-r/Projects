import {
  RadioGroup,
  Grid,
  Box,
  Stack,
  Divider,
  Typography,
} from "@mui/material";
import CalendarIcon from "icons/CalenderIcon";
import RadioButton from "./RadioButton";

const UserRole = () => {
  return (
    <Box
      sx={{
        width: "60%",
        borderRadius: (theme) => theme.shape.borderRadius * 0.3,
        backgroundColor: "bw.white",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          marginTop: (theme) => theme.spacing(6),
          marginLeft: (theme) => theme.spacing(12.5),
        }}
      >
        <CalendarIcon
          sx={{
            marginRight: (theme) => theme.spacing(4),
          }}
        />
        <Typography variant="h5" component="span">
          Your Role
        </Typography>
      </Stack>
      <Divider />
      <RadioGroup name="role">
        <Grid
          container
          sx={{
            paddingLeft: (theme) => theme.spacing(18),
          }}
          mt={5}
          mb={5}
        >
          <RadioButton value="hr" label="HR" />
          <RadioButton value="supervisor" label="Supervisor" />
          <RadioButton value="management" label="Management" />
          <RadioButton value="employee" label="Employee" />
        </Grid>
      </RadioGroup>
    </Box>
  );
};

export default UserRole;
