import { RelatedToursCardProps } from "./types";
import moment from "moment";

export default function RelatedToursCard({ tour }: RelatedToursCardProps) {
    const { imageUrl, title, creatorName, createdAt } = tour;

    return (
        <div className="flex mb-2.5 shadow-md rounded">
            <img
                src={imageUrl}
                alt={title}
                className="w-[45%] h-[110px] object-cover rounded-t md:rounded-l"
            />
            <div className="w-[55%] px-2">
                <h2 className="font-medium mb-2">{title.length < 40 ? title : `${title.slice(0, 40)}...`}</h2>
                <span className="block text-sm">{creatorName}</span>
                <span className="block text-sm">{moment(createdAt).fromNow()}</span>
            </div>
        </div>
    )
}