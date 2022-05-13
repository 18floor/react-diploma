import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import Cards from '../../components/Cards';
import Categories from './Categories';
import Search from './Search';
import {categoriesListSelector, productsListSelector} from '../../selectors';
import {
    fetchProducts, setSearchValue, setCategoryId, fetchCategories,
} from '../../actions/actionCreators';
import Loader from '../../components/Loader';
import LoadButton from './LoadButton';

const CatalogComponent = ({match}) => {
    const dispatch = useDispatch();
    const {items, loading: cardsLoading, error} = useSelector(productsListSelector);
    const {loading: categoriesLoading} = useSelector(categoriesListSelector);
    const isCatalogPage = match.path === '/catalog';

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchProducts(0));
        return () => {
            if (isCatalogPage) {
                dispatch(setSearchValue(''));
            }
            dispatch(setCategoryId(null));
        };
    }, [dispatch, isCatalogPage]);

    const catalogLoading = cardsLoading && categoriesLoading;

    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            <Search isVisible={isCatalogPage}/>
            {
                !catalogLoading
                && (
                    <>
                        <Categories/>
                        <Cards loading={cardsLoading} error={error} items={items} isCatalog/>
                        <LoadButton items={items}/>
                    </>
                )
            }
            <Loader loading={catalogLoading}/>
        </section>
    );
};

CatalogComponent.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string.isRequired,
    }).isRequired,
};

export default withRouter(CatalogComponent);