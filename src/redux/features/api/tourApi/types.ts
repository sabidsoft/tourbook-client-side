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