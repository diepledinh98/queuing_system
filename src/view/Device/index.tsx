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


import { IModal } from '../Homepage/interface';
import { routerViewDevice } from './router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@modules';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import { getDevices } from '@modules/device/respository';
import { deviceStore } from '@modules/device/deviceStore';
import { current } from '@reduxjs/toolkit';
const dataTable = require('./datadevice.json');
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

    const dispatch = useAppDispatch();
    const devices: Array<any> | undefined = useAppSelector((state) => state.device.devices);
    useEffect(() => {

        getDevices().then((deviceSnap) => {
            dispatch(deviceStore.actions.fetchDevices({ devices: deviceSnap }));
        });


    }, []);

    const onDetail = (id: string) => {
        navigate(`/detaildevice/${id}`)
    }
    const onUpdate = (id: string) => {
        navigate(`/updatedevice/${id}`)
    }
    const columns: ColumnsType = [
        {
            title: 'Mã thiết bị',
            dataIndex: 'deviceID',
            align: 'left'
        },
        {
            title: 'Tên thiết bị',
            className: 'column-money',
            dataIndex: 'deviceName',
            align: 'left',
        },
        {
            title: 'Địa chỉ IP',
            dataIndex: 'deviceIP',
        },
        {
            title: 'Trạng thái hoạt động',
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
            title: 'Trạng thái kết nối',
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
            title: 'Dịch vụ sử dụng',
            dataIndex: 'services',
            render: (texts: string[]) => {

                return (
                    <div className='d-flex' style={{ flexDirection: 'column' }}>
                        {

                            `${texts[0]},...`}
                        <div style={{ textDecoration: 'underline', color: '#4277FF' }}>Xem Thêm</div>
                    </div>
                )
            }

        }, {
            title: 'Chi tiết',
            dataIndex: 'detail',
            render: (action: any, record: any) => {


                return (
                    <>
                        <a
                            onClick={() => onDetail(record.id)}
                            style={{ textDecoration: "underline", color: "#4277FF", }}
                        >Chi tiết</a>
                    </>

                )
            }
        },
        {
            title: 'Cập nhật',
            dataIndex: 'update',
            render: (action: any, record: any) => {


                return (
                    <>
                        <a
                            onClick={() => onUpdate(record.id)}
                            style={{ textDecoration: "underline", color: "#4277FF", }}
                        >Cập nhật</a>
                    </>

                )
            }
        }
    ];


    const linkAddDevice = () => {
        navigate('/AddDevice');
    }

    const handleRefresh = () => {
        table.fetchData({ option: { search: search, filter: { ...filter } } });
        setSelectedRowKeys([]);
    };


    const dataString: ISelect[] = [{ label: 'common.all', value: undefined }, { label: 'common.onaction', value: undefined }, { label: 'common.stopaction', value: undefined }];
    const dataStringConnect: ISelect[] = [{ label: 'common.all', value: undefined }, { label: 'common.onconnect', value: undefined }, { label: 'common.stopconnect', value: undefined }];
    const arraySelectFilter: ISelectAndLabel[] = [
        { textLabel: 'Trạng thái hoạt động', dataString },
        { textLabel: 'Trạng thái kết nối', dataStringConnect },
    ];

    useEffect(() => {


    }, [search, filter, table]);

    const handleSearch = (searchKey: string) => {
        setSearch(searchKey);
        const foundItems = devices?.filter((item) => {
            return item.deviceName.toLowerCase()?.includes(search)
        })

        setResult(foundItems)

    };

    const onChangeSelectStatus = (name: string | undefined) => (status: any) => {
        if (name && status) {
            setFilterOption((pre: any) => ({ ...pre, [name]: status }));
        }
        console.log(name);

    };
    const [current, setCurrent] = useState(1)
    //pagination 
    const pageSize = 10
    const getData = (current: any, pageSize: any) => {
        if (result && result.length > 0) {
            return result?.slice((current - 1) * pageSize, current * pageSize)
        }
        else {
            return devices?.slice((current - 1) * pageSize, current * pageSize)
        }

    }

    return (
        <div className="device">
            <MainTitleComponent breadcrumbs={routerViewDevice} />
            <div className="main-card" style={{ background: 'none', marginTop: 50 }}>

                <div className="d-flex flex-row justify-content-md-between mb-3 align-items-end">
                    <div className="d-flex flex-row " style={{ gap: 10 }}>
                        {arraySelectFilter.map(item => {
                            console.log(item.name);

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
                        )}
                    </div>
                    <div className="d-flex flex-column ">
                        <div className="label-select">{formatMessage('common.keyword')}</div>
                        <SearchComponent
                            onSearch={handleSearch}
                            placeholder={'common.keyword'}
                            classNames="mb-0 search-table"
                        />
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
                        Thêm thiet bi
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Device;
