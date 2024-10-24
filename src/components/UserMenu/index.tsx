import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
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
import { Deposit } from "@/components/Deposit";
import { Withdraw } from "@/components/Withdraw";

export const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const { network, address, isConnected } = useFreighterContext();
  const balance = useBalance();

  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  if (!isConnected) return null;

  const maskedAddress = address && `${address.slice(0, 4)}…${address.slice(-4)}`;

  return (
    <>
      <Box>
        <Typography variant="caption" color="textSecondary" lineHeight={1}>
          Network
        </Typography>
        <Typography variant="body2" lineHeight={1.5}>
          {network?.network}
        </Typography>
      </Box>
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{ width: 160 }}
        color="secondary"
        endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        <Box display="flex" gap={1.5}>
          <Avatar sx={{ width: 30, height: 30 }} />
          <Box display="flex" flexDirection="column" alignItems="flex-start" gap={0.5}>
            <Typography variant="caption" lineHeight={1} noWrap color="textPrimary">
              {maskedAddress}
            </Typography>
            <Typography variant="caption" lineHeight={1} noWrap fontWeight="500" color="textSecondary">
              {formatDecimal(balance as `${number}`, 0)} XLM
            </Typography>
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
            <MenuItem
              onClick={() => {
                setDepositOpen(true);
                handleClose();
              }}
            >
              <ListItemIcon>
                <ArrowUpwardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Deposit</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setWithdrawOpen(true);
                handleClose();
              }}
            >
              <ListItemIcon>
                <ArrowDownwardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Withdraw</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Popover>
      {depositOpen && <Deposit onClose={() => setDepositOpen(false)} />}
      {withdrawOpen && <Withdraw onClose={() => setWithdrawOpen(false)} />}
    </>
  );
};
