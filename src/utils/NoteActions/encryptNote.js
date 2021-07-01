// import CryptoJS from 'crypto-js';

const encryptNote = (notesArray, setnotesArray, id, password) => {
  // setnotesArray(
  //   notesArray.map((item) => {
  //     if (item.id == id) {
  //       if (item.isArchive == true) {
  //         item.isArchive = false;
  //         item.content = CryptoJS.AES.decrypt(item.content, password).toString(
  //           CryptoJS.enc.Utf8,
  //         );
  //       } else {
  //         item.isArchive = true;
  //         item.content = CryptoJS.AES.encrypt(item.content, password);
  //       }
  //     }
  //     return item;
  //   }),
  // );
};

export default encryptNote;
