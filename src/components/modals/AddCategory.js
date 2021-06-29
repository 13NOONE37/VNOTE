import 'css/modals/addCategory.css';
import 'css/modals/modalConfig.css';

import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';

export default function AddCategory({
  categoriesTable,
  setcategoriesTable,
  showAddCategories,
  setshowAddCategories,
}) {
  const box = useRef(null);
  const [categoryValue, setcategoryValue] = useState('');

  const handleChangeValue = (e) => setcategoryValue(e.target.value);
  const handleUnfocus = () => document.activeElement.blur();
  const handleEditGroup = (e) =>
    e.currentTarget.parentNode.querySelector('span').focus();
  const handleDeleteGroup = (id) =>
    setcategoriesTable(categoriesTable.filter((item, n) => n !== id));

  const handleBlur = (e, n) =>
    setcategoriesTable(
      categoriesTable.map((item, index) => {
        if (index == n) {
          item.name = e.target.textContent;
          item.link = `/category/${e.target.textContent}`;
        }
        return item;
      }),
    );

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (categoryValue.length > 0) {
      let temp = categoriesTable;
      temp.push({
        name: categoryValue,
        icon: 'fas fa-tag',
        link: `/category/${categoryValue}`,
      });
      setcategoriesTable(temp);
      setcategoryValue('');
    }
    //temporary because for some reason state wasn't updated
    setcategoriesTable(
      categoriesTable.map((item) => {
        return item;
      }),
    );
  };

  return ReactDOM.createPortal(
    <>
      {showAddCategories && (
        <div
          ref={box}
          onMouseDown={(e) => handleClickOutside(e, box, setshowAddCategories)}
          className='modalBox'
        >
          <div className='addCategoryWindow'>
            <span className='titleSection'>Add category</span>

            <span className='addCategoryField'>
              <form onSubmit={handleAddCategory}>
                <input
                  type='text'
                  maxLength='50'
                  placeholder='Create new'
                  value={categoryValue}
                  onChange={handleChangeValue}
                />
                <button type='submit' className='categoryButton'>
                  <i className='fas fa-check'></i>
                </button>
              </form>
            </span>

            <span className='categories hiddenScroll'>
              {categoriesTable.length > 0 &&
                categoriesTable.map((item, index) => (
                  <span className='category' key={index}>
                    <button
                      onClick={(e) => handleEditGroup(e, index)}
                      className='categoryButton'
                    >
                      <i className='fas fa-pen'></i>
                    </button>
                    <span
                      contentEditable='true'
                      onBlur={(e) => handleBlur(e, index)}
                    >
                      {item.name}
                    </span>

                    <button className='categoryButton tooltipParent'>
                      <i className='far fa-trash-alt'></i>

                      <div className='deleteBox modalBox'>
                        <button
                          aria-label='Cancel delete'
                          onClick={handleUnfocus}
                        >
                          <i className='fas fa-chevron-left'></i>
                        </button>
                        <button
                          aria-label='Delete note'
                          onClick={() => handleDeleteGroup(index)}
                        >
                          <i className='far fa-trash-alt'></i>
                        </button>
                      </div>
                    </button>
                  </span>
                ))}
            </span>

            <span className='closeSection'>
              <button
                onClick={() => setshowAddCategories(false)}
                className='addCategoryDone'
              >
                Done
              </button>
            </span>
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal'),
  );
}
