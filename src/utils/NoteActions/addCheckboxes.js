const addCheckboxes = (notesArray, setnotesArray, id) => {
  const tempNotes = notesArray.map((item) => {
    if (item.id == id) item.isCheckboxList = !item.isCheckboxList;
    else item.isCheckboxList = item.isCheckboxList;

    return item;
  });

  setnotesArray(tempNotes);
};

export default addCheckboxes;
