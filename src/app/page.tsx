'use client'
import { Box, Card } from "@mui/material";
import { StyledContainer } from "./styles";
import { Sidebar } from "@/components/Sidebar";
import { TradingData } from "@/components/TradingData";

export default function HomePage() {
  return (
    <StyledContainer>
      <Box display='flex' flexDirection='column' gap={1}>
        <TradingData />
      </Box >
      <Sidebar />
    </StyledContainer>
  );
}
