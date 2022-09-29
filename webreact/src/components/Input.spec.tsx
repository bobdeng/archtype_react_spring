import { fireEvent, render } from "@testing-library/react";
import { MyInput } from "@/components/MyInput";
import { inputChangeEvent } from "../../test/tests";


describe("输入框", () => {
  it('should 显示输入框', function () {
    const {getByRole} = render(<MyInput></MyInput>)
    expect(getByRole("input")).toBeInTheDocument()
  });

  it('should 输入框绑定值', function () {
    const form = {name: ""}
    const {getByRole} = render(<MyInput onChange={(e) => form.name = e.target.value}></MyInput>)
    fireEvent.change(getByRole("input"), inputChangeEvent("张三"));
    expect(form.name).toEqual("张三")
  });

  it('should 绑定值到输入框', function () {
    const {getByRole} = render(<MyInput value={"张三"}/>)
    expect(getByRole("input")).toHaveValue("张三")
  });

  it('should onChange没有绑定，输入值', function () {
    const {getByRole} = render(<MyInput></MyInput>)
    expect(getByRole("input")).toBeInTheDocument()
    fireEvent.change(getByRole("input"), inputChangeEvent("张三"));
    expect(getByRole("input")).toHaveValue("张三")
  });
  it('should 显示placeholder', function () {
    const {getByRole} = render(<MyInput placeholder={"输入的placeholder"}></MyInput>)
    expect(getByRole("input")).toHaveAttribute("placeholder", "输入的placeholder")
  });
})