import * as React from 'react';

export const DifficultyRadioButtons = (props) => {
    return (
        <div>
            <form>
                <div className="d-flex justify-content-around">
                    <label className="radio-container w-100">{props.label1}
                        <input value="easy" type="radio" checked={props.selectedOption === "easy"} onChange={props.onChange} />
                        <span class="checkmark"></span>
                    </label>
                    <label className="radio-container w-100">{props.label2}
                        <input value="medium" type="radio" checked={props.selectedOption === "medium"} onChange={props.onChange} />
                        <span class="checkmark"></span>
                    </label>
                    <label className="radio-container w-100">{props.label3}
                        <input value="hard" type="radio" checked={props.selectedOption === "hard"} onChange={props.onChange} />
                        <span class="checkmark"></span>
                    </label>
                </div>               
            </form>
        </div>
    )
}