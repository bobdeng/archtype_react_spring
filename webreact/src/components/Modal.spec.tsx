import {fireEvent, render, waitFor} from "@testing-library/react";
import {MyModal} from "@/components/MyModal";
import {expect, vi} from "vitest";

describe("对话框", () => {

  it('should 显示对话框，当对话框初始化显示', function () {
    const {queryByText} = render(
      <MyModal title={"对话框标题"} open={true}/>
    )
    expect(queryByText("对话框标题")).toBeInTheDocument()
  });

  it('should 关闭对话框，当点击 关闭 按钮', function () {
    const onCancel = vi.fn()
    const {getByText} = render(
      <MyModal title={"对话框标题"} open={true} onCancel={() => onCancel()}>这里是对话框内容</MyModal>
    )
    fireEvent.click(getByText("Cancel"))
    expect(onCancel).toBeCalledTimes(1)
  });


  it('should 关闭对话框，当里面的内容触发了关闭', async function () {
    const mockOnConfirm = vi.fn()
    const {queryByText, getByText} = render(
      <MyModal title={"对话框标题"} open={true} onOk={mockOnConfirm}></MyModal>
    )
    fireEvent.click(getByText("OK"))
    expect(mockOnConfirm).toBeCalledTimes(1)
  });



})