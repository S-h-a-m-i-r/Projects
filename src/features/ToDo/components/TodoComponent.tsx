import React from "react";
import Header from "./Header";
import Pending from "./Pending";

const TodoComponent: React.FC = () => {
	return (
		<>
			<Header />
			<Pending />
		</>
	);
};

export default TodoComponent;
