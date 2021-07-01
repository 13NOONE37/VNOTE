// import React from 'react';
// import '../../../../../../css/Apps/VNote/Actions/Delete.css';

// export default function PreDelete({
//   setnotesArray,
//   notesArray,
//   id,
//   showRestoreIcon,
// }) {
//   const handleUnfocus = () => document.activeElement.blur();

//   const handlePreDelete = () => {
//     setnotesArray(
//       notesArray.map((item) => {
//         item.id == id && (item.isDeleted = !item.isDeleted);

//         return item;
//       }),
//     );
//     document.activeElement.blur();
//   };

//   return (
//     <div className='deleteBox modalBox'>
//       <button aria-label='Cancel delete' onClick={handleUnfocus}>
//         <i className='fas fa-chevron-left'></i>
//       </button>
//       <button
//         aria-label='Delete note'
//         style={{
//           backgroundColor: `${showRestoreIcon ? '#669825' : '#d84654'}`,
//         }}
//         onClick={handlePreDelete}
//       >
//         {showRestoreIcon ? (
//           <i className='fas fa-undo'></i>
//         ) : (
//           <i className='far fa-trash-alt'></i>
//         )}
//       </button>
//     </div>
//   );
// }
import React from 'react';

export default function preDelete() {
  return <div></div>;
}
