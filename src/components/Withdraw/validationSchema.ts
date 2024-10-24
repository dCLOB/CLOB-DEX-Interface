import * as yup from "yup";

export const schema = yup
  .object({
    amount: yup
      .string()
      .test("is-positive-amount", "Enter the amount to withdraw", (value = "") => parseFloat(value) > 0)
      .test("is-valid-amount", "Insufficient funds", (value = "", ctx) => {
        return parseFloat(ctx.options.context?.balance) >= parseFloat(value);
      })
      .required("Enter the amount to withdraw"),
  })
  .required();
