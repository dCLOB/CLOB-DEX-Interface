"use client";
import { Box, Card } from "@mui/material";
import { StyledContainer } from "./styles";
import { Sidebar } from "@/components/Sidebar";
import { TradingData } from "@/components/TradingData";
import { Orders } from "@/components/Orders";

export default function HomePage() {
  return (
    <StyledContainer>
      <Box display="flex" flexDirection="column" gap={1}>
        <TradingData />
        <Box height={300} display="flex" gap={1}>
          <Card variant="outlined" sx={{ flex: 1 }} />
          <Card variant="outlined" sx={{ flex: "0 1 200px" }} />
        </Box>
        <Orders />
      </Box>
      <Sidebar />
    </StyledContainer>
  );
}
