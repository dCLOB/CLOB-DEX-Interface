import { useFreighterContext } from "@/providers/FreighterProvider";
import { LoadingButton } from "@mui/lab";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export const ConnectWallet = () => {
  const { isConnected, isConnecting, connect } = useFreighterContext();

  if (isConnected) return null;

  return (
    <LoadingButton
      loading={isConnecting}
      loadingPosition="start"
      startIcon={<AccountBalanceWalletIcon />}
      variant="contained"
      color="secondary"
      onClick={connect}
    >
      {isConnecting ? "Connecting" : "Connect Wallet"}
    </LoadingButton>
  );
};
