import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  navbar: {
    background: '#203040',
    '& a': {
      color: '#fff',
      marginLeft: '10px',
    },
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    textAlign: 'center',
    fontWeight: 'bolder',
    margin:  20,
  },
});

export default useStyles;
