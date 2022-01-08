import React, {useState, useContext} from 'react'

const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
const AppContext = React.createContext()

const savedList = []
const AppProvider = ({children}) => {


    return (
        <AppContext.Provider value={{savedList}}> 
            {children}
        </AppContext.Provider>
    )
}
export const useGlobalContext = () => {
    return useContext(AppContext)
}
export {AppContext, AppProvider}