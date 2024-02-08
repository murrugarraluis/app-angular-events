export interface EventUpdateRequest{
    name: string;
    content: string;
    poster: string;
    date: string;
    time: string;
    category: {
        id: number;
    };
    city: {
        id: number;
    };
}
