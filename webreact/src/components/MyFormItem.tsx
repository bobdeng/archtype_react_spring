import {Form, FormItemProps} from "antd";

export function MyFormItem(props: FormItemProps) {
  return <>
    <Form.Item {...props}>
      {props.children}
    </Form.Item>
  </>;
}