export default (url) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.onload = () => {
    if (xhr.status === 200) {
      const picURL = window.URL.createObjectURL(xhr.response);
      resolve(picURL);
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
