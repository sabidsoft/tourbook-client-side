import { RxCross2 } from "react-icons/rx";

interface TagChipProps {
    tag: string;
    removeTag: (removalTag: string) => void;
}

export default function TagChip({ tag, removeTag }: TagChipProps) {
    return (
        <div
            key={tag}
            className="flex items-center bg-[#EBEBEB] text-sm px-2 py-1.5 rounded-full"
        >
            <span className="pl-2 uppercase">{tag}</span>
            <button
                className="bg-[#adadad] hover:bg-[#8D8D8D] text-white p-0.5 ml-2 rounded-full focus:outline-none"
                onClick={() => removeTag(tag)}
            >
                <RxCross2 />
            </button>
        </div>
    )
}