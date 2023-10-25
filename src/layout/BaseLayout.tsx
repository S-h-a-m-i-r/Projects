import { Box } from "@mui/material";
import Sidebar, { Menu } from "components/Sidebar";
import CircleStarIcon from "icons/CircleStarIcon";
import * as React from "react";

type BaseLayoutProps = {
	children: React.ReactNode;
};

const menus: Menu[] = [
	{
		title: "Create KPI",
		icon: CircleStarIcon,
		url: "/dashboard",
	},
	{
		title: "KPI List",
		icon: CircleStarIcon,
		url: "/kpilists",
	},
	{
		title: "Create Appraisal",
		icon: CircleStarIcon,
		url: "/appraisalform",
	},
	{
		title: "Appraisal List",
		icon: CircleStarIcon,
		url: "/appraisal",
	},
	{
		title: "Appraisal Flow",
		icon: CircleStarIcon,
		url: "/appraisalflow",
	},
];

const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
	return (
		<Box sx={{ display: "flex" }}>
			<Sidebar menus={menus} />
			<Box component="main" sx={{ minHeight: "100vh", width: "100%", position: "relative" }}>
				{props.children}
			</Box>
		</Box>
	);
};

export default BaseLayout;
