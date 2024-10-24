import * as yup from "yup";

export const schema = yup
  .object({
    amount: yup
      .string()
      .test("is-positive-amount", "Please, set amount to deposit", (value = "") => parseFloat(value) > 0)
      .test("is-valid-amount", "Insufficient funds", (value = "", ctx) => {
        return parseFloat(ctx.options.context?.balance) >= parseFloat(value);
      })
      .required("Please, set amount to deposit"),
  })
  .required();
