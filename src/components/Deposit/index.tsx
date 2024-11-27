import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TokenSelect } from "@/components/TokenSelect";
import { TextField } from "@/components/TextField";
import { TOKENS } from "@/constants";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validationSchema";
import { useDeposit } from "@/api/user";
import { LoadingButton } from "@mui/lab";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { CurrencyRow } from "@/components/CurrencyRow";
import { useFreighterContext } from "@/providers/FreighterProvider";
import { useDexContract } from "@/hooks/useDexContract";
import { useTokenContract } from "@/hooks/useTokenContract";
import { getTokenContractId, parseUnits } from "@/utils";

interface DepositProps {
  onClose: () => void;
}

export const Deposit = ({ onClose }: DepositProps) => {
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState(TOKENS[0]);

  const balance = useWalletBalance(token);

  const { control, handleSubmit, trigger, formState, getFieldState } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
    },
    resolver: yupResolver(schema),
    context: { balance },
  });

  useEffect(() => {
    if (getFieldState("amount").isTouched) trigger("amount");
  }, [balance]);

  const { address } = useFreighterContext();

  const dexContract = useDexContract();
  const tokenContract = useTokenContract(token);

  const { mutateAsync: deposit } = useDeposit();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async ({ amount }: { amount: string }) => {
    try {
      setLoading(true);
      // TODO
      const { result: decimals } = await tokenContract.decimals();

      const tx = await dexContract.deposit({
        user: address!,
        token: getTokenContractId(token),
        amount: parseUnits(amount, decimals),
      });
      const res = await tx.signAndSend();
      console.log("deposit call result: ", res);
      // TODO
      await deposit({ token, amount: parseFloat(amount) });

      await queryClient.refetchQueries({ queryKey: ["wallet-balance"] });
      await queryClient.refetchQueries({ queryKey: ["dex-balance"] });
      await queryClient.refetchQueries({ queryKey: ["balance"] });

      enqueueSnackbar("Your assets will appear on your balance soon", {
        variant: "success",
      });
      onClose();
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Something went wrong", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={onClose} PaperProps={{ sx: { width: 360 } }}>
      <DialogTitle>Deposit</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <TokenSelect value={token} onChange={setToken} />

          <CurrencyRow title="Balance" value={balance} token={token} />

          <Controller
            name="amount"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                withNumberMask
                InputProps={{ endAdornment: token }}
                label="Amount"
                {...field}
                fieldState={fieldState}
                helperText="Please, set amount to deposit"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton color="success" type="submit" loading={loading} disabled={!formState.isValid}>
            Deposit
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
