import React from 'react';

const TableHeader = () => (
    <thead>
        <tr className="bg-dark-500">
            <th className="pl-2">enabled</th>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>phone</th>
            <th>address</th>
            <th>roles</th>
            <th>addedBy</th>
            <th>createdAt</th>
            <th>updatedAt</th>
            <th className="py-2 pr-2">update</th>
        </tr>
    </thead>
);

export default TableHeader;
