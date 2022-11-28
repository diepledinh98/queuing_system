import React from 'react'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { routerViewDetailDevice } from './router'
import { Avatar, Col, Row, Input, Select } from 'antd';
import './detail_device.scss'
import { useParams } from 'react-router';
import { useAppSelector } from '@shared/hook/reduxhook';
import { Link } from 'react-router-dom';
const DetailDevice = () => {
    const { id } = useParams()

    const devices: Array<any> | undefined = useAppSelector((state) => {
        return state.devicenew.devices;
    });
    const device = devices?.find((value) => value.id == id);


    return (
        <div className='detail__device_page'>
            <MainTitleComponent breadcrumbs={routerViewDetailDevice} />
            <div className="detail__device">
                <div className="title__detail__device">
                    Quản lý thiết bị
                </div>
                <div className='d-flex'>

                    <div className="content__detail__device">
                        <div className="title_info__device">
                            Thông tin thiết bị
                        </div>
                        <div >
                            <Row justify="start" style={{ marginLeft: 24, marginTop: 20 }}>
                                <Col span={12}>
                                    <Row>
                                        <Col flex="130px" className="text__info_name">Mã thiết bị:</Col>
                                        <Col flex="auto" className="text__info">{device.deviceID}</Col>
                                    </Row>
                                </Col>

                                <Col span={12}>
                                    <Row>
                                        <Col flex="130px" className="text__info_name">Loại thiết bị:</Col>
                                        <Col flex="auto" className="text__info">{device.deviceName}</Col>
                                    </Row>
                                </Col>

                            </Row>
                            <Row justify="start" style={{ marginLeft: 24, marginTop: 20 }}>
                                <Col span={12}>
                                    <Row>
                                        <Col flex="130px" className="text__info_name">Tên thiết bị:</Col>
                                        <Col flex="auto" className="text__info">{device.deviceName}</Col>
                                    </Row>
                                </Col>

                                <Col span={12}>
                                    <Row>
                                        <Col flex="130px" className="text__info_name">Tên đăng nhập:</Col>
                                        <Col flex="auto" className="text__info">{device.username}</Col>
                                    </Row>
                                </Col>

                            </Row>
                            <Row justify="start" style={{ marginLeft: 24, marginTop: 20 }}>
                                <Col span={12}>
                                    <Row>
                                        <Col flex="130px" className="text__info_name">Địa chỉ IP:</Col>
                                        <Col flex="auto" className="text__info">{device.deviceIP}</Col>
                                    </Row>
                                </Col>

                                <Col span={12}>
                                    <Row>
                                        <Col flex="130px" className="text__info_name">Mật khẩu:</Col>
                                        <Col flex="auto" className="text__info">{device.password}</Col>
                                    </Row>
                                </Col>

                            </Row>

                            <Row>
                                <div className="list_service text__info_name" style={{ marginLeft: 24, marginTop: 20 }}>Dịch vụ sử dụng:</div>
                                <Col span={24} style={{
                                    display: 'flex', fontSize: 16,
                                    fontWeight: 400,
                                    color: '#535261',
                                    marginLeft: 24
                                }}>
                                    {device?.services?.map((service, index) => {


                                        return (
                                            <div
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: 400,
                                                    color: '#535261',
                                                    display: 'flex'
                                                }}

                                            >{`${service}, `}</div>
                                        )
                                    })}
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <Link to={`/updatedevice/${device.id}`} className="update__device" >

                        Cập nhật thiết bị
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default DetailDevice