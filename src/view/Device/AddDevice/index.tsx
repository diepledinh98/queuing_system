import React, { useEffect } from 'react'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { routerViewAddDevice } from './router'
import { Avatar, Col, Row, Input, Select } from 'antd';
import { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { FirebaseConfig } from 'src/firebase/configs';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '@shared/hook/reduxhook';
import './add_device.scss'
import { createHistorys } from '@modules/history/historyStore';
import { onAuthStateChanged } from 'firebase/auth'
import { createDevice } from '@modules/devicenew/devicenewStore';
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
const AddDevice = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const controller = new AbortController()
    const signal = controller.signal
    const auth = FirebaseConfig.getInstance().auth
    const db = FirebaseConfig.getInstance().fbDB
    const OPTIONS = ['Khám tim mạch', 'Khám sản - Phụ khoa', 'Khám răng hàm mặt', 'Khám tai mũi họng', 'Khám hô hấp', 'Khám tổng quát'];
    const [deviceId, setDeviceId] = useState('')
    const [deviceName, setDeviceName] = useState('')
    const [catedevice, setCatedevice] = useState('')
    const [deviceIP, setDeviceIP] = useState('')
    const [deviceusername, setDeviceusername] = useState('')
    const [devicepassword, setDevicepassword] = useState('')
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
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
    })
    const addDevice = async () => {


        const body: deviceProps = {
            deviceIP: deviceIP,
            deviceName: deviceName,
            deviceID: deviceId,
            deviceStatus: true,
            deviceConnect: true,
            detail: 'chi tiết',
            update: 'cập nhật',
            services: selectedItems,
            username: deviceusername,
            password: devicepassword
        }
        const bodyHistory: historyProps = {
            username: usercurrent?.email,
            time: time,
            IP: '192.168.1.10',
            action: `Thêm thông tin thiết bị ${deviceName} `
        }
        dispatch(createHistorys(bodyHistory))
        dispatch(createDevice(body))


        navigate('/device')
    }

    return (
        <div className='add__device_page'>
            <MainTitleComponent breadcrumbs={routerViewAddDevice} />
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
                                <Input className='add__input' placeholder="Nhâp mã thiết bị" onChange={(event) => setDeviceId(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">Loại thiết bị <span style={{ color: 'red' }}>*</span></p>
                                <select className="add__input" placeholder="Chọn thiết bị">
                                    <option>Kiosk</option>

                                </select>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">Tên thiết bị <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập tên thiết bị" onChange={(event) => setDeviceName(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">Tên đăng nhập <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập tài khoản" onChange={(event) => setDeviceusername(event.target.value)} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">Địa chỉ IP <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập địa chỉ IP" onChange={(event) => setDeviceIP(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">Mật khẩu <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập mật khẩu" onChange={(event) => setDevicepassword(event.target.value)} />
                            </Col>
                        </Row>

                        <Row style={{ marginTop: 16 }}>
                            <p className="name__add">Dịch vụ sử dụng <span style={{ color: 'red' }}>*</span></p>
                            <Select
                                className="add__service"
                                mode="multiple"
                                placeholder="Nhập dịch vụ sử dụng"
                                value={selectedItems}
                                onChange={setSelectedItems}
                                options={filteredOptions.map(item => ({
                                    value: item,
                                    label: item,
                                }))}
                            />
                        </Row>
                    </div>
                </div>
                <div className="action__add">
                    <div className="btn__add btn_cancel">
                        Hủy bỏ
                    </div>
                    <div className="btn__add btn__add_device" onClick={addDevice}>
                        Thêm thiết bị
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDevice