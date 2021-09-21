import React, { useEffect, useRef, useState } from 'react';
import { FcPlus } from 'react-icons/fc';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { User } from '../@types/types';
import Backdrop from './Backdrop';

interface Props {
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const AddForm: React.FC<Props> = ({ setUsers }) => {
    const [clicked, setClicked] = useState(false);

    const roleRef = useRef<HTMLInputElement | null>(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [roles, setRoles] = useState<string[]>([]);

    const clearAll = () => {
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setRoles([]);
    };

    useEffect(() => {
        clearAll();
        if (roleRef && roleRef.current && roleRef.current.value) {
            roleRef.current.value = '';
        }
    }, [clicked]);

    const handleAddRole = () => {
        if (roles.length >= 7) {
            // eslint-disable-next-line no-alert
            alert('You can add 7 roles maximum');
            return;
        }

        setRoles((prev) => {
            if (roleRef && roleRef.current && roleRef.current.value) {
                return [...prev, roleRef.current.value];
            }
            return prev;
        });
    };

    const handleRemoveRole = (index: number) => {
        setRoles((prev) => {
            const prevRoles = [...prev];
            prevRoles.splice(index, 1);
            return prevRoles;
        });
    };

    const handleCreate = () => {
        if (!name || !email || !phone || !address || !roles.length) {
            // eslint-disable-next-line no-alert
            alert('Please fill up the form');
            return;
        }

        setClicked(false);

        setUsers((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                name,
                email,
                phone,
                address,
                roles,
                addedBy: 'Tanvir',
                createdAt: new Date(Date.now()).toLocaleDateString('en-US'),
                updatedAt: new Date(Date.now()).toLocaleDateString('en-US'),
                enabled: true,
            },
        ]);
    };

    return (
        <>
            <Backdrop open={clicked} />

            <button
                type="button"
                className="px-3 py-2 text-sm bg-blue-500 border-none rounded-md outline-none"
                onClick={() => setClicked(true)}
            >
                Add Employee
            </button>

            <div
                className={`bg-gray-50 absolute z-20 justify-center items-center ${
                    clicked ? 'flex' : 'hidden'
                } top-1/2 transform -translate-y-1/2 -translate-x-1/2 left-1/2 rounded-lg px-5 py-4 space-y-3 flex flex-col`}
            >
                <input
                    type="text"
                    className="px-2 py-2 text-white border-b-2 border-white outline-none w-80 bg-dark-600"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    className="px-2 py-2 text-white border-b-2 border-white outline-none w-80 bg-dark-600"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="text"
                    className="px-2 py-2 text-white border-b-2 border-white outline-none w-80 bg-dark-600"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    type="text"
                    className="px-2 py-2 text-white border-b-2 border-white outline-none w-80 bg-dark-600"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <div className="flex justify-between w-full">
                    <input
                        type="text"
                        ref={roleRef}
                        className="px-2 py-2 text-white border-b-2 border-white outline-none bg-dark-600"
                        placeholder="role"
                    />

                    <button
                        type="button"
                        onClick={handleAddRole}
                        className="flex items-center px-3 py-1 space-x-1 bg-blue-400 rounded-md cursor-pointer"
                    >
                        <span>Add role</span>
                        <FcPlus className="text-xl" />
                    </button>
                </div>

                {roles.length ? (
                    <div className="w-full px-10 py-3 space-y-2">
                        {roles.map((role, index) => (
                            <div
                                key={role}
                                className="flex items-center justify-between w-full px-5 py-2 rounded-md bg-dark-500"
                            >
                                <span>{role}</span>{' '}
                                <RiDeleteBin4Line
                                    className="text-lg text-red-400 cursor-pointer"
                                    onClick={() => handleRemoveRole(index)}
                                />
                            </div>
                        ))}
                    </div>
                ) : null}

                <div className="flex w-full space-x-3">
                    <button
                        type="button"
                        className="flex items-center justify-center flex-1 py-2 text-white bg-red-400 rounded-md"
                        onClick={() => setClicked(false)}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="flex items-center justify-center flex-1 py-2 text-white bg-green-600 rounded-md"
                        onClick={handleCreate}
                    >
                        Create
                    </button>
                </div>
            </div>
        </>
    );
};

export default AddForm;
