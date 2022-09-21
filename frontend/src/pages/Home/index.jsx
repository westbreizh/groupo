import CreatePost from '../../components/Post/CreatePost';
import ListPosts from '../../components/Post/ListPost'
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

