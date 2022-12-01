import './style.scss';

import { Pagination, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { Key, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ISelect from '@core/select';
import RightMenu, { IArrayAction } from '@layout/RightMenu';
import CircleLabel from '@shared/components/CircleLabel';
import { DeleteConfirm } from '@shared/components/ConfirmDelete';
import EditIconComponent from '@shared/components/EditIconComponent';
import InformationIconComponent from '@shared/components/InformationIcon';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import SearchComponent from '@shared/components/SearchComponent/SearchComponent';
import SelectAndLabelComponent, {
    ISelectAndLabel,
} from '@shared/components/SelectAndLabelComponent';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useAltaIntl } from '@shared/hook/useTranslate';

import { DownCircleTwoTone } from '@ant-design/icons'
import { IModal } from '../Homepage/interface';
import { routerViewDevice } from './router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@modules';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import { getDevices } from '@modules/device/respository';
import { deviceStore } from '@modules/device/deviceStore';
import { fetchDevicesNew } from '@modules/devicenew/devicenewStore';
import { IconArrow } from '@shared/components/iconsComponent';
import { IconAddDevice } from '@shared/components/iconsComponent';
import { current } from '@reduxjs/toolkit';
import { Select, Input } from 'antd';
import { collection, DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { FirebaseConfig } from 'src/firebase/configs';
import { format } from 'path';
const { Search } = Input;
const { Option, OptGroup } = Select;
const db = FirebaseConfig.getInstance().fbDB
interface TypeDevices {
    id?: string
    deviceID?: string
    deviceName?: string
    deviceIP?: string
    deviceStatus?: boolean
    deviceConnect?: boolean
    services?: string[]
    detail?: string
    update?: string
}

const Device = () => {


    const [listDevice, setListDevice] = useState<TypeDevices[]>([])
    const [result, setResult] = useState<TypeDevices[] | undefined>();
    const { formatMessage } = useAltaIntl();
    const table = useTable();

    const [modal, setModal] = useState<IModal>({
        isVisible: false,
        dataEdit: null,
        isReadOnly: false,
    });
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilterOption] = useState<any>();
    const navigate = useNavigate();
    const idChooses = 'id'; //get your id here. Ex: accountId, userId,...
    const [status, setStatus] = useState<string>('All')
    const [connect, setConnect] = useState<string>('All')
    const dispatch = useAppDispatch();
    const devices: Array<any> | undefined = useAppSelector((state) => state.devicenew.devices);


    useEffect(() => {

        // getDevices().then((deviceSnap) => {
        //     dispatch(deviceStore.actions.fetchDevices({ devices: deviceSnap }));
        // });

        dispatch(fetchDevicesNew())
    }, [dispatch]);



    const onDetail = (id: string) => {
        navigate(`/detaildevice/${id}`)
    }
    const onUpdate = (id: string) => {
        navigate(`/updatedevice/${id}`)
    }
    const columns: ColumnsType = [
        {
            title: 'common.deviceID',
            dataIndex: 'deviceID',
            align: 'left'
        },
        {
            title: 'common.deviceName',
            className: 'column-money',
            dataIndex: 'deviceName',
            align: 'left',
        },
        {
            title: 'common.deviceIP',
            dataIndex: 'deviceIP',
        },
        {
            title: 'common.titleaction',
            dataIndex: 'deviceStatus',
            render: (status: boolean) => (
                <>
                    {status ? <CircleLabel text={formatMessage('common.statusActive')} colorCode="green" /> :
                        <CircleLabel text={formatMessage('common.statusNotActive')} colorCode="red" />
                    }
                </>
            )


            ,
        },
        {
            title: 'common.titlteconnect',
            dataIndex: 'deviceConnect',
            render: (connect: boolean) => (
                <>
                    {connect ? <CircleLabel text={formatMessage('common.onconnect')} colorCode="green" /> :
                        <CircleLabel text={formatMessage('common.stopconnect')} colorCode="red" />
                    }
                </>
            )
        },
        {
            title: 'common.serviceuse',
            dataIndex: 'services',
            render: (texts: string[]) => {


                return (
                    <div className='d-flex' style={{ flexDirection: 'column' }}>
                        {

                            `${texts[0]},...`}
                        <div style={{ textDecoration: 'underline', color: '#4277FF' }}>{formatMessage('common.viewPlus')}</div>
                    </div>
                )
            }

        }, {
            title: 'common.detail',
            dataIndex: 'detail',
            render: (action: any, record: any) => {
                return (
                    <>
                        <a
                            onClick={() => onDetail(record.id)}
                            style={{ textDecoration: "underline", color: "#4277FF", }}
                        >{formatMessage('common.detail')}</a>
                    </>

                )
            }
        },
        {
            title: 'common.update',
            dataIndex: 'update',
            render: (action: any, record: any) => {


                return (
                    <>
                        <a
                            onClick={() => onUpdate(record.id)}
                            style={{ textDecoration: "underline", color: "#4277FF", }}
                        >{formatMessage('common.update')}</a>
                    </>

                )
            }
        }
    ];


    const linkAddDevice = () => {
        navigate('/AddDevice');
    }


    const onSearch = (value: string) => {
        setSearch(value)
    }

    const handleChangeStatus = (value: string) => {
        setStatus(value)
        // setResult(foundItems)
    }
    const handleChangeConnect = (value: string) => {
        setConnect(value)
    }
    const resolve = (search: string, status: string, connect: string) => {
        return devices?.filter((item) => {

            if (status === 'All') {

                if (connect === 'All') {
                    return item.deviceName.toLowerCase()?.includes(search.toLocaleLowerCase())
                }
                if (connect === 'connect') {
                    return item.deviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.deviceConnect === true
                }
                if (connect === 'notConnect') {
                    return item.deviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.deviceConnect === false
                }
            }
            if (status === 'active') {
                if (connect === 'All') {
                    return item.deviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.deviceStatus === true
                }
                if (connect === 'connect') {
                    return item.deviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.deviceStatus === true && item.deviceConnect === true
                }
                if (connect === 'notConnect') {
                    return item.deviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.deviceStatus === true && item.deviceConnect === false
                }
            }
            if (status === 'notActive') {
                if (connect === 'All') {
                    return item.deviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.deviceStatus === false
                }
                if (connect === 'connect') {
                    return item.deviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.deviceStatus === false && item.deviceConnect === true
                }
                if (connect === 'notConnect') {
                    return item.deviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.deviceStatus === false && item.deviceConnect === false
                }
            }
        })
    }


    const [current, setCurrent] = useState(1)
    //pagination 
    const pageSize = 10
    const getData = (current: any, pageSize: any) => {

        if (resolve(search, status, connect) && resolve(search, status, connect).length > 0) {
            return resolve(search, status, connect)?.slice((current - 1) * pageSize, current * pageSize)
        }
        // else {
        //     return devices?.slice((current - 1) * pageSize, current * pageSize)
        // }

    }

    return (
        <div className="device">
            <MainTitleComponent breadcrumbs={routerViewDevice} />
            <div className="main-card" style={{ background: 'none', marginTop: 50, padding: 0 }}>

                <div className="d-flex flex-row justify-content-md-between mb-3 align-items-end">
                    <div className="d-flex flex-row " style={{ gap: 10 }}>
                        {/* {arraySelectFilter.map(item => {
                            return (
                                <SelectAndLabelComponent
                                    onChange={onChangeSelectStatus(item.name)}
                                    key={item.name}
                                    className="margin-select"
                                    dataString={item.dataString || dataStringConnect}
                                    textLabel={item.textLabel}

                                />
                            )
                        }
                        )} */}
                        <div className='sortt'>
                            <label>{formatMessage('common.titleaction')}</label>
                            <Select defaultValue={formatMessage('common.all')} style={{ width: 200 }} className="margin-select" onChange={handleChangeStatus}>
                                <Option value="All">{formatMessage('common.all')}</Option>
                                <Option value="active">{formatMessage('common.onaction')}</Option>
                                <Option value="notActive">{formatMessage('common.stopaction')}</Option>
                            </Select>
                        </div>

                        <div className='sortt'>
                            <label>{formatMessage('common.titlteconnect')}</label>
                            <Select defaultValue={formatMessage('common.all')} style={{ width: 200 }} className="margin-select" onChange={handleChangeConnect}>
                                <Option value="All">{formatMessage('common.all')}</Option>
                                <Option value="connect">{formatMessage('common.onconnect')}</Option>
                                <Option value="notConnect">{formatMessage('common.stopconnect')}</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="d-flex flex-column ">
                        <div className="label-select">{formatMessage('common.keyword')}</div>
                        {/* <SearchComponent
                            onSearch={handleSearch}
                            placeholder={'common.keyword'}
                            classNames="mb-0 search-table"
                        /> */}
                        <Search placeholder="input search text" onSearch={onSearch} />
                    </div>
                </div>
                <div className='d-flex' >
                    <div>

                        <TableComponent
                            // apiServices={}
                            defaultOption={filter}
                            translateFirstKey="homepage"
                            rowKey={res => res[idChooses]}
                            register={table}
                            columns={columns}
                            // onRowSelect={setSelectedRowKeys}
                            dataSource={getData(current, pageSize)}

                            bordered
                            disableFirstCallApi={true}
                            pagination={false}
                        />
                        <Pagination
                            total={devices?.length}
                            current={current}
                            onChange={setCurrent}
                            pageSize={pageSize}
                        />
                    </div>
                    <div className='btn_add_device' onClick={linkAddDevice}>

                        <IconAddDevice />
                        {formatMessage('common.adddevice')}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Device;
