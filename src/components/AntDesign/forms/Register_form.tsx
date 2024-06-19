import React, { useState } from "react";
import type {sessionInfoState,Client} from "@/models/types";
import { Input, Form, Button, Alert } from "antd";
import { FaPhotoVideo, FaPencilAlt } from 'react-icons/fa';
import "@/styles/styles.css";
import regex from '@/consts/regex';

import postClient from "@/services/client/fetching/hooks/postClient";
import postCheckProfilePhoto from "@/services/client/fetching/hooks/postCheckProfilePhoto.tsx";
import imageBase64 from "@/services/client/logic/imageBase64";
import dayjs from 'dayjs';
import {deleteCookieLoacalStorage} from "@/services/client/utils/utils_typed";
import Refresh from "@/services/client/logic/Refresh";




const Register_form: React.FC<{sessionInfoState: sessionInfoState}> = ({sessionInfoState}) => {
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [file, setFile] = useState<File>();
  const [profilePhotoSrc, setProfilePhotoSrc] 
  = useState(null as string | null);

  function createProfile(values: Client, setError: React.Dispatch<React.SetStateAction<boolean>>, setLoadingUpload: React.Dispatch<React.SetStateAction<boolean>>) {
    console.log(values);
    //  postFaceCheck(values.image);
    postClient(values).then((response) => { if (response.status !== 201) throw new Error(response.statusText); setLoadingUpload(false); deleteCookieLoacalStorage(); window.location.href = "/perfil";})
      .catch((err) => { setError(true); });
    setLoadingUpload(false);
  }

  const onFinish = async (values: Client) => {

    try {
      setError(false);
      setLoadingUpload(true);
      values = form.getFieldsValue();
      // @ts-ignore
      file && (values.image = file);
      values.email = sessionInfoState.sessionInfo.OAuth.user?.email as string;
      values.active = true;
      if (values.name === undefined) values.username = sessionInfoState.sessionInfo.OAuth.user?.name as string;
      if(file) values.image = await imageBase64(values.image) as string;
      const validPhoto = values.image && await postCheckProfilePhoto(file);
      if(validPhoto){
        createProfile(values, setError, setLoadingUpload);
      } else if(!values.image){
        createProfile(values, setError, setLoadingUpload);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      setLoadingUpload(false);
    }
  };
  
  return (
    <>
      {loadingUpload && <Alert className="text-center" message="Creando perfil..." type="info" showIcon />}
      {error && <Alert className="text-center" message="Hubo un error creando el perfil" type="error" showIcon />}
      <Form className="relative flex flex-col items-center justify-center w-full" form={form} onFinish={onFinish}>
        <Form.Item name="image">
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
        <Form.Item
          label="Nombre"
          name="name"
          rules={[
            {
              required: true,
              pattern: regex.regularName,
              message: 'Por favor, introduce un nombre válido',
            },
          ]}
        >
          <Input type="text" placeholder="Name" />
        </Form.Item>
        <Form.Item
          label="Apellido"
          name="surname"
          rules={[
            {
              required: true,
              pattern: regex.regularName,
              message: 'Por favor, introduce un apellido válido',
            },
          ]}
        >
          <Input type="text" placeholder="Surname" />
        </Form.Item>
        <Form.Item
          label="Número de teléfono"
          name="phone_number"
          rules={[
            {
              required: true,
              pattern: regex.phone,
              message: 'Por favor, introduce un número de teléfono válido',
            },
          ]}
        >
          <Input type="text" placeholder="TLF" />
        </Form.Item>
        <Form.Item
          label="Dirección"
          name="address"
          rules={[
            {
              required: true,
              pattern: regex.address,
              message: 'Por favor, introduce una dirección',
            },
          ]}
        >
          <Input type="text" placeholder="Dirección" />
        </Form.Item>
        <Form.Item
          label="Ciudad"
          name="city"
          rules={[
            {
              required: true,
              pattern: regex.regularName,
              message: 'Por favor, introduce una ciudad válida',
            },
          ]}
        >
          <Input type="text" placeholder="Ciudad" />
        </Form.Item>
        <Form.Item
          label="Nombre de usuario"
          name="username"
          rules={[
            {
              required: true,
              pattern: regex.username,
              message: 'Por favor, introduce un nombre de usuario',
            },
          ]}
        >
          <Input type="text" placeholder="Usuario" defaultValue={sessionInfoState.sessionInfo.OAuth.user?.name as string} />
        </Form.Item>
        <Form.Item
          label="Fecha de nacimiento"
          name="bornDate"
          rules={[
            {
              required: true,
              message: 'Por favor, introduce una fecha de nacimiento',
            },
          ]}
        >
          <Input type="date" placeholder="fecha_nacimiento" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Register_form;
