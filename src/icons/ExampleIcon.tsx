import { SvgIcon } from "@mui/material";
import { SvgIconType } from "./SvgIconType";

/**
 * NOTE: This is an example icon
 * We will use real icons with following strategy.
 * We can customize and add other logic in-case we needed.
 */

const ExampleIcon: SvgIconType = (props) => {
	return <SvgIcon {...props}></SvgIcon>;
};

export default ExampleIcon;
