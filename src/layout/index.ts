import React, { ComponentType } from "react";

export type LayoutProps = {
	children: React.ReactNode;
};

export type LayoutComponent = React.FC<LayoutProps>;

export type PageWithLayoutType = ComponentType & { layout: LayoutComponent };

export default PageWithLayoutType;
