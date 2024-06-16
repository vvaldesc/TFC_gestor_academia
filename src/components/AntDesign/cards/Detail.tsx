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
  <Space className="m-2" direction="vertical" size={16}>

  {!loading && !error && (
    <Card
      size="small"
      title={detail.service_name}
      extra={<a href="#">More</a>}
      style={detail.state === "Cancelled" ? { width: 300, backgroundColor: '#FC9E9E' } : (detail.state === "Pending" ? { width: 300, backgroundColor: '#FFE98B' } : { width: 300, backgroundColor: '#D3D3D2' })}
    >

{loading && <Alert message="Cargando..." type="info" />}
  {error && <Alert message={message} type="error" />}
  {!error && message && <Alert message={message} type="info" />}

  <div className="p-4 pt-8">
    <p>ID de servicio: {detail.id}</p>
    <p>Nombre del cliente: {detail.client_name + ' ' + detail.client_surname}</p>
    {detail.teacher_name && <p>Nombre del profesor: {detail.teacher_name}</p>}
    {detail.student_name && <p>Nombre del estudiante: {detail.student_name}</p>}
    <p>
        Fecha de reserva: {new Date(detail.reserved_at!).toLocaleDateString()}
    </p>
    <p>Estado: {detail.state}</p>
    <p>Precio: {detail.price}</p>
    {detail.state && <p>Reserva: {detail.state === "Pending" ? "Pendiente" : (detail.state === "Cancelled" ? "Cancelada" : "Completada")}</p>}
</div>



      {detail.state === "Pending" && <span>
        <Popconfirm
          title="¿Seguro que quieres cancelar?"
          onConfirm={() => handleConfirm()}
        >
          <Button type="primary" danger>
            Cancelar
          </Button>
        </Popconfirm>
      </span>}
    </Card>)}
  </Space>
)};

export default App;
