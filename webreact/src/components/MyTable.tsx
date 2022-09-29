import {Table, TableProps} from "antd";
import {useMount} from "@/util/hook/use-mount";
import {useState} from "react";

export interface MyTableProps<T> extends TableProps<T> {
  remoteDataSource?: DataSource<T>;
}

export interface DataSource<T> {
  fetch: () => Promise<T[]>;
  hasMore: () => boolean;
}

export function MyTable<T extends object>(props: MyTableProps<T>) {
  const [dataSource, setDataSource] = useState<T[]>([])
  useMount(() => {
    if (props.remoteDataSource) {
      props.remoteDataSource.fetch().then((result) => {
        setDataSource(result)
      })
    }
  })
  return <>
    <Table dataSource={dataSource} {...props}>
    </Table>
  </>;
}