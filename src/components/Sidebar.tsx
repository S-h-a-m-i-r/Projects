import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DrawerHeader from "./DrawerHeader";
import { Box, Divider, ListItemIcon } from "@mui/material";
import { SvgIconType } from "icons/SvgIconType";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	border: 0,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	boxShadow: "0.5px 0px 20px rgba(0, 0, 0, 0.2)",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
}));

export type Menu = {
	title: string;
	icon: SvgIconType;
	url: string;
};

export type SidebarProps = {
	menus: Array<Menu>;
	onMenuSelect?: (menu: Menu) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ menus = [], onMenuSelect }) => {
	const history = useLocation();
	const navigate = useNavigate();

	const onSelectMenu = (menu: Menu) => {
		if (onMenuSelect) onMenuSelect(menu);

		return navigate(menu.url);
	};

	const isSelected = (menu: Menu) => history.pathname.includes(menu.url);

	return (
		<Drawer variant="permanent" data-testid="drawer" open>
			<DrawerHeader>
				<Box
					component="img"
					src="/images/logo/teo.png"
					alt="teo-logo"
					sx={{
						width: 90,
						height: 46,
					}}
				/>
			</DrawerHeader>
			<Divider />

			<List
				sx={{
					justifyContent: "center",
					alignItems: "center",
					display: "flex",
					flex: 1,
					flexDirection: "column",
				}}
			>
				{menus.map((menu) => (
					<Fragment key={menu.title}>
						<ListItem data-testid="menuItem" key={menu.title} disablePadding>
							<ListItemButton
								data-testid="menuButton"
								sx={{
									minHeight: 61,
									justifyContent: "center",
									"&.Mui-selected": {
										backgroundColor: "secondary.main",
										"&:hover": {
											backgroundColor: "primary.main",
										},
									},
								}}
								selected={isSelected(menu)}
								onClick={() => onSelectMenu(menu)}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: 3,
										justifyContent: "center",
									}}
								>
									<menu.icon sx={{ color: isSelected(menu) ? "bw.white" : "secondary.main" }} />
								</ListItemIcon>

								<ListItemText
									data-testid="menuTitle"
									sx={{
										color: !isSelected(menu) ? "bw.black" : "bw.white",
									}}
								>
									{menu.title}
								</ListItemText>
							</ListItemButton>
						</ListItem>
						<Divider sx={{ width: "100%" }} />
					</Fragment>
				))}
			</List>
		</Drawer>
	);
};

export default Sidebar;
