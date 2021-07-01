const handleDeleteTask = (
  n,
  note,
  setcurrentContent,
  currentDoneTasks,
  setcurrentDoneTasks,
) => {
  let tempNote = note.content.split('\n');
  tempNote = [...tempNote.slice(0, n), ...tempNote.slice(n + 1)].join('\n');
  setcurrentContent(tempNote);

  let tempDoneTasks = currentDoneTasks;
  tempDoneTasks = [...tempDoneTasks.slice(0, n), ...tempDoneTasks.slice(n + 1)];
  setcurrentDoneTasks(tempDoneTasks);
};

export default handleDeleteTask;
