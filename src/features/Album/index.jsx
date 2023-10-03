import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {
    
};

function AlbumFeature(props) {

    const albumList = [
        {
            id: 1,
            name: 'Nhẹ Nhàng Cùng V-pop',
            thumbnailUrl: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/3/3/8/3/338314b32165c5e44d6c7ec302d3fdfb.jpg'
        },
        {
            id: 2,
            name: 'Playlist Này Chill Phết',
            thumbnailUrl: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/c/5/3/e/c53e20e9ecf03b0bb4315deb90fe9063.jpg'
        },
        {
            id: 3,
            name: 'Nhạc Hoa Lời Việt Nhẹ Nhàng',
            thumbnailUrl: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/9/b/e/6/9be6f892a7f95ef25632752dd2a319c2.jpg'
        },
    ]

    return (
        <div>
            <h2>Chill</h2>
            <AlbumList albumList={albumList} />
        </div>
    );
}

export default AlbumFeature;