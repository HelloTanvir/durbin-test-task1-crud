import React, { useEffect, useState } from 'react';
import { User } from '../@types/types';
import AddForm from './AddForm';

interface Props {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
    setFilteredUser: React.Dispatch<React.SetStateAction<User[]>>;
}

// eslint-disable-next-line no-unused-vars
const Header: React.FC<Props> = ({ users, setUsers, setIsSearching, setFilteredUser }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        setIsSearching(false);

        if (query) {
            setIsSearching(true);
            setFilteredUser(
                users.filter(
                    (user) =>
                        user.name.includes(query) ||
                        user.email.includes(query) ||
                        user.phone.includes(query)
                )
            );
        }
    }, [query, setFilteredUser, setIsSearching, users]);

    return (
        <div className="flex items-center justify-between px-5 py-3 rounded-md bg-dark-600">
            <span className="text-lg tracking-wider">Employee Table</span>

            <input
                type="text"
                className="flex-1 px-2 py-1 mx-10 text-white bg-transparent border-b-2 outline-none lg:mx-48 border-dark-500 placeholder-dark-500"
                placeholder="Search by name, email or phone number"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <AddForm setUsers={setUsers} />
        </div>
    );
};

export default Header;
