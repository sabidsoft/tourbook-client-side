export interface Tour {
    _id: string;
    tags: string[];
    likeCount: number;
    title: string;
    description: string;
    imageUrl: string;
    creatorId: string;
    creatorName: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ToursResponse {
    success: boolean;
    message: string;
    data: {
        pagination: {
            totalPage: number;
            currentPage: number;
            previousPage: number | null;
            nextPage: number | null;
        }
        tours: Tour[];
    }
}

export interface TourResponse {
    success: boolean;
    message: string;
    data: {
        tour: Tour;
    }
}