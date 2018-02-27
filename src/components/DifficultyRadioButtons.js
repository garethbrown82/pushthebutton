import * as React from 'react';

export const DifficultyRadioButtons = (props) => {
    const { label1, label2, label3, selectedOption, onChange, isButtonDisabled } = props;
    return (
        <div>
            <form>
                <div className="d-flex justify-content-around">
                    <label className="radio-container w-100">{label1}
                        <input value={label1.toLowerCase()} type="radio" checked={selectedOption === label1.toLowerCase()} onChange={onChange} disabled={isButtonDisabled} />
                        <span className="checkmark"></span>
                    </label>
                    <label className="radio-container w-100">{label2}
                        <input value={label2.toLowerCase()} type="radio" checked={selectedOption === label2.toLowerCase()} onChange={onChange} disabled={isButtonDisabled} />
                        <span className="checkmark"></span>
                    </label>
                    <label className="radio-container w-100">{label3}
                        <input value={label3.toLowerCase()} type="radio" checked={selectedOption === label3.toLowerCase()} onChange={onChange} disabled={isButtonDisabled} />
                        <span className="checkmark"></span>
                    </label>
                </div>               
            </form>
        </div>
    )
}