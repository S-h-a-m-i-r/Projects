import React from "react";
import Paper from "@mui/material/Paper";
import type { AutocompleteProps as MuiAutocompleteProps } from "@mui/material/Autocomplete";
import MuiAutocomplete from "@mui/material/Autocomplete";

const CustomPaper: React.FC = (props) => {
	return (
		<Paper sx={{ marginTop: (theme) => theme.spacing(5), marginBottom: (theme) => theme.spacing(5) }} {...props} />
	);
};

export interface AutocompleteProps<
	T,
	Multiple extends boolean | undefined,
	DisableClearable extends boolean | undefined,
	FreeSolo extends boolean | undefined
> extends MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {}

function AutoComplete<
	T,
	Multiple extends boolean | undefined = undefined,
	DisableClearable extends boolean | undefined = undefined,
	FreeSolo extends boolean | undefined = undefined
>(props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>): JSX.Element {
	const { sx, ...restProps } = props;

	return <MuiAutocomplete sx={{ flexGrow: 1, ...sx }} PaperComponent={CustomPaper} {...restProps} />;
}

export default AutoComplete;
