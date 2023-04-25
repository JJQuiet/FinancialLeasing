import { Request, Response } from 'express';

const tenants = [
  {
    id: '1',
    name: '承租人A',
    equityStructure: '股东A(50%)、股东B(30%)、股东C(20%)',
    history: '成立于2010年，主要从事制造业，有稳定的客户和市场份额。',
    relatedCompanies: '关联公司A、关联公司B、关联公司C',
  },
  {
    id: '2',
    name: '承租人B',
    equityStructure: '股东D(40%)、股东E(40%)、股东F(20%)',
    history:
      '成立于2015年，主要从事服务业，有较高的技术水平和创新能力。',
    relatedCompanies: '关联公司D、关联公司E、关联公司F',
  },
];

const details = [
  {
    id: '1',
    incomeData: [
      { year: '2019', revenue: '1000', profitMargin: '10%', evaluationValue:'正常' },
      { year: '2020', revenue: '800', profitMargin: '8%', evaluationValue:'下降' },
      { year: '2021', revenue: '900', profitMargin:'9%', evaluationValue:'回升' },
    ],
    assetData:[
      { year:'2019', totalAsset:'2000', currentAsset:'1000', fixedAsset:'1000', evaluationValue:'正常'},
      { year:'2020', totalAsset:'1800', currentAsset:'900', fixedAsset:'900', evaluationValue:'下降'},
      { year:'2021', totalAsset:'1900', currentAsset:'950', fixedAsset:'950', evaluationValue:'回升'},
    ],
    // other data omitted for brevity
  },
  {
    id: '2',
    incomeData: [
      { year: '2019', revenue: '1200', profitMargin: '12%', evaluationValue:'正常' },
      { year: '2020', revenue: '1000', profitMargin: '10%', evaluationValue:'下降' },
      { year: '2021', revenue: '1100', profitMargin:'11%', evaluationValue:'回升' },
    ],
    assetData:[
      { year:'2019', totalAsset:'2200', currentAsset:'1100', fixedAsset:'1100', evaluationValue:'正常'},
      { year:'2020', totalAsset:'2000', currentAsset:'1000', fixedAsset:'1000', evaluationValue:'下降'},
      { year:'2021', totalAsset:'2100', currentAsset:'1050', fixedAsset:'1050', evaluationValue:'回升'},
    ],
    // other data omitted for brevity
  },
];

export function getTenants(req: Request, res: Response) {
  const { current = 1, pageSize = 10 } = req.query;
  const data = tenants.slice((current - 1) * pageSize, current * pageSize);
  return res.json({
    data,
    success: true,
    total: tenants.length,
  });
}

export function getTenantDetail(req: Request, res: Response) {
  const { id, tabKey } = req.params;
  const detail = details.find((item) => item.id === id);
  if (detail) {
    return res.json({
      data: detail[tabKey + 'Data'],
      success: true,
      total: detail[tabKey + 'Data'].length,
    });
  } else {
    return res.status(404).json({
      message: `没有找到id为${id}的承租人`,
      success: false,
    });
  }
}

export function updateTenantDetail(req: Request, res: Response) {
  const { id } = req.params;
  const values = req.body;
  const detail = details.find((item) => item.id === id);
  if (detail) {
    Object.assign(detail, values);
    return res.json({
      message: `更新成功`,
      success: true,
    });
  } else {
    return res.status(404).json({
      message: `没有更新id为${id}的承租人`,
      success: false,
    });
  }
}