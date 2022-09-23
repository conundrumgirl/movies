import { Box, Grid, styled } from '@mui/material';
import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import List from './List';

const ContentDiv = styled('div', { label: 'outlet' })(() => ({
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100vh',
}))

const Movies: FunctionComponent<{}> = () => {
    return (
        <Box >
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <List />
                </Grid>
                <Grid item xs={4}>
                    <ContentDiv>
                        <Outlet />
                    </ContentDiv>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Movies