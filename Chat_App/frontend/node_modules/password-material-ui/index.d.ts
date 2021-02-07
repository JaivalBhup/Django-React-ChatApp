import * as React from "react";

export interface PasswordMaterialUiProps extends React.Props<PasswordMaterialUi> {
  id?: string;
  type?: string;
  label: string;
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

declare class PasswordMaterialUi extends React.Component<PasswordMaterialUiProps> {
}

declare module "password-material-ui" {
}

export default PasswordMaterialUi;
