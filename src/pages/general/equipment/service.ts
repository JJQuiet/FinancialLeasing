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
  })
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
  })
}

// 添加设备类型
export async function addEquipmentType(data) {
  return request('/api/equipment_types', {
    method: 'POST',
    data,
  });
}

// 添加设备信息
export async function addEquipmentInfo(data) {
  return request('/api/equipment_info', {
    method: 'POST',
    data,
  });
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
