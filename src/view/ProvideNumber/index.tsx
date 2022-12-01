import './style.scss';

import { Space, DatePicker } from 'antd';
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
import { routerViewProvideNumber } from './router';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import { provideNumberStore } from '@modules/providenumber/numberStore';
import { getProvideNumber } from '@modules/providenumber/respository';
import { Item } from '@antv/g6-core';
import { fetchProvideNumber } from '@modules/providenumber/numberStore';
import type { DatePickerProps } from 'antd';
type serviceProps = {
    id?: string
    serviceID: string;
    serviceName: string;
    serviceStatus: boolean
    Growauto?: number[]
    Prefix?: string
    Surfix?: string
    Reset?: boolean
};

type accountStore = {
    id?: string
    name: string
    image: string
    eamil: string
    phone: string
    role: string
    status: boolean
    username: string
    password: string
};
type provideNumberProps = {
    id?: string
    dateduse: string
    linkServiceId: string
    stt: number
    timeprovide: string
    status: string
    service: serviceProps
    customer: accountStore
};


let data: provideNumberProps[] | any;
const ProvideNumber = () => {
    const { formatMessage } = useAltaIntl();
    const table = useTable();

    const idChooses = 'id';
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilterOption] = useState<any>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const listProvideNumber = useAppSelector((state) => state.providenumber.Number)
    const providedNumber = useAppSelector((state) => state.providenumber.providedNumber)
    data = listProvideNumber?.map((item, index) => {


        return {
            id: item?.id,
            number: item?.stt,
            customerName: item.customer.username,
            serviceName: item.service.serviceName,
            GrantTime: item?.timeprovide,
            expiry: item?.dateduse,
            status: item?.status,
            powerSupply: 'Kiosk'
        }
    })

    const onChangeStart: DatePickerProps['onChange'] = (date, dateString) => {
        alert(`${date}, ${dateString}`);

    }
    useEffect(() => {
        dispatch(fetchProvideNumber())
    }, [dispatch]);

    const onDetail = (id: string) => {
        navigate(`/detailnumber/${id}`)
    }
    const columns: ColumnsType = [
        {
            title: 'STT',
            dataIndex: 'number',
            align: 'left'
        },
        {
            title: 'Tên khách hàng',
            className: 'column-money',
            dataIndex: 'customerName',
        },
        {
            title: 'Tên dịch vụ',
            className: 'column-money',
            dataIndex: 'serviceName',
            align: 'left',
        },
        {
            title: 'Thời gian cấp',
            dataIndex: 'GrantTime',
        },
        {
            title: 'Hạn sử dụng',
            dataIndex: 'expiry',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status: string) => (
                <>
                    {status == 'waiting' ? <CircleLabel text={formatMessage('common.statuswaiting')} colorCode="blue" /> : (
                        status == 'used' ? <CircleLabel text={formatMessage('common.statusNotActive')} colorCode="red" /> :
                            <CircleLabel text={formatMessage('common.statusNotActive')} colorCode="red" />
                    )

                    }
                </>
            )
        },

        {
            title: 'Nguồn cấp',
            dataIndex: 'powerSupply',
        },
        {
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
        }
    ];


    const linkAddDevice = () => {
        navigate('/addprovide');
    }


    const dataString: ISelect[] = [{ label: 'common.all', value: undefined }, { label: 'common.onaction', value: undefined }, { label: 'common.stopaction', value: undefined }];

    const arraySelectFilter: ISelectAndLabel[] = [
        { textLabel: 'Trạng thái hoạt động', dataString },

    ];



    const handleSearch = (searchKey: string) => {
        setSearch(searchKey);
    };

    const onChangeSelectStatus = (name: string | undefined) => (status: any) => {
        if (name && status) {
            setFilterOption((pre: any) => ({ ...pre, [name]: status }));
        }
    };
    return (
        <div className="service__page">
            <MainTitleComponent breadcrumbs={routerViewProvideNumber} />
            <div className="main-card" style={{ background: 'none', marginTop: 50 }}>

                <div className="d-flex flex-row justify-content-md-between mb-3 align-items-end">
                    <div className="d-flex flex-row " style={{ gap: 10 }}>
                        {arraySelectFilter.map(item => (
                            <SelectAndLabelComponent
                                onChange={onChangeSelectStatus(item.name)}
                                key={item.name}
                                className="margin-select"
                                dataString={item.dataString}
                                textLabel={item.textLabel}
                            />
                        ))}

                        <Space direction="vertical" className='time'>
                            <DatePicker picker="week" onChange={onChangeStart} />
                            <DatePicker picker="week" />
                        </Space>
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

                    <TableComponent
                        // apiServices={}
                        defaultOption={filter}
                        translateFirstKey="homepage"
                        rowKey={res => res[idChooses]}
                        register={table}
                        columns={columns}
                        // onRowSelect={setSelectedRowKeys}
                        dataSource={data}
                        bordered
                        disableFirstCallApi={true}
                    />
                    <div className='btn_add_device' onClick={linkAddDevice}>
                        Cấp số mới
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProvideNumber;
