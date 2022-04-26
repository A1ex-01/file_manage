import request from "../utils/request";

// 获取所有已上传文件
function getAllFile(data) {
  return request({
    url: "all",
    method: "get",
    data: {
      ...data,
      limit: 5,
    },
  });
}
function changeFileName(data) {
  return request({
    url: "update",
    method: "get",
    data: data,
  });
}
function deleteFile(id) {
  return request({
    url: "delete?id=" + id,
    method: "delete",
  });
}
export { getAllFile, changeFileName, deleteFile };
