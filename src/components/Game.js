import * as React from 'react';
import { PushButton } from './PushButton';
import { CountDownNumber } from './CountDownNumber';
import { Button } from './Button';
import { Message } from './Message';
import { DifficultyRadioButtons } from './DifficultyRadioButtons';
import { ResetGameLink } from './ResetGameLink';
import { Min, Max, Speed } from './GameConstants';
import { GameFunctions } from './GameFunctions';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            targetNumber: 0,
            displayedNumber: 0,
            numbersToAdd: [],
            runningTotal: 0,
            indexToDisplay: 0,
            message: "",
            timeOut: 0,
            isGamePlaying: false,
            selectedDifficultyOption: "easy",
            selectedSpeedOption: "slow",
            gameSpeed: Speed.STEADY,
            targetNumMin: Min.EASY,
            targetNumMax: Max.EASY
        };

        this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
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

    setNumberSequence = () => {
        const { targetNumMin, targetNumMax } = this.state;
        let numbersToAdd = GameFunctions.CreateNumbersToAdd(targetNumMin, targetNumMax);
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
                    this.state.gameSpeed
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
        this.setNumberSequence();
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
                min = Min.EASY;
                max = Max.EASY;
                break;
            case "medium":
                min = Min.MEDIUM;
                max = Max.MEDIUM;
                break;
            case "hard":
                min = Min.HARD;
                max = Max.HARD;
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

    handleSpeedChange = (event) => {
        let speed = 0;
        switch (event.target.value) {
            case "slow":
                speed = Speed.SLOW;
                break;
            case "steady":
                speed = Speed.STEADY;
                break;
            case "fast":
                speed = Speed.FAST;
                break;
            default:
                console.error("Incorrect speed value, must be 'slow', 'steady' or 'fast'. It actually is: " + event.target.value);
        }
        this.setState({
            gameSpeed: speed,
            selectedSpeedOption: event.target.value
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
                    <DifficultyRadioButtons label1="Easy" 
                                            label2="Medium" 
                                            label3="Hard"
                                            selectedOption={this.state.selectedDifficultyOption} 
                                            onChange={this.handleDifficultyChange} />
                    <DifficultyRadioButtons label1="Slow"
                                            label2="Steady"
                                            label3="Fast"
                                            selectedOption={this.state.selectedSpeedOption}
                                            onChange={this.handleSpeedChange} />
                    <PushButton onClick={this.startGame} buttonText={"Start Countdown"} targetNumber={this.state.targetNumber} />
                    <ResetGameLink onClick={this.setNewTarget} />
                    <p>{this.state.targetNumber} </p>
                </div>               
            )
        }
        
    }        
}

