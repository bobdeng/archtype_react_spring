import {render} from "@testing-library/react";
import {MyFormItem} from "@/components/MyFormItem";
import {Form} from "antd";
import {MyInput} from "@/components/MyInput";

describe("表单项", () => {
  it('should 显示Label', function () {
    const {getByText} = render(<Form><MyFormItem label={"用户名"}/>
      <MyInput/>
    </Form>)
    expect(getByText("用户名")).toBeInTheDocument()
  });

  it('should 显示项目内容', function () {
    const {queryByRole} = render(<MyFormItem>
      <input role={"item"}/>
    </MyFormItem>)
    expect(queryByRole("item")).toBeInTheDocument()
  });

})