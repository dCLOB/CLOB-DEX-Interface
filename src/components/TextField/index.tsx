import {
  InputAdornment,
  TextField as MuiTextField,
  TextFieldProps,
  InputBaseComponentProps,
  Box,
  Typography,
} from "@mui/material";
import { forwardRef, ChangeEvent } from "react";

import { IMaskInput } from "react-imask";

const TextFieldMask = forwardRef<HTMLInputElement, InputBaseComponentProps>(function TextFieldMask(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={Number}
      thousandsSeparator=","
      radix="."
      min={0}
      scale={6}
      inputMode="decimal"
      padFractionalZeros={false}
      normalizeZeros={false}
      autofix={false}
      inputRef={ref}
      unmask
      onAccept={(value) => {
        onChange?.({ target: { value } } as unknown as ChangeEvent<HTMLInputElement>);
      }}
      // overwrite
      // autofix
      // normalizeZeros
    />
  );
});

export const TextField = ({
  InputProps,
  helperText,
  withNumberMask = false,
  label,
  ...props
}: Omit<TextFieldProps, "variant"> & { withNumberMask?: boolean }) => {
  return (
    <Box>
      <Typography variant="caption" color="textSecondary" fontWeight="bold">
        {label}
      </Typography>
      <MuiTextField
        fullWidth
        variant="outlined"
        color="secondary"
        size="small"
        helperText={helperText ?? <>&nbsp;</>}
        {...props}
        InputProps={{
          ...InputProps,
          ...(withNumberMask && { inputComponent: TextFieldMask }),
          ...(InputProps?.endAdornment && {
            endAdornment: <InputAdornment position="end">{InputProps.endAdornment}</InputAdornment>,
          }),
        }}
      />
    </Box>
  );
};
