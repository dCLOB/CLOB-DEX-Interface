import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TokenSelect } from "@/components/TokenSelect";
import { TextField } from "@/components/TextField";
import { TOKENS } from "@/constants";
import { useBalance } from "@/hooks/useBalance";
import { formatDecimal } from "@/utils/formatters/number";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validationSchema";
import { useDeposit } from "@/api/user";
import { useFreighterContext } from "@/providers/FreighterProvider";
import { LoadingButton } from "@mui/lab";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

interface DepositProps {
  onClose: () => void;
}

// TODO refactor form
export const Deposit = ({ onClose }: DepositProps) => {
  const [token, setToken] = useState(TOKENS[0]);

  const { address } = useFreighterContext();
  const balance = useBalance(token);

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

  const { mutateAsync: deposit, isPending } = useDeposit();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async ({ amount }: { amount: string }) => {
    await deposit({ address: address as string, token, amount: parseFloat(amount) });
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

          <Box display="flex" justifyContent="space-between">
            <Typography variant="caption" color="textSecondary" fontWeight="bold">
              Balance
            </Typography>
            <Typography variant="caption" color="textSecondary" fontWeight="bold">
              <Typography variant="caption" color="textPrimary" fontWeight="bold">
                {formatDecimal(balance)}{" "}
              </Typography>
              {token}
            </Typography>
          </Box>

          <Controller
            name="amount"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                withNumberMask
                InputProps={{ endAdornment: "XLM" }}
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
