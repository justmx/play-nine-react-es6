import React, {PropTypes} from 'react';

const DoneFrame = ({doneStatus, resetGame}) => {
  return (
    <div id="done-frame">
      <div className="well text-center">
         <h2>{doneStatus}</h2>
         <button className="btn btn-default" onClick={resetGame}>Play again</button>
      </div>
    </div>
  );
};

DoneFrame.propTypes = {
  doneStatus: PropTypes.string,
  resetGame: PropTypes.func.isRequired
};

export default DoneFrame;
