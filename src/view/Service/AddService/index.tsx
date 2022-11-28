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
import { createService } from '@modules/service/serviceStore';
import { useAppDispatch } from '@shared/hook/reduxhook';
import { async } from '@firebase/util';
import { NONAME } from 'dns';
import { onAuthStateChanged } from 'firebase/auth'
import { createHistorys } from '@modules/history/historyStore';
type serviceProps = {
    id?: string
    serviceID: string;
    serviceName: string;
    serviceStatus: boolean
    description: string
    Growauto?: number | string[]
    Prefix?: string | number
    Surfix?: string | number
    Reset?: boolean | number
};
interface AuthUser {
    email: string,
}
interface historyProps {
    id?: string
    username: string
    time: string
    IP: string
    action: string
}
const { TextArea } = Input;
const Service = () => {
    const { formatMessage } = useAltaIntl();
    const table = useTable();
    const db = FirebaseConfig.getInstance().fbDB
    const auth = FirebaseConfig.getInstance().auth
    const dispatch = useAppDispatch()
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
    const [usercurrent, setUsercurrent] = useState<AuthUser | any>(null)
    const handleCancel = () => {
        navigate('/service')
    }
    var presentDate = new Date();
    var date = presentDate.getDate()
    var month = presentDate.getMonth()
    var year = presentDate.getFullYear()
    var hour = presentDate.getHours()
    var minutes = presentDate.getMinutes()
    var seconds = presentDate.getSeconds()
    var time = ` ${date}/${month}/${year} ${hour}:${minutes}:${seconds}`
    const handleAddService = async () => {


        const body: serviceProps = {
            serviceID: serviceID,
            serviceName: serviceName,
            description: description,
            serviceStatus: true,
            Growauto: (checkautogrow ? [autoNumberFrom, autoNumberTo] : 0),
            Prefix: (checkprefix ? prefixNumber : 0),
            Surfix: (surfix ? numberSurfix : 0),
            Reset: reset
        }
        const bodyHistory: historyProps = {
            username: usercurrent?.email,
            time: time,
            IP: '192.168.1.10',
            action: `Thêm thông tin dịch vụ ${serviceName}`

        }

        dispatch(createService(body))
        dispatch(createHistorys(bodyHistory))
        navigate('/service')
    }

    useEffect(() => {
        onAuthStateChanged(auth, (curr: any) => {
            setUsercurrent(curr)
        })
    }, [])
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
