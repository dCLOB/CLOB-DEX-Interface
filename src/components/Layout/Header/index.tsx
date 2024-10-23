"use client";
import { ConnectWallet } from "../../ConnectWallet";
import { UserMenu } from "@/components/UserMenu";
import { styled } from "@mui/material";
import Image from "next/image";

const HeaderStyled = styled("header")(({ theme }) => ({
  padding: theme.spacing(2, 3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.palette.background.default,
  height: 85,
}));

export const Header = () => {
  return (
    <HeaderStyled>
      <Image src="/logo.svg" height={50} alt="logo" width={100} />
      <div>
        <ConnectWallet />
        <UserMenu />
      </div>
    </HeaderStyled>
  );
};
