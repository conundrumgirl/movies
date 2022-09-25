import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Service from './service';
import { Movie } from './types';

export const MOVIE_KEYS = {
    all: ['movies'] as const,
    detail: (id: string | undefined) => [...MOVIE_KEYS.all, id] as const,
}


export const useMovies = () => {
    //eg: you can get authentication token from context here or whatever else 
    return useQuery<Movie[], Error>(
        MOVIE_KEYS.all, () => Service.postData<Movie[]>('/api/movies', 'GET', {}),
        {
            retry: 1,
            staleTime: 1000 * 10,
        }
    )
}


export const useMovie = (id: string | undefined) => {
    //eg: you can get authentication token from context here or whatever else 
    return useQuery<Movie | undefined, Error>(
        MOVIE_KEYS.detail(id), () => Service.postData<Movie>(`/api/movies/${id}`, 'GET'),
        {
            enabled: !!id,
            retry: 1,
            staleTime: 1000 * 5,
        }
    )
}


export const useUpdateMovie = () => {
    const queryClient = useQueryClient()
    const _updateMovie = async (updatedMovie: Movie) => {
        return Service.postData<Movie>(`/api/movies/${updatedMovie.id}`, 'PUT', { ...updatedMovie })
    }

    const mutation = useMutation(_updateMovie,
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['movies'])
            },
        })
    return mutation
}