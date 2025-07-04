'use client'
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';

type Props = {
    defaultRating: number;
    onChange?: (rate: number) => void;
    readOnly?: boolean;
}

const StarRating = ({ defaultRating = 0, onChange, readOnly }: Props) => {
    const [rating, setRating] = useState(defaultRating);
    const [hover, setHover] = useState(0);

    useEffect(() => {
        setRating(defaultRating);
    }, [defaultRating]);

    const handleClick = (rate: number) => {
        if (readOnly) return;
        setRating(rate);
        if (onChange) onChange(rate);
    };

    const handleMouseEnter = (rate: number) => {
        if (readOnly) return;
        setHover(rate);
    };

    const handleMouseLeave = () => {
        if (readOnly) return;
        setHover(0);
    };

    return (
        <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                const current = hover || rating;

                let fillPercent = 0;

                if (current >= starValue) {
                    fillPercent = 100;
                } else if (current > index && current < starValue) {
                    fillPercent = (current - index) * 100; 
                }

                return (
                    <div
                        key={index}
                        onClick={() => handleClick(starValue)}
                        onMouseEnter={() => handleMouseEnter(starValue)}
                        onMouseLeave={handleMouseLeave}
                        className={`relative w-7 h-7 text-2xl ${readOnly ? '' : 'cursor-pointer'}`}
                    >
                        <FaStar className="text-transparent absolute top-0 left-0" />

                        <div
                            className="absolute top-0 left-0 h-full overflow-hidden"
                            style={{ width: `calc(${fillPercent}% - 2px)` }}
                        >
                            <FaStar className="text-dandelion" />
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default StarRating