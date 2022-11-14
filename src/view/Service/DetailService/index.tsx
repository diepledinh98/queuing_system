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
import { Col, Row, Input, Checkbox, InputNumber } from 'antd';
import './style.scss'

import { routerViewDetailService } from './router';
import { useParams } from 'react-router';
import { useAppSelector } from '@shared/hook/reduxhook';
const dataTable = require('./datadetailservice.json');
const { TextArea } = Input;


const DetailDervice = () => {
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
    const { id } = useParams()

    const services: Array<any> | undefined = useAppSelector((state) => {
        return state.service.services
    });
    const service = services?.find((value) => value.id == id);

    console.log(service.SyntaxProvide);


    const columns: ColumnsType = [
        {
            title: 'Số thứ tự',
            dataIndex: 'STT',
            align: 'left'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: () => <CircleLabel text={formatMessage('common.statusActive')} colorCode="green" />,
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
        <div className="detailservice__page">
            <MainTitleComponent breadcrumbs={routerViewDetailService} />
            <div className='title__detail'>
                Quản lý dịch vụ
            </div>
            <div className='container_detailservice'>
                <div className='info__detailservice'>
                    <div className='title'>
                        Thông tin dịch vụ
                    </div>
                    <Row style={{ marginTop: 12 }}>
                        <Col flex="120px" className="text__info_name">Mã dịch vụ:</Col>
                        <Col flex="auto" className="text__info">{service.serviceID}</Col>
                    </Row>
                    <Row style={{ marginTop: 12 }}>
                        <Col flex="120px" className="text__info_name">Tên dịch vụ:</Col>
                        <Col flex="auto" className="text__info">{service.serviceName}</Col>
                    </Row>
                    <Row style={{ marginTop: 12 }}>
                        <Col flex="120px" className="text__info_name">Mô tả:</Col>
                        <Col flex="auto" className="text__info">{service.description}</Col>
                    </Row>

                    <div className='title' style={{ marginTop: 16 }}>
                        Quy tắc cấp số
                    </div>

                    {
                        service.SyntaxProvide.Growauto ?

                            <div className="sytax__number" >

                                Tăng tự động:
                                <Input className="input__number" value={service.SyntaxProvide.Growauto[0]} />
                                đến
                                <Input className="input__number" value={service.SyntaxProvide.Growauto[1]} />
                            </div>
                            :
                            <></>
                    }
                    {
                        service.SyntaxProvide.Prefix ?
                            <div className="sytax__number">

                                Prefix:
                                <Input className="input__number" style={{ marginLeft: 65 }} value={service.SyntaxProvide.Prefix} />

                            </div>
                            :
                            <></>
                    }

                    {
                        service.SyntaxProvide.Surfix ?
                            <div className="sytax__number">

                                Prefix:
                                <Input className="input__number" style={{ marginLeft: 65 }} value={service.SyntaxProvide.Surfix} />

                            </div>
                            :
                            <></>
                    }

                    {service.SyntaxProvide.Reset ?
                        <div className="sytax__number">
                            Reset mỗi ngày
                        </div>
                        :
                        <></>
                    }



                </div>
                <div className='table_detailservice'>
                    <div className="main-card" style={{ background: 'none' }}>

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
                                dataSource={dataTable}
                                bordered
                                disableFirstCallApi={true}

                            />
                            <div className='btn_service' >
                                <div className='update_service'>
                                    Cập nhật danh sách
                                </div>
                                <div className='back'>
                                    Quay lại
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailDervice;
