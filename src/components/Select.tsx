import { styled } from "@mui/material/styles";
import { Select as MuiSelect } from "@mui/material";
import type { SelectProps } from "@mui/material/Select";

const Select: React.FC<SelectProps> = styled(MuiSelect)(({ theme }) => ({
	backgroundColor: theme.palette.common.white,
	"& .MuiOutlinedInput-root": {
		borderRadius: theme.shape.borderRadius * 2,
		borderWidth: 0,
	},

	borderRadius: theme.shape.borderRadius * 2,
}));

Select.defaultProps = {
	MenuProps: {
		PaperProps: {
			sx: {
				marginTop: (theme) => theme.spacing(4),
			},
		},
	},
};

export default Select;
