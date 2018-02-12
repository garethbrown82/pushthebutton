export class GameFunctions {
    
    static TargetNumber = 15;
    static DisplayedNumber = 0;
    static NumbersToAdd = [1, 2, 3, 4, 5];
    static RunningTotal = 0;
    static IndexToDisplay = 0;

    static ResetToZero() {
        this.TargetNumber = 0;
        this.DisplayedNumber = 0;
        this.NumbersToAdd = [];
        this.RunningTotal = 0;
        this.IndexToDisplay = 0;
    }


    static Randomize = () => {
        let numTargetSplitInto = this.randomNumberBetween(2, 10);
        this.NumbersToAdd = [];
        for (let i=0; i < numTargetSplitInto; i++) {
            this.NumbersToAdd.push(this.randomNumberBetween(1, 20));
        }
        this.TargetNumber = this.NumbersToAdd.reduce((total, value) => total = total + value);
    }

    static RandomNumberBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + 1;
    }

}