import { Grid, Radio } from "@mui/material";
import FormControlLabel from "components/FormControlLabel";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

type RadioButtonProps = {
  label: string;
  value: string | number;
};

const RadioButton: React.FC<RadioButtonProps> = (props) => {
  return (
    <Grid item md={6} sm={12}>
      <FormControlLabel
        value={props.value}
        sx={{
          color: "bw.blackLight",
        }}
        control={
          <Radio
            checkedIcon={
              <RadioButtonCheckedIcon
                sx={{ width: 13, height: 13, color: "bw.black" }}
              />
            }
            icon={
              <RadioButtonCheckedIcon
                sx={{ width: 13, height: 13, color: "bw.greyLight" }}
              />
            }
          />
        }
        label={props.label}
      />
    </Grid>
  );
};

export default RadioButton;
