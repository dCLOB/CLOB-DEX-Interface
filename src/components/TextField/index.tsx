import {
  InputAdornment,
  TextField as MuiTextField,
  TextFieldProps,
  InputBaseComponentProps,
  Box,
  Typography,
} from "@mui/material";
import { forwardRef, ChangeEvent, ReactNode } from "react";

import { IMaskInput } from "react-imask";
import { ControllerFieldState } from "react-hook-form";

const mapFieldState = (
  state: ControllerFieldState,
  helperText?: ReactNode,
): Pick<TextFieldProps, "error" | "helperText"> => {
  return {
    error: state.isDirty && state.invalid,
    helperText: (state.isDirty && state.error?.message) || helperText,
  };
};

const TextFieldMask = forwardRef<HTMLInputElement, InputBaseComponentProps & { scale?: number }>(
  function TextFieldMask(props, ref) {
    const { onChange, scale = 7, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask={Number}
        // thousandsSeparator=","
        radix="."
        min={0}
        scale={scale}
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
  },
);

export const TextField = ({
  InputProps,
  helperText = <>&nbsp;</>,
  withNumberMask = false,
  label,
  fieldState,
  scale,
  ...props
}: Omit<TextFieldProps, "variant"> & {
  withNumberMask?: boolean;
  fieldState?: ControllerFieldState;
  scale?: number;
}) => {
  const mappedFieldState = fieldState && mapFieldState(fieldState, helperText);

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
        helperText={helperText}
        {...props}
        {...mappedFieldState}
        InputProps={{
          ...InputProps,
          ...(withNumberMask && { inputComponent: TextFieldMask, inputProps: { scale } }),
          ...(InputProps?.endAdornment && {
            endAdornment: <InputAdornment position="end">{InputProps.endAdornment}</InputAdornment>,
          }),
        }}
      />
    </Box>
  );
};
