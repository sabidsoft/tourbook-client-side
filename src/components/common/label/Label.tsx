import { LabelProps } from "./types";

export default function Label({ htmlFor, labelName }: LabelProps) {
    return (
        <label
            htmlFor={htmlFor}
            className="font-medium mb-1 inline-block"
        >
            {labelName}:
        </label>
    )
}