import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TokenSelect } from "@/components/TokenSelect";
import { TextField } from "@/components/TextField";
import { TOKENS } from "@/constants";
import { useBalance } from "@/hooks/useBalance";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validationSchema";
import { useDeposit } from "@/api/user";
import { LoadingButton } from "@mui/lab";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { CurrencyRow } from "@/components/CurrencyRow";

interface DepositProps {
  onClose: () => void;
}

export const Deposit = ({ onClose }: DepositProps) => {
  const [token, setToken] = useState(TOKENS[0]);

  const balance = useBalance(token);

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

  const { mutateAsync: deposit, isPending } = useDeposit();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async ({ amount }: { amount: string }) => {
    await deposit({ token, amount: parseFloat(amount) });
    await queryClient.refetchQueries({ queryKey: ["balance"] });
    enqueueSnackbar("The network might take a while. Your assets will appear on your balance soon", {
      variant: "success",
    });
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
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
                helperText={fieldState.error?.message ?? "Please, set amount to deposit"}
                label="Amount"
                {...field}
                error={fieldState.invalid}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton color="success" type="submit" loading={isPending} disabled={!formState.isValid}>
            Deposit
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};