import React from 'react';

const LoginInput = ({login, onLoginChange}) => {
    return (
        <>
            <div className="col-span-3">
                <label htmlFor="af-account-login"
                       className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                    Логин
                </label>
            </div>
            <div className="col-span-9">
                <input
                    id="af-account-login"
                    type="text"
                    className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    placeholder="Введите логин"
                    value={login}
                    onChange={(e) => onLoginChange(e.target.value)}
                    required
                />
            </div>
        </>
    );
};

export default LoginInput;
