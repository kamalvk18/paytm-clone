export const InputField = ({label, value, onChange, placeholder=""}) => {
    return (
        <div className="flex flex-col text-left py-1">
            <div className="font-bold">{label}</div>
            <input 
                type="text" 
                placeholder={placeholder} 
                value={value}
                onChange={onChange}
                className="border-2 border-gray-100 rounded my-2 p-2"
            />
        </div>
    )
}