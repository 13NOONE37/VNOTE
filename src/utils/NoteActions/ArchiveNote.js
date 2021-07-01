// import React from 'react';
// import '../../../../../../css/Apps/VNote/Actions/Delete.css';

// export default function ArchiveNote({ notesArray, setnotesArray, id }) {
//   const handleUnfocus = () => document.activeElement.blur();

//   const handleArchive = () => {
//     setnotesArray(
//       notesArray.map((item) => {
//         item.id == id && (item.isArchive = !item.isArchive);

//         return item;
//       }),
//     );
//     document.activeElement.blur();
//   };

//   return (
//     <div className='deleteBox modalBox'>
//       <button aria-label='Cancel archive' onClick={handleUnfocus}>
//         <i className='fas fa-chevron-left'></i>
//       </button>
//       <button
//         aria-label='Archive note'
//         style={{ backgroundColor: '#d89646' }}
//         onClick={handleArchive}
//       >
//         <i className='fas fa-archive'></i>
//       </button>
//     </div>
//   );
// }
import React from 'react';

export default function ArchiveNote() {
  return <div></div>;
}
