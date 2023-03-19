import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright(props: any) {
  return (
    <Typography variant="caption" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        eXtraOrdinary Websites
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}