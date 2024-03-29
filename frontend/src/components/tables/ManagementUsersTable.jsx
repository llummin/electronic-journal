import React, {useEffect, useState} from 'react';
import {
    getAllUsers,
    getAllUsersSortedAscending,
    getAllUsersSortedDescending,
    searchUsers
} from "../../services/userService";
import ThreedotDropdown from "../dropdowns/ThreedotDropdown";
import ColoredBadge from "../badge/ColoredBadge";
import Pagination from "./Pagination";

const ManagementUsersTable = () => {
    const [users, setUsers] = useState([]);
    const [sortOrder, setSortOrder] = useState('ascending');
    const [searchValue, setSearchValue] = useState('');
    const [filterRole, setFilterRole] = useState(null);
    const [activeButton, setActiveButton] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    const handleAllClick = () => {
        getAllUsers()
            .then((usersData) => {
                setUsers(usersData);
            })
            .catch((error) => {
                console.error(error);
            });

        setSearchValue('');
        setFilterRole(null);
        setActiveButton('all');
    };

    const handleSortClick = async () => {
        const newSortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
        setSortOrder(newSortOrder);

        try {
            let sortedUsers;
            if (newSortOrder === 'ascending') {
                sortedUsers = await getAllUsersSortedAscending();
            } else {
                sortedUsers = await getAllUsersSortedDescending();
            }

            setUsers(sortedUsers);
            setSearchValue('');
        } catch (error) {
            console.error(error);
        }
    };


    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);

        searchUsers(e.target.value)
            .then((searchResults) => {
                setUsers(searchResults);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleProfessorsClick = () => {
        getAllUsers()
            .then((usersData) => {
                const filteredUsers = usersData.filter(user => user.role === 'PROFESSOR');
                setUsers(filteredUsers);
            })
            .catch((error) => {
                console.error(error);
            });

        setSearchValue('');
        setFilterRole('PROFESSOR');
        setActiveButton('professors');
    };

    const handleStudentsClick = () => {
        getAllUsers()
            .then((usersData) => {
                const filteredUsers = usersData.filter(user => user.role === 'STUDENT');
                setUsers(filteredUsers);
            })
            .catch((error) => {
                console.error(error);
            });

        setSearchValue('');
        setFilterRole('STUDENT');
        setActiveButton('students');
    };

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * 10;
        const endIndex = startIndex + 10;
        return users.slice(startIndex, endIndex);
    };

    useEffect(() => {
        handleAllClick();
    }, []);


    return (
        <section className="container px-4 mx-auto">
            <div className="mt-6 md:flex md:items-center md:justify-between">
                <div
                    className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                    <button
                        className={`px-5 py-2 text-xs font-medium ${
                            activeButton === 'all' ? 'bg-gray-100' : ''
                        } text-gray-600 transition-colors duration-200 sm:text-sm dark:bg-gray-800 dark:text-gray-300`}
                        onClick={handleAllClick}
                    >
                        Все
                    </button>
                    <button
                        className={`px-5 py-2 text-xs font-medium ${
                            activeButton === 'professors' ? 'bg-gray-100' : ''
                        } text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100`}
                        onClick={handleProfessorsClick}
                    >
                        Преподаватели
                    </button>
                    <button
                        className={`px-5 py-2 text-xs font-medium ${
                            activeButton === 'students' ? 'bg-gray-100' : ''
                        } text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100`}
                        onClick={handleStudentsClick}
                    >
                        Студенты
                    </button>
                </div>

                <div className="relative flex items-center mt-4 md:mt-0">
        <span className="absolute">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
               stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
          </svg>
        </span>
                    <input
                        type="text"
                        placeholder="Поиск"
                        value={searchValue}
                        onChange={handleSearchChange}
                        className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
            </div>

            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-visible border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <div>
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <button className="flex items-center gap-x-3 focus:outline-none"
                                                    onClick={handleSortClick}>
                                                <span>ФИО</span>

                                                <svg className="h-3" viewBox="0 0 10 11" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                                        fill="currentColor" stroke="currentColor" strokeWidth="0.1"/>
                                                    <path
                                                        d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                                        fill="currentColor" stroke="currentColor" strokeWidth="0.1"/>
                                                    <path
                                                        d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                                        fill="currentColor" stroke="currentColor" strokeWidth="0.3"/>
                                                </svg>
                                            </button>
                                        </th>

                                        <th scope="col"
                                            className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Роль
                                        </th>

                                        <th scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Логин
                                        </th>

                                        <th scope="col" className="relative py-3.5 px-4">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody
                                        className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {getPaginatedData().map((user) => (
                                        (filterRole === null || user.role === filterRole) &&
                                        <tr key={user.id}>
                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                <div>
                                                    <h2 className="font-medium text-gray-800 dark:text-white">
                                                        {user.lastname} {user.firstname} {user.patronymic}
                                                    </h2>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                                <ColoredBadge role={user.role}/>
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div>
                                                    <h4 className="text-gray-700 dark:text-gray-200">{user.login}</h4>
                                                </div>
                                            </td>

                                            <td className="px-4 py-4 text-sm whitespace-nowrap relative">
                                                <ThreedotDropdown id={user.id}/>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 sm:flex sm:items-center sm:justify-end">
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalItems={users.length}
                />
            </div>
        </section>
    );
}

export default ManagementUsersTable;
