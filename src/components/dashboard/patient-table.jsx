import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { BoxTitle } from './actions';
import Table from '../patients/table';
import routes from '../../config/routes';

function PatientTable({ data, loading }) {
	const patients = React.useMemo(() => {
		if (!data) return null;
		let value = data.slice(0, 5);
		return value;
	}, [data]);

	return (
		<div className="my-4">
			<BoxTitle title="Recent Patients" />
			{loading ? (
				<Spin spinning />
			) : !patients || patients.length <= 0 ? (
				<p className="font-medium text-gray-700 text-sm tracking-wide md:text-base">
					No patients found.
				</p>
			) : (
				<>
					<Table data={patients} paginate={false} genderFilter={false} search={false} />
					<div className="my-3 py-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
						<Link className="block w-full" to={routes.PATIENTS_PAGE}>
							<Button
								block
								icon={
									<span className="mr-2 text-sm text-gray-700 md:text-base">
										<ArrowRightOutlined />
									</span>
								}
								size="large"
							>
								<span className="text-sm md:text-base">See More</span>
							</Button>
						</Link>
					</div>
				</>
			)}
		</div>
	);
}

export default PatientTable;
