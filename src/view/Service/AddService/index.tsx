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

import { routerViewAddService } from './router';


const { TextArea } = Input;
const Service = () => {
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

    const [serviceID, setServiceID] = useState('')
    const [serviceName, setServiceName] = useState('')
    const [description, setDescription] = useState('')
    const [checkprefix, setCheckprefix] = useState('')

    console.log(checkprefix);

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
        <div className="addservice__page">
            <MainTitleComponent breadcrumbs={routerViewAddService} />
            <div className='title__addservice'>
                Quản lý dịch vụ
                <div className='box__addservice'>
                    <div className='title_box'>
                        Thông tin dịch vụ
                    </div>
                    <Row>
                        <Col span={12}>
                            <p>Mã dịch vụ: <span style={{ color: 'red' }}>*</span></p>
                            <Input className='info__input' />
                            <p>Tên dịch vụ: <span style={{ color: 'red' }}>*</span></p>
                            <Input className='info__input' />
                        </Col>
                        <Col span={12}>
                            <p>Mô tả: <span style={{ color: 'red' }}>*</span></p>
                            <TextArea


                                style={{ height: 120, resize: 'none' }}
                                className="textarea"

                            />
                        </Col>
                    </Row>

                    <div className='provide__number'>
                        Quy tắc cấp số
                        <div className='check' >
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }}>
                                Tăng tự động từ:
                                <Input className="input__number" />
                                đến
                                <Input className="input__number" />
                            </Checkbox>
                            <Checkbox className='checkbox'>
                                Prefix:
                                <Input className="input__number" style={{ marginLeft: 80 }} />

                            </Checkbox>
                            <Checkbox className='checkbox'>
                                Surfix:
                                <Input className="input__number" style={{ marginLeft: 80 }} />

                            </Checkbox>
                            <Checkbox className='checkbox'>
                                Reset mỗi ngày
                            </Checkbox>
                        </div>
                    </div>
                </div>

                <div className="action__add">
                    <div className="btn__add btn_cancel">
                        Hủy bỏ
                    </div>
                    <div className="btn__add btn__add_device" >
                        Thêm dịch vụ
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Service;
