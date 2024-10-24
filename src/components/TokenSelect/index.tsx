import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Popover, Paper, Button, Box, Typography, MenuList, MenuItem } from "@mui/material";
import { useState } from "react";
import { TokenIcon } from "@/components/TokenIcon";
import { TOKENS } from "@/constants";

interface TokenSelectProps {
  value: string;
  onChange: (value: string) => void;
}
export const TokenSelect = ({ value, onChange }: TokenSelectProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleSelect = (value: string) => {
    onChange(value);
    handleClose();
  };

  return (
    <Box>
      <Typography variant="caption" color="textSecondary" fontWeight="bold">
        Assets
      </Typography>
      <Button
        variant="contained"
        onClick={handleClick}
        color="secondary"
        fullWidth
        endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        <Box display="flex" alignItems="center" gap={0.75} width="100%">
          <TokenIcon sx={{ width: 24, height: 24 }} token={value} />
          <Typography variant="body2" fontWeight="bold">
            {value}
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
        <Paper sx={{ width: 300 }}>
          <MenuList>
            {TOKENS.map((token) => (
              <MenuItem key={token} onClick={() => handleSelect(token)}>
                <Box display="flex" alignItems="center" gap={0.75}>
                  <TokenIcon sx={{ width: 24, height: 24 }} token={token} />
                  <Typography variant="body2" fontWeight="bold">
                    {token}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      </Popover>
    </Box>
  );
};
