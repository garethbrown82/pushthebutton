import * as React from 'react';
import { PushButton } from './PushButton';
import { CountDownNumber } from './CountDownNumber';
import { Button } from './Button';
import { Message } from './Message';
import { DifficultyRadioButtons } from './DifficultyRadioButtons';
import { ResetGameLink } from './ResetGameLink';
import { EASY_MIN, EASY_MAX, MEDIUM_MIN, MEDIUM_MAX, HARD_MIN, HARD_MAX } from './DifficultyTargetMinMax';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            targetNumber: 15,
            displayedNumber: 0,
            numbersToAdd: [ 1, 2, 3, 4, 5 ],
            runningTotal: 0,
            indexToDisplay: 0,
            message: "",
            timeOut: 0,
            isGamePlaying: false,
            selectedDifficultyOption: "easy",
            targetNumMin: EASY_MIN,
            targetNumMax: EASY_MAX
        };

        this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
    }

    resetToZero = () => {
        clearTimeout(this.state.timeOut);
        this.setState({ 
            indexToDisplay: 0,
            runningTotal: 0,
            displayedNumber: 0,
            isGamePlaying: false,
            message: ""
        });
    }

    randomize = () => {
        let numTargetSplitInto = randomNumberBetween(2, 10);
        let numbersToAdd = [];
        for (let i=0; i < numTargetSplitInto; i++) {
            numbersToAdd.push(randomNumberBetween(1, 20));
        }
        numbersToAdd.push(0);
        let targetNumber = numbersToAdd.reduce((total, value) => total = total + value);
        this.setState({
            targetNumber: targetNumber,
            numbersToAdd: numbersToAdd
        })
    }

    incrementCountDownNumber = () => {
        this.setState((prevState) =>({
            displayedNumber: this.state.numbersToAdd[this.state.indexToDisplay],
            indexToDisplay: prevState.indexToDisplay + 1,
            runningTotal: prevState.runningTotal + this.state.numbersToAdd[this.state.indexToDisplay]                    
        }));
    }

    countDown = () => {
        let { indexToDisplay, 
            numbersToAdd, 
            targetNumber, 
            displayedNumber, 
            runningTotal,
            isTimerCancelled } = this.state;
            let timeOut = 0;

        if (indexToDisplay < numbersToAdd.length) {
            console.log("start countdown for total: " + targetNumber);
            this.setState({
                timeOut: setTimeout(
                    () => {               
                        this.incrementCountDownNumber();
                        console.log(displayedNumber + " Total: " + runningTotal);
                        this.countDown();
                    },
                    2000
                )
            })            
        };     
    }

    claimAnswer = () => {
        clearTimeout(this.state.timeOut);
        if (this.state.indexToDisplay === this.state.numbersToAdd.length-1) {
            this.setState({
                message: "Well Done!"
            });
        }
        else {
            this.setState({
                message: "Bad Luck!"
            });
        }
    }

    setNewTarget = () => {
        this.randomize();
    }

    startGame = () => {
        this.setState({
            isGamePlaying: true
        });
        this.countDown();
    }

    handleDifficultyChange = (event) => {
        let min = 0;
        let max = 0;
        switch(event.target.value) {
            case "easy":
                min = EASY_MIN;
                max = EASY_MAX;
                break;
            case "medium":
                min = MEDIUM_MIN;
                max = MEDIUM_MAX;
                break;
            case "hard":
                min = HARD_MIN;
                max = HARD_MAX;
                break;
            default:
                console.error("handleDifficultyChange can only accept a string value of 'easy', 'medium' or 'hard'")
        }
        this.setState({
            selectedDifficultyOption: event.target.value,
            targetNumMin: min,
            targetNumMax: max
        });
    }

    render() {
        let { isGamePlaying } = this.state;
        if (isGamePlaying) {
            return (
                <div className="col-md-4 offset-md-4 text-center div-border">
                    <CountDownNumber displayedNumber={this.state.displayedNumber} />
                    <PushButton onClick={this.claimAnswer} buttonText={"STOP"} targetNumber={this.state.targetNumber} />
                    <br />
                    <Button onClick={this.resetToZero} text={"Reset Game"} /> 
                    <br />
                    <Message message={this.state.message} />
                </div>
            )
        } else {
            return (
                <div className="col-md-4 offset-md-4 text-center div-border">
                    <DifficultyRadioButtons label1="Easy" label2="Medium" label3="Hard" selectedOption={this.state.selectedDifficultyOption} onChange={this.handleDifficultyChange} />
                    <PushButton onClick={this.startGame} buttonText={"Start Countdown"} targetNumber={this.state.targetNumber} />
                    <ResetGameLink onClick={this.setNewTarget} />
                    <p>Min: {this.state.targetNumMin}, Max: {this.state.targetNumMax}</p>
                </div>               
            )
        }
        
    }        
}

const randomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + 1;
}
