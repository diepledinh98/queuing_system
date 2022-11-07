import React from 'react'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { routerViewUpdateDevice } from './router'
import { Avatar, Col, Row, Input, Select } from 'antd';
import './update_device.scss'
const UpdateDevice = () => {
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
                                <Input className='add__input' placeholder="Nhâp mã thiết bị" />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">Loại thiết bị <span style={{ color: 'red' }}>*</span></p>
                                <select className="add__input" placeholder="Chọn thiết bị">
                                    <option>KIO_01</option>
                                    <option>KIO_02</option>
                                    <option>KIO_03</option>
                                </select>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">Tên thiết bị <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập tên thiết bị" />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">Tên đăng nhập <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập tài khoản" />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">Địa chỉ IP <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập địa chỉ IP" />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">Mật khẩu <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập mật khẩu" />
                            </Col>
                        </Row>

                        <Row style={{ marginTop: 16 }}>
                            <p className="name__add">Dịch vụ sử dụng <span style={{ color: 'red' }}>*</span></p>
                            <Select
                                className="add__service"
                                mode="multiple"
                                placeholder="Nhập dịch vụ sử dụng"


                            // options={filteredOptions.map(item => ({
                            //     value: item,
                            //     label: item,
                            // }))}
                            />
                        </Row>
                    </div>
                </div>
                <div className="action__add">
                    <div className="btn__add btn_cancel">
                        Hủy bỏ
                    </div>
                    <div className="btn__add btn__add_device">
                        Cập nhật
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateDevice