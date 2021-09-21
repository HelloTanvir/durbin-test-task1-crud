import React, { useRef, useState } from 'react';
import { FcPlus } from 'react-icons/fc';
import { MdDone } from 'react-icons/md';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { VscClose } from 'react-icons/vsc';
import { User } from '../@types/types';

interface Props {
    user: User;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

// eslint-disable-next-line no-unused-vars
const RowEditing: React.FC<Props> = ({ user, setUsers, setIsEditing }) => {
    const roleRef = useRef<HTMLInputElement | null>(null);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const [enabled, setEnabled] = useState(user.enabled);
    const [roles, setRoles] = useState<string[]>(user.roles);

    const handleAddRole = () => {
        setRoles((prev) => {
            if (roleRef && roleRef.current && roleRef.current.value) {
                return [...prev, roleRef.current.value];
            }
            return prev;
        });
    };

    const handleRemoveRole = (i: number) => {
        setRoles((prev) => {
            const prevRoles = [...prev];
            prevRoles.splice(i, 1);
            return prevRoles;
        });
    };

    const handleUpdate = () => {
        if (!name || !email || !phone || !address || !roles.length) {
            // eslint-disable-next-line no-alert
            alert('Please fill up the form');
            return;
        }

        setUsers((prev) =>
            prev.map((u) =>
                u.id === user.id
                    ? {
                          ...u,
                          name,
                          email,
                          phone,
                          address,
                          roles,
                          updatedAt: new Date(Date.now()).toLocaleDateString('en-US'),
                          enabled,
                      }
                    : u
            )
        );

        setIsEditing(false);
    };

    return (
        <tr className="text-center">
            <td>
                <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => setEnabled((prev) => !prev)}
                />
            </td>

            <td>{user.id}</td>

            <td>
                <input
                    type="text"
                    className="px-1 py-1 text-xs text-white border-b-2 border-white outline-none bg-dark-500"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </td>

            <td>
                <input
                    type="text"
                    className="px-1 py-1 text-xs text-white border-b-2 border-white outline-none bg-dark-500"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </td>

            <td>
                <input
                    type="text"
                    className="px-1 py-1 text-xs text-white border-b-2 border-white outline-none bg-dark-500"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </td>

            <td>
                <input
                    type="text"
                    className="px-1 py-1 text-xs text-white border-b-2 border-white outline-none bg-dark-500"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </td>

            <td>
                <div className="flex justify-between">
                    <input
                        type="text"
                        ref={roleRef}
                        className="w-24 px-1 py-1 text-xs text-white border-b-2 border-white outline-none bg-dark-500"
                        placeholder="role"
                    />

                    <button
                        type="button"
                        onClick={handleAddRole}
                        className="flex items-center px-1 py-1 space-x-1 bg-blue-400 rounded-md cursor-pointer"
                    >
                        <span className="text-xs">Add</span>
                        <FcPlus className="text-xl" />
                    </button>
                </div>
                {roles.length ? (
                    <div className="flex py-1 space-x-1">
                        {roles.map((role, i) => (
                            <div
                                key={role}
                                className="flex items-center px-2 py-1 space-x-1 rounded-md bg-dark-500"
                            >
                                <span className="text-xs">{role}</span>
                                <RiDeleteBin4Line
                                    className="text-sm text-red-400 cursor-pointer"
                                    onClick={() => handleRemoveRole(i)}
                                />
                            </div>
                        ))}
                    </div>
                ) : null}
            </td>

            <td>{user.addedBy}</td>

            <td>{user.createdAt}</td>

            <td>{user.updatedAt}</td>

            <td className="space-x-5">
                <MdDone
                    className="inline m-auto cursor-pointer hover:text-dark-500 to-green-200"
                    onClick={handleUpdate}
                />

                <VscClose
                    className="inline m-auto text-red-200 cursor-pointer hover:text-dark-500"
                    onClick={() => setIsEditing(false)}
                />
            </td>
        </tr>
    );
};
export default RowEditing;
