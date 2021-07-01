// import React, { useState } from 'react';
// import '../../../../../../css/Apps/VNote/Actions/changeColor.css';

// export default function ChangeColor({ notesArray, setnotesArray, id }) {
//   const [currentColor, setcurrentColor] = useState(
//     notesArray.find((item) => item.id == id).color,
//   );

//   const handleChangeValue = (e) => {
//     setcurrentColor(e.target.value);

//     const tempNotes = notesArray.map((item) => {
//       if (item.id == id) item.color = currentColor;
//       else item.color = item.color;

//       return item;
//     });

//     setnotesArray(tempNotes);
//   };

//   return (
//     <div className='changeColorBox modalBox'>
//       <span className='colorPicker'>
//         <input
//           style={{ '--thumb-color': currentColor }}
//           type='range'
//           min='0'
//           max='360'
//           value={currentColor}
//           onChange={handleChangeValue}
//         />
//       </span>
//     </div>
//   );
// }
import React from 'react';

export default function ChangeColor() {
  return <div></div>;
}
