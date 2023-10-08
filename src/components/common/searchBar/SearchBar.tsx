import { ImSearch } from "react-icons/im";
import { SearchBarProps } from "./types";

export default function SearchBar({
    searchText,
    handleSubmit,
    handleTitleChange,
}: SearchBarProps) {

    return (
        <form
            onSubmit={handleSubmit}
            className="
                flex
                justify-center
                items-center
            "
        >
            <input
                type="search"
                value={searchText}
                onChange={handleTitleChange}
                placeholder="Search tour here..."
                className="
                        w-[50%]
                        inline-block
                        mr-2
                        px-5
                        py-2
                        border
                        rounded-full
                        focus:outline-none
                        focus:border-[#267CB5]
                    "
            />
            <button
                type="submit"
                className="
                        bg-[#267CB5]
                        hover:bg-[#2e5f80]
                        duration-300
                        py-2
                        px-8
                        rounded-full
                        cursor-pointer
                    "
            >
                <ImSearch
                    size={24}
                    color={"#fff"}
                />
            </button>
        </form>
    )
}