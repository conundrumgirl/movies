


import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../movieHooks';

const List: FunctionComponent<{}> = () => {

    const { data, isError, isLoading, error } = useMovies()

    return (
        <Box sx={{ height: '100%' }}>
            {isError && <div>{error.message}</div>}
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
                            {data?.map((row) => (
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