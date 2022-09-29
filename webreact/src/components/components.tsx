import {MyButton} from "@/components/MyButton";
import myNotifications from "@/components/myNotifications";

export function Components() {
  return <div>
    <div>按钮</div>
    <MyButton>Primary</MyButton>
    <MyButton type={'primary'}>Warning</MyButton>
    <MyButton size={"large"}>普通大按钮</MyButton>
    <MyButton size={"small"}>普通小按钮</MyButton>
    <MyButton loading={true}>加载中</MyButton>
    <div>消息提示</div>
    <MyButton onClick={() => myNotifications.success("一条成功的提示" + new Date())}>成功提示</MyButton>
    <MyButton onClick={() => myNotifications.error("一条失败的提示" + new Date())}>失败提示</MyButton>
    <MyButton onClick={() => myNotifications.closeAll()}>清除提示</MyButton>
  </div>
}