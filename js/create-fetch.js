import {showAlert} from './show-alert.js';

const URL_GET = 'https://23.javascript.pages.academy/keksobooking/data';
const URL_POST = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(
    URL_GET,
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw showAlert(`${response.status} ${response.statusText}`);
    })
    .then((json) => {
      onSuccess(json);
    })
    .catch((error) => {
      showAlert(error);
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    URL_POST,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if(response.ok) {
      onSuccess();
    } else {
      onError();
    }
  }).catch(() => {
    onError();
  });
};

export {getData, sendData};
