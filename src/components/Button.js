import * as React from 'react';

export const Button = (props) => {
    return (
        <button className="btn" onClick={props.onClick}>{props.text}</button>
    )
}