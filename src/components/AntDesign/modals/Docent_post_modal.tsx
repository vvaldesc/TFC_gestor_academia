import React, { useState } from 'react';
import { Button, Alert, Modal, Form, Input, Radio, DatePicker, Checkbox, Tabs } from 'antd';
import { FaPhotoVideo, FaPencilAlt } from 'react-icons/fa';
import "@/styles/styles.css";
import imageBase64 from "@/services/client/logic/imageBase64";
import postCheckProfilePhoto from "@/services/client/fetching/hooks/postCheckProfilePhoto.tsx";
import regex from '@/consts/regex';

import postStudent from '@/services/client/fetching/hooks/postStudent'
import postTeacher from '@/services/client/fetching/hooks/postTeacher'
import postEmployee from '@/services/client/fetching/hooks/postEmployee'
import type { Student, Teacher, Employee } from '@/models/types';

const { TabPane } = Tabs;

const Docent_post_modal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [error, setError] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [file, setFile] = useState<File>();
  const [ message , setMessage ] = useState('');
  const [profilePhotoSrc, setProfilePhotoSrc] 
  = useState(null as string | null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  async function createProfile(
    values: (Student & Employee) | (Teacher & Employee),
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    setLoadingUpload: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    //@ts-ignore
    if (values.matriculation_number) {
      let response;
      try {
        // @ts-ignore
        response = await postStudent(values as Teacher);
        if (response.status !== 201)
          throw new Error("Error creando registro estudiante");
      } catch (error) {
        setError(true);
        setMessage(error.message);
      } finally {
        setLoadingUpload(false);
      }
    
      if (response && response.data && response.data.result && response.data.result.data && response.data.result.data.lastInsertRowid) {
          values.student_id = Number(response.data.result.data.lastInsertRowid);
      } else {
          console.error('No se pudo obtener lastInsertRowid');
          return;
      }
  
      try {
          const employeeResponse = await postEmployee(values as Employee);
          if (employeeResponse.status !== 201) throw new Error("Error creando registro empleado");
          window.location.reload();
      } catch (error) {
          setError(true);
          setMessage(error.message);
          setLoadingUpload(false);
      }
      return "Student";
    } else {
      if (values.image) {
        let response;
        try {
            response = await postTeacher(values as Teacher);
            console.log(response);
            if (response.status !== 201) throw new Error("Error creando registro profesor");
        } catch (error) {
            setError(true);
            setMessage(error.message);
        } finally {
            setLoadingUpload(false);
        }
        console.log(response);
    
        if (response && response.data && response.data.result && response.data.result.data && response.data.result.data.lastInsertRowid) {
            values.teacher_id = Number(response.data.result.data.lastInsertRowid);
        } else {
            console.error('No se pudo obtener lastInsertRowid');
            return;
        }
    
        try {
            const employeeResponse = await postEmployee(values as Employee);
            if (employeeResponse.status !== 201) throw new Error("Error creando registro empleado");
            window.location.reload();
        } catch (error) {
            setError(true);
            setMessage(error.message);
            setLoadingUpload(false);
        }
        return "Teacher";
    } else {
      throw new Error("Error en la foto de perfil");
    }
    }
  }

  const onFinish = async (values: any) => {
    error && setError(false);
    message && setMessage('');
    console.log('Received values of form: ', values);
    handleOk();
    try {
      setError(false);
      setLoadingUpload(true);
      values = form.getFieldsValue();
      // @ts-ignore
      file && (values.image = file);
      if(file && values.image){
        values.image = await imageBase64(values.image) as string;
      }
      // const validPhoto = values.image && await postCheckProfilePhoto(file);
      const validPhoto = true;
      if(!validPhoto){throw new Error('Error en la foto de perfil')};
      if(validPhoto){
        createProfile(values, setError, setMessage, setLoadingUpload);
      } else if(!values.image){
        createProfile(values, setError, setMessage, setLoadingUpload);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      setMessage(error.message);
    }
  };

  return (
<>
  {error && <Alert message={message} type="error" />}
  <Button type="primary" onClick={showModal}>
    Crear un profesor o estudiante
  </Button>
  <Modal title="Docencia y estudiantes" footer={null} visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <Form form={form} onFinish={onFinish}>
    <Form.Item name="image" required={true}>
          <input
            type="file"
            id="fileUpload"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setFile(file);
              const url = URL.createObjectURL(file);
              setProfilePhotoSrc(url);
              console.log(url);
              // Aquí puedes manejar la subida del archivo
            }}
          />
          {profilePhotoSrc && <img
              id="profileThumb_edit"
              className="section-div-profilePhoto m-auto my-4 object-cover"
              src={profilePhotoSrc as string}
              alt=""
            />}
          <div
            className="flex items-center justify-center bg-white border-2 h-12 w-12 border-gray-300 rounded-full hover:bg-gray-200 cursor-pointer"
            onClick={() => document.getElementById('fileUpload').click()}
          >
            {profilePhotoSrc ? <FaPencilAlt size={20} /> : <FaPhotoVideo size={20} />}
          </div>
        </Form.Item>
        <Form.Item required={true} label="Nombre" name="name" rules={[{ pattern: regex.regularName, message: 'Nombre inválido' }]}>
          <Input placeholder="Nombre" />
        </Form.Item>
        <Form.Item required={true} label="Apellido" name="surname" rules={[{ pattern: regex.regularName, message: 'Apellido inválido' }]}>
          <Input placeholder="Apellido" />
        </Form.Item>
        <Form.Item required={true} label="Email" name="email" rules={[{ pattern: regex.email, message: 'Email inválido' }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item required={true} label="Número de teléfono" name="phone_number" rules={[{ pattern: regex.phone, message: 'Número de teléfono inválido' }]}>
          <Input placeholder="Número de teléfono" />
        </Form.Item>
        <Form.Item required={true} label="Dirección" name="address" rules={[{ pattern: regex.address, message: 'Dirección inválida' }]}>
          <Input placeholder="Dirección" />
        </Form.Item>
        <Form.Item required={true} label="Ciudad" name="city" rules={[{ pattern: regex.regularName, message: 'Ciudad inválida' }]}>
          <Input placeholder="Ciudad" />
        </Form.Item>
        <Form.Item required={true} label="Fecha de nacimiento" name="bornDate">
          <DatePicker />
        </Form.Item>
        <Form.Item required={true} label="Nombre de usuario" name="username" rules={[{ pattern: regex.username, message: 'Nombre de usuario inválido' }]}>
          <Input placeholder="Nombre de usuario" />
        </Form.Item>
        <Form.Item required={true} label="Activo" name="active">
          <Checkbox onChange={e => form.setFieldsValue({ active: e.target.checked })} />
        </Form.Item>
        <Form.Item label="Salario" name="salary">
          <Input type='number' placeholder="Salario" />
        </Form.Item>
        <Form.Item required={true} label="Seguridad social" name="social_security" rules={[{ pattern: /^[0-9]{9}$/, message: 'Número de seguridad social inválido' }]}>
          <Input placeholder="Seguridad social" />
        </Form.Item>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Estudiante" key="1">
            <Form.Item label="Número de matrícula" name="matriculation_number" rules={[{ pattern: /^[0-9]{7}$/, message: 'Número de matrícula inválido' }]}>
              <Input placeholder="Número de matrícula" />
            </Form.Item>
            <Form.Item label="DNI" name="DNI" rules={[{ pattern: regex.dni, message: 'DNI inválido' }]}>
              <Input placeholder="DNI" />
            </Form.Item>
            <Form.Item label="Empleo" name="employed">
              <Checkbox onChange={e => form.setFieldsValue({ employed: e.target.checked })} />
            </Form.Item>
            <Form.Item label="Nivel educativo" name="educational_level" rules={[{ pattern: regex.regularName, message: 'Nivel educativo inválido' }]}>
              <Input placeholder="Nivel educativo" />
            </Form.Item>
          </TabPane>
          <TabPane tab="Profesor" key="2">
            <Form.Item label="Es administrador" name="is_admin">
              <Checkbox onChange={e => form.setFieldsValue({ is_admin: e.target.checked })} />
            </Form.Item>
          </TabPane>
        </Tabs>
        <Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
            <Button type="default" htmlType="button" onClick={handleCancel}>
              Cancelar
            </Button>
          </Form.Item>
        </Form.Item>
    </Form>
  </Modal>
</>
  );
};

export default Docent_post_modal;