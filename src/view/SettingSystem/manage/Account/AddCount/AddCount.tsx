import React, { useState } from 'react'
import { routerAddAccount } from './router'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { Col, Row, Input, Select } from 'antd';
import './addcount.scss'
import { addDoc, collection } from "firebase/firestore";
import { FirebaseConfig } from 'src/firebase/configs';
import { async } from '@firebase/util';
import { useNavigate } from 'react-router';
const { Option } = Select;
const db = FirebaseConfig.getInstance().fbDB
const AddAccount = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [eamil, setEmail] = useState('')
    const [againPassword, setAgainPassword] = useState('')
    const [role, setRole] = useState('')
    const [status, setStatus] = useState('')

    const handleChange = (value: string) => {
        setRole(value)
    };

    const handleChangeStatus = (value: string) => {
        setStatus(value)
    }

    const handleAddAccount = async () => {
        try {
            const docRef = await addDoc(collection(db, 'users'), {
                email: eamil,
                image: 'https://cdn.pixabay.com/photo/2013/05/11/20/44/spring-flowers-110671_960_720.jpg',
                name: 'customer',
                password: password,
                phone: phone,
                role: role,
                status: status,
                username: username
            })

            navigate('/setting/manage/account')
        }
        catch (e) {
            console.log(e);

        }
    }

    const handleCancel = () => {
        navigate('/setting/manage/account')
    }
    return (
        <div className='add__device_page'>
            <MainTitleComponent breadcrumbs={routerAddAccount} />
            <div className="add_device">
                <div className="title__add">
                    Quản lý tài khoản
                </div>
                <div className="content__add">
                    <div className="sub__title__add">
                        Thông tin tài khoản
                    </div>
                    <div className="body__add">
                        <Row>
                            <Col span={12}>
                                <p className="name__add">Họ tên<span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập họ tên " onChange={(event) => setUsername(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">Tên đăng nhập <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập tên đăng nhập" onChange={(event) => setEmail(event.target.value)} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">Số điện thoại<span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập số điện thoại" onChange={(event) => setPhone(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">Mật khẩu <span style={{ color: 'red' }}>*</span></p>
                                <Input.Password className='add__input' placeholder="Nhập mật khẩu" onChange={(event) => setPassword(event.target.value)} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">Email <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập email" onChange={(event) => setEmail(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">Nhập lại mật khẩu <span style={{ color: 'red' }}>*</span></p>
                                <Input.Password className='add__input' placeholder="Nhập lại mật khẩu" onChange={(event) => setAgainPassword(event.target.value)} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">Vai trò <span style={{ color: 'red' }} >*</span></p>
                                <Select defaultValue="Chọn vai trò" onChange={handleChange}>
                                    <Option value='Kế toán'>Kế toán</Option>
                                    <Option value='Quản lý'>Quản lý</Option>
                                    <Option value='Admin'>Admin</Option>
                                </Select>
                            </Col>
                            <Col span={12}>
                                <p className="name__add">Tình Trạng <span style={{ color: 'red' }}>*</span></p>
                                <Select defaultValue="Chọn tình trạng" onChange={handleChangeStatus}>
                                    <Option value={false}>Ngưng hoạt động</Option>
                                    <Option value={true}>Hoạt động</Option>
                                </Select>
                            </Col>
                        </Row>

                    </div>
                </div>
                <div className="action__add">
                    <div className="btn__add btn_cancel" onClick={handleCancel}>
                        Hủy bỏ
                    </div>
                    <div className="btn__add btn__add_device" onClick={handleAddAccount}>
                        Thêm
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAccount