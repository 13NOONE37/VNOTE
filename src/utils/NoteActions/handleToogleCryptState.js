const handleToggleCryptState = (notes, setnotes, id) => {
  setnotes(
    notes.map((item) => {
      item.id == id && (item.isSecret = !item.isSecret);
      return item;
    }),
  );
};
export default handleToggleCryptState;
