import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import useGarageSales from '../../hooks/useGarageSales';
import { GarageSale, SaleRecord } from './types/GarageSalesApi';
import { parsePoint } from './functions/parsePoint';
import styles from './GarageSales.module.css';

// Leaflet's default marker icons break with bundlers — point to the CDN assets instead
const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const OKC_CENTER: [number, number] = [35.4676, -97.5164];

const toSaleRecord = (sale: GarageSale): SaleRecord => ({
  id: sale[0],
  address: sale[1],
  zipcode: sale[2],
  permitDate: sale[3],
  appliances: sale[4],
  babyKidItems: sale[5],
  clothing: sale[6],
  electronics: sale[7],
  entertainment: sale[8],
  fitnessEquipment: sale[9],
  furniture: sale[10],
  hobbies: sale[11],
  kitchenItems: sale[12],
  lawnTools: sale[13],
  householdItems: sale[14],
  sportingGoods: sale[15],
  allCategories: sale[16],
  shape: sale[17],
});

const GarageSales = () => {
  const { data, isLoading, isError } = useGarageSales();

  if (isLoading) return <div className={styles.status}>Loading...</div>;
  if (isError)
    return (
      <div className={styles.status}>Failed to load garage sale data.</div>
    );

  const sales = (data?.Records ?? [])
    .map(toSaleRecord)
    .filter((sale) => parsePoint(sale.shape) !== null);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>OKC Garage Sales</h1>
      <MapContainer center={OKC_CENTER} zoom={11} className={styles.map}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {sales.map((sale) => (
          <Marker key={sale.id} position={parsePoint(sale.shape)!} icon={markerIcon}>
            <Popup>
              <strong>{sale.address}</strong>
              <br />
              {sale.zipcode} &mdash; {sale.permitDate}
              {sale.allCategories && (
                <>
                  <br />
                  {sale.allCategories}
                </>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default GarageSales;
