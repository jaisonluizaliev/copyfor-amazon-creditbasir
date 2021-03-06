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
  section: {
    marginTop: 0,
    marginBottom: 10,
  },
  footer: {
    textAlign: 'center',
    fontWeight: 'bolder',
    marginTop: 20,
  },
  form: {
    width: '100%',
    maxWidth: 600,
    margin: '0 auto',
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'Capitalize',
  },
  backgroundStepper: {
    backgroundColor: 'transparent',
  },
  error: {
    color: '#f04040',
  },
  fullWidth: {
    width: '100%',
  },
});

export default useStyles;
