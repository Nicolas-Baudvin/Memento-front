export default (url) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.onload = () => {
    if (xhr.status === 200) {
      resolve(xhr.response);
    }
    else {
      reject(xhr.statusText);
    }
  };
  xhr.onerror = () => {
    reject(Error("Problème réseau"));
  };
  xhr.send();
});
