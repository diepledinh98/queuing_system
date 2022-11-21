import './style.scss';

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
import './AddNumber.scss'
import { Select } from 'antd';
import { IModal } from '../../Homepage/interface';
import { routerViewAddProvideNumber } from './router';
import { Button, Modal } from 'antd';
import ModalNumber from './ModalNumber';
import { addDoc, collection } from "firebase/firestore";
import { FirebaseConfig } from 'src/firebase/configs';
import { useAppSelector } from '@shared/hook/reduxhook';

interface NameServiceProps {
    id?: string
    serviceID: string;
    serviceName: string;
    serviceStatus: boolean
    Growauto?: number[]
    Prefix?: string
    Surfix?: string
    Reset?: boolean
}
const ProvideNumber = () => {
    const { formatMessage } = useAltaIntl();
    const db = FirebaseConfig.getInstance().fbDB
    const { Option, OptGroup } = Select;



    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [idService, setIdService] = useState('')
    const [stt, setStt] = useState(2001203)
    const [sername, setSername] = useState<NameServiceProps>()
    const navigate = useNavigate();
    var presentDate = new Date();
    var date = presentDate.getDate()
    var month = presentDate.getMonth()
    var year = presentDate.getFullYear()
    var hour = presentDate.getHours()
    var minutes = presentDate.getMinutes()
    var time = `${hour}:${minutes} - ${date}/${month}/${year}`
    var dated = `${hour}:${minutes} - ${date + 1}/${month}/${year}`
    const services: Array<any> | undefined = useAppSelector((state) => {
        return state.service.services
    });



    const handleChange = (value: string) => {
        setIdService(value)

    };
    const showModal = async () => {

        try {
            var nameservice = services?.find((item) => item.id == idService);
            setSername(nameservice)


            const docRef = await addDoc(collection(db, 'providenumber'), {
                linkServiceId: idService,
                status: 'waiting',
                stt: 2001203,
                timeprovide: time,
                dateduse: dated,
                service: nameservice
            })


        }
        catch (e) {
            console.log(e);

        }
        setOpen(true);

    };



    const handleCancel = () => {
        setOpen(false);
        navigate('/provide')
    };


    return (
        <div className="addprovidenumber__page">
            <MainTitleComponent breadcrumbs={routerViewAddProvideNumber} />
            <div className='title'>Quản lý cấp số</div>
            <div className='main__page'>
                <div>

                    <div className='title__page'>CẤP SỐ MỚI</div>
                    <div className='title__select__service'>Dịch vụ khách hàng lựa chọn</div>
                    <Select defaultValue="Chọn dịch vụ" onChange={handleChange}>
                        {services?.map((service, index) => {
                            return (
                                <Option value={service.id} key={index}>{service.serviceName}</Option>
                            )
                        })}


                    </Select>
                </div>

                <div className='btn'>
                    <div className='btn__cancle'>Hủy bỏ</div>
                    <div className='btn_inso' onClick={showModal}>In số</div>
                </div>
            </div>



            <Modal
                open={open}


                onCancel={handleCancel}

            >
                <div className='modal_provide'>
                    <div className='content'>
                        <div className='title'>Số thứ tự được câp</div>
                        <div className='number'>{stt}</div>
                        <div className='service'>{sername?.serviceName} <span>(Tại quầy số 1)</span></div>
                    </div>

                </div>

                <div className='footer'>
                    <div className='time'>
                        <div className=''>Thời gian cấp: 27362764723</div>
                        <div className=''>Hạn sử dụng: 4324424424</div>
                    </div>
                </div>

            </Modal>
        </div>
    );
};

export default ProvideNumber;
