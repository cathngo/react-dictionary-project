import React, {useState, useContext} from 'react'

const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState([])
    const [wordOfDay, setWordOfDay] = useState([])

    //fetch results for search term
    const fetchResults = async () => {
        try {
            const response = await fetch(`${url}${searchTerm}`)
            const word = await response.json()
            console.log(word)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AppContext.Provider value={{searchTerm, setSearchTerm}}> 
            {children}
        </AppContext.Provider>
    )
}
export const useGlobalContext = () => {
    return useContext(AppContext)
}
export {AppContext, AppProvider}