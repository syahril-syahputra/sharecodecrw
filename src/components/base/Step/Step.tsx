import React from 'react';
import StepIndex from './StepIndex';

export default function Step(props: { index: number; count: number }) {
    return (
        <div className="flex space-x-2">
            {Array.from(Array(props.count), (_, i) => {
                return (
                    <StepIndex
                        index={i + 1}
                        key={i}
                        currentIndex={props.index}
                    />
                );
            })}
        </div>
    );
}
