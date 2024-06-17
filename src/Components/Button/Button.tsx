import React from "react";
import { IProps } from "./interfaces";
import { Button as MUIButton } from "@react-native-material/core";

const Button = (props: IProps) => {
  return (
    <MUIButton pressEffect="ripple" compact {...props} />
  );
};

export default Button;
