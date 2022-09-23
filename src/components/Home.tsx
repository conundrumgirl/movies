import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { FunctionComponent } from 'react';

const Home: FunctionComponent = () =>
(
    <Box>
        <Typography variant="h2" component="div" sx={{ marginBottom: 5 }}>React Query: Why and How</Typography>
        <Typography variant="h5" component="div" sx={{ marginBottom: 3 }}>The list of libraries used for this project</Typography>
        <List dense={true}>
            <ListItem>
                <ListItemText>Mock Service Worker: <a href="https://mswjs.io/">https://mswjs.io</a></ListItemText></ListItem>
            <ListItem>
                <ListItemText>Faker: <a href="https://fakerjs.dev/guide/">https://fakerjs.dev/guide</a></ListItemText></ListItem>
            <ListItem>
                <ListItemText>Material UI: <a href="https://mui.com/">https://mui.com/</a></ListItemText></ListItem>
            <ListItem>
                <ListItemText>React Router : <a href="https://reactrouter.com/en/v6.3.0">https://reactrouter.com/en/v6.3.0</a></ListItemText></ListItem>
            <ListItem>
                <ListItemText>React Query : <a href="https://react-query.tanstack.com/">https://react-query.tanstack.com/</a></ListItemText></ListItem>
        </List>
    </Box>
);

export default Home
