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

import './style.scss'
import { IModal } from '../Homepage/interface';
import { routerViewService } from './router';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import { fetchServices } from '@modules/service/serviceStore';

const Service = () => {
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
    const dispatch = useAppDispatch()
    const services = useAppSelector((state) => state.service.services)
    useEffect(() => {
        // getServices().then((serviceSnap) => {
        //     dispatch(serviceStore.actions.fetchService({ services: serviceSnap }))
        // });
        dispatch(fetchServices())
    }, [dispatch]);

    const onDetail = (id: string) => {
        navigate(`/detailservice/${id}`)
    }
    const onUpdate = (id: string) => {
        navigate(`/updateservice/${id}`)
    }
    const columns: ColumnsType = [
        {
            title: 'Mã dịch vụ',
            dataIndex: 'serviceID',
            align: 'left'
        },
        {
            title: 'Tên dịch vụ',
            className: 'column-money',
            dataIndex: 'serviceName',
            align: 'left',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: 'serviceStatus',
            render: () => <CircleLabel text={formatMessage('common.statusActive')} colorCode="green" />,
        },

        {
            title: 'Chi tiết',
            dataIndex: 'detail',
            align: 'center',
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
            align: 'center',
            render: (action: any, record: any) => {

                console.log(record);

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


    const linkAddService = () => {
        navigate('/addservice');
    }

    const handleRefresh = () => {
        table.fetchData({ option: { search: search, filter: { ...filter } } });
        setSelectedRowKeys([]);
    };

    const arrayAction: IArrayAction[] = [
        {
            iconType: 'add',
            handleAction: () => {
                setModal({ dataEdit: null, isVisible: true });
            },
        },
        { iconType: 'share' },
        {
            iconType: 'delete',
            disable: selectedRowKeys?.length === 0,
            handleAction: () => {
                DeleteConfirm({
                    content: formatMessage('common.delete'),
                    handleOk: () => {
                        // call Api Delete here
                        handleRefresh();
                    },
                    handleCancel: () => { },
                });
            },
        },
    ];
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
            <MainTitleComponent breadcrumbs={routerViewService} />
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
                        dataSource={services}
                        bordered
                        disableFirstCallApi={true}
                    />
                    <div className='btn_add_device' onClick={linkAddService}>
                        Thêm dịch vụ
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Service;
