import React, {PropTypes} from 'react';
import ButtonFrame from './ButtonFrame';
import DoneFrame from './DoneFrame';
import NumbersFrame from './NumbersFrame';
import StarsFrame from './StarsFrame';
import AnswerFrame from './AnswerFrame';

class Game extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getDefaultState();
    this.selectNumber = this.selectNumber.bind(this);
    this.randomNumber = this.randomNumber.bind(this);
    this.unselectNumber = this.unselectNumber.bind(this);
    this.sumOfSelectedNumbers = this.sumOfSelectedNumbers.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.acceptAnswer = this.acceptAnswer.bind(this);
    this.redraw = this.redraw.bind(this);
    this.possibleSolutions = this.possibleSolutions.bind(this);
    this.possibleCombinationSum = this.possibleCombinationSum.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.updateDoneStatus = this.updateDoneStatus.bind(this);
    this.getDefaultState = this.getDefaultState.bind(this);
  }

  getDefaultState(){
    return {
      selectedNumbers:[],
              correct: null,
              usedNumbers:[],
              redraws:5,
              num: this.randomNumber(),
             doneStatus: null
    };
  }

  selectNumber(event){
    event.preventDefault();
    const clickedNumber = event.target.value;
    if(this.state.selectedNumbers.indexOf(clickedNumber) <0){
      if(this.state.usedNumbers.indexOf(clickedNumber) <0){
        this.setState(
          {selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
            correct:null
          }
          );
       }
    }
  }

  unselectNumber(event){
    event.preventDefault();
    const clickedNumber = event.target.value;
    let _selectedNumbers = this.state.selectedNumbers,
    indexOfnumber = _selectedNumbers.indexOf(clickedNumber);
    _selectedNumbers.splice(indexOfnumber,1);
    this.setState(
      {selectedNumbers: _selectedNumbers,
       correct:null
      }
    );
  }

  randomNumber(){
    return Math.floor(Math.random()*9)+1;
  }



  sumOfSelectedNumbers(){
    return this.state.selectedNumbers.reduce(function(p,n){
      return p+n;
    },0);
  }

  checkAnswer() {
    let correct = (this.state.num === this.sumOfSelectedNumbers());
    this.setState({correct: correct});
  }

   acceptAnswer() {
    let usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
    this.setState({
          selectedNumbers:[],
          correct: null,
          usedNumbers:usedNumbers,
          num: this.randomNumber()
    },function(){
      this.updateDoneStatus();
    });
  }

  redraw() {
    if(this.state.redraws > 0){
      this.setState({  num: this.randomNumber(),
                        selectedNumbers:[],
                        correct: null,
                        redraws:this.state.redraws-1
      }, function(){
      this.updateDoneStatus();
    });
    }
  }

  possibleCombinationSum(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return this.possibleCombinationSum(arr, n);
    }
    let listSize = arr.length, combinationsCount = (1 << listSize);
    for (let i = 1; i < combinationsCount ; i++ ) {
      let combinationSum = 0;
      for (let j=0 ; j < listSize ; j++) {
        if (i & (1 << j)) { combinationSum += arr[j]; }
      }
      if (n === combinationSum) { return true; }
    }
    return false;
  }

  possibleSolutions() {
    let stars = this.state.num,
    possibleNumbers=[];
    let _usedNumbers=this.state.usedNumbers;
    for(let i=1; i<=9;i++){
      if(_usedNumbers.indexOf(i)<0){
        possibleNumbers.push(i);
      }
    }
    return this.possibleCombinationSum(possibleNumbers, stars);
  }

  updateDoneStatus() {
     if(this.state.usedNumbers.length=== 9)
       {
         this.setState({
           doneStatus: 'Done. Nice!'
          });
         return;
       }
       if(this.state.redraws === 0 && !this.possibleSolutions()){
           this.setState({
            doneStatus: 'Game Over!'
            });
       }
  }



  resetGame() {
    this.setState(this.getDefaultState());
  }

  render() {
    let doneStatus = this.state.doneStatus,bottomFrame;
    if(doneStatus){
         bottomFrame = <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame}/>;
       } else {
         bottomFrame = <NumbersFrame selectedNumbers={this.state.selectedNumbers} selectNumber={this.selectNumber} usedNumbers={this.state.usedNumbers} />;                    
       }
    return (
    <div id="game">
      <h2>Play Nine</h2>
      <hr />
      <div className ="clearfix">
      <StarsFrame num={this.state.num} />
      <ButtonFrame selectedNumbers={this.state.selectedNumbers}
                    correct={this.state.correct}
                    checkAnswer={this.checkAnswer}
                    acceptAnswer={this.acceptAnswer}
                    redraw={this.redraw}
                    redraws={this.state.redraws}/>
      <AnswerFrame selectedNumbers={this.state.selectedNumbers}
                    unselectNumber={this.unselectNumber}  />
    </div>

    {bottomFrame}


  </div>
    );
  }
}

export default Game;
