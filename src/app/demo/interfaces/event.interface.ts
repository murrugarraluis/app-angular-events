import {Category} from "./category.interface";
import {City} from "./city.interface";

export interface Event {
    id: number;
    name: string;
    slug: string;
    content: string;
    description: string;
    poster: string;
    date: string; // Ajusta el tipo de fecha según el formato que estés utilizando
    time: string; // Ajusta el tipo de hora según el formato que estés utilizando
    category: Category;
    city: City;
}
