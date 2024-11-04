import * as yup from "yup";

export const schema = yup
  .object({
    type: yup.string().oneOf(["limit", "market"]),
    price: yup.string().when("type", ([type], schema) => {
      return type === "limit"
        ? schema
            .required("Enter the price")
            .test("is-positive-amount", "Enter the price", (value = "") => parseFloat(value) > 0)
        : schema;
    }),
    amount: yup
      .string()
      .test("is-positive-amount", "Enter the amount", (value = "") => parseFloat(value) > 0)
      .test("is-valid-amount", "Insufficient funds", (value = "", ctx) => {
        const price = Number(
          (ctx.parent.type === "market" ? ctx.options.context?.lastPrice : ctx.parent.price) ||
            ctx.options.context?.lastPrice,
        );
        const balance = Number(ctx.options.context?.balance) || 0;

        return balance / price >= parseFloat(value);
      })
      .required("Enter the amount"),
  })
  .required();
