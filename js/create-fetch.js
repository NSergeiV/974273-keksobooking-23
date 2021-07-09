import {showAlert} from './show-alert.js';

const getData = (onSuccess) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking/data',
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

const sendData = (body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  );

  /*.then((response) => {
    if(response.ok) {

    } else {
      showAlert(`${response.status} ${response.statusText}`);
    }
  }).catch((error) => {
    showAlert(error);
  });*/
};

export {getData, sendData};
