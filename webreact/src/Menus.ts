import {server} from "@/api/HttpServer";

interface Menu {
  label: string,
  key: string,
  children?: Menu[],
  allows?: string[],
  hasPermission?: boolean
}

export const Menus = [
  {
    label: "基础数据",
    key: "base",
    children: [
      {
        label: "商品管理",
        key: "commodities",
        allows: ["commodity.create"]
      },
      {
        label: "合作伙伴",
        key: "partners",
        allows: ["partner.create"]

      }
    ]
  },
  {
    label: "推广促销",
    key: "promotion",
    children: [
      {
        label: "老客推广",
        key: "promotions",
        allows: ["promotion.create"]
      }
    ]
  }
];

export async function myMenus() {
  const permissions = await server.listPermissions();

  function setMenuPermission(menu: Menu) {
    if (menu.children) {
      menu.children.forEach(setMenuPermission)
    }
    if (menu.allows) {
      menu.hasPermission = menu.allows?.filter(allow => permissions.indexOf(allow) >= 0).length > 0
    }
  }

  function hasPermission(menu: Menu) {
    if (menu.children) {
      return menu.children.filter(child => child.hasPermission).length > 0;
    }
    return menu.hasPermission;
  }

  Menus.forEach(menu => setMenuPermission(menu))
  let result = Menus.filter(menu => {
    return hasPermission(menu)
  });
  result.forEach(menu => {
    menu.children = menu.children.filter(child => hasPermission(child))
  })
  return result;
}