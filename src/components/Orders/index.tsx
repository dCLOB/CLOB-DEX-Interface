import { Box, Card, Tabs, Tab } from "@mui/material";

import React, { useState } from "react";

import { OpenOrders } from "@/components/Orders/OpenOrders";
import { OrderHistory } from "@/components/Orders/OrderHistory";

export const Orders = () => {
  const [currentTab, setCurrentTab] = useState("openOrders");

  return (
    <Card variant="outlined" sx={{ flex: 1 }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        gap={1}
        height="100%"
        padding={2}
        paddingTop={0}
      >
        <Tabs indicatorColor="secondary" textColor="secondary" value={currentTab} onChange={(e, v) => setCurrentTab(v)}>
          <Tab label="Open Orders" value="openOrders" />
          <Tab label="Order History" value="orderHistory" />
        </Tabs>
        {currentTab === "openOrders" && <OpenOrders />}
        {currentTab === "orderHistory" && <OrderHistory />}
      </Box>
    </Card>
  );
};
