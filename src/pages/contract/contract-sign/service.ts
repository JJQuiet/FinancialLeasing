import { message } from 'antd';
import moment from 'moment';
import { request } from 'umi';

export async function getProjectsApproved({
  current = 1,
  pageSize = 10,
}: {
  current?: number;
  pageSize?: number;
}) {
  return request<{
    rows: API.Project[];
    total?: number;
    success?: boolean;
  }>('/doSQL', {
    params: {
      paramvalues: {
        selectsql: 'select * from financing_approval',
        pagesize: pageSize,
        pageno: current,
        filtersql: `status='` + '通过' + `'`,
        sortfield: 'id desc',
      },
    },
  }).then((res) => {
    // return { data: res.rows, success: true };
    return { data: res.rows, total: res.total, success: true };
  });
}
export const editRecord = async (id, values, signatureDateUrl) => {
  console.log(' signatureDateUrl', signatureDateUrl);
  return request('/doSQL', {
    params: {
      paramvalues: JSON.stringify({
        sqlprocedure: 'update_contract_data',
        id: id,
        equipment_quantity: values.equipmentQuantity,
        start_date: moment(values.startDate).format('YYYY-MM-DD'),
        end_date: moment(values.endDate).format('YYYY-MM-DD'),
        rent_amount: values.rentAmount,
        rent_payment_method: values.rentPaymentMethod,
        repayment_interval: values.repaymentInterval,
        late_fee_rate: values.lateFeeRate,
        deposit_amount: values.depositAmount,
        deposit_refund: values.depositRefund,
        usage_scope: values.usageScope,
        maintenance_responsibility: values.maintenanceResponsibility,
        insurance_responsibility: values.insuranceResponsibility,
        insurance_cost: values.insuranceCost,
        breach_terms: values.breachTerms,
        contract_termination: values.contractTermination,
        buyout_option: values.buyoutOption,
        buyout_price: values.buyoutPrice,
        dispute_resolution: values.disputeResolution,
        signature_data_url: signatureDateUrl,
        contract_status: '履行中',
        grace_period: values.grace_period,
      }),
    },
  })
    .then(function (response) {
      message.success('保存成功！');
      return response;
    })
    .catch(function (error) {
      message.success('签署失败!');
    });
};
