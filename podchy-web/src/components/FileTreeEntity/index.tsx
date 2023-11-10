import { useState } from 'react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { BiLogoPython } from 'react-icons/bi';
import { SlOptionsVertical } from 'react-icons/sl';
import { AiFillDelete } from 'react-icons/ai';

type FileTreeEntityProps = {
    type: string;
    name: string;
    active?: boolean;
};

export default function FileTreeEntity({
    type,
    name,
    active,
}: FileTreeEntityProps) {
    const [isActive, setIsActive] = useState<boolean>(active || false);
    const handleSelectItem = () => {
        setIsActive((prev) => !prev);
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <>
                    <div className="flex flex-row gap-4 items-center pr-10 text-red-500">
                        <AiFillDelete />
                        Delete
                    </div>
                </>
            ),
        },
    ];

    return (
        <button
            className={`border-none bg-transparent flex items-center justify-between ${
                isActive ? 'bg-[#f0f1f2]' : ''
            } p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender`}
            onClick={handleSelectItem}
        >
            <div className="flex items-center gap-2">
                {type === 'python' && (
                    <BiLogoPython className="text-blue-800" />
                )}
                <p className="m-0">{name}</p>
            </div>
            <Dropdown menu={{ items }}>
                <a
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    <SlOptionsVertical />
                </a>
            </Dropdown>
        </button>
    );
}
