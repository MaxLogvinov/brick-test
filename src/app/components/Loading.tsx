import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
      <CircularProgress size="3rem" />
    </div>
  );
}
