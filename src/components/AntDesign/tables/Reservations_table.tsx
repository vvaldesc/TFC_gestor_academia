import React from "react";
import { Space, Table, Tag, Button } from "antd";
import type { TableProps } from "antd";

interface Props {
  availableEmployees: any;
  daytime: string; // afternoon or morning
  onValueChange: (value: any) => void;
}



const Reservations_table: React.FC<Props> = ({
  availableEmployees,
  daytime,
  onValueChange,
}) => {

  const handleSelect = (value: any) => {
    onValueChange(value);
  };

  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
    rating: any;
  }
  
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
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
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Rating",
      key: "rating",
      dataIndex: "rating",
      // render: (_, { rating }) => (
      //   <Space>
      //     {[...Array(5)].map((_, i) => (
      //       <StarTwoTone
      //         twoToneColor={i < Math.round(rating/2) ? "gold" : "gray"}
      //         key={i}
      //       />
      //     ))}
      //   </Space>
      // ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          size="middle"
          onClick={() => handleSelect(record)}
        >
          <a>Reserve {record.name}</a>
        </Button>
      ),
    },
  ];
  
  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
      rating: 8,
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      rating: 2,
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
      rating: 2.5,
    },
  ];

  // Your code here
  return <Table
  columns={columns}
  dataSource={data}
  rowKey={(record) => record.key}
  />;
};

export default Reservations_table;
