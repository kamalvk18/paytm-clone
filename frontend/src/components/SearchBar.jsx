export const SearchBar = ({placeholder, onChange, value}) => {
    return (
        <input 
            type="text" 
            placeholder={placeholder}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={onChange}
            value={value}
        />
    )
}