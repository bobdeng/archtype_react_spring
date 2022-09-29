import {Outlet, useNavigate} from "react-router-dom";
import {MenuProps} from "antd";
import {MyMenu} from "@/components/MyMenu";
import React, {useState} from "react";
import {useMount} from "@/util/hook/use-mount";
import {myMenus} from "@/Menus";

export function Home() {
  const navigate = useNavigate();
  const [menus, setMenus] = useState<MenuProps["items"]>([])
  const onClick: MenuProps['onClick'] = e => {
    navigate(e.key)
  };
  useMount(() => {
    myMenus().then(menus => setMenus(menus))
  })

  return <div>
    <MyMenu theme="dark" mode="horizontal" items={menus} onClick={onClick}/>
    <div className={"m-2"}>
      <Outlet/>
    </div>
  </div>
}