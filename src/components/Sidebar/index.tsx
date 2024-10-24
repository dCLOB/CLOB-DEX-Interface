import { Box, Card } from "@mui/material";
import { useFreighterContext } from "@/providers/FreighterProvider";
import { Assets } from "@/components/Sidebar/Assets";

export const Sidebar = () => {
  const { address } = useFreighterContext();

  return (
    <Card variant="outlined" sx={{ width: 280 }}>
      <Box display="flex" flexDirection="column" gap={3} height="100%" padding={2}>
        {Boolean(address) && <Assets />}
      </Box>
    </Card>
  );
};
