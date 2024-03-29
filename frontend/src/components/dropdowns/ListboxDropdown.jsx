import {Fragment, useState} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid';

const ListboxDropdown = ({options, value, onChange}) => {
    const [selected, setSelected] = useState(value || options[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const filteredOptions = options.filter(option =>
        option && option.title && option.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChange = selectedValue => {
        setSelected(selectedValue);
        onChange(selectedValue);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleSearchQueryChange = event => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="top-16 w-48">
            <Listbox value={selected} onChange={handleChange}>
                <div className="relative mt-1">
                    <Listbox.Button
                        className={`relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm ${
                            isHovered ? 'hover:bg-blue-100' : ''
                        }`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
            <span className="block truncate">
              {selected ? selected.title : options[0]?.title}
            </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
            </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            className="absolute mt-1 max-h-[240px] overflow-y-auto w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <div className="flex items-center px-4 py-2">
                                <input
                                    type="text"
                                    className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 flex-grow-0"
                                    placeholder="Поиск..."
                                    value={searchQuery}
                                    onChange={handleSearchQueryChange}
                                />
                            </div>
                            {filteredOptions.map((option, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({active, disabled}) =>
                                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                                        } ${isHovered ? 'hover:bg-blue-100' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`
                                    }
                                    value={option}
                                >
                                    {({selected}) => (
                                        <>
                      <span className={`block whitespace-normal ${selected ? 'font-medium' : 'font-normal'}`}>
                        {option.title}
                      </span>
                                            {selected && (
                                                <span
                                                    className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                        </span>
                                            )}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default ListboxDropdown;
