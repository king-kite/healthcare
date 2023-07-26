import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import Container from '../../../components/container'

function Detail() {
	const data = [
		{
			title: 'First name',
			value: 'Richard',
		},
		{
			title: 'Last name',
			value: 'Cooper',
		},
		{
			title: 'Email address',
			value: 'richardcooper@gmail.com',
		},
		{
			title: 'Gender',
			value: 'Male',
		},
		{
			title: 'Phone number',
			value: '09123456790',
		},
		{
			title: 'Date of Birth',
			value: '2013-01-01',
		},
	];

	return (
		<Container title="Test/Diagnosis Information">
      <div className="my-8 px-2">
        <h1 className="font-bold mb-2 mt-5 text-gray-700 text-lg">
          Richard Cooper
        </h1>
        <div className="my-4">
          <div>
            <Button
              className="cursor-pointer hover:text-primary-500"
              icon={
                <span className="mr-2 text-gray-700 text-sm md:text-base">
                  <DeleteOutlined />
                </span>
              }
              type="default"
            >
              <span className="text-gray-700 text-sm md:text-base">
                Delete
              </span>
            </Button>
          </div>
        </div>
        <hr className="border-gray-100 my-4" />
        <div>
          <div>
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Test Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Health Parameters and Diagnosis Information
            </p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100 lg:grid lg:grid-cols-2">
              {data.map((detail, index) => (
                <div key={index} className="px-4 py-6">
                  <dt className="text-sm font-medium leading-6 text-gray-900 md:text-base md:font-semibold">
                    {detail.title}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 md:text-base md:font-medium">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
		</Container>
	);
}

export default Detail;
