import { Box, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

interface TradingDataValueProps {
  title: string;
}

export const TradingDataValue = ({ title, children }: PropsWithChildren<TradingDataValueProps>) => {
  return (
    <Box display="flex" flexDirection="column" gap={0.5} alignItems="flex-start">
      <Typography variant="caption" color="textSecondary" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body2" fontWeight="bold">
        {children}
      </Typography>
    </Box>
  );
};
