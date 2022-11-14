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

import { Select } from 'antd';
import { IModal } from '../../Homepage/interface';
import { routerViewAddProvideNumber } from './router';
import { Button, Modal } from 'antd';
import ModalNumber from './ModalNumber';


const ProvideNumber = () => {
    const { formatMessage } = useAltaIntl();


    const { Option, OptGroup } = Select;

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
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
                        <Option value="jack">Khám tim mạch</Option>
                        <Option value="lucy">Khám sản - phụ khoa</Option>
                        <Option value="lucy">Khám răng hàm mặt</Option>
                        <Option value="lucy">Khám tai mũi họng</Option>
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
                        <div className='number'>2001201</div>
                        <div className='service'>Dv: Khám răng hàm mặt <span>(Tại quầy số 1)</span></div>
                    </div>

                </div>

                <div className='footer'>
                    <div className='time'>

                        <div className=''>Thời gian cấp: 9:30 11/10/2021</div>

                        <div className=''>Hạn sử dụng:  9:30 11/10/2021</div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ProvideNumber;
