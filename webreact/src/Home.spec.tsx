import {vi} from "vitest";
import {server} from "@/api/HttpServer";
import {render, screen, waitFor} from "@testing-library/react";
import {Home} from "@/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";

describe('主页面菜单', function () {
  it('should 当没有权限，不显示任何菜单', async function () {
    vi.spyOn(server, "listPermissions").mockResolvedValue([])
    render(<BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>)
    await waitFor(() => expect(screen.queryByText("基础数据")).not.toBeInTheDocument())
  });

  it('should 有权限，显示基础数据菜单', async function () {
    vi.spyOn(server, "listPermissions").mockResolvedValue(["commodity.create"])
    render(<BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>)
    await waitFor(() => expect(screen.queryByText("基础数据")).toBeInTheDocument())
  });
});