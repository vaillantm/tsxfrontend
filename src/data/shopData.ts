export const shopData = {
    jewellery: {
        title: "Jewellery",
        sub: [
            { name: "Anklets", tag: "ANKLETS" },
            { name: "Bracelets", tag: "BRACELETS" },
            { name: "Earrings", tag: "EARRINGS" },
            { name: "Necklaces", tag: "NECKLACES" }
        ],
        products: [
            { id: 1, name: "Gold Peacock Earrings", tags: "EARRINGS", price: 48.0, rating: 3, img: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=400" },
            { id: 2, name: "Turquoise Metal Bracelet", tags: "BRACELETS", price: 88.0, rating: 5, img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400" },
            { id: 3, name: "Gold Alloy Cuff Bracelet", tags: "BRACELETS", price: 195.0, rating: 4, img: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400" },
            { id: 4, name: "Traditional Necklace", tags: "NECKLACES", price: 115.0, rating: 2, img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400" },
            { id: 5, name: "Silver Bead Anklet", tags: "ANKLETS", price: 35.0, rating: 4, img: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400" }
        ]
    },
    shoes: {
        title: "Shoes",
        sub: [
            { name: "Sneakers", tag: "SNEAKERS" },
            { name: "Formal Shoes", tag: "FORMAL" }
        ],
        products: [
            { id: 6, name: "Blue Mid-Top Sneakers", tags: "SNEAKERS", price: 45.0, rating: 5, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
            { id: 7, name: "Brown Leather Brogues", tags: "FORMAL", price: 150.0, rating: 4, img: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400" }
        ]
    },
    bags: {
        title: "Bags",
        sub: [{ name: "Backpacks", tag: "BACKPACK" }, { name: "Handbags", tag: "HANDBAG" }],
        products: [
            { id: 8, name: "Urban Explorer Backpack", tags: "BACKPACK", price: 65.0, rating: 5, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
            { id: 9, name: "Leather Tote Bag", tags: "HANDBAG", price: 120.0, rating: 4, img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" },
            { id: 10, "name": "Minimalist Sling Bag", "tags": "HANDBAG", "price": 40.0, "rating": 4, "img": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" },
            { id: 11, name: "Canvas Travel Bag", tags: "BACKPACK", price: 85.0, rating: 3, img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400" }
        ]
    }
};

export type Product = {
    id: number;
    name: string;
    tags: string;
    price: number;
    rating: number;
    img: string;
};

export type SubCategory = {
    name: string;
    tag: string;
};

export type Category = {
    title: string;
    sub: SubCategory[];
    products: Product[];
};

export type ShopData = {
    [key: string]: Category;
};
