import { Box, Card } from "@mui/material";
import { useFreighterContext } from "@/providers/FreighterProvider";
import { Assets } from "@/components/Sidebar/Assets";
import { OrderForm } from "@/components/Sidebar/OrderForm";

export const Sidebar = () => {
  const { address } = useFreighterContext();

  return (
    <Card variant="outlined" sx={{ width: 280 }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        gap={3}
        height="100%"
        padding={2}
        paddingTop={0}
      >
        <OrderForm />
        {Boolean(address) && <Assets />}
      </Box>
    </Card>
  );
};
