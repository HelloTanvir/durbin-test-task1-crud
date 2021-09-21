import React, { useEffect, useState } from 'react';
import { User } from '../@types/types';

const useLocalStorage = (
    key: string,
    initialValue: User[] = []
): [User[], React.Dispatch<React.SetStateAction<User[]>>] => {
    const [users, setUsers] = useState<User[]>(() => {
        const jsonValue = localStorage.getItem(key);

        if (jsonValue != null) return JSON.parse(jsonValue);

        return initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(users));
    }, [key, users]);

    return [users, setUsers];
};

export default useLocalStorage;
