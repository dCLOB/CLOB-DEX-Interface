import { styled } from "@mui/material";

export const MenuItemContent = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr",
  width: "100%",
  gap: theme.spacing(1),
  alignItems: "center",
}));
