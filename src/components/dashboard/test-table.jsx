import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { BoxTitle } from './actions';
import Table from '../tests/table';
import routes from '../../config/routes';

function TestTable({ data, loading }) {
	const tests = React.useMemo(() => {
		if (!data) return null;
		let value = data.slice(0, 5);
		return value;
	}, [data]);

	return (
		<div className="my-4">
			<BoxTitle title="Recent Tests" />
			{loading ? (
				<Spin spinning />
			) : !tests || tests.length <= 0 ? (
				<p className="font-medium text-gray-700 text-sm tracking-wide md:text-base">
					No tests found.
				</p>
			) : (
				<>
					<Table data={tests} paginate={false} search={false} />
					<div className="my-3 py-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
						<Link className="block w-full" to={routes.TESTS_PAGE}>
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

export default TestTable;
