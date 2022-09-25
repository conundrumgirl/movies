import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { useMovie, useUpdateMovie } from '../movieHooks';

const Detail: FunctionComponent = () => {
  let { id } = useParams();
  const [rating, setRating] = React.useState<number | undefined>(undefined);

  const queryClient = useQueryClient()
  const { data, isError, isLoading, error } = useMovie(id)
  const { mutate, isLoading: isMutating, isError: isMutationError, error: mutationError } = useUpdateMovie()

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
    if (data) {
      setRating(data.rating)
    }
  }, [data]);

  const updateMovie = async () => {
    if (!data || !rating) {
      return
    }
    const updatedMovie = { ...data, rating: rating }
    mutate(updatedMovie, { onError: (error) => console.log(error), onSuccess: () => console.log('success') })
  }

  return (
    <Box marginLeft={'40px'}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          {error && <div>Something went wrong ...{error.message}</div>}
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
              {data?.description}
            </Typography>
            <TextField id="outlined-basic" label="Rating" variant="outlined" type="number"
              value={rating || ''} onChange={updateRating} />
          </>)}
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-around' }}>
          <Button onClick={() => updateMovie()}>{isMutating ? 'Saving...' : 'Save'}</Button>
        </CardActions>
      </Card>
    </Box>
  );


}
export default Detail