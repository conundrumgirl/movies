import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import Service from '../service';
import { Movie } from '../types';

const Detail: FunctionComponent = () => {
  let { id } = useParams();
  const [isLoading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [data, setData] = React.useState<Movie>();
  const [rating, setRating] = React.useState<number | undefined>(0);


  const updateRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setRating(undefined)
    } else {
      if (!isNaN(parseFloat(e.target.value))) {
        setRating(parseFloat(e.target.value))
      }
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      setError('');
      setLoading(true);

      try {
        if (id) {
          const response = await Service.postData<Movie>(`/api/movies/${id}`, 'GET')
          setData(response);
          setRating(response.rating)
        }
      } catch (error) {
        setError((error as Error).message)
      }
      setLoading(false);
    };
    if (id) {
      fetchData()
    }

  }, [id]);

  const updateMovie = async () => {
    try {
      setError('')
      const updatedMovie = { ...data, rating: rating }
      setLoading(true)
      const response = await Service.postData<Movie>(`/api/movies/${id}`, 'PUT', { ...updatedMovie })
      setData(response);
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box marginLeft={'40px'}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          {error && <div>Something went wrong ...{error}</div>}
          {isLoading ? (
            <div>Loading ...</div>
          ) : (<>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {data?.genre}
            </Typography>
            <Typography variant="h5" component="div">
              {data?.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {data?.year}: {data?.director}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 5 }}>
              {data?.rating}
              {data?.description}
            </Typography>
            <TextField id="outlined-basic" label="Rating" variant="outlined" type="number"
              value={rating} onChange={updateRating} />
          </>)}
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-around' }}>
          <Button onClick={() => updateMovie()}>Save</Button>
        </CardActions>
      </Card>
    </Box>
  );


}
export default Detail