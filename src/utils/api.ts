import { SortOrderType } from "@/types/productTable";

export const uploadFile = async (body: FormData) => {
    try {
        const response = await fetch("/api/upload", {
            method: "POST",
            body
        });
        return response
    }
    catch (e) {
        console.log(e)
    }
}
export const getFiles = async (sortOrder: SortOrderType) => {
    try {
        const response = await fetch(`/api/get?sort=${sortOrder}`, {
            method: "GET",
        });
        return await response.json()
    }
    catch (e) {
        console.log(e)
    }
}
export const getProducts = async (imageUUID: string, query: string, order: SortOrderType = 'desc', orderBy = 'productName') => {
    try {
        const response = await fetch(`/api/product?imageUUID=${imageUUID}&query=${query}&orderBy=${orderBy}&order=${order}`, {
            method: "GET",
        });
        return await response.json()
    }
    catch (e) {
        console.log(e)
    }
}