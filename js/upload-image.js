
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const addPhoto = (file, block) => {
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      block.querySelector('img').src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

export {addPhoto};
