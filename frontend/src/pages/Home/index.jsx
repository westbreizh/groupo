import CreatePost from '../../components/Post/CreatePost';
import ListPosts from '../../components/Post/index'
import { useContext, useState } from 'react';
import {AuthContext} from '../../Utils/context/index';
import Box from '@mui/material/Box'; 


export default function  Home() {

        return (
            <Box>
                <Box  sx={{ display: 'flex', justifyContent: 'center' }}>
                    < CreatePost />
                </Box>
                <ListPosts />
            </Box>
        )
}

