import React, { useState } from 'react';
import 'css/main/ControlPageCount.css';

function ControPageCount({
  notebooks,
  setnotebooks,
  id,
  currentPage,
  setcurrentPage,
}) {
  const [lengthOfNotebook, setlengthOfNotebook] = useState(
    notebooks.find((item) => item.id == id).cards.length,
  );
  const handleAddPage = () => {
    // setnotebooks(
    //   notebooks.map((item, index) => {
    //     if (item.id === id) {
    //       item.card.push({
    //         date: '1.01.2001',
    //         titleOfPage: 'Destrukturyzacja',
    //         elements: [
    //           {
    //             type: 'image',
    //             frame: {
    //               translate: [0, 0],
    //               rotate: 0,
    //             },
    //             value: (
    //               <img
    //               src='https://ratatuj.pl/wp-content/uploads/2019/01/ratatouille_pixar_disney_two_rats-525x295.jpg'
    //               style={{ width: '100%', height: '100%' }}
    //               />
    //               ),
    //             },
    //             {
    //               type: 'image',
    //               frame: {
    //                 translate: [0, 0],
    //                 rotate: 0,
    //               },
    //               value: (
    //                 <img
    //                 src='https://wedel.pl/uploads/media/default/0001/02/39381df179e04212e6b22902fbee2f7ceb0caac6.png'
    //                 style={{ width: '100%', height: '100%' }}
    //                 />
    //                 ),
    //               },
    //             ],
    //           });
    //         }
    //         return item;
    //       }),
    //       );
    //       console.log('add', notebooks);
  };

  return (
    <div className='controlPageCount'>
      <button className='skewButton' onClick={() => setcurrentPage(1)}>
        <i className='fas fa-backward'></i>
      </button>
      <button onClick={() => setcurrentPage(Math.max(1, currentPage - 1))}>
        <i className='fas fa-angle-left'></i>
      </button>
      <input
        type='number'
        min={0}
        max={lengthOfNotebook}
        placeholder='0-99'
        value={currentPage}
        onChange={(e) =>
          setcurrentPage(
            Math.min(Math.max(1, e.target.value), lengthOfNotebook),
          )
        }
      />
      <button
        onClick={() =>
          setcurrentPage(Math.min(currentPage + 1, lengthOfNotebook))
        }
      >
        <i className='fas fa-angle-right'></i>
      </button>
      <button
        className='skewButton'
        onClick={() => setcurrentPage(lengthOfNotebook)}
      >
        <i className='fas fa-forward'></i>
      </button>
      <button className='skewButton' onClick={handleAddPage}>
        <i className='fas fa-plus'></i>
      </button>
    </div>
  );
}

export default ControPageCount;
