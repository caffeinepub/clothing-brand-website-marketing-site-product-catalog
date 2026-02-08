import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactMessage {
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export type ProductId = string;
export interface Collection {
    id: CollectionId;
    name: string;
    description: string;
    imageUrl: string;
}
export type CollectionId = string;
export interface Product {
    id: ProductId;
    collectionId: CollectionId;
    name: string;
    tags: Array<string>;
    description: string;
    colorVariants?: Array<string>;
    available: boolean;
    sizeVariants?: Array<string>;
    imageUrl: string;
    price: string;
}
export interface backendInterface {
    addProduct(id: ProductId, name: string, desc: string, price: string, image: string, available: boolean, tags: Array<string>, sizes: Array<string> | null, colors: Array<string> | null, collectionId: CollectionId): Promise<void>;
    createCollection(id: CollectionId, name: string, desc: string, image: string): Promise<void>;
    getAllCollections(): Promise<Array<Collection>>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllProducts(): Promise<Array<Product>>;
    getCollection(id: CollectionId): Promise<Collection>;
    getProduct(id: ProductId): Promise<Product>;
    getProductsByCollection(collectionId: CollectionId): Promise<Array<Product>>;
    submitContactMessage(name: string, email: string, message: string, timestamp: bigint): Promise<void>;
}
