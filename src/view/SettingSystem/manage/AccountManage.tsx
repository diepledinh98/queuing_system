

import { Space } from 'antd';
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


// import { IModal } from '../Homepage/interface';
import { routerViewSetting } from '../router';

const dataTable = require('../../ProvideNumber/dataprovidenumber.json');

const AccountManager = () => {
    const { formatMessage } = useAltaIntl();
    const table = useTable();

    // const [modal, setModal] = useState<IModal>({
    //     isVisible: false,
    //     dataEdit: null,
    //     isReadOnly: false,
    // });
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilterOption] = useState<any>();
    const navigate = useNavigate();
    const idChooses = 'id'; //get your id here. Ex: accountId, userId,...
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
            render: () => <CircleLabel text={formatMessage('common.statusActive')} colorCode="green" />,
        },

        {
            title: 'Nguồn cấp',
            dataIndex: 'powerSupply',
        },
        {
            title: 'Chi tiết',
            dataIndex: 'detail',
        }
    ];


    const linkAddDevice = () => {
        navigate('/AddDevice');
    }

    const handleRefresh = () => {
        table.fetchData({ option: { search: search, filter: { ...filter } } });
        setSelectedRowKeys([]);
    };

    const arrayAction: IArrayAction[] = [
        {
            iconType: 'add',
            handleAction: () => {
                // setModal({ dataEdit: null, isVisible: true });
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
            <MainTitleComponent breadcrumbs={routerViewSetting} />
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
                        dataSource={dataTable}
                        bordered
                        disableFirstCallApi={true}
                    />
                    <div className='btn_add_device' onClick={linkAddDevice}>
                        Thêm dịch vụ
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AccountManager;
