"use client";
import { PropsWithChildren } from "react";
import { Header } from "../Header";
import { Box, styled } from "@mui/material";

const MainContainer = styled(Box)({
  display: "grid",
  gridTemplateColumnt: "1fr",
  gridTemplateRows: "auto 1fr",
  height: "100vh",
  overflow: "auto",
  minHeight: 0,
  minWidth: 0,
});

const Content = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[900],
}));

export const LayoutMain = ({ children }: PropsWithChildren) => {
  return (
    <MainContainer>
      <Header />
      <Content>{children}</Content>
    </MainContainer>
  );
};
