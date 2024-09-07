export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
  return true;
};

export const getLocalStorage = (key) => {
  var data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return false;
};
