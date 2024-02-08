import {PaginationMeta} from "../pagination-meta.interface";
import {Event} from "../models/event.interface";

export interface EventResponse {
    data: Event[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: PaginationMeta;
}
