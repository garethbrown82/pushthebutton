import * as React from 'react';

export const PushButton = (props) => {
    const classList = ['btn', 'btn-lg', 'btn-block', props.buttonClass]
    
    if (props.isProgressBarVisible) {
        classList.push('progress-button-bar')
    }
    
    return (
        <div>
            <button className={classList.join(' ')} disabled={props.isButtonDisabled} onClick={props.onClick}>
                <p>{props.buttonText}</p>
            </button>
        </div>
    )
}