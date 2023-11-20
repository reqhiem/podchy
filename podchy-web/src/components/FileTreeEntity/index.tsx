import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { BiLogoPython } from 'react-icons/bi';
import { SlOptionsVertical } from 'react-icons/sl';
import { AiFillDelete } from 'react-icons/ai';

type FileTreeEntityProps = {
    id: string;
    type: string;
    name: string;
    active?: boolean;
    onSelectItem: (key: string) => void;
};

export default function FileTreeEntity({
    id,
    type,
    name,
    active,
    onSelectItem,
}: FileTreeEntityProps) {
    const handleSelectItem = () => {
        onSelectItem(id);
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
                active ? 'bg-[#ffffff]' : ''
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
