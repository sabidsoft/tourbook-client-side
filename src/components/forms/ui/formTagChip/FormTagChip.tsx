import { RxCross2 } from "react-icons/rx";
import { FormTagChipProps } from "./types";

export default function FormTagChip({ tag, removeTag }: FormTagChipProps) {
    return (
        <div
            key={tag}
            className="
                flex
                items-center
                bg-[#EBEBEB]
                text-sm
                px-2
                py-1.5
                rounded-full
            "
        >
            <span className="pl-2">
                {tag}
            </span>
            <button
                onClick={() => removeTag(tag)}
                className="
                    bg-[#adadad]
                    hover:bg-[#8D8D8D]
                    text-white
                    p-0.5
                    ml-2
                    rounded-full
                    focus:outline-none
                "
            >
                <RxCross2 />
            </button>
        </div>
    );
};