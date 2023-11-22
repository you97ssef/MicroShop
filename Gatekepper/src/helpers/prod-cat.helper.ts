export interface NewCategory {
    name: string;
    description: string | null;
    image: string | null;
}

export interface UpdateCategory {
    name: string | null;
    description: string | null;
    image: string | null;
}

export interface NewProduct {
    name: string;
    description: string;
    price: number;
    availability: number;
    category_id: number;
}

export interface UpdateProduct {
    name: string | null;
    description: string | null;
    price: number | null;
    availability: number | null;
    category_id: number | null;
}

export interface UpdateAvailability {
    availability: number;
}
