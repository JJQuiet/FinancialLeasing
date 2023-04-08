import request from 'umi-request';
export const getRemoteList = async () => {
  return request('http://public-api-v1.aspirantzhang.com/users',{
    method: 'GET',
  }).then(function(response){
    return response;
  }).catch(function(error){
    console.log('%c [ error ]', 'font-size:13px; background:pink; color:#b22c02;', error);
  })
}
export const editRecord = async ({id,values}) => {
  console.log('%c [ values ]', 'font-size:13px; background:pink; color:#b22c02;', values);
  console.log('%c [ id ]', 'font-size:13px; background:pink; color:#b22c02;', id);
  return request(`http://public-api-v1.aspirantzhang.com/users/${id}`,{
    method: 'put',
    data: values,
  }).then(function(response){
    console.log('okk');
    return response;
  }).catch(function(error){
    console.log('%c [ error ]', 'font-size:13px; background:pink; color:#b22c02;', error);
  })
}
