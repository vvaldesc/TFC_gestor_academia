import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

import useGetProfiles from '@/services/client/customhooks/useGetProfiles';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  "id",
  "name",
  "surname",
  "email",
  "phone_number",
  "address",
  "city",
  "bornDate",
  "created_at",
  "updated_at",
  "username",
  "confirmed",
  "image",
  "active",
  "matriculation_number",
  "employed",
  "DNI",
  "educational_level",
  "is_admin",
  "tableName"
].map((column) => ({
  title: column,
  dataIndex: column,
  key: column,
}));

const AntDesign_table: React.FC = () => {
  const { profiles, loading } = useGetProfiles();

  const data = (profiles?.result?.data.rows || []).map((row: any, index: number) => {
    const obj: any = {};
    row.forEach((item: any, i: number) => {
      obj[columns[i]?.key] = item;
    });
    return { key: index, ...obj };
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Table columns={columns} dataSource={data} />
  );
}

export default AntDesign_table;