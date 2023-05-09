import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  color: black;

  :hover {
    color: blueviolet;
  }
`;

export const BackLink = ({to, children}) => {
    return <StyledLink to={to}>{children}</StyledLink>
}