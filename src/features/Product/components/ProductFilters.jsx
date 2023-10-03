import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import FilterByCategory from './Filters/FilterByCategory';

ProductFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

function ProductFilters(props) {
    const { filters, onChange } = props;

    const handleCategoryChange = (newCategoryId) => {
        if (!onChange) return;

        const newFilter = {
            ...filters,
            "category.id": newCategoryId,
        };

        onChange(newFilter);
    };



    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange} />
        </Box>
    );
}

export default ProductFilters;