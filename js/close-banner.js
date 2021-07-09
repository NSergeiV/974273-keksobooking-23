// Закрытие баннеров с данными и карточки с информацией
const KODE_ESC = 27;

const closeBanner = (baner) => {

  const onCloseBaner = () => {
    baner.remove();
    document.removeEventListener('mouseup', onCloseBaner);
    // document.removeEventListener('keydown', onCloseEsc);
  };

  const onCloseEsc = (evt) => {
    if (evt.keyCode === KODE_ESC) {
      evt.preventDefault();
      onCloseBaner();
    }
  };

  document.addEventListener('keydown', onCloseEsc);
  document.addEventListener('mouseup', onCloseBaner);
};

export {closeBanner};
