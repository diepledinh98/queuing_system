import React, { useEffect } from 'react'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { routerViewUpdateDevice } from './router'
import { Avatar, Col, Row, Input, Select } from 'antd';
import './update_device.scss'
import { useParams } from 'react-router';
import { useState } from 'react';
import { useAppSelector } from '@shared/hook/reduxhook';
import { async } from '@firebase/util';
import { FirebaseConfig } from 'src/firebase/configs';
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router';
const UpdateDevice = () => {
    const db = FirebaseConfig.getInstance().fbDB
    const idd = useParams()
    let id: any = idd.id
    const devices: Array<any> | undefined = useAppSelector((state) => {
        return state.device.devices;
    });
    const navigate = useNavigate();

    const device = devices?.find((value) => value.id == id);
    const OPTIONS = ['Khám tim mạch', 'Khám sản - Phụ khoa', 'Khám răng hàm mặt', 'Khám tai mũi họng', 'Khám hô hấp', 'Khám tổng quát'];
    const [selectedItems, setSelectedItems] = useState<string[]>(device.services);
    const [deviceId, setDeviceId] = useState(device.deviceID)
    const [deviceName, setDeviceName] = useState(device.deviceName)
    const [catedevice, setCatedevice] = useState('')
    const [deviceIP, setDeviceIP] = useState(device.deviceIP)
    const [username, setUsername] = useState(device.username)
    const [password, setPassword] = useState(device.password)
    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));

    // useEffect(() => {
    //     setSelectedItems(device.services)
    //     setDeviceName(device.deviceName)
    // }, [])
    const HandleCancel = () => {
        navigate('/device')
    }
    const HandleUpdate = async () => {
        const deviceNeedUpdate = doc(db, "devices", id);
        const dataUpdate = {
            deviceIP: deviceIP,
            deviceName: deviceName,
            deviceID: deviceId,
            deviceStatus: true,
            deviceConnect: true,
            username: username,
            password: password,
            detail: 'chi tiết',
            update: 'cập nhật',
            services: selectedItems
        }
        await updateDoc(deviceNeedUpdate, dataUpdate)
        navigate('/device')
    }

    return (
        <div className='update__device_page'>
            <MainTitleComponent breadcrumbs={routerViewUpdateDevice} />
            <div className="add_device">
                <div className="title__add">
                    Quản lý thiết bị
                </div>
                <div className="content__add">
                    <div className="sub__title__add">
                        Thông tin thiết bị
                    </div>
                    <div className="body__add">
                        <Row>
                            <Col span={12}>
                                <p className="name__add">Mã thiết bị <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhâp mã thiết bị" defaultValue={device.deviceID} onChange={(event) => setDeviceId(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">Loại thiết bị <span style={{ color: 'red' }}>*</span></p>
                                <select className="add__input" placeholder="Chọn thiết bị" defaultValue={device.setDeviceName} onChange={(event) => setDeviceName(event.target.value)}>
                                    <option value="kio01">KIO_01</option>

                                </select>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">Tên thiết bị <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập tên thiết bị" defaultValue={device?.deviceName} onChange={(event) => setDeviceName(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">Tên đăng nhập <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập tài khoản" defaultValue={device?.username} onChange={(event) => setUsername(event.target.value)} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">Địa chỉ IP <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập địa chỉ IP" defaultValue={device?.deviceIP} onChange={(event) => setDeviceIP(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">Mật khẩu <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập mật khẩu" defaultValue={device?.password} onChange={(event) => setPassword(event.target.value)} />
                            </Col>
                        </Row>

                        <Row style={{ marginTop: 16 }}>
                            <p className="name__add">Dịch vụ sử dụng <span style={{ color: 'red' }}>*</span></p>
                            <Select
                                className="add__service"
                                mode="multiple"
                                placeholder="Nhập dịch vụ sử dụng"
                                onChange={setSelectedItems}
                                defaultValue={selectedItems}
                                options={filteredOptions.map(item => ({
                                    value: item,
                                    label: item,
                                }))}
                            />
                        </Row>
                    </div>
                </div>
                <div className="action__add">
                    <div className="btn__add btn_cancel" onClick={HandleCancel}>
                        Hủy bỏ
                    </div>
                    <div className="btn__add btn__add_device" onClick={HandleUpdate}>
                        Cập nhật
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateDevice