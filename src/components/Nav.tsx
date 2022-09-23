import { AppBar, Toolbar, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const Nav: FunctionComponent<{}> = () => {
  return (
    <AppBar position="static" sx={{ marginBottom: '20px' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, marginRight: '10px' }}>
          <Link to="/" style={{ color: ' #fff' }}>Home</Link>
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
          <Link to="/movies" style={{ color: ' #fff' }}>Movie List</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
export default Nav