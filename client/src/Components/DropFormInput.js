import React from "react";
import { styled } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
});

const Label = styled("p")({
  color: "#b9bbbe",
  textTransform: "uppercase",
  fontWeight: "600",
  fontSize: "16px",
});

const Input = styled("input")({
  flexGrow: 1,
  height: "40px",
  border: "1px solid black",
  borderRadius: "5px",
  color: "#dcddde",
  background: "#35393f",
  margin: 0,
  fontSize: "16px",
  padding: "0 5px",
});

const Dropdown = styled(Select)({
  flexGrow: 1,
  height: "40px",
  border: "1px solid black",
  borderRadius: "5px",
  color: "#dcddde",
  background: "#35393f",
  margin: 0,
  fontSize: "16px",
  padding: "0 5px",
});

const DropFormInput = (props) => {
  const { value, setValue, label, type, placeholder, options } = props;

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Container>
        <Label>{label}</Label>
        {type === "dropdown" ? (
          <Dropdown value={value} onChange={handleValueChange}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Dropdown>
        ) : (
          <Input
            value={value}
            onChange={handleValueChange}
            type={type}
            placeholder={placeholder}
          />
        )}
      </Container>
    </>
  );
};

export default DropFormInput;
