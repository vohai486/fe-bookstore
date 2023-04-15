import { Box, Checkbox, styled } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const BoxMain = styled(Box)(({ theme }) => ({
  color: theme.palette.black.main,
  fontWeight: 400,
  fontSize: "0.875rem",
  display: "flex",
  gap: ".5rem",
  alignItems: "center",
}));
const CheckBoxField = ({ form, name, title }) => {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <BoxMain>
          <Checkbox
            sx={{ padding: 0 }}
            onChange={(e) => onChange(e.target.checked)}
            checked={value}
            onBlur={onBlur}
          />
          <span>{!!title && title}</span>
        </BoxMain>
      )}
    ></Controller>
  );
};

export default CheckBoxField;
