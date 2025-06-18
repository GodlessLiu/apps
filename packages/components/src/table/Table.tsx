import { Pagination, Table, type TableProps } from "antd";
import React, { useEffect, useRef, useState } from "react";

interface AfTableProps extends TableProps {
  headerHeight?: number;
}

export const AfTable: React.FC<AfTableProps> = ({ pagination, ...props }) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (tableRef.current) {
        const clientHeight = tableRef.current.clientHeight;
        // 45 分页器的高度
        setTableHeight(clientHeight - 45);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [props.headerHeight]);

  return (
    <div ref={tableRef} style={{ height: "100%" }}>
      <div
        style={{
          height: tableHeight,
        }}
        data-testid="table-content"
      >
        <Table
          {...props}
          pagination={false}
          scroll={{ y: tableHeight - (props.headerHeight || 55) }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 10,
        }}
        data-testid="table-pagination"
      >
        <Pagination {...pagination} />
      </div>
    </div>
  );
};
