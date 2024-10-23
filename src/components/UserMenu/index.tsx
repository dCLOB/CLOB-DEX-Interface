import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  Popover,
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Button,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import { useFreighterContext } from "@/providers/FreighterProvider";
import { useBalance } from "@/hooks/useBalance";
import { formatDecimal } from "@/utils/formatters/number";

export const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const { address, isConnected } = useFreighterContext();
  const balance = useBalance();

  if (!isConnected) return null;

  const maskedAddress = address && `${address.slice(0, 4)}…${address.slice(-4)}`;

  return (
    <>
      <Button variant="contained" onClick={handleClick} sx={{ width: 160 }} color="secondary">
        <Box display="flex" gap={2}>
          <Avatar />
          <Box display="flex" flexDirection="column">
            <Typography variant="caption">{maskedAddress}</Typography>
            <Typography variant="caption">{formatDecimal(balance as `${number}`)} XLM</Typography>
          </Box>
        </Box>
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: -10,
          horizontal: "right",
        }}
      >
        <Paper sx={{ width: 160, maxWidth: "100%" }}>
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <ArrowUpwardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Deposit</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ArrowDownwardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Withdraw</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Popover>
    </>
  );
};
