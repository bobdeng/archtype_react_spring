import {Menu, MenuProps} from "antd";

export function MyMenu(props: MenuProps) {
  return <>
    <Menu {...props}>
      {props.children}
    </Menu>
  </>
}