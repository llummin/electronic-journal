import React from 'react';
import Scrollspy from 'react-scrollspy';

const DivisionSidebar = ({divisions}) => {
    return (
        <div id="docs-sidebar"
             className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-[height-of-navbar] left-0 bottom-0 z-[60] w-80 bg-white border-r border-gray-200 py-10 px-8 scrollbar-none lg:block lg:translate-x-0 lg:top-0 lg:right-auto lg:bottom-0 lg:left-0 lg:z-10 dark:scrollbar-y dark:bg-slate-900 mt-14">
            <nav id="sidebar-nav" className="relative space-y-8">
                <h1 className="mb-3 text-1xl font-semibold text-slate-900 dark:text-slate-200">Учебные
                    подразделения</h1>
                <Scrollspy
                    items={divisions.map((division) => division.id)}
                    currentClassName="text-blue-600 dark:text-blue-400"
                    offset={-100}
                    className="ml-0.5 space-y-2 border-l-2 border-slate-100 dark:border-slate-800"
                >
                    {divisions.map((division) => (
                        <li key={division.id}>
                            <a className="block py-1 pl-4 -ml-px border-l-2 border-transparent text-sm"
                               href={`#${division.id}`}>
                                {division.title}
                            </a>
                        </li>
                    ))}
                </Scrollspy>
            </nav>
        </div>
    );
};

export default DivisionSidebar;
