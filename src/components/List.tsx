


import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Service from '../service';
import { Movie } from '../types';

const List: FunctionComponent<{}> = () => {
    const [isLoading, setLoading] = React.useState(false)
    const [isError, setError] = React.useState(false)
    const [data, setData] = React.useState<Movie[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            setError(false);
            setLoading(true);
            try {
                const response = await Service.postData<Movie[]>('/api/movies', 'GET', {})
                setData(response);
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };
        fetchData()
    }, []);



    return (
        <Box sx={{ height: '100%' }}>
            {isError && <div>Something went wrong ...</div>}
            {isLoading ? (
                <div>Loading ...</div>
            ) : (<>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Title</TableCell>
                                <TableCell>Genre</TableCell>

                                <TableCell >Rating</TableCell>
                                <TableCell >Director</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow
                                    key={row.title}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Link to={`/movies/${row.id}`}>  {row.title}</Link>
                                    </TableCell>
                                    <TableCell >{row.genre}</TableCell>
                                    <TableCell >{row.rating}</TableCell>
                                    <TableCell >{row.director}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer></>
            )}
        </Box>
    );
}

export default List