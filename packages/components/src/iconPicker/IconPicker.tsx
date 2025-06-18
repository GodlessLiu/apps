import { useState } from "react";
import { Divider, Input, Popover, Space } from "antd";
import * as AntdIcons from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";

// 获取所有 Ant Design 图标
const allIcons = Object.keys(AntdIcons)
  .filter((iconName) => iconName.endsWith("Outlined"))
  .map((iconName) => ({
    name: iconName,
    // @ts-ignore
    component: AntdIcons[iconName],
  }));

interface IconPickerProps {
  defaultValue?: string;
  handleChange?: (value: string) => void;
}

export const AfIconPicker: React.FC<IconPickerProps> = ({
  defaultValue,
  handleChange,
}) => {
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(defaultValue || null);
  const handleIconClick = (iconName: string) => {
    setValue(iconName);
    setOpen(false);
    handleChange?.(iconName);
  };

  const filteredIcons = allIcons.filter((icon) =>
    icon.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const content = (
    <div style={{ width: 300 }}>
      <Input
        placeholder="搜索图标"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
      />
      <Divider />
      <div style={{ height: 300, overflowY: "auto" }}>
        <Space wrap size={[8, 16]}>
          {filteredIcons.map((icon) => {
            const IconComponent = icon.component;
            return (
              <div
                key={icon.name}
                onClick={() => handleIconClick(icon.name)}
                style={{
                  padding: 8,
                  cursor: "pointer",
                  borderRadius: 4,
                  backgroundColor:
                    value === icon.name ? "#e6f7ff" : "transparent",
                }}
              >
                <IconComponent style={{ fontSize: 20 }} />
              </div>
            );
          })}
        </Space>
      </div>
    </div>
  );
  // @ts-ignore
  const SelectedIcon = value ? AntdIcons[value] : null;

  return (
    <Popover
      content={content}
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      placement="bottomLeft"
    >
      <div
        style={{
          width: "100%",
          border: "1px solid #d9d9d9",
          borderRadius: 4,
          padding: "4px 11px",
          minHeight: 32,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {SelectedIcon ? (
          <Space>
            <SelectedIcon />
            <span>{value}</span>
          </Space>
        ) : (
          <span style={{ color: "#bfbfbf" }}>请选择图标</span>
        )}
      </div>
    </Popover>
  );
};

export default AfIconPicker;
