import React, {PropTypes} from 'react';

const NumbersFrame = ({selectedNumbers, selectNumber, usedNumbers}) => {
  let numbers = [],className = '',key;
  for(let i=1; i<=9;i++){
    className="number selected-" + (selectedNumbers.indexOf(i)>=0);
    className += ' used-' + (usedNumbers.indexOf(i)>=0);
    key="numberKey_"+ i;
    numbers.push(
       <div key={key} className={className} onClick={selectNumber} value={i} >{i}</div>
      );
  }
    return (
      <div id="numbers-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
    );
  };

  NumbersFrame.propTypes = {
    selectNumber: PropTypes.func.isRequired,
    usedNumbers: PropTypes.array.isRequired,
    selectedNumbers: PropTypes.array.isRequired
  };




export default NumbersFrame;
