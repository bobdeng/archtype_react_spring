import { describe, it, expect } from "vitest";
import { getByText, render, waitFor, screen, cleanup, fireEvent } from "@testing-library/react";
import App from "@/App";
import userEvent from "@testing-library/user-event";
import { server } from "@/api/HttpServer";
import { vi } from "vitest";


describe('主页', function () {
  describe('路由', () => {
    async function clickMenu(names: string[]) {
      for (let i = 0; i < names.length - 1; i++) {
        await userEvent.hover(screen.getByText(names[i]));
        await waitFor(() => expect(screen.queryByText(names[i + 1])).toBeInTheDocument())
      }
      await waitFor(() => userEvent.click(screen.getByText(names[names.length - 1])));
    }

    beforeEach(() => {
      vi.spyOn(server, "getSession").mockResolvedValue({ id: 1, name: "bob" })
    })
    afterEach(() => {
      cleanup()
    })
    it('should 路由测试', function () {

    });

  })

  describe('主页登录检查', function () {
    it('should 不显示菜单，如果没有登录', async function () {
      vi.spyOn(server, "getSession").mockRejectedValue("Not found")
      const renderer = render(<App/>)
      await waitFor(() => expect(screen.queryByText("检查登录")).not.toBeInTheDocument())
      expect(screen.queryByText("基础数据")).not.toBeInTheDocument()
    });

    it('should 不显示菜单，如果是系统管理员登录', async function () {
      vi.spyOn(server, "getSession").mockResolvedValue({ name: "系统管理员" })
      const renderer = render(<App/>)
      await waitFor(() => expect(screen.queryByText("检查登录")).not.toBeInTheDocument())
      expect(screen.queryByText("基础数据")).not.toBeInTheDocument()
    });

  });
});

