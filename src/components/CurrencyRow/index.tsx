import { Box, Typography } from "@mui/material";
import { formatDecimal } from "@/utils/formatters/number";
import React, { ReactNode } from "react";

interface CurrencyRowProps {
  title: ReactNode;
  value: number | bigint | `${number}`;
  token?: string;
}

export const CurrencyRow = ({ title, value, token }: CurrencyRowProps) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="caption" color="textSecondary" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="caption" color="textSecondary" fontWeight="bold">
        <Typography variant="caption" color="textPrimary" fontWeight="bold">
          {formatDecimal(value)}{" "}
        </Typography>
        {token}
      </Typography>
    </Box>
  );
};
