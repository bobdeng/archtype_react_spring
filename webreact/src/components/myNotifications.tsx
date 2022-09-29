import {notification} from "antd";

const myNotifications = {
  success: (message: string) => {
    notification.success({message: message})
  },
  closeAll() {
    notification.destroy();
  },
  error(message: string) {
    notification.error({message: message})
  }
}
export default myNotifications