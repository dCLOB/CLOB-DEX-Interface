"use client";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { TextField } from "@/components/TextField";
import usePairStore from "@/stores/pair";
import { getCurrenciesFromPair } from "@/utils";
import { CurrencyRow } from "@/components/CurrencyRow";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validationSchema";
import { useGetBalance, useWithdraw } from "@/api/user";
import { useFreighterContext } from "@/providers/FreighterProvider";
import { useGetMarkets } from "@/api/markets";
import { LoadingButton } from "@mui/lab";
import { useCreateOrder, useGetOpenOrders, useGetOrderHistory } from "@/api/orders";
import { OrderSide, OrderType } from "@/api/orders/types";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { ConnectWallet } from "@/components/ConnectWallet";
import { useTokenContract } from "@/hooks/useTokenContract";
import { useDexContract } from "@/hooks/useDexContract";
import { createOrderContractData, getOrderBookId } from "./utils";
import { xdr } from "@stellar/stellar-sdk";

const FEE = 1;

export const OrderForm = () => {
  const [loading, setLoading] = useState(false);
  const [side, setSide] = useState<OrderSide>("buy");

  const { isConnected, address } = useFreighterContext();

  const { data: openOrdersData } = useGetOpenOrders();
  const { data: orderHistoryData } = useGetOrderHistory();
  const hasOrders = Boolean(openOrdersData?.data.length || orderHistoryData?.data.length);

  const pair = usePairStore((state) => state.pair);
  const { baseCurrency, quoteCurrency } = getCurrenciesFromPair(pair);

  const { data: marketsData } = useGetMarkets();
  const lastPrice = marketsData?.data?.find((market) => market.id === pair)?.lastPrice ?? 1;

  const { data: balanceData } = useGetBalance();

  const { control, handleSubmit, watch, resetField, clearErrors, setError, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      type: "limit",
      price: "",
      amount: "",
    },
    resolver: yupResolver(schema),
  });

  const type = watch("type");

  const { mutateAsync: createOrder } = useCreateOrder();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const baseTokenContract = useTokenContract(baseCurrency);
  const quoteTokenContract = useTokenContract(quoteCurrency);
  const dexContract = useDexContract();

  const onSubmit =
    (side: OrderSide, checkFee?: boolean, isPayFeeApproved?: boolean) =>
    async ({ type, price, amount }: { type?: string; price?: string; amount?: string }) => {
      // additional validation before submit
      const balance = balanceData?.data.balance[side === "sell" ? baseCurrency : quoteCurrency] ?? 0;
      if (side === "sell" && Number(amount) > balance) {
        setError("amount", { type: "is-valid-amount", message: "Insufficient funds" });
        return;
      }

      const actualPrice = Number(type === "market" ? lastPrice : Number(price)) || lastPrice;
      if (side === "buy" && Number(amount) > balance / actualPrice) {
        setError("amount", { type: "is-valid-amount", message: "Insufficient funds" });
        return;
      }
      //

      if (checkFee) {
        setNetworkFeeDialogOpen(true);
        return;
      }
      setNetworkFeeDialogOpen(false);

      if (isPayFeeApproved) {
        const xlmBalance = balanceData?.data.balance["XLM"] ?? 0;
        if ((side === "sell" && xlmBalance < FEE) || (side === "buy" && Number(amount) + FEE > balance / actualPrice)) {
          enqueueSnackbar("Not enough funds to cover network fee", { variant: "error" });
          return;
        }
      }

      setLoading(true);

      try {
        const orderData = {
          side,
          type: type as OrderType,
          price: type === "market" ? (lastPrice ?? 1) : parseFloat(price!),
          amount: parseFloat(amount!),
          pair,
        };
        // TODO
        const [baseTokenDecimals, quoteTokenDecimals] = await Promise.all([
          baseTokenContract.decimals().then((res) => res.result),
          quoteTokenContract.decimals().then((res) => res.result),
        ]);

        const tx = await dexContract.create_order(
          createOrderContractData(orderData, address as string, baseTokenDecimals, quoteTokenDecimals),
        );
        const result = await tx.signAndSend();

        console.log("create order call result: ", result);
        // TODO

        await createOrder({
          ...orderData,
          orderBookId: getOrderBookId((result.getTransactionResponse as { returnValue: xdr.ScVal }).returnValue),
        });

        if (isPayFeeApproved) {
          await payFee({ token: "XLM", amount: FEE });
        }

        enqueueSnackbar("You have created an order", { variant: "success" });

        resetField("price");
        resetField("amount");
        clearErrors();

        await queryClient.refetchQueries({ queryKey: ["orders"] });
        await queryClient.refetchQueries({ queryKey: ["balance"] });
      } catch (e) {
        console.error(e);
        enqueueSnackbar("Something went wrong", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

  const [networkFeeDialogOpen, setNetworkFeeDialogOpen] = useState(false);

  const handleCreateOrder = async (side: OrderSide) => {
    setSide(side); // will be used later in modal if needed
    await handleSubmit(onSubmit(side, !hasOrders, false))();
  };

  const { mutateAsync: payFee, isPending: isPayFeePending } = useWithdraw();

  const handlePayFee = async () => {
    await handleSubmit(onSubmit(side, false, true))();
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
                fieldState={fieldState}
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
              fieldState={fieldState}
            />
          )}
        />

        {/*<CurrencyRow title="Fee" value={0} token={quoteCurrency} />*/}

        {isConnected && (
          <Box display="flex" gap={2} justifyItems="space-between" paddingY={1}>
            <LoadingButton
              variant="contained"
              color="success"
              fullWidth
              size="small"
              disabled={!formState.isValid || loading}
              onClick={() => handleCreateOrder("buy")}
              loading={loading && side === "buy"}
            >
              Buy/Long
            </LoadingButton>
            <LoadingButton
              variant="contained"
              color="error"
              fullWidth
              size="small"
              disabled={!formState.isValid || loading}
              onClick={() => handleCreateOrder("sell")}
              loading={loading && side === "sell"}
            >
              Sell/Short
            </LoadingButton>
          </Box>
        )}

        {!isConnected && (
          <Box display="flex" justifyContent="center" paddingY={1}>
            <ConnectWallet />
          </Box>
        )}

        {/*<Box display="flex" justifyContent="space-between" gap={2}>*/}
        {/*  <Box display="flex" flexDirection="column">*/}
        {/*    <Typography variant="caption" color="textSecondary" fontWeight="bold">*/}
        {/*      Max Buy*/}
        {/*    </Typography>*/}
        {/*    <Typography variant="caption" color="textSecondary" fontWeight="bold">*/}
        {/*      <Typography variant="caption" color="textPrimary" fontWeight="bold">*/}
        {/*        {formatDecimal(maxSellBuy)}{" "}*/}
        {/*      </Typography>*/}
        {/*      {baseCurrency}*/}
        {/*    </Typography>*/}
        {/*  </Box>*/}
        {/*  <Box display="flex" flexDirection="column" alignItems="flex-end">*/}
        {/*    <Typography variant="caption" color="textSecondary" fontWeight="bold">*/}
        {/*      Max Sell*/}
        {/*    </Typography>*/}
        {/*    <Typography variant="caption" color="textSecondary" fontWeight="bold">*/}
        {/*      <Typography variant="caption" color="textPrimary" fontWeight="bold">*/}
        {/*        {formatDecimal(maxSellBuy)}{" "}*/}
        {/*      </Typography>*/}
        {/*      {baseCurrency}*/}
        {/*    </Typography>*/}
        {/*  </Box>*/}
        {/*</Box>*/}
      </Box>

      {networkFeeDialogOpen && (
        <Dialog open onClose={() => setNetworkFeeDialogOpen(false)}>
          <DialogTitle>Network fee</DialogTitle>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography variant="body2">You must pay the network fee {FEE} XLM one time</Typography>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={() => setNetworkFeeDialogOpen(false)}>
              Cancel
            </Button>
            <LoadingButton color="success" onClick={handlePayFee} loading={isPayFeePending}>
              Pay
            </LoadingButton>
          </DialogActions>
        </Dialog>
      )}
    </form>
  );
};
