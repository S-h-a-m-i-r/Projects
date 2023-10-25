import {
  FormControlLabel as MuiFormControlLabel,
  FormControlLabelProps as MuiFormControlLabelProps,
  Theme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { MUIStyledCommonProps } from "@mui/system";

type FormControlLabelProps = MuiFormControlLabelProps &
  MUIStyledCommonProps<Theme>;

const FormControlLabel: React.FC<FormControlLabelProps> = styled(
  MuiFormControlLabel
)(({ theme }) => ({
  width: 13,
  height: 13,
  ".MuiFormControlLabel-root": {
    color: theme.palette.bw.black,
  },
  ".Mui-focusVisible": {
    color: theme.palette.bw.black,
  },
  ".MuiRadio-root": {
    color: theme.palette.bw.black,
    "&:hover": {
      color: theme.palette.bw.black,
    },
  },
  ".MuiButtonBase-root": {
    color: theme.palette.bw.black,
    ".Mui-checked": {
      color: theme.palette.bw.black,
    },
  },
}));

export default FormControlLabel;
