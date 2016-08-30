import React, {PropTypes} from 'react';

const AnswerFrame = ({selectedNumbers, unselectNumber}) => {
  let key;
  const _selectedNumbers = selectedNumbers.map(function(i){
    key = "answer_" + i;
    return (
      <span key={key} onClick={unselectNumber} value={i} >{i}</span>
      );
  });
    return (
      <div id="answer-frame">
        <div className="well">
         {_selectedNumbers}
        </div>
      </div>
    );
  };

  AnswerFrame.propTypes = {
    selectedNumbers: PropTypes.array.isRequired,
    unselectNumber: PropTypes.func.isRequired
  };

export default AnswerFrame;
