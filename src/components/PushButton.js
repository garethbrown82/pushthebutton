import * as React from 'react';

export const PushButton = (props) => {
    return (
        <div>
            {/* <input type="button" className="btn btn-primary" value={props.buttonText} onClick={props.onClick} /> */}
            <button className="btn btn-primary btn-lg btn-block" onClick={props.onClick}>
                <p>{props.buttonText}</p>
                <p>Target: {props.targetNumber}</p>
            </button>
        </div>
        
    )
}