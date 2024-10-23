import { styled } from "@mui/material";

export const StyledContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: theme.spacing(1),
  padding:theme.spacing(1, 2),
  height: '100%'
}));
