import {PaginationLink} from "./pagination-link.interface";

export interface PaginationMeta{
    current_page: number;
    from: number;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}
