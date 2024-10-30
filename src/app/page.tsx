"use client";
import { Box, Card } from "@mui/material";
import { StyledContainer } from "./styles";
import { Sidebar } from "@/components/Sidebar";
import { TradingData } from "@/components/TradingData";
import { Orders } from "@/components/Orders";
import { OrderBook } from "@/components/OrderBook";

export default function HomePage() {
  return (
    <StyledContainer>
      <Box display="flex" flexDirection="column" gap={1}>
        <TradingData />
        <Box height={300} display="flex" gap={1}>
          <Card variant="outlined" sx={{ flex: 1 }} />
          <OrderBook />
        </Box>
        <Orders />
      </Box>
      <Sidebar />
    </StyledContainer>
  );
}
