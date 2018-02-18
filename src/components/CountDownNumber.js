import * as React from 'react';

export const CountDownNumber = (props) => {
    const classList = ['countdown-number']
    classList.push(props.fadeClass);

    return (
        <h1 className={classList.join(' ')}>{props.displayedNumber}</h1>
    )
}