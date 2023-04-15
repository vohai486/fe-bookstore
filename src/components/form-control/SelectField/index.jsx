import * as React from "react";

import { Autocomplete, Stack, TextField, styled } from "@mui/material";
import { Controller } from "react-hook-form";

const SelectStyled = styled("select")(({ theme }) => ({
  width: "100%",
  fontSize: "0.875rem",
  color: theme.palette.back1.main,
  borderColor: "rgb(224, 224, 224)",
  padding: "0.5rem",
  borderRadius: ".25rem",
}));

const SelectField = ({
  form,
  name,
  placeholder,
  arr = [],
  setFiled = () => {},
}) => {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <SelectStyled
          placeholder={placeholder}
          required
          onBlur={onBlur}
          value={value}
          onChange={(e) => {
            if (setFiled) {
              setFiled(
                e.target.options[e.target.selectedIndex].getAttribute("code")
              );
            }
            onChange(e.target.value);
          }}
        >
          <option value="">{placeholder}</option>
          {arr.length > 0 &&
            arr.map((item, i) => (
              <option
                key={i}
                value={item.ProvinceName || item.DistrictName || item.WardName}
                code={item.WardCode || item.DistrictID || item.ProvinceID}
              >
                {item.ProvinceName || item.DistrictName || item.WardName}
              </option>
            ))}
        </SelectStyled>
      )}
    ></Controller>
  );
};

export default SelectField;
