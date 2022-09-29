import {myMenus} from "@/Menus";
import {vi} from "vitest";
import {server} from "@/api/HttpServer";

describe('系统菜单', function () {
  it('should 返回可用菜单为空，如果用户没有任何权限', async function () {
    vi.spyOn(server, "listPermissions").mockResolvedValue([]);
    const menus = await myMenus();
    expect(menus).toHaveLength(0)
  });

  it('should 返回可用菜单为空，如果用户没有任何权限', async function () {
    vi.spyOn(server, "listPermissions").mockResolvedValue(["commodity.create"]);
    const menus = await myMenus();
    expect(menus).toHaveLength(1)
    expect(menus[0].children).toHaveLength(1)
  });
});