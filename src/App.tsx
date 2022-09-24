import { Box, Container } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Detail from './components/Detail';
import Home from './components/Home';
import Movies from './components/Movies';
import Nav from './components/Nav';

// Create a client
const queryClient = new QueryClient()

function App() {

  return (
    <Router basename={process.env.PUBLIC_URL}>

      <Container maxWidth="xl">
        <Nav />
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />}>
              <Route index element={<Box fontSize='18px' marginLeft="50px" >Please select a movie</Box>} />
              <Route path="/movies/:id" element={<Detail />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </Container>
    </Router>
  );
}

export default App;

