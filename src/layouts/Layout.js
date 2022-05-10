import React from 'react';
import PropTypes from 'prop-types';
import Header from '../sections/@header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

const Layout = ({children}) => (
    <>
        <Header/>
        <main className="container">
            <div className="row">
                <div className="col">
                    <Banner/>
                    {children}
                </div>
            </div>
        </main>
        <Footer/>
    </>
);

Layout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Layout;