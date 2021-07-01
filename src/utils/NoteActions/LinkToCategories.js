// import React, { useEffect, useState } from 'react';
// import 'css/modals/LinkToCategories.css';

// export default function LinkToCategory({
//   setnotesArray,
//   notesArray,
//   id,
//   categoriesTable,
// }) {
//   const [note, setnote] = useState(notesArray.find((item) => item.id == id));

//   const linkNoteToGroup = (noteId, groupId) => {
//     const tempNotes = notesArray.map((item) => {
//       if (item.id == noteId) {
//         if (item.groups[groupId]) item.groups[groupId] = null;
//         else item.groups[groupId] = categoriesTable[groupId].name;

//         const makeNull = (i) => (item.groups[i] = null);
//         for (let i = 0; i < item.groups.length; i++) {
//           item.groups[i] == undefined && makeNull(i);
//         }
//       }
//       return item;
//     });
//     setnotesArray(tempNotes);
//   };
//   useEffect(() => {
//     console.log(id);
//   }, []);

//   return (
//     <div className='linkToGroupBox modalBox'>
//       {/* <span className='titleSection'>Link to category</span> */}
//       <ul className='linkGroups hiddenScroll'>
//         {categoriesTable.map((item, index) => (
//           <li className='linkGroup'>
//             <input
//               checked={note.groups.includes(item.name)}
//               type='checkbox'
//               onChange={() => linkNoteToGroup(id, index)}
//             />
//             <span>{item.name}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
import React from 'react';

export default function LinkToCategories() {
  return <div></div>;
}
