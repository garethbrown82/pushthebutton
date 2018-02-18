import * as React from 'react';

export const PushButton = (props) => {
    return (
        <div>
            <button className="btn btn-primary btn-lg btn-block" onClick={props.onClick}>
                <p>{props.buttonText}</p>
            </button>
        </div>
        
    )
}