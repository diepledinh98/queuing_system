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
import { addDoc, collection } from "firebase/firestore";
import { FirebaseConfig } from 'src/firebase/configs';
import { routerViewAddService } from './router';
import { async } from '@firebase/util';
import { NONAME } from 'dns';


const { TextArea } = Input;
const Service = () => {
    const { formatMessage } = useAltaIntl();
    const table = useTable();
    const db = FirebaseConfig.getInstance().fbDB
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
    const [checkprefix, setCheckprefix] = useState(false)
    const [prefixNumber, setPrefixNumber] = useState('0001')
    const [checkautogrow, setCheckautogrow] = useState(false)
    const [autoNumberFrom, setAutoNumberFrom] = useState('0001')
    const [autoNumberTo, setAutoNumberTo] = useState('9999')
    const [surfix, setSurfix] = useState(false)
    const [numberSurfix, setNumberSurfix] = useState('0001')
    const [reset, setReset] = useState(false)

    const handleCancel = () => {
        navigate('/service')
    }
    const handleAddService = async () => {

        try {
            const docRef = await addDoc(collection(db, 'services'), {
                serviceID: serviceID,
                serviceName: serviceName,
                description: description,
                serviceStatus: true,
                Growauto: (checkautogrow ? [autoNumberFrom, autoNumberTo] : 0),
                Prefix: (checkprefix ? prefixNumber : 0),
                Surfix: (surfix ? numberSurfix : 0),
                Reset: reset
            })
            navigate('/service')

        }
        catch (e) {
            console.log(e);

        }
    }


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
                            <Input className='info__input' onChange={(event) => setServiceID(event.target.value)} />
                            <p>Tên dịch vụ: <span style={{ color: 'red' }}>*</span></p>
                            <Input className='info__input' onChange={(event) => setServiceName(event.target.value)} />
                        </Col>
                        <Col span={12}>
                            <p>Mô tả: <span style={{ color: 'red' }}>*</span></p>
                            <TextArea

                                onChange={(event) => setDescription(event.target.value)}
                                style={{ height: 120, resize: 'none' }}
                                className="textarea"

                            />
                        </Col>
                    </Row>

                    <div className='provide__number'>
                        Quy tắc cấp số
                        <div className='check' >
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setCheckautogrow(event.target.checked)} >
                                Tăng tự động từ:
                                <Input className="input__number" defaultValue="0001" onChange={(event) => setAutoNumberFrom(event.target.value)} />
                                đến
                                <Input className="input__number" defaultValue="9999" onChange={(event) => setAutoNumberTo(event.target.value)} />
                            </Checkbox>
                            <Checkbox className='checkbox' onChange={(event) => setCheckprefix(event.target.checked)}>
                                Prefix:
                                <Input className="input__number" style={{ marginLeft: 80 }} defaultValue="0001" onChange={(event) => setPrefixNumber(event.target.value)} />

                            </Checkbox>
                            <Checkbox className='checkbox' onChange={(event) => setSurfix(event.target.checked)}>
                                Surfix:
                                <Input className="input__number" style={{ marginLeft: 80 }} defaultValue="0001" onChange={(event) => setNumberSurfix(event.target.value)} />

                            </Checkbox>
                            <Checkbox className='checkbox' onChange={(event) => setReset(event.target.checked)}>
                                Reset mỗi ngày
                            </Checkbox>
                        </div>
                    </div>
                </div>

                <div className="action__add">
                    <div className="btn__add btn_cancel" onClick={handleCancel}>
                        Hủy bỏ
                    </div>
                    <div className="btn__add btn__add_device" onClick={handleAddService}>
                        Thêm dịch vụ
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Service;
