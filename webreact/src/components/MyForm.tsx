import {Form, FormProps} from "antd";


export function MyForm(props: FormProps) {
  return <>
    <Form {...props}>
      {props.children}
    </Form>
  </>;
}