
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
import { fetchProvideNumber } from '@modules/providenumber/numberStore';
import { routerViewSetting } from '@view/SettingSystem/router';
import { fetchRoles } from '@modules/rolenew/rolenewStore';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import { provideNumberStore } from '@modules/providenumber/numberStore';
import { IconAddDevice } from '@shared/components/iconsComponent';
import { getProvideNumber } from '@modules/providenumber/respository';
import { Link } from 'react-router-dom';
interface DataType {
    id?: string
    reportNumber?: string
    serviceName?: string
    GrantTime?: string
    status?: string
    powerSupply?: string

}
interface role {
    id: string
    rolename: string
    numberuse: string
    description: string
}
const RoleManage = () => {
    const { formatMessage } = useAltaIntl();
    const table = useTable();
    let data: DataType[] | any;

    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilterOption] = useState<any>();
    const navigate = useNavigate();
    const idChooses = 'id'; //get your id here. Ex: accountId, userId,...

    const dispatch = useAppDispatch()
    const roles = useAppSelector((state) => state.role.roles)

    useEffect(() => {
        dispatch(fetchRoles())
    }, [dispatch])
    data = roles?.map((item, index) => {


        return {
            id: item?.id,
            rolename: item?.name,
            numberuse: 2,
            description: item?.description,
            update: item
        }
    })
    const onUpdate = () => {
        navigate(``)
    }
    const columns: ColumnsType = [
        {
            title: 'common.role.namerole',
            dataIndex: 'rolename',
            align: 'left'
        },
        {
            title: 'common.role.numberuser',
            className: 'column-money',
            dataIndex: 'numberuse',
            align: 'left',
        },
        {
            title: 'common.role.description',
            dataIndex: 'description',
        },
        {
            title: 'Cập nhật',
            dataIndex: 'update',
            align: 'center',
            render: (record: role) => {
                console.log(record);


                return (
                    <>
                        <Link
                            to={`/setting/manage/updaterole/${record.id}`}
                            style={{ textDecoration: "underline", color: "#4277FF", }}
                        >{formatMessage('common.update')}</Link>
                    </>

                )
            }
        }
    ];


    const linkAddRole = () => {
        navigate('/setting/manage/addrole');
    }




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
        <div className="role__page">
            <MainTitleComponent breadcrumbs={routerViewSetting?.routes} />
            <div className="main-card" style={{ background: 'none', marginTop: 50 }}>

                <div className="d-flex flex-row justify-content-md-between mb-3 align-items-end">
                    <div className="d-flex flex-row " style={{ gap: 10 }}>
                        <h3 className='title'>{formatMessage('common.roles')}</h3>
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
                    <div className='btn_add_device' onClick={linkAddRole}>
                        <IconAddDevice />
                        {formatMessage('common.addrole')}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default RoleManage;
