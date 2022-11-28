import './AddRole.scss'
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
import { routerViewAddRole } from './router';
import { Input, Checkbox } from 'antd';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import { provideNumberStore } from '@modules/providenumber/numberStore';
import { IconAddDevice } from '@shared/components/iconsComponent';
import { getProvideNumber } from '@modules/providenumber/respository';
const { TextArea } = Input;
interface DataType {
    id?: string
    reportNumber?: string
    serviceName?: string
    GrantTime?: string
    status?: string
    powerSupply?: string

}
const AddRole = () => {
    const { formatMessage } = useAltaIntl();


    const dispatch = useAppDispatch()
    const providenumber = useAppSelector((state) => state.providenumber.Number)

    useEffect(() => {
        dispatch(fetchProvideNumber())
    }, [dispatch])




    return (
        <div className="addrole__page">
            <MainTitleComponent breadcrumbs={routerViewAddRole} />
            <div className='title__addrole'>Danh sách vai trò</div>
            <div className='main_page'>
                <div className='name__addrole'>Thông tin vai trò</div>
                <div className='content'>
                    <div className='info_role'>
                        <p className="name__add">Tên đăng nhập <span style={{ color: 'red' }}>*</span></p>
                        <Input className='add__input' />
                        <p>Mô tả: <span style={{ color: 'red' }}>*</span></p>
                        <TextArea

                            // onChange={(event) => setDescription(event.target.value)}
                            style={{ height: 120, resize: 'none' }}
                            className="textarea"
                        />

                    </div>

                    <div className='func_role'>
                        <div className='function'>
                            <div className='title_function'>Nhóm chức năng A</div>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} >
                                Tất cả
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} >
                                Chức năng x
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} >
                                Chức năng y
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} >
                                Chức năng z
                            </Checkbox>
                        </div>
                        <div className='function'>
                            <div className='title_function'>Nhóm chức năng B</div>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} >
                                Tất cả
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} >
                                Chức năng x
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} >
                                Chức năng y
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} >
                                Chức năng z
                            </Checkbox>
                        </div>
                    </div>
                </div>
            </div>

            <div className='btn'>
                <div className='btn-cancel'>
                    Hủy bỏ
                </div>
                <div className='btn-add'>
                    Thêm
                </div>
            </div>
        </div>
    );
};

export default AddRole;
