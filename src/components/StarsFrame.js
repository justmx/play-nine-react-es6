import React, {PropTypes} from 'react';

const StarsFrame = ({num}) => {
  let stars = [];
  for(let i=0; i < num;i++){
    let key='star_' + i;
    stars.push(
      <span className="glyphicon glyphicon-star" key={key}></span>
      );
  }
    return (
      <div id="stars-frame">
        <div className="well">
         {stars}
          </div>
      </div>
    );
  };

  StarsFrame.propTypes = {
    num: PropTypes.number
  };

export default StarsFrame;
