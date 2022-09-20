import http from "../services/http.common";

class VCDMSService {
  getAll(ApiName) {
    return http.post(ApiName);
  }

  getById(ApiName, id) {
    return http.post(`${ApiName}/${id}`);
  }

  getByBoj(ApiName, data) {
    return http.post(ApiName, data);
  }

  CreateUpdate(ApiName, data) {
    return http.post(ApiName, data);
  }
  getBackup(ApiName) {
    return http.get(ApiName,{responseType:'blob'});
  }
  uploadBackup(ApiName, data) {
    let formdata = new FormData();
    formdata.append("user",data.user)
    formdata.append("file", data.file);
    return http.post(ApiName, formdata,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
      processData: false,
      timeout: 300000,
    })
  }
  update(ApiName, id, data) {
    return http.put(`${ApiName}/${id}`, data);
  }
  getByUsername(ApiName, data) {
    return http.post(ApiName, data);
  }
  SetByUsername(ApiName, data) {
    return http.put(ApiName, data);
  }
  SetPassword(ApiName, data) {
    return http.put(ApiName, data);
  }
  verifyPassword(ApiName, data){
    return http.post(ApiName, data);
  }
  deleteByID(ApiName, id) {
    return http.delete(`${ApiName}/${id}`);
  }
  get(ApiName) {
    return http.get(`${ApiName}`);
  }
  uploadFile(ApiName, data) {
    let formdata = new FormData();
    formdata.append("file", data.file);
    formdata.append("ipArray", data.ipArray);
    return http.post(ApiName, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      processData: false,
      timeout: 300000,
    });
  }
  delete(ApiName, data) {
    return http.post(ApiName, data);
  }
}

export default new VCDMSService();
