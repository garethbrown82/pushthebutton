import * as React from 'react';
import { PushButton } from './PushButton';
import { CountDownNumber } from './CountDownNumber';
import { Button } from './Button';
import { DifficultyRadioButtons } from './DifficultyRadioButtons';
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
            showNumTimeout: 0,
            fadeTimeout: 0,
            isGamePlaying: false,
            selectedDifficultyOption: "easy",
            selectedSpeedOption: "slow",
            gameSpeed: Speed.STEADY,
            targetNumMin: Min.EASY,
            targetNumMax: Max.EASY,
            buttonLabel: "Start Game",
            fadeClass: 'show'
        };

        this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
    }

    resetToZero = () => {
        clearTimeout(this.state.showNumTimeout);
        clearTimeout(this.state.fadeTimeout);
        this.setState({ 
            indexToDisplay: 0,
            runningTotal: 0,
            displayedNumber: 0,
            isGamePlaying: false,
            buttonLabel: "Start Game",
        });
    }

    setNumberSequence = () => {
        const { targetNumMin, targetNumMax } = this.state;
        let numbersToAdd = GameFunctions.CreateNumbersToAdd(targetNumMin, targetNumMax);
        let targetNumber = numbersToAdd.reduce((total, value) => total = total + value);
        numbersToAdd.push("Too late!");
        this.setState({
            targetNumber: targetNumber,
            numbersToAdd: numbersToAdd,
            buttonLabel: "Stop when total is: " + targetNumber
        })
    }

    claimAnswer = () => {
        clearTimeout(this.state.showNumTimeout);
        if (this.state.indexToDisplay === this.state.numbersToAdd.length-1) {
            this.setState({
                buttonLabel: "Well Done!"
            });
        }
        else {
            this.setState({
                buttonLabel: "Bad Luck!"
            });
        }
    }

    startGame = () => {
        this.setNumberSequence();
        setTimeout(
            () => {
                this.setState({
                    isGamePlaying: true,
                    displayedNumber: "Ready!",
                    buttonLabel: "Total = " + this.state.targetNumber
                });
                this.countDown();
            },
            3500
        )      
    }

    countDown = () => {
        let { indexToDisplay, 
            numbersToAdd, 
            targetNumber, 
            displayedNumber, 
            runningTotal,
            isTimerCancelled,
            gameSpeed } = this.state;

        if (indexToDisplay < numbersToAdd.length) {
            this.setState({
                fadeClass: 'show',
                showNumTimeout: setTimeout(
                    () => {               
                        this.incrementCountDownNumber();
                        if (indexToDisplay === numbersToAdd.length-1) {
                            this.setState({buttonLabel: "Bad Luck!"})
                        }
                        this.countDown();
                    },
                    gameSpeed
                ),
                fadeTimeout: setTimeout(
                    () => {
                        this.setState({
                            fadeClass: 'fade'
                        });
                    },
                    gameSpeed - 500
                )
            });       
        };     
    };

    incrementCountDownNumber = () => {
        this.setState((prevState) =>({
            displayedNumber: this.state.numbersToAdd[this.state.indexToDisplay],
            indexToDisplay: prevState.indexToDisplay + 1,
            runningTotal: prevState.runningTotal + this.state.numbersToAdd[this.state.indexToDisplay]                    
        }));
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
        let { isGamePlaying,
            fadeClass,
            displayedNumber,
            buttonLabel,
            selectedDifficultyOption,
            selectedSpeedOption } = this.state;

        if (isGamePlaying) {
            return (
                <div className="col-md-4 offset-md-4 text-center main-container">
                    <div className="display-wrap">
                        <CountDownNumber displayedNumber={displayedNumber} fadeClass={fadeClass} />
                    </div>
                    <PushButton onClick={this.claimAnswer} buttonText={buttonLabel} />
                    <br />
                    <Button onClick={this.resetToZero} text={"Reset Game"} /> 
                </div>
            )
        } else {
            return (
                <div className="col-md-4 offset-md-4 text-center main-container">
                    <div className="display-wrap">
                        <DifficultyRadioButtons label1="Easy" 
                                                label2="Medium" 
                                                label3="Hard"
                                                selectedOption={selectedDifficultyOption} 
                                                onChange={this.handleDifficultyChange} />
                        <DifficultyRadioButtons label1="Slow"
                                                label2="Steady"
                                                label3="Fast"
                                                selectedOption={selectedSpeedOption}
                                                onChange={this.handleSpeedChange} />
                    </div>                   
                    <PushButton onClick={this.startGame} buttonText={buttonLabel} />
                </div>               
            )
        }
    }        
}

