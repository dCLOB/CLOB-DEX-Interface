import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Popover, Paper, Button, Box, Typography, MenuList, MenuItem } from "@mui/material";
import { useState } from "react";
import usePairStore from "@/stores/pair";
import { MenuItemContent } from "./styles";
import { useMarkets } from "@/api/markets";
import { formatDecimal } from "@/utils/formatters/number";
import { TokenIcon } from "@/components/TokenIcon";

export const PairDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const pair = usePairStore((state) => state.pair);
  const setPair = usePairStore((state) => state.setPair);

  const { data } = useMarkets();

  const handleSelect = (value: string) => {
    setPair(value);
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClick}
        color="secondary"
        endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        <Box display="flex" alignItems="center" gap={0.75}>
          <TokenIcon sx={{ width: 24, height: 24 }} token={pair} />
          <Typography variant="body2" fontWeight="bold">
            {pair.replace("-", "/")}
          </Typography>
        </Box>
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: -10,
          horizontal: "left",
        }}
      >
        <Paper>
          <MenuList>
            <MenuItemContent sx={{ paddingX: 2, paddingY: 0.75 }}>
              <Typography variant="caption" color="textSecondary" fontWeight="bold">
                Pair
              </Typography>
              <Typography variant="caption" color="textSecondary" fontWeight="bold" align="right">
                Last Price
              </Typography>
              <Typography variant="caption" color="textSecondary" fontWeight="bold" align="right">
                24h %
              </Typography>
              <Typography variant="caption" color="textSecondary" fontWeight="bold" align="right">
                Volume
              </Typography>
            </MenuItemContent>

            {data?.data.map((market) => (
              <MenuItem key={market.id} onClick={() => handleSelect(market.id)}>
                <MenuItemContent>
                  <Box display="flex" alignItems="center" gap={0.75}>
                    <TokenIcon token={market.id} sx={{ width: 24, height: 24 }} />
                    <Typography variant="body2" fontWeight="bold">
                      {market.id}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    align="right"
                    color={market.priceChange >= 0 ? "success" : "error"}
                  >
                    {formatDecimal(market.lastPrice)}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    align="right"
                    color={market.priceChange >= 0 ? "success" : "error"}
                  >
                    {market.priceChange >= 0 && "+"}
                    {formatDecimal(market.priceChange * 100)}%
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" align="right">
                    {formatDecimal(market.baseVolume)}
                  </Typography>
                </MenuItemContent>
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      </Popover>
    </>
  );
};
