import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { styled } from "@mui/material/styles";

type LinkProps = RouterLinkProps & {};

const Link = styled(RouterLink)<LinkProps>(({ theme }) => ({
  textDecoration: "none",
}));

export default Link;
