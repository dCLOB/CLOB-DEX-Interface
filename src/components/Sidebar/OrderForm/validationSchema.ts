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
      .required("Enter the amount"),
  })
  .required();
