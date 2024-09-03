import React, { useState, useRef, useEffect } from 'react';

const dropdownMenuClass =
    "absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto overflow-x-hidden";

interface DropDownCheckProps {
    items: { id: string; displayValue: string; value: string; }[];
    selectedItems: string[];
    onSelectionChange: (selectedValues: string[]) => void;
    placeholder?: string;
}

const DropDownCheck: React.FC<DropDownCheckProps> = ({
    items,
    selectedItems,
    onSelectionChange,
    placeholder
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Toggle selection state
    const toggleItem = (value: string) => {
        const updatedSelection = selectedItems.includes(value)
            ? selectedItems.filter(item => item !== value)
            : [...selectedItems, value];
        onSelectionChange(updatedSelection);
    };

    // Handle click outside of the dropdown to close it
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={(event) => {
                    event.preventDefault();
                    setIsOpen(!isOpen);
                }}
                className="input-global w-full text-left flex justify-between items-center"
            >
                {selectedItems.length > 0
                    ? items.filter(item => selectedItems.includes(item.value)).map(item => item.displayValue).join(', ')
                    : placeholder || 'Select items'}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isOpen && (
                <div className={`${dropdownMenuClass}`}>
                    {items.map((item) => (
                        <label key={item.value} className="flex items-center px-4 py-2 hover:bg-gray-100">
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item.value)}
                                onChange={() => toggleItem(item.value)}
                                className="mr-2"
                            />
                            {item.displayValue}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropDownCheck;
