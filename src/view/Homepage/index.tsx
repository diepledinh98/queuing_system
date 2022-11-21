import './style.scss';

import { Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { Key, useEffect, useState } from 'react';

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

import ModalComponents from './component/MainModal/ModalHomepage';
import { IModal } from './interface';
import { routerHomepage } from './router';
import { CalendarOutlined, LaptopOutlined } from '@ant-design/icons';
import { Area } from '@ant-design/plots';
import { Select, Progress, Calendar } from 'antd';
const dataTable = require('./data.json');
const { Option, OptGroup } = Select;
const Homepage = () => {
  const { formatMessage } = useAltaIntl();

  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    xField: 'timePeriod',
    yField: 'value',
    xAxis: {
      range: [0, 1],
    },
  };

  return (
    <div className="homepage">
      <div className='homepage_left'>
        <MainTitleComponent breadcrumbs={routerHomepage} />

        <div className='title'>
          Biểu đồ cấp số
        </div>
        <div className='list_graph'>
          <div className='graph_item'>
            <div className='name'>
              <div className='border_icon'>
                <CalendarOutlined className='icon' />
              </div>
              Số thứ tự <br /> đã cấp
            </div>
            <div className='number'>
              4.221
            </div>
          </div>
          <div className='graph_item'>
            <div className='name'>
              <div className='border_icon'>
                <CalendarOutlined className='icon' />
              </div>
              Số thứ tự <br /> đã cấp
            </div>
            <div className='number'>
              4.221
            </div>
          </div>
          <div className='graph_item'>
            <div className='name'>
              <div className='border_icon'>
                <CalendarOutlined className='icon' />
              </div>
              Số thứ tự <br /> đã cấp
            </div>
            <div className='number'>
              4.221
            </div>
          </div>
          <div className='graph_item'>
            <div className='name'>
              <div className='border_icon'>
                <CalendarOutlined className='icon' />
              </div>
              Số thứ tự <br /> đã cấp
            </div>
            <div className='number'>
              4.221
            </div>
          </div>
        </div>


        <div className='chart_info'>
          <div className='info'>
            <div className='date'>
              Bảng thống kê <br />
              <span>
                Tháng 11/2021
              </span>
            </div>
            <div className='select'>
              Xem theo
              <Select defaultValue="Ngày">
                <Option>Ngày</Option>
                <Option>Tuần</Option>
                <Option>Tháng</Option>
                <Option>Năm</Option>
              </Select>
            </div>
          </div>
          <div className='chart'>

            <Area {...config} />
          </div>
        </div>
      </div>
      <div className='homepage_right'>
        <div className='title_right'>
          Tổng quan
        </div>
        <div className='tq_item'>
          <div className='progress1'>
            <Progress type="circle" percent={90} className="device_out" />
            <Progress type="circle" percent={30} className="device_in" />
          </div>
          <div className='tq_name'>
            4.221
            <span>
              <LaptopOutlined />
              Thiết bị
            </span>
          </div>
          <div className='tq_info'>
            <div className='tq_info_item'>
              <div className='dot' style={{ backgroundColor: '#FF7506' }}></div>
              <div className='info_item_name'>
                Đang hoạt động
              </div>
              <div className='info_item_number'>
                3.799
              </div>
            </div>
            <div className='tq_info_item'>
              <div className='dot' style={{ backgroundColor: '#7E7D88' }}></div>
              <div className='info_item_name'>
                Ngưng hoạt động
              </div>
              <div className='info_item_number'>
                422
              </div>
            </div>
          </div>
        </div>

        <div className='tq_item'>
          <div className='progress1'>
            <Progress type="circle" percent={90} className="device_out" />
            <Progress type="circle" percent={30} className="device_in" />
          </div>
          <div className='tq_name'>
            4.221
            <span>
              <LaptopOutlined />
              Thiết bị
            </span>
          </div>
          <div className='tq_info'>
            <div className='tq_info_item'>
              <div className='dot' style={{ backgroundColor: '#FF7506' }}></div>
              <div className='info_item_name'>
                Đang hoạt động
              </div>
              <div className='info_item_number'>
                3.799
              </div>
            </div>
            <div className='tq_info_item'>
              <div className='dot' style={{ backgroundColor: '#7E7D88' }}></div>
              <div className='info_item_name'>
                Ngưng hoạt động
              </div>
              <div className='info_item_number'>
                422
              </div>
            </div>
          </div>
        </div>

        <div className='tq_item'>
          <div className='progress1'>
            <Progress type="circle" percent={90} className="device_out" />
            <Progress type="circle" percent={30} className="device_in" />
          </div>
          <div className='tq_name'>
            4.221
            <span>
              <LaptopOutlined />
              Thiết bị
            </span>
          </div>
          <div className='tq_info'>
            <div className='tq_info_item'>
              <div className='dot' style={{ backgroundColor: '#FF7506' }}></div>
              <div className='info_item_name'>
                Đang hoạt động
              </div>
              <div className='info_item_number'>
                3.799
              </div>
            </div>
            <div className='tq_info_item'>
              <div className='dot' style={{ backgroundColor: '#7E7D88' }}></div>
              <div className='info_item_name'>
                Ngưng hoạt động
              </div>
              <div className='info_item_number'>
                422
              </div>
            </div>
          </div>
        </div>



        <div className="site-calendar-demo-card">
          <Calendar fullscreen={false} />
        </div>
      </div>


    </div>
  );
};

export default Homepage;
