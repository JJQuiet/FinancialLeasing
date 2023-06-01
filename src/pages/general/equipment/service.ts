import { message } from 'antd';
import { request } from 'umi';

// 获取设备类型
export async function getEquipmentTypes() {
  return request('/doSQL', {
    params: {
      paramvalues: {
        selectsql: 'select * from Equipment_Types',
        // sortfield: 'id desc',
      },
    },
  });
}

// 获取设备信息
export async function getEquipmentInfos() {
  return request('/doSQL', {
    params: {
      paramvalues: {
        selectsql: 'select * from Equipment_Info',
        // filtersql: `type_id = ${type_id}`,
      },
    },
  });
}

// 添加设备类型
export async function addEquipmentType(data) {
  return request('/doSQL', {
    params: {
      paramvalues: JSON.stringify({
        sqlprocedure: 'add_record_equipment_type',
        type_name: data.type_name,
        description: data.description,
      }),
    },
  }).then((res) => {});
}

// 添加设备信息
export async function addEquipmentInfo(data) {
  console.log(' data', data);
  request('/doSQL', {
    params: {
      paramvalues: JSON.stringify({
        sqlprocedure: 'add_record_equipment_info',
        type_id: data.type_id,
        model_number: data.model_number,
        manufacturer: data.manufacturer,
        supplier: data.supplier,
        production_year: data.production_year,
        specifications: data.specifications,
        notes: data.notes,
        image_url: data.image_url,
        price: data.price,
      }),
    },
  }).then((res) => {});
}

// 删除设备类型
export async function deleteEquipmentType(id) {
  return request('/api/equipment_types', {
    method: 'DELETE',
    params: {
      paramvalues: JSON.stringify({
        sqlprocedure: 'b04_delete_equipment_type',
        id: id,
      }),
    },
  });
}

// 删除设备信息
export async function deleteEquipmentInfo(id) {
  return request('/api/equipment_info', {
    method: 'DELETE',
    params: {
      paramvalues: JSON.stringify({
        sqlprocedure: 'b04_delete_equipment_info',
        id: id,
      }),
    },
  });
}

// 编辑设备信息
export async function editEquipmentInfo(id, data) {
  return request(`/api/equipment_info/${id}`, {
    method: 'PUT',
    data,
  });
}

export const deleteRecords = async (params: any) => {
  return request('/doSQL', {
    params: {
      paramvalues: JSON.stringify({
        sqlprocedure: 'delete_records_equipment_info',
        ...params,
      }),
    },
  })
    .then((res) => {
      message.success('删除成功！');
      return res;
    })
    .catch(function (error) {});
};
