import {Modal, ModalProps} from "antd";

export function MyModal(props: ModalProps) {

  return <>
    <Modal maskClosable={false} {...props} >
      {props.children}
    </Modal>
  </>;
}