import CreatePost from '../../components/Post/CreatePost';
import ListPosts from '../../components/Post/ListPost'
import Box from '@mui/material/Box'; 
import {useContext} from 'react'
import {AuthContext} from '../../Utils/context/index'

export default function  Home() {

    const {isConnected} = useContext(AuthContext);  

        return (
            <Box>
                {isConnected ?
                    <Box  sx={{ display: 'flex', justifyContent: 'center' }}>
                        < CreatePost />
                    </Box> : ""
                }
                <ListPosts />
            </Box>
        )
}

