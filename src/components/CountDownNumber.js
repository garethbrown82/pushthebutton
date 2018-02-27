import * as React from 'react';

export const CountDownNumber = (props) => {
    const classList = [];
    classList.push(props.fadeClass);
    classList.push(props.textSizeClass);

    return (
        <h1 className={classList.join(' ')}>{props.displayedNumber}</h1>
    )
}