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
import { fetchProvideNumber } from '@modules/providenumber/numberStore';

import { IModal } from '../Homepage/interface';
import { routerViewReport } from './router';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import { provideNumberStore } from '@modules/providenumber/numberStore';
import { getProvideNumber } from '@modules/providenumber/respository';
const dataTable = require('./datareport.json');
interface DataType {
    id?: string
    reportNumber?: string
    serviceName?: string
    GrantTime?: string
    status?: string
    powerSupply?: string

}
const Report = () => {
    const { formatMessage } = useAltaIntl();
    const table = useTable();
    let data: DataType[] | any;
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

    const dispatch = useAppDispatch()
    const providenumber = useAppSelector((state) => state.providenumber.Number)

    useEffect(() => {
        dispatch(fetchProvideNumber())
    }, [dispatch])
    data = providenumber?.map((item, index) => {


        return {
            id: item?.id,
            reportNumber: item?.stt,
            serviceName: item.service.serviceName,
            GrantTime: item?.timeprovide,
            status: item?.status,
            powerSupply: 'Kiosk'
        }
    })

    const columns: ColumnsType = [
        {
            title: 'Số thứ tụ',
            dataIndex: 'reportNumber',
            align: 'left'
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
            title: 'Tình trạng',
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

    const arraySelectFilter: ISelectAndLabel[] = [
        { textLabel: 'Trạng thái hoạt động', dataString },

    ];

    useEffect(() => {
        table.fetchData({ option: { search: search, filter: { ...filter } } });
    }, [search, filter, table]);

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
            <MainTitleComponent breadcrumbs={routerViewReport} />
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
                        <div className='select__time'>
                            <p>Chọn thời gian</p>
                            <Space direction="vertical" className='time'>
                                <DatePicker picker="week" />
                                <DatePicker picker="week" />
                            </Space>

                        </div>
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
                        Tải về
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Report;
