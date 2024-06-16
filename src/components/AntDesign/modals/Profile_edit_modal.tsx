import React, { useState } from "react";
import { Alert, Button, Modal, Form, Input, DatePicker, Checkbox, Select } from "antd";
import type { sessionInfoState, Teacher, Client, Student } from "@/models/types";
import { FaPencilAlt } from 'react-icons/fa';
import putClient from "@/services/client/fetching/hooks/putClient";
import putTeacher from "@/services/client/fetching/hooks/putTeacher";
import putStudent from "@/services/client/fetching/hooks/putStudent";
import imageBase64 from "@/services/client/logic/imageBase64";
import dayjs from 'dayjs';
import {deleteCookieLoacalStorage} from "@/services/client/utils/utils_typed";
import Refresh from "@/services/client/logic/Refresh";
import postCheckProfilePhoto from "@/services/client/fetching/hooks/postCheckProfilePhoto.tsx";
import { ConfigProvider } from 'antd';

const { Option } = Select;

import "@/styles/styles.css";

interface DocentPostModalProps {
  sessionInfoState: sessionInfoState;
}

const Profile_edit_modal: React.FC<DocentPostModalProps> = ({
  sessionInfoState,
}) => {
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [file, setFile] = useState<File>();
  const [profilePhotoSrc, setProfilePhotoSrc] 
  = useState(window && (window.localStorage.getItem("profilePhotoSrc") || sessionInfoState.sessionInfo.OAuth.user.image || "") || "");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function updateProfile(values: any, sessionInfoState: sessionInfoState, setError: React.Dispatch<React.SetStateAction<boolean>>, setLoadingUpload: React.Dispatch<React.SetStateAction<boolean>>) {
    //  postFaceCheck(values.image);
    switch (sessionInfoState.sessionInfo.role) {
      //post actua como put también en mi api
      case "Teachers":
        putTeacher(values).then((response) => { if (response.status !== 201) throw new Error(response.statusText); setLoadingUpload(false); deleteCookieLoacalStorage(); window.location.reload();})
          .catch((err) => { setError(true); });
        break;
      case "Students":
        putStudent(values).then((response) => { if (response.status !== 201) throw new Error(response.statusText); setLoadingUpload(false); deleteCookieLoacalStorage(); window.location.reload();})
          .catch((err) => { setError(true); });
        break;
      case "Clients":
        putClient(values).then((response) => { if (response.status !== 201) throw new Error(response.statusText); setLoadingUpload(false); deleteCookieLoacalStorage(); window.location.reload();})
          .catch((err) => { setError(true); });
        break;
      default:
        setError(true);
        break;
    }
    setLoadingUpload(false);
  }

  const onFinish = async (values: any) => {
    setError(false);
    setLoadingUpload(true);
    values = form.getFieldsValue();
    console.log("Received values of form: ", values);
    file && (values.image = file);
    values.id = sessionInfoState.sessionInfo.profile?.id;
    handleOk();
    values.image = await imageBase64(values.image) as string;
    const validPhoto = values.image && await postCheckProfilePhoto(file);
    if(validPhoto){
      updateProfile(values, sessionInfoState, setError, setLoadingUpload);
    } else if(!values.image){
      updateProfile(values, sessionInfoState, setError, setLoadingUpload);
    } else {
      setError(true);
      setLoadingUpload(false);
    }
  };

  return (
    <>
          <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ff69d4',
            borderRadius: 5,
            colorBgElevated: '#fff1fa',
            colorLinkHover: '#ff69d4',
            colorLinkActive: '#ff69d4',
          },
        }}
      >
      {loadingUpload && <Alert className="text-center" message="Cargando edición de perfil..." type="info" showIcon />}
      {error && <Alert className="text-center" message="Hubo un error editando el perfil" type="error" showIcon />}
      <Button type="primary" onClick={showModal}>
        Editar mi usuario
      </Button>
      <Modal
        footer={null}
        title="Perfiles"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form className="relative" form={form} onFinish={onFinish}>
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
              }}
            />
            <img
              id="profileThumb_edit"
              className="section-div-profilePhoto m-auto my-4 object-cover"
              src={profilePhotoSrc as string}
              alt=""
            />
            <div
              className="flex items-center justify-center bg-white border-2 h-12 w-12 border-gray-300 rounded-full hover:bg-gray-200 cursor-pointer absolute top-24 right-72"
              onClick={() => document.getElementById('fileUpload').click()}
            >
              <FaPencilAlt size={20} />
            </div>
          </Form.Item>
          <Form.Item className="pt-10" label="Nombre" name="name">
            <Input defaultValue={sessionInfoState.sessionInfo.profile?.name} />
          </Form.Item>
          <Form.Item label="Apellido" name="surname">
            <Input defaultValue={sessionInfoState.sessionInfo.profile?.surname} />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input defaultValue={sessionInfoState.sessionInfo.profile?.email} />
          </Form.Item>
          <Form.Item label="Número de teléfono" name="phone_number">
            <Input defaultValue={sessionInfoState.sessionInfo.profile?.phone_number} />
          </Form.Item>
          <Form.Item label="Dirección" name="address">
            <Input defaultValue={sessionInfoState.sessionInfo.profile?.address} />
          </Form.Item>
          <Form.Item label="Ciudad" name="city">
            <Input defaultValue={sessionInfoState.sessionInfo.profile?.city} />
          </Form.Item>
          <Form.Item label="Fecha de nacimiento" name="bornDate">
            <DatePicker defaultValue={dayjs(sessionInfoState.sessionInfo.profile?.bornDate)} />
          </Form.Item>
          <Form.Item label="Nombre de usuario" name="username">
            <Input defaultValue={sessionInfoState.sessionInfo.profile?.username} />
          </Form.Item>
          <Form.Item label="Activo" name="active">
            <Checkbox defaultChecked={sessionInfoState.sessionInfo.profile?.active} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
            <Button type="default" htmlType="button" onClick={handleCancel}>
              Cancelar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      </ConfigProvider>
      
    </>
  );
};

export default Profile_edit_modal;


