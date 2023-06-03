import React, {useState, useRef} from 'react';

const DropdownMenu = () => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);
    const panelRef = useRef(null);

    const toggle = () => {
        if (open) {
            return close();
        }

        buttonRef.current.focus();
        setOpen(true);
    };

    const close = (focusAfter) => {
        if (!open) return;

        setOpen(false);

        if (focusAfter) {
            focusAfter.focus();
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            close(buttonRef.current);
        }
    };

    const handleFocusIn = (event) => {
        if (!panelRef.current.contains(event.target)) {
            close();
        }
    };

    const handleClickOutside = (event) => {
        if (!panelRef.current.contains(event.target)) {
            close(buttonRef.current);
        }
    };

    return (
        <>
            <div className="col-span-3">
                <label htmlFor="af-account-full-name"
                       className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                    Роль
                </label>
            </div>
            <div className="col-span-9">
                <div
                    className="relative inline-block"
                    onKeyDown={handleKeyDown}
                    onFocusIn={handleFocusIn}
                    onClick={handleClickOutside}
                    ref={panelRef}
                >
                    <button
                        ref={buttonRef}
                        onClick={toggle}
                        aria-expanded={open}
                        aria-controls="dropdown-button"
                        type="button"
                        className="inline-flex gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm text-gray-500 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
                    >
                        Выберите роль

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {open && (
                        <div
                            id="dropdown-button"
                            className="absolute left-0 z-10 mt-2 w-48 divide-y divide-gray-100 rounded-lg border border-gray-100 bg-white text-left text-sm shadow-lg"
                        >
                            <div className="p-1">
                                <a
                                    href="#"
                                    className="flex w-full items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Преподаватель
                                </a>
                                <a
                                    href="#"
                                    className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Студент
                                </a>
                            </div>
                            <div className="p-1">
                                <a
                                    href="#"
                                    className="flex w-full items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Администратор
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default DropdownMenu;
