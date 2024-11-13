import { Icon } from "./Icon"

export const AppBar = () => {
    return (
        <div className="flex justify-between border-b">
                <div className="font-bold text-3xl m-4">Payments App</div>
                <div className="flex m-4 font-semibold">
                    <div className="my-auto">Hello, User</div>
                    <div className="ml-2"><Icon text={"U"}/></div>
                </div>
        </div>
    )
}