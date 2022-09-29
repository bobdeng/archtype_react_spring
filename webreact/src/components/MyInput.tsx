import {Input, InputProps} from "antd";

export function MyInput(props: InputProps) {

  return <>
    <Input type="text"
           role={"input"}
           {
             ...props
           }
    >
    </Input>
  </>;
}