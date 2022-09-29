import {fireEvent, render} from "@testing-library/react";
import {MyButton} from "@/components/MyButton";


describe("按钮组件", () => {

  it('should has button item', function () {
    const {getByRole} = render(<MyButton/>)
    expect(getByRole("button")).toBeInTheDocument()
  });

  it('should be disabled', function () {
    const {getByRole, getByText} = render(<MyButton disabled={true}>添加合作伙伴</MyButton>)
    expect(getByText("添加合作伙伴").parentElement).toBeDisabled()
  });

})