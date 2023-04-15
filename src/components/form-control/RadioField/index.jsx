import { theme } from "@/theme";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const BoxMain = styled(RadioGroup)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  span: {
    fontSize: "0.875rem",
  },
  color: theme.palette.black.main,
}));
const RadioField = ({ name, form, arr }) => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <BoxMain
          aria-label="gender"
          onBlur={onBlur}
          onChange={onChange}
          value={value}
        >
          {arr.map((item) => (
            <FormControlLabel
              sx={{
                svg: {
                  color: error ? theme.palette.red3.main : "unset",
                },
              }}
              key={item.value}
              value={item.value}
              control={<Radio />}
              label={item.label}
            />
          ))}
        </BoxMain>
      )}
    />
  );
};

export default RadioField;
