import { Box, Container, Grid, Pagination, Paper } from '@mui/material';
import productAPI from 'api/productApi';
import { useCallback, useEffect, useState } from 'react';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import './styles.scss';

ListPage.propTypes = {

};


function ListPage(props) {

    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        limit: 9,
        total: 10,
        page: 1
    });
    const [filters, setFilters] = useState({
        _page: 1,
        _limit: 9,
        _sort: 'salePrice:ASC',
    });

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const { data, pagination } = await productAPI.getAll(filters);
    //             setProductList(data);
    //             setPagination(pagination);
    //             console.log({ data, pagination });
    //         } catch (error) {
    //             console.log('Failed to get product list', error);
    //         }

    //         setLoading(false);
    //     })();
    // }, [filters]);

    const tmp = useCallback(() => {
        (async () => {
            try {
                const { data, pagination } = await productAPI.getAll(filters);
                setProductList(data);
                setPagination(pagination);
                console.log({ data, pagination });
            } catch (error) {
                console.log('Failed to get product list', error);
            }

            setLoading(false);
        })();
    }, [filters]);

    useEffect(() => {
        tmp();
    }, []);


    const handlePageChange = (e, page) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _page: page,
        }));
    };

    const handleSortChange = (newSortValue) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _sort: newSortValue,
        }));
    };

    const handleFiltersChange = (newFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
        }));
    };

    return (

        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className='leftDiv'>
                        <Paper elevation={0}>
                            <ProductFilters filters={filters} onChange={handleFiltersChange} />
                        </Paper>
                    </Grid>
                    <Grid item className='rightDiv'>
                        <ProductSort currentSort={filters._sort} onChange={handleSortChange} />

                        <Paper elevation={0}>
                            {loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList} />}

                            <Box className="pagination">

                                <Pagination
                                    color="primary"
                                    count={Math.ceil(pagination.total / pagination.limit)}
                                    page={pagination.page}
                                    onChange={handlePageChange}>
                                </Pagination>

                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>

    );
}

export default ListPage;