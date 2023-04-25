// 尽职调查详情.tsx
import React from 'react';
import { Descriptions } from 'antd';
import type { DueDiligenceItem } from '../index';

type DueDiligenceDetailProps = {
  item: DueDiligenceItem;
};

const DueDiligenceDetail: React.FC<DueDiligenceDetailProps> = ({ item }) => {
  return (
    <Descriptions column={2}>
      <Descriptions.Item label="客户名称">{item.customerName}</Descriptions.Item>
      <Descriptions.Item label="供应商名称">{item.supplierName}</Descriptions.Item>
      <Descriptions.Item label="租赁物">{item.leaseItem}</Descriptions.Item>
      <Descriptions.Item label="状态">{item.status}</Descriptions.Item>
      // 添加更多的描述项
      <Descriptions.Item label="客户类型">{item.customerType}</Descriptions.Item>
      <Descriptions.Item label="客户行业">{item.customerIndustry}</Descriptions.Item>
      <Descriptions.Item label="客户地址">{item.customerAddress}</Descriptions.Item>
      <Descriptions.Item label="供应商类型">{item.supplierType}</Descriptions.Item>
      <Descriptions.Item label="供应商行业">{item.supplierIndustry}</Descriptions.Item>
      <Descriptions.Item label="供应商地址">{item.supplierAddress}</Descriptions.Item>
      <Descriptions.Item label="租赁金额">{item.leaseAmount}</Descriptions.Item>
      <Descriptions.Item label="租赁期限">{item.leaseTerm}</Descriptions.Item>
    </Descriptions>
  );
};

export default DueDiligenceDetail;
