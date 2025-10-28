import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS, PER_PAGE } from "./constants";

axios.defaults.baseURL = API_BASE_URL;

export async function getCategories() {
    const { data } = await axios.get(`${API_ENDPOINTS.CATEGORY_LIST}`);
    return data;
}

export async function getProducts(page = 1) {
    const skip = (page - 1) * PER_PAGE;
    const { data } = await axios.get(`${API_ENDPOINTS.PRODUCTS}`, {
        params: {
            skip,
            limit: PER_PAGE
        }
    });
    return data;
}

export async function getProductsByCategory(page = 1, category) {
    const skip = (page - 1) * PER_PAGE;
    const { data } = await axios.get(`${API_ENDPOINTS.CATEGORY}${category}`, {
        params: {
            skip,
            limit: PER_PAGE
        }
    });
    return data;
}

export async function getProductById(id) {
    const { data } = await axios.get(`${API_ENDPOINTS.PRODUCTS_BY_ID}${id}`);
    return data;
}

export async function getProductsBySearch(page = 1, searchValue) {
    const skip = (page - 1) * PER_PAGE;
    const { data } = await axios.get(`${API_ENDPOINTS.PRODUCTS_BY_SEARCH}`, {
        params: {
            skip,            
            limit: PER_PAGE,
            q: searchValue
        }
    });
    return data;
}