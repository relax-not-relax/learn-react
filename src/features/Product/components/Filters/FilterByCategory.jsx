import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import categoryAPI from 'api/categoryApi';

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
};

function FilterByCategory(props) {

    const { onChange } = props;

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const list = await categoryAPI.getAll();
                setCategoryList(list.map(x => ({
                    id: x.id,
                    name: x.name,
                })));
                //setCategoryList(list);
                console.log(list);
            } catch (error) {
                console.log('Failed to get category list', error);
            }
        })();
    }, []);

    const handleCategoryClick = (category) => {
        if (onChange) {
            onChange(category.id);
        }
    }

    return (
        <Box>
            <Typography>DANH MỤC SẢN PHẨM</Typography>

            <ul>
                {categoryList.map((category) => (
                    <li key={category.id} onClick={handleCategoryClick(category)}>{category.name}</li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByCategory;