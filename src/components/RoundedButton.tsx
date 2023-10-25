import { Button } from "@mui/material";
import type { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

type ButtonProps = MuiButtonProps & {
	active?: boolean;
};

const RoundedButton: React.FC<ButtonProps> = styled(Button)<ButtonProps>(({ theme, active }) => ({
	borderRadius: theme.shape.borderRadius * 3,
	backgroundColor: active ? theme.palette.primary.main : theme.palette.bw.white,
	color: active ? theme.palette.common.white : theme.palette.common.black,
	"&:hover": {
		backgroundColor: active ? theme.palette.primary.main : theme.palette.bw.white,
	},
	minWidth: theme.spacing(110),
	boxShadow: theme.palette.advancedShadow.simpleShadow,
}));

export default RoundedButton;
