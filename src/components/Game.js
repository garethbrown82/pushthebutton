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
            indexToDisplay: 0,
            showNumTimeout: 0,
            fadeTimeout: 0,
            startGameTimeout: 0,
            isGamePlaying: false,
            isButtonDisabled: false,
            selectedDifficultyOption: "easy",
            selectedSpeedOption: "slow",
            gameSpeed: Speed.STEADY,
            targetNumMin: Min.EASY,
            targetNumMax: Max.EASY,
            buttonLabel: "Start Game",
            fadeClass: "show",
            buttonClass: "btn-primary",
            isProgressBarVisible: false,
            textSizeClass: "large-text"
        };

        this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
    }

    resetToZero = () => {
        clearTimeout(this.state.showNumTimeout);
        clearTimeout(this.state.fadeTimeout);
        this.setState({ 
            indexToDisplay: 0,
            displayedNumber: 0,
            isGamePlaying: false,
            buttonLabel: "Start Game",
            buttonClass: "btn-primary",
            textSizeClass: "large-text"
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
        clearTimeout(this.state.fadeTimeout);
        if (this.state.indexToDisplay === this.state.numbersToAdd.length-1) {
            this.setState({
                buttonLabel: "Well Done!",
                fadeClass: 'show',
                buttonClass: 'btn-success'
            });
        }
        else {
            this.setState({
                buttonLabel: "Bad Luck!",
                fadeClass: 'show',
                buttonClass: 'btn-danger'
            });
        }
    }

    startGame = () => {
        this.setState({
            isButtonDisabled: true,
            isProgressBarVisible: true
        })
        this.setNumberSequence();
        setTimeout(
            () => {
                this.setState({
                    isGamePlaying: true,
                    displayedNumber: "Ready!",
                    buttonLabel: "Total = " + this.state.targetNumber,
                    isButtonDisabled: false,
                    isProgressBarVisible: false
                });
                this.countDown();
            },
            3500
        )
    }

    countDown = () => {
        let { indexToDisplay, 
            numbersToAdd, 
            gameSpeed } = this.state;

        if (indexToDisplay < numbersToAdd.length) {
            this.setState({
                fadeClass: 'show',
                showNumTimeout: setTimeout(
                    () => {               
                        this.incrementCountDownNumber();
                        if (indexToDisplay === numbersToAdd.length-1) {
                            this.setState({
                                buttonLabel: "Bad Luck!",
                                buttonClass: 'btn-danger',
                                fadeClass: 'show',
                                textSizeClass: 'small-text'
                            })
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
                console.error("handleDifficultyChange can only accept a string value of 'easy', 'medium' or 'hard'. It actually is: " + event.target.value);
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
            selectedSpeedOption,
            isButtonDisabled,
            buttonClass,
            isProgressBarVisible,
            textSizeClass } = this.state;

        let gameScreen = <p>Loading...</p>;
        
        if (isGamePlaying) {
            gameScreen = (
                <div>
                    <div className="display-wrap">
                        <CountDownNumber displayedNumber={displayedNumber} 
                                        fadeClass={fadeClass} 
                                        textSizeClass={textSizeClass} />
                    </div>
                    <PushButton onClick={this.claimAnswer}
                        buttonText={buttonLabel} 
                        buttonClass={buttonClass} />
                    <br />
                    <Button onClick={this.resetToZero} text={"Reset Game"} />
                </div>
            )
        } else {
            gameScreen = (
                <div>
                    <div className="display-wrap">
                        <DifficultyRadioButtons label1="Easy" 
                                                label2="Medium" 
                                                label3="Hard"
                                                selectedOption={selectedDifficultyOption} 
                                                onChange={this.handleDifficultyChange}
                                                isButtonDisabled={isButtonDisabled} />
                        <DifficultyRadioButtons label1="Slow"
                                                label2="Steady"
                                                label3="Fast"
                                                selectedOption={selectedSpeedOption}
                                                onChange={this.handleSpeedChange}
                                                isButtonDisabled={isButtonDisabled} />
                    </div>                   
                    <PushButton onClick={this.startGame} 
                        buttonText={buttonLabel} 
                        isButtonDisabled={isButtonDisabled}
                        buttonClass={buttonClass}
                        isProgressBarVisible={isProgressBarVisible} />
                    <br />
                    <p className="text-secondary">
                        Add together each number that appears. Once the total equals the target number, push the button. Fast!
                    </p>
                </div>
            )
        }

        return (
            <div className="col-md-6 offset-md-3 col-sm-10 offset-sm-1 col-12 text-center main-container">
                    {gameScreen}
            </div>
        )
    }        
}

