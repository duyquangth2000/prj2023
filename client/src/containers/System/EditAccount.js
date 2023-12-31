import React, { useState } from "react";
import { InputReadOnly, InputFormV2, Button } from "../../components";
import anonAvatar from "../../assets/anon-avatar.png";
import { useSelector } from "react-redux";
import { apiUploadImages, apiUpdateUser } from "../../services";

const EditAccount = () => {
  const {currentData} = useSelector(state => state.user)
    const [payload, setPayload] = useState({
        name: currentData?.name || '',
        avatar: currentData?.avatar || '',
        fbUrl: currentData?.fbUrl || '',
        zalo: currentData?.zalo || ''
    })
    const handleSubmit = async () => {
        const response = await apiUpdateUser(payload)
    }
    const handleUploadFile = async (e) => {
        const image = e.target.files[0]
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_present', process.env.REACT_APP_UPLOAD_ASSETS_NAME)
        const response = await apiUploadImages(formData)
        if (response.status === 200){
            setPayload(prev => ({
                ...prev,
                avartar: response?.data.secure_url
            }))
        }
    }
    console.log(payload)
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl w-full text-start font-medium py-4 h-[69px] flex-none border-b border-gray-200">
        Chỉnh sửa thông tin cá nhân
      </h1>
      <div className="w-3/5 flex items-center justify-center flex-auto">
        <div className="py-6 flex flex-col gap-4 w-full">
          <InputReadOnly value={`#${currentData?.id?.match(/\d/g).join('')?.slice(0, 6)}`} direction="flex-rol" label="Mã thành viên" />
          <InputReadOnly value={currentData?.phone} editPhone direction="flex-rol" label="Số điện thoại" />
          <InputFormV2
            name='name'
            setValue={setPayload}
            direction="flex-row"
            value={payload.name}
            label="Tên hiển thị"
          />
          <InputFormV2
            name='zalo'
            setValue={setPayload}
            direction="flex-row"
            value={payload.zalo}
            label="Zalo"
          />
          <InputFormV2
            name='fbUrl'
            setValue={setPayload}
            direction="flex-row"
            value={payload.fbUrl}
            label="Facebook"
          />
          <div className="flex">
            <label className="w-48 flex-none" htmlFor="password">Mật khẩu</label>
            <label className="flex-auto text-blue-500 cursor-pointer">
              Đổi mật khẩu
            </label>
          </div>
          <div className="flex mb-6">
            <label className="w-48 flex-none" htmlFor="avatar">
              Ảnh đại diện
            </label>
            <div>
            <img
              src={payload.avatar || anonAvatar}
              alt="avatar"
              className="w-28 h-28 rounded-full object-cover"
            />

            <input onChange={handleUploadFile} type="file" className="appearance-none my-4" id="avatar"></input>
            </div>
          </div>
          <Button
            text="Cập nhật"
            bgColor="bg-blue-600"
            textColor="text-white"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
