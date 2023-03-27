// import axios from "axios";
import ajax from "./ajax";

export const reqdoSQL = (params) => {
    if (params.nodetype === undefined) params.nodetype='datagrid'; 
    const paramvalues = JSON.stringify(params);
    //var url = '/myServer/doSQL?paramvalues='+encodeURIComponent(paramvalues);
    var url = 'http://localhost:8081/myServer/doSQL?paramvalues='+encodeURIComponent(paramvalues);
    return ajax(url, {}, 'POST');
  }