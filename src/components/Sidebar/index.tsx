import { Box, Card, Divider } from "@mui/material";
import { useFreighterContext } from "@/providers/FreighterProvider";
import { Assets } from "@/components/Sidebar/Assets";
import { OrderForm } from "@/components/Sidebar/OrderForm";
import { AssetsDEX } from "@/components/Sidebar/AssetsDEX";

export const Sidebar = () => {
  const { address } = useFreighterContext();

  return (
    <Card variant="outlined" sx={{ width: 280 }}>
      <Box display="flex" flexDirection="column" gap={3} height="100%" padding={2} paddingTop={0}>
        <OrderForm />
        <Divider />
        {Boolean(address) && <Assets />}
        {Boolean(address) && (
          <>
            <Divider />
            <AssetsDEX />
          </>
        )}
      </Box>
    </Card>
  );
};
