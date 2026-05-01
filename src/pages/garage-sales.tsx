import dynamic from 'next/dynamic';

const GarageSales = dynamic(
  () => import('../components/GarageSales/GarageSales'),
  { ssr: false }
);

const GarageSalesPage = () => {
  return <GarageSales />;
};

export default GarageSalesPage;
