"use client";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TextField } from "@/components/TextField";
import usePairStore from "@/stores/pair";
import { getCurrenciesFromPair } from "@/utils";
import { CurrencyRow } from "@/components/CurrencyRow";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validationSchema";
import { useGetBalance } from "@/api/user";
import { useFreighterContext } from "@/providers/FreighterProvider";
import { useGetMarkets } from "@/api/markets";
import { formatDecimal } from "@/utils/formatters/number";
import { LoadingButton } from "@mui/lab";
import { useCreateOrder } from "@/api/orders";
import { OrderSide, OrderType } from "@/api/orders/types";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

export const OrderForm = () => {
  const { address } = useFreighterContext();

  const pair = usePairStore((state) => state.pair);
  const { baseCurrency, quoteCurrency } = getCurrenciesFromPair(pair);

  const { data: marketsData } = useGetMarkets();
  const lastPrice = marketsData?.data?.find((market) => market.id === pair)?.lastPrice ?? 1;

  const { data: balanceData } = useGetBalance(address);
  const balance = balanceData?.data.balance[quoteCurrency] ?? 0;

  const maxSellBuy = balance / lastPrice;

  const { control, handleSubmit, trigger, formState, getFieldState, watch, reset } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      type: "limit",
      price: "",
      amount: "",
    },
    resolver: yupResolver(schema),
    context: { maxSellBuy },
  });

  const type = watch("type");

  useEffect(() => {
    if (getFieldState("amount").isTouched) trigger("amount");
  }, [maxSellBuy]);

  const { mutateAsync: createOrder, isPending } = useCreateOrder();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const [side, setSide] = useState<OrderSide>("buy");

  const onSubmit =
    (side: OrderSide) =>
    async ({ type, price, amount }: { type?: string; price?: string; amount?: string }) => {
      setSide(side);
      await createOrder({
        side,
        type: type as OrderType,
        price: type === "market" ? (lastPrice ?? 1) : parseFloat(price!),
        amount: parseFloat(amount!),
        pair,
      });
      enqueueSnackbar("You have created an order", { variant: "success" });
      reset({ type, price: "", amount: "" }, { keepErrors: false, keepTouched: false });
      queryClient.refetchQueries({ queryKey: ["balance"] }); //TODO open orders refetch
    };

  return (
    <form>
      <Box display="flex" flexDirection="column" gap={0.75}>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Tabs
              value={field.value}
              onChange={(e, value) => field.onChange({ ...e, target: { value } })}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab label="Limit" value="limit" />
              <Tab label="Market" value="market" />
            </Tabs>
          )}
        />
        {type === "market" ? (
          <Box paddingY={2}>
            <CurrencyRow title="Price" value={lastPrice} token={quoteCurrency} />
          </Box>
        ) : (
          <Controller
            name="price"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                withNumberMask
                InputProps={{ endAdornment: quoteCurrency }}
                label="Price"
                {...field}
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
        )}
        <Controller
          name="amount"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              withNumberMask
              InputProps={{ endAdornment: baseCurrency }}
              label="Amount"
              {...field}
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <CurrencyRow title="Fee" value={0} token={quoteCurrency} />

        <Box display="flex" gap={2} justifyItems="space-between" paddingY={1}>
          <LoadingButton
            variant="contained"
            color="success"
            fullWidth
            size="small"
            disabled={!formState.isValid || isPending}
            onClick={handleSubmit(onSubmit("buy"))}
            loading={isPending && side === "buy"}
          >
            Buy/Long
          </LoadingButton>
          <LoadingButton
            variant="contained"
            color="error"
            fullWidth
            size="small"
            disabled={!formState.isValid || isPending}
            onClick={handleSubmit(onSubmit("sell"))}
            loading={isPending && side === "sell"}
          >
            Sell/Short
          </LoadingButton>
        </Box>

        <Box display="flex" justifyContent="space-between" gap={2}>
          <Box display="flex" flexDirection="column">
            <Typography variant="caption" color="textSecondary" fontWeight="bold">
              Max Buy
            </Typography>
            <Typography variant="caption" color="textSecondary" fontWeight="bold">
              <Typography variant="caption" color="textPrimary" fontWeight="bold">
                {formatDecimal(maxSellBuy)}{" "}
              </Typography>
              {baseCurrency}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Typography variant="caption" color="textSecondary" fontWeight="bold">
              Max Sell
            </Typography>
            <Typography variant="caption" color="textSecondary" fontWeight="bold">
              <Typography variant="caption" color="textPrimary" fontWeight="bold">
                {formatDecimal(maxSellBuy)}{" "}
              </Typography>
              {baseCurrency}
            </Typography>
          </Box>
        </Box>
      </Box>
    </form>
  );
};
