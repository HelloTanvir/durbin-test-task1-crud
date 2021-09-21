import React from 'react';

interface Props {
    open: boolean;
}

const Backdrop: React.FC<Props> = ({ open }) => (
    <div
        className={`top-0 left-0 right-0 bottom-0 bg-black opacity-60 absolute z-10 ${
            open ? 'block' : 'hidden'
        }`}
    />
);

export default Backdrop;
