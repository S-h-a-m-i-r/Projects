type BlackAndWhiteSimple = {
	black: string;
	blackLight: string;
	blackLightest: string;
	white: string;
	grey: string;
	greyLight: string;
	greyLightest: string;
	backgroundColor: string;
	green: string;
	greybtn: string;
};

type AdvanceShadows = {
	basicShadow: string;
	simpleShadow: string;
	mediumShadow: string;
};

declare module "@mui/material/styles" {
	interface PaletteColorOptions {
		main: string;
		dark: string;
		light: string;
	}

	interface PaletteColor {
		main: string;
		dark: string;
		light: string;
	}

	interface SimplePaletteColorOptions {
		main: string;
		dark?: string;
		light?: string;
	}

	interface Palette {
		bw: BlackAndWhiteSimple;
		advancedShadow: AdvanceShadows;
	}

	interface PaletteOptions {
		bw: BlackAndWhiteSimple;
		advancedShadow: AdvanceShadows;
	}
}

export {};
