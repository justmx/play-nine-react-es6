import React, {PropTypes} from 'react';

const ButtonFrame = ({selectedNumbers, acceptAnswer, checkAnswer, correct, redraw, redraws}) => {
  let disabled, button;
  switch(correct){
    case true:
    button=(
        <button className="btn btn-success btn-lg" onClick={acceptAnswer}>
        <span className="glyphicon glyphicon-ok" ></span>
        </button>
      );
    break;
    case false:
      button=(
        <button className="btn btn-danger btn-lg">
            <span className="glyphicon glyphicon-remove"></span>
        </button>
      );
    break;
    default:
     disabled = (selectedNumbers.length === 0);
     button=(
        <button className="btn btn-primary btn-lg" disabled={disabled}
          onClick={checkAnswer} >=</button>
       );
  }

    return (
      <div id="button-frame"  >
       {button}
       <br /><br />
       <button className="btn btn-warning btn-xs" onClick={redraw}
               disabled={redraws == 0}>
              <span className="glyphicon glyphicon-refresh"></span>
              &nbsp;
              {redraws}
        </button>
      </div>
    );
  };

  ButtonFrame.propTypes = {
    acceptAnswer: PropTypes.func.isRequired,
    checkAnswer: PropTypes.func.isRequired,
    selectedNumbers: PropTypes.array.isRequired,
    correct: PropTypes.bool,
    redraw: PropTypes.func.isRequired,
    redraws: PropTypes.number.isRequired
  };

export default ButtonFrame;
