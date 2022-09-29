import {queryByText, render, waitFor} from "@testing-library/react";
import {DataSource, MyTable} from "@/components/MyTable";

interface MyData {
  name: string;
}

class MyDataSource implements DataSource<MyData> {
  fetch(): Promise<MyData[]> {
    return Promise.resolve([{"name": "张三"}]);
  }

  hasMore(): boolean {
    return true;
  }

}

describe('读取远程数据的表格', function () {
  it('should 显示表格标题', function () {
    let columns = [{
      title: '标题名',
      dataIndex: 'name',
      key: 'name',
    }];
    const {queryByText} = render(<MyTable columns={columns}/>)
    expect(queryByText("标题名")).toBeInTheDocument()
  });

  it('显示表格内容', async function () {
    let columns = [{
      title: '标题名',
      dataIndex: 'name',
      key: 'name',
    }];
    let dataSource = new MyDataSource();
    const {queryByText} = render(<MyTable columns={columns} remoteDataSource={dataSource}/>)
    await waitFor(() => expect(queryByText("张三")).toBeInTheDocument())
  });
});