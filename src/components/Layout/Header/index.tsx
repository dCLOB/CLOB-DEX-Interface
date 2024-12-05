"use client";
import { ConnectWallet } from "../../ConnectWallet";
import { UserMenu } from "@/components/UserMenu";
import { Box, styled } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const HeaderStyled = styled("header")(({ theme }) => ({
  padding: theme.spacing(2, 3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.palette.background.default,
  height: 75,
}));

export const Header = () => {
  return (
    <HeaderStyled>
      <Link href="/" style={{ display: "flex" }}>
        <Image src="/logo.svg" height={50} alt="logo" width={100} />
      </Link>
      <Box display="flex" gap={2} alignItems="center">
        <ConnectWallet />
        <UserMenu />
      </Box>
    </HeaderStyled>
  );
};
