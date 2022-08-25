export const fetchData = async (url: string) => {
  return await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => alert(error.message));
};
export const postData = async (url: string, payload: Object) => {
  return await fetch(url, { method: "POST", body: JSON.stringify(payload), headers: { "Content-type": "application/json; charset=UTF-8" } })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => alert(error.message));
};
export const putData = async (url: string, payload: Object) => {
  return await fetch(url, { method: "PUT", body: JSON.stringify(payload), headers: { "Content-type": "application/json; charset=UTF-8" } })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => alert(error.message));
};

export const deleteData = async (url: string) => {
  return await fetch(url, { method: "DELETE", headers: { "Content-type": "application/json; charset=UTF-8" } })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => alert(error.message));
};
