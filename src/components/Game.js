import * as React from 'react';
import { PushButton } from './PushButton';
import { CountDownNumber } from './CountDownNumber';
import { Button } from './Button';
import { Message } from './Message';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            targetNumber: 15,
            displayedNumber: 0,
            numbersToAdd: [ 1, 2, 3, 4, 5 ],
            runningTotal: 0,
            indexToDisplay: 0,
            message: "Hello There"
        };
    }

    resetToZero = () => {
        this.setState({ 
            indexToDisplay: 0,
            runningTotal: 0,
            displayedNumber: 0
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
        if (this.state.indexToDisplay < this.state.numbersToAdd.length) {
            console.log("start countdown for total: " + this.state.targetNumber);
            setTimeout(
                () => {               
                    this.incrementCountDownNumber();
                    console.log(this.state.displayedNumber + " Total: " + this.state.runningTotal);
                    this.countDown();
                },
                2000
            )
        };     
    }

    claimAnswer = () => {
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

    resetGame = () => {
        this.resetToZero();
        this.randomize();
    }

    startGame = () => {     
        this.countDown();
    }

    render() {
        return (
            <div className="col-md-4 offset-md-4 text-center div-border">
                <CountDownNumber displayedNumber={this.state.displayedNumber} />
                <PushButton onClick={this.claimAnswer} buttonText={"STOP"} targetNumber={this.state.targetNumber}/>
                <br />
                <Button onClick={this.resetGame} text={"Reset Game"} /> 
                <Button onClick={this.startGame} text={"Start Countdown"}/>
                <br />
                <Message message={this.state.message} />                   
            </div>
        )
    }        
}

const randomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + 1;
}
