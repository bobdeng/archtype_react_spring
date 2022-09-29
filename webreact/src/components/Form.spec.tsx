import {render} from "@testing-library/react";
import {MyForm} from "@/components/MyForm";

describe("表单", () => {
  it('should 显示表单内容', function () {
    const {queryByText} = render(<MyForm>表单内容</MyForm>)
    expect(queryByText("表单内容")).toBeInTheDocument()
  });
})