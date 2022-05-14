import queryString from 'query-string';
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_SUCCESS_FIRST,
    FETCH_PRODUCTS_SUCCESS_MORE,
    CLEAR_PRODUCTS,
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_SUCCESS,
    SET_CATEGORY_ID,
    SET_SEARCH_STRING,
    FETCH_BESTSELLERS_REQUEST,
    FETCH_BESTSELLERS_FAILURE,
    FETCH_BESTSELLERS_SUCCESS,
} from './actionTypes';

const baseUrl = 'http://localhost:7070/api/';

export const fetchProductsRequest = () => ({
    type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsFailure = (error) => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: {
        error,
    },
});

export const fetchProductsSuccessFirst = (items) => ({
    type: FETCH_PRODUCTS_SUCCESS_FIRST,
    payload: {
        items,
    },
});

export const fetchProductsSuccessMore = (items) => ({
    type: FETCH_PRODUCTS_SUCCESS_MORE,
    payload: {
        moreItems: items,
    },
});

export const clearProducts = () => ({
    type: CLEAR_PRODUCTS,
});

export const fetchCategoriesRequest = () => ({
    type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesFailure = (error) => ({
    type: FETCH_CATEGORIES_FAILURE,
    payload: {
        error,
    },
});

export const fetchCategoriesSuccess = (items) => ({
    type: FETCH_CATEGORIES_SUCCESS,
    payload: {
        items,
    },
});

export const setCategoryId = (id) => ({
    type: SET_CATEGORY_ID,
    payload: {
        categoryId: id,
    },
});

export const setSearchValue = (query) => ({
    type: SET_SEARCH_STRING,
    payload: {
        query,
    },
});

export const fetchBestsellersRequest = () => ({
    type: FETCH_BESTSELLERS_REQUEST,
});

export const fetchBestsellersFailure = (error) => ({
    type: FETCH_BESTSELLERS_FAILURE,
    payload: {
        error,
    },
});

export const fetchBestsellersSuccess = (items) => ({
    type: FETCH_BESTSELLERS_SUCCESS,
    payload: {
        items,
    },
});

export const fetchProducts = (offset) => async (dispatch, getState) => {
    const {productsList: {query}, categoriesList: {categoryId}} = getState();
    dispatch(fetchProductsRequest());

    if (!offset) {
        dispatch(clearProducts());
    }

    const params = queryString.stringify({offset, categoryId, q: query});
    const fetchUrl = `${baseUrl}items?${params}`;

    try {
        const response = await fetch(fetchUrl, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
        });

        const data = await response.json();

        if (offset === 0) {
            dispatch(fetchProductsSuccessFirst(data));
        }
        if (offset > 0) {
            dispatch(fetchProductsSuccessMore(data));
        }
    } catch (error) {
        dispatch(fetchProductsFailure(error.message));
    }
};

export const fetchCategories = () => async (dispatch) => {
    dispatch(fetchCategoriesRequest());

    try {
        const response = await fetch(`${baseUrl}categories`);

        const data = await response.json();
        dispatch(fetchCategoriesSuccess(data));
    } catch (error) {
        dispatch(fetchCategoriesFailure(error.message));
    }
};

export const searchProducts = (query) => async (dispatch) => {
    dispatch(setSearchValue(query));
    dispatch(fetchProducts(0));
};

export const fetchBestsellers = () => (dispatch) => {
    dispatch(fetchBestsellersRequest());

    return fetch(`${baseUrl}top-sales`)
        .then((res) => res.json())
        .then((res) => dispatch(fetchBestsellersSuccess(res)))
        .catch((error) => dispatch(fetchBestsellersFailure(error.message)));
};