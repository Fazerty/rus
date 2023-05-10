import React, { useState, useEffect } from 'react';

const TextToGrid = ({ text }) => {
  const [gridItems, setGridItems] = useState([]);

  useEffect(() => {
    generateGrid();
  }, [text]);

  const generateGrid = () => {
    const textArray = text.slice(0, 49).split('');
    const generatedGridItems = [];

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const index = i * 7 + j;
        generatedGridItems.push(textArray[index] || '');
      }
    }

    setGridItems(generatedGridItems);
  };

  const handleMoveRow = (rowIndex, direction) => {
    const movedGridItems = [...gridItems];

    if (direction === 'up') {
      const startIndex = rowIndex * 7;
      const endIndex = startIndex + 6;
      const tempRow = movedGridItems.slice(startIndex, endIndex + 1);
      movedGridItems.splice(startIndex, 7);
      movedGridItems.splice(startIndex - 7, 0, ...tempRow);
    } else if (direction === 'down') {
      const startIndex = rowIndex * 7;
      const endIndex = startIndex + 6;
      const tempRow = movedGridItems.slice(startIndex, endIndex + 1);
      movedGridItems.splice(startIndex, 7);
      movedGridItems.splice(startIndex + 7, 0, ...tempRow);
    }

    setGridItems(movedGridItems);
  };

  const handleMoveColumn = (colIndex, direction) => {
    const movedGridItems = [...gridItems];

    if (direction === 'left') {
      for (let i = 0; i < 7; i++) {
        const currentIndex = i * 7 + colIndex;
        const newIndex = currentIndex - 1;
        const temp = movedGridItems[currentIndex];
        movedGridItems[currentIndex] = movedGridItems[newIndex];
        movedGridItems[newIndex] = temp;
      }
    } else if (direction === 'right') {
      for (let i = 0; i < 7; i++) {
        const currentIndex = i * 7 + colIndex;
        const newIndex = currentIndex + 1;
        const temp = movedGridItems[currentIndex];
        movedGridItems[currentIndex] = movedGridItems[newIndex];
        movedGridItems[newIndex] = temp;
      }
    }

    setGridItems(movedGridItems);
  };

  return (
    <div>
      <div className="grid-container">
        {gridItems.map((item, index) => (
          <div key={index} className="grid-item">
            {item}
          </div>
        ))}
      </div>
      <div className="buttons-container">
        <button className="move-button" onClick={() => handleMoveRow(0, 'up')}>
          ↑
        </button>
        <button className="move-button" onClick={() => handleMoveRow(6, 'down')}>
          ↓
        </button>
        <button className="move-button" onClick={() => handleMoveColumn(0, 'left')}>
          ←
        </button>
        <button className="move-button" onClick={() => handleMoveColumn(6, 'right')}>
          →
        </button>
      </div>
    </div>
  );
};

export default TextToGrid;
