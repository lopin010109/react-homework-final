import { Oval } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

export default function Loading({ type }) {
  const isLoading = useSelector((state) => state.loading.isFullScreenLoading);

  const color = '#d4af37';
  const bgStyle = {
    position: 'fixed',
    zIndex: 2000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(0, 0, 0, .7)',
  };

  if (!isLoading) return null;

  switch (type) {
    case 'oval':
      return (
        <>
          <Oval wrapperStyle={bgStyle} color={color} />
        </>
      );
    default:
      return (
        <>
          <h2 style={bgStyle}>Loading...</h2>
        </>
      );
  }
}
