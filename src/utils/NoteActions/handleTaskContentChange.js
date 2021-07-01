const handleTaskContentChange = (e, n, note, setcurrentContent) => {
  let tempNote = note.content.split('\n').map((task, index) => {
    if (index == n) task = e.target.innerText;
    return task;
  });
  tempNote = tempNote.join('\n');
  setcurrentContent(tempNote);
};
export default handleTaskContentChange;
