// import React from 'react';
// import '../../../../../../css/Apps/VNote/Actions/Delete.css';

// export default function Delete({ notesArray, setnotesArray, id }) {
//   const handleUnfocus = () => document.activeElement.blur();

//   const handleDelete = () => {
//     setnotesArray(notesArray.filter((item) => item.id !== id));
//     document.activeElement.blur();
//   };

//   return (
//     <div className='deleteBox modalBox'>
//       <button aria-label='Cancel delete' onClick={handleUnfocus}>
//         <i className='fas fa-chevron-left'></i>
//       </button>
//       <button
//         aria-label='Delete note'
//         style={{ backgroundColor: '#d84654' }}
//         onClick={handleDelete}
//       >
//         <i className='far fa-trash-alt'></i>
//       </button>
//     </div>
//   );
// }
import React from 'react';

export default function Delete() {
  return <div></div>;
}
