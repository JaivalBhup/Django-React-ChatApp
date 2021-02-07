# password-material-ui

A material-ui PASSWORD component which allows to see/hide the input text of the field

---

## Props

The component accepts the props defined bellow in the table.

### Props accepted by PasswordMaterialUi

| Name        | Type                    | Required | Default   | Description                                            |
| ----------- | ----------------------- | -------- | --------- | ------------------------------------------------------ |
| id          | string                  | no       | undefined | The id of the field                                    |
| label       | string                  | yes      | -         | The label of the field                                 |
| onChange    | (value: string) => void | yes      | -         | The callback function called when the value is changed |
| placeholder | string                  | no       | undefined | The placeholder of the field                           |
| type        | string                  | no       | text      | The type of the field; ex. text, password              |
| value       | string                  | no       | undefined | The value of the field                                 |

---

## Versions

| PasswordMaterialUi _uses_ | Material-ui | React  |
| ------------------------: | :---------: | :----: |
|                     1.0.x |    3.2.0    | 16.5.2 |

### About versioning schema used for PasswordMaterialUi

- Major - it will be increased if the major version of material-ui changes or there are breaking changes in the code of PasswordMaterialUi
- Minor - it will be increased if no major version of the dependat package changes, but there are changes of the minor or patch versions of it
- Patch - it will be increased if there are no changes of the dependat packages, but there are non breaking changes in the code of PasswordMaterialUi

---

## Example

The base component which allows to create read-only or creatable select components for selecting only one or more values:

```js
import * as React from "react";
import PasswordMaterialUi from "password-material-ui";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <PasswordMaterialUi
          type="text"
          label="Account"
          placeholder="contains this text"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }

  handleChange = (event: any) => {
    console.log(event);
  };
}

export default App;
```

```js
import * as React from "react";
import PasswordMaterialUi from "password-material-ui";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <PasswordMaterialUi
          type="password"
          label="Password"
          onChange={onChange}
        />
      </div>
    );
  }

  handleChange = (event: any) => {
    console.log(event);
  };
}

export default App;
```

---

## Similar npm packages

- [material-ui-password-field](https://www.npmjs.com/package/material-ui-password-field)

---

## Changelog

### 1.0.2

- password-material-ui is made publicly available
