import React, { useEffect } from 'react'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { routerViewUpdateDevice } from './router'
import { Avatar, Col, Row, Input, Select } from 'antd';
import './update_device.scss'
import { useParams } from 'react-router';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@shared/hook/reduxhook';
import { async } from '@firebase/util';
import { FirebaseConfig } from 'src/firebase/configs';
import { doc, updateDoc } from "firebase/firestore";
import { updateDevice } from '@modules/devicenew/devicenewStore';
import { useNavigate } from 'react-router';
import { createHistorys } from '@modules/history/historyStore';
import { onAuthStateChanged } from 'firebase/auth'
interface deviceProps {
    id?: string
    deviceID: string;
    deviceName: string;
    deviceIP: string;
    deviceStatus: boolean
    deviceConnect: boolean
    services: string[]
    detail: string
    update: string
    username: string
    password: string
};
interface historyProps {
    id?: string
    username: string
    time: string
    IP: string
    action: string
}
interface AuthUser {
    email: string,
}
const UpdateDevice = () => {
    const db = FirebaseConfig.getInstance().fbDB
    const auth = FirebaseConfig.getInstance().auth
    const idd = useParams()
    let id: any = idd.id
    const devices: Array<any> | undefined = useAppSelector((state) => {
        return state.devicenew.devices;
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
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
    const [usercurrent, setUsercurrent] = useState<AuthUser | any>(null)

    var presentDate = new Date();
    var date = presentDate.getDate()
    var month = presentDate.getMonth()
    var year = presentDate.getFullYear()
    var hour = presentDate.getHours()
    var minutes = presentDate.getMinutes()
    var seconds = presentDate.getSeconds()
    var time = ` ${date}/${month}/${year} ${hour}:${minutes}:${seconds}`
    useEffect(() => {
        onAuthStateChanged(auth, (curr: any) => {
            setUsercurrent(curr)
        })
    }, [])
    const HandleCancel = () => {
        navigate('/device')
    }
    const HandleUpdate = async () => {

        const idDevice = id
        const body: deviceProps = {
            deviceIP: deviceIP,
            deviceName: deviceName,
            deviceID: deviceId,
            deviceStatus: true,
            deviceConnect: true,
            detail: 'chi tiết',
            update: 'cập nhật',
            services: selectedItems,
            username: username,
            password: password
        }
        const bodyHistory: historyProps = {
            username: usercurrent?.email,
            time: time,
            IP: '192.168.1.10',
            action: `Cập nhật thông tin thiết bị ${deviceName} `
        }
        dispatch(createHistorys(bodyHistory))
        dispatch(updateDevice({ idDevice, body }))
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