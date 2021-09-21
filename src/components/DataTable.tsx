import React, { useState } from 'react';
import { User } from '../@types/types';
import useLocalStorage from '../hooks/useLocalStorage';
import Header from './Header';
import RowEditing from './RowEditing';
import RowNormal from './RowNormal';
import TableHeader from './TableHeader';

const DataTable = () => {
    const [users, setUsers] = useLocalStorage('users');
    const [filteredUser, setFilteredUser] = useState<User[]>([]);

    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [isSearching, setIsSearching] = useState(false);

    return (
        <div className="w-11/12 mx-5 space-y-4 text-white lg:mx-0">
            <Header
                users={users}
                setUsers={setUsers}
                setIsSearching={setIsSearching}
                setFilteredUser={setFilteredUser}
            />

            <div className="px-5 py-3 overflow-x-auto rounded-md bg-dark-600">
                <table className="w-full table-auto">
                    <TableHeader />

                    <tbody>
                        {isSearching
                            ? filteredUser.map((user) =>
                                  isEditing && editingIndex === user.id ? (
                                      <RowEditing
                                          user={user}
                                          setUsers={setUsers}
                                          setIsEditing={setIsEditing}
                                      />
                                  ) : (
                                      <RowNormal
                                          user={user}
                                          setIsEditing={setIsEditing}
                                          setEditingIndex={setEditingIndex}
                                      />
                                  )
                              )
                            : users.map((user) =>
                                  isEditing && editingIndex === user.id ? (
                                      <RowEditing
                                          user={user}
                                          setUsers={setUsers}
                                          setIsEditing={setIsEditing}
                                      />
                                  ) : (
                                      <RowNormal
                                          user={user}
                                          setIsEditing={setIsEditing}
                                          setEditingIndex={setEditingIndex}
                                      />
                                  )
                              )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default DataTable;
