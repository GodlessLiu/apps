import { AfTable, ConfigProvider, zhCN } from "@apps/components";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];
const data = Array.from({ length: 4 }, (_, index) => ({
  name: `John Brown ${index}`,
  age: index,
  address: `New York No. 1 Lake Park ${index}`,
}));
function App() {
  return (
    <>
      <ConfigProvider locale={zhCN}>
        <div style={{ height: "100%" }}>
          <AfTable
            columns={columns}
            dataSource={data}
            pagination={{
              pageSize: 10,
              total: 100,
            }}
          />
        </div>
      </ConfigProvider>
    </>
  );
}

export default App;
