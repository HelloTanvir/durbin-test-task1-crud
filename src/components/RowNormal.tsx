import React from 'react';
import { MdDone } from 'react-icons/md';
import { RiEditLine } from 'react-icons/ri';
import { VscClose } from 'react-icons/vsc';
import { User } from '../@types/types';

interface Props {
    user: User;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    setEditingIndex: React.Dispatch<React.SetStateAction<number>>;
}

const RowNormal: React.FC<Props> = ({ user, setIsEditing, setEditingIndex }) => (
    <tr className="text-center">
        <td>
            {user.enabled ? (
                <MdDone className="m-auto text-green-200" />
            ) : (
                <VscClose className="m-auto text-red-200" />
            )}
        </td>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.address}</td>
        <td>
            {user.roles.map((role) => (
                <div>{role}</div>
            ))}
        </td>
        <td>{user.addedBy}</td>
        <td>{user.createdAt}</td>
        <td>{user.updatedAt}</td>
        <td>
            <RiEditLine
                className="m-auto cursor-pointer hover:text-dark-500"
                onClick={() => {
                    setIsEditing(true);
                    setEditingIndex(user.id);
                }}
            />
        </td>
    </tr>
);

export default RowNormal;
