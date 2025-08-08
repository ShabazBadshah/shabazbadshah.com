import { Typography } from '@mui/material';

const ClampTypography = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  lineClamp: '2',
  WebkitBoxOrient: 'vertical'
};

type Props = {
  title: string;
};

const SectionTitle = ({ title }: Props): JSX.Element => {
  if (!title || title.trim().length === 0) return <></>;
  return (
    <Typography
      variant="h3"
      sx={{
        ...ClampTypography,
        color: 'text.primary',
        fontSize: '18px !important',
        letterSpacing: 0,
        fontWeight: '500',
        lineHeight: '20px',
        mb: 3
      }}
    >
      {title}
    </Typography>
  );
};

export default SectionTitle;
