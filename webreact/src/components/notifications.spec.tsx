import {act, fireEvent, render, waitFor} from "@testing-library/react";
import App from "@/App";
import myNotifications from "@/components/myNotifications";
import {expect, vi} from "vitest";

describe("消息提示框", () => {
  it('should 显示消息提示框', function () {
    const {queryByText} = render(<App/>);
    myNotifications.closeAll()
    act(() => myNotifications.success("这是一条提示"));
    expect(queryByText("这是一条提示")).toBeInTheDocument();

  });

  it('关闭所有提示', function () {
    const {queryByRole, queryByText} = render(<App/>);
    act(() => myNotifications.success("这是一条提示1"));
    myNotifications.closeAll()
    waitFor(() => expect(queryByText("这是一条提示")).not.toBeInTheDocument());
  });

  it('should 3秒后自动关闭', async function () {
    vi.useFakeTimers()
    const {queryByRole, queryByText} = render(<App/>);
    myNotifications.closeAll()
    act(() => myNotifications.success("这是一条提示"));
    waitFor(() => expect(queryByText("这是一条提示")).toBeInTheDocument());
    await vi.runAllTimers();
    expect(queryByText("这是一条提示")).not.toBeInTheDocument();
  });

})