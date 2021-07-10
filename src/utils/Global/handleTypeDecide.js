const handleTypeDecide = (
  isPinned,
  isDeleted,
  isArchive,
  isShared,
  isSecret,
  groups,
  renderTypeHere,
  categoryTypeHere,
) => {
  // renderType values:
  // other
  // pinned
  // deleted
  //archive
  // shared
  // secret
  // category for certain categories

  let currentType = 'other';

  //categories filtering
  if (renderTypeHere == 'category' && !isDeleted && !isArchive && !isSecret) {
    if (groups.includes(categoryTypeHere)) return true;
  }

  //other
  else if (renderTypeHere != 'category') {
    if (isDeleted) {
      currentType = 'deleted';
      return currentType === renderTypeHere;
    } else if (isArchive) {
      currentType = 'archive';
      return currentType === renderTypeHere;
    } else {
      if (isPinned) currentType = 'pinned';
      if (isSecret) currentType = 'secret';
      if (isShared) currentType = 'shared';
    }
    return currentType === renderTypeHere;
  }
};
export default handleTypeDecide;
