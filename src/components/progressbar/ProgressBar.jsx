import React, { useEffect, useRef, useState } from 'react'

const ProgressBar = () => {
    const [value, setValue] = useState(0);
    const valueRef = useRef(0);
    useEffect(() => {
        let timer
        if (valueRef.current < 1000) {
            timer = setTimeout(() => {
                setValue(value => value + 10);
                valueRef.current += 10;
            }, 100)
        }
        return () => {
            if (timer) {
                clearTimeout(timer)
            }
        }
    }, [value])

    return (
        <div>
            <div className='relative h-[20px] w-[1000px] flex items-center justify-center rounded-3xl overflow-hidden'>
                <div role='progress-bar' aria-valuemin={0} aria-valuemax={100} aria-valuenow={value / 10} style={{ width: `${value}px` }} className={'absolute top-0 left-0 h-[20px] z-0 bg-blue-500 transition-all'}></div>
                <span className='text-black z-0 font-bold'>{value / 10}</span>
            </div>
        </div>
    )
}

export default ProgressBar