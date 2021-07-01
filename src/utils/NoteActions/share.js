// import React, { useRef, useState } from 'react';
// import '../../../../../../css/Apps/VNote/Actions/share.css';

// export default function Share({ notesArray, id }) {
//   const link = useRef(null);
//   const [linkState, setlinkState] = useState({
//     isCopied: false,
//     value: `https:/vdesk.cu.ma/apps/vnote/shared/generatedLink`,
//   });

//   const handleCopyLink = () => {
//     window.getSelection().selectAllChildren(link.current);
//     document.execCommand('copy');

//     setlinkState({ isCopied: true, value: linkState.value });

//     window.getSelection().removeAllRanges();
//     setTimeout(() => {
//       setlinkState({ isCopied: false, value: linkState.value });
//     }, 4000);
//   };

//   return (
//     <div className='shareBox modalBox'>
//       <a className='hiddenScroll' ref={link} href={linkState.value}>
//         {linkState.isCopied ? 'Copied' : linkState.value}
//       </a>
//       <button aria-label='Copy link' onClick={handleCopyLink}>
//         <i className='far fa-copy'></i>
//       </button>
//     </div>
//   );
// }
import React from 'react';

export default function share() {
  return <div></div>;
}
