import {
	ArrowRightOutlined,
	PlusOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import Container from '../../../components/container';
import { TableAvatarTitleSubCell as PatientCell } from '../../../components/table/cells';
import ReactTable from '../../../components/table';
import TestsForm from '../../../components/tests/form';
import routes from '../../../config/routes';

function Tests() {
  const modalRef = React.useRef();

	const columns = React.useMemo(
		() => [
			{
				Cell: PatientCell,
				Header: 'Patient',
				accessor: 'patient',
				avatarAccessor: 'avatar',
				subAccessor: 'email',
				titleAccessor: 'full_name',
			},
			{
				Header: 'Height',
				accessor: 'height',
			},
			{
				Header: 'Weight',
				accessor: 'weight',
			},
      {
        Header: 'Temperature',
        accessor: 'temperature'
      },
      {
        Header: 'Pulse/Heart Rate',
        accessor: 'pulse'
      },
			{
				Header: 'Date',
				accessor: 'date',
			},
			{
				Header: 'Actions',
				accessor: 'actions',
			},
		],
		[]
	);

	const data = React.useMemo(() => {
		const data = [
			{
				first_name: 'John',
				last_name: 'Doe',
				email: 'johndoe@gmail.com',
				temperature: '22oC',
        height: '6ft',
        weight: '70kg',
        pulse: '55bpm/m',
				date: '2000-01-01',
			},
			{
				first_name: 'Jane',
				last_name: 'Doe',
				email: 'janedoe@gmail.com',
				temperature: '22oC',
        height: '6ft',
        weight: '70kg',
        pulse: '55bpm/m',
				date: '2000-01-01',
			},
			{
				first_name: 'Richard',
				last_name: 'Cooper',
				email: 'richardcooper@gmail.com',
				temperature: '22oC',
        height: '6ft',
        weight: '70kg',
        pulse: '55bpm/m',
				date: '2000-01-01',
			},
			{
				first_name: 'Mary',
				last_name: 'Jane',
				email: 'maryjane@gmail.com',
				temperature: '22oC',
        height: '6ft',
        weight: '70kg',
        pulse: '55bpm/m',
				date: '2000-01-01',
			},
		];
		const keyedData = data.map((item, index) => ({
			...item,
			key: index,
			full_name: item.first_name + ' ' + item.last_name,
			actions: (
				<div className="flex items-center">
					<span className="px-2">
						<Tooltip title="View">
							<Link to={routes.TEST_PAGE(index)}>
								<Button type="primary" shape="circle">
									<span className="text-gray-100 text-sm md:text-base">
										<ArrowRightOutlined />
									</span>
								</Button>
							</Link>
						</Tooltip>
					</span>
					<span className="px-2">
						<Tooltip title="Delete">
							<Button className="bg-red-500" type="dashed" shape="circle">
								<span className="text-gray-100 text-sm md:text-base">
									<DeleteOutlined />
								</span>
							</Button>
						</Tooltip>
					</span>
				</div>
			),
		}));
		return keyedData;
	}, []);

	return (
		<Container title="Tests and Diagnosis">
			<div className="w-full sm:w-1/2 md:w-1/3">
        <Button
          block
          icon={
            <span className="mr-2 text-sm md:text-base">
              <PlusOutlined />
            </span>
          }
          onClick={() => {
            if (modalRef.current) modalRef.current.openModal()
          }}
          size="large"
        >
          <span className="text-sm md:text-base">New Test</span>
        </Button>
			</div>
			<ReactTable columns={columns} data={data} />
      <TestsForm ref={modalRef} />
		</Container>
	);
}

export default Tests;
