import CreatePost from '../../components/Post/CreatePost';
import ListPosts from '../../components/Post/ListPosts'
import { useContext, useState } from 'react';
import {AuthContext} from '../../Utils/context/index';
import Box from '@mui/material/Box'; 
import "./styles.css";

export default function  Home() {

        return (
            <div>
                <Box  sx={{ display: 'flex', justifyContent: 'center' }}>
                    < CreatePost />
                </Box>
                <ListPosts />
            </div>
        )
}

