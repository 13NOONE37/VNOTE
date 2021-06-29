export default async function handleClickOutside(e, box, setshowBox) {
  await document.activeElement.blur();
  if (e.target === box.current) {
    setshowBox(false);
  }
}
