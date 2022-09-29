import {render} from "@testing-library/react";
import {MyMenu} from "@/components/MyMenu";
import {ItemType} from "antd/es/menu/hooks/useItems";

describe("菜单", () => {
  it('should 绘制菜单项目', function () {
    const items: ItemType[] = [{label: "菜单1", key: "1"}];
    const {getByText} = render(<MyMenu items={items}>

    </MyMenu>)
    expect(getByText("菜单1")).toBeInTheDocument()
  });
})