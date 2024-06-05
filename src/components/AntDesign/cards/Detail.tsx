import React, {useState} from "react";
import { Card, Space, Button, Typography, Popconfirm, Alert } from "antd";
const { Text, Link } = Typography;
import putDetail from '@/services/client/fetching/hooks/putDetail';

import type { ServiceConsumption_type } from "@/models/types";

interface DetailCardsProps {
  // Define the props for your component here
  detail: ServiceConsumption_type;
}



const App: React.FC<DetailCardsProps> = ({ detail }) => {

  const [ loading , setLoading ] = useState(false);
  const [ error , setError ] = useState(false);
  const [ message , setMessage ] = useState('');

  const handleConfirm = () => {
    console.log("Cancelar");
    setLoading(true);
    putDetail(detail).then((response) => {
      console.log(response);
      if (response.status === 200) {
        setLoading(false);
        setMessage("Reserva cancelada con éxito");
      } else {
        setLoading(false);
        setError(true);
        setMessage("Reserva cancelada con éxito");
      }
    });
  };


  return (
  <Space direction="vertical" size={16}>

  {!loading && !error && (
    <Card
      size="small"
      title={detail.service_name}
      extra={<a href="#">More</a>}
      style={{ width: 300 }}
    >

{loading && <Alert message="Cargando..." type="info" />}
  {error && <Alert message={message} type="error" />}
  {!error && message && <Alert message={message} type="info" />}

  <div className="p-4 pt-8">
    <p>ID de servicio: {detail.id}</p>
      <p>Nombre del cliente: {detail.client_name}</p>
      <p>Apellido del cliente: {detail.client_surname}</p>
      <p>
        Fecha de reserva: {new Date(detail.reserved_at!).toLocaleDateString()}
      </p>
      <p>Estado: {detail.state}</p>
      <p>Precio del servicio: {detail.service_price}</p>
      <p>Correo electrónico del cliente: {detail.client_email}</p>
  </div>



      <span>
        <Popconfirm
          title="¿Seguro que quieres cancelar?"
          onConfirm={() => handleConfirm(detail)}
        >
          <Button type="primary" danger>
            Cancelar
          </Button>
        </Popconfirm>
      </span>
    </Card>)}
  </Space>
)};

export default App;
