import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TokenSelect } from "@/components/TokenSelect";
import { TextField } from "@/components/TextField";
import { TOKENS } from "@/constants";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validationSchema";
import { useGetBalance, useWithdraw } from "@/api/user";
import { LoadingButton } from "@mui/lab";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { CurrencyRow } from "@/components/CurrencyRow";

interface WithdrawProps {
  onClose: () => void;
}

export const Withdraw = ({ onClose }: WithdrawProps) => {
  const [token, setToken] = useState(TOKENS[0]);

  const { data } = useGetBalance();

  const balance = data?.data.balance[token] ?? 0;

  const { control, handleSubmit, trigger, formState } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "0.00",
    },
    resolver: yupResolver(schema),
    context: { balance },
  });

  useEffect(() => {
    trigger("amount");
  }, [balance]);

  const { mutateAsync: withdraw, isPending } = useWithdraw();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async ({ amount }: { amount: string }) => {
    await withdraw({ token, amount: parseFloat(amount) });
    await queryClient.refetchQueries({ queryKey: ["balance"] });
    enqueueSnackbar("The network might take a while. Your assets will appear on your balance soon", {
      variant: "success",
    });
    onClose();
  };

  return (
    <Dialog open onClose={onClose} PaperProps={{ sx: { width: 360 } }}>
      <DialogTitle>Withdraw</DialogTitle>
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
                helperText="Enter the amount to withdraw"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton color="success" type="submit" loading={isPending} disabled={!formState.isValid}>
            Withdraw
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
