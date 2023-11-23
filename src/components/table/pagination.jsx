import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Select } from 'antd';

import { Button, PageButton } from './components';

function Pagination({
	canNextPage,
	canPreviousPage,
	gotoPage,
	nextPage,
	pageCount,
	pageIndex,
	pageLength,
	pageSize,
	pageSizes = [5, 10, 20, 50, 100, 200, 500, 1000],
	previousPage,
	setPageSize,
}) {
	return (
		<div className="my-2 py-3 flex items-center justify-between">
			<div className="flex-1 flex justify-between sm:hidden">
				<Button onClick={() => previousPage()} disabled={!canPreviousPage}>
					Previous
				</Button>
				<Button onClick={() => nextPage()} disabled={!canNextPage}>
					Next
				</Button>
			</div>
			<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
				<div className="flex gap-x-2 items-center">
					<p className="text-sm text-gray-700 tracking-wider w-full">
						Page <span className="font-medium">{pageIndex + 1}</span> of{' '}
						<span className="font-medium">{pageLength}</span>
					</p>
					<div className="mx-2">
						<Select
							style={{ width: '100%', fontSize: '8px' }}
							size="large"
							className="!text-xs"
							id="size"
							onChange={(value) => setPageSize(+value)}
							value={pageSize ? String(pageSize) : ''}
							options={pageSizes.map((pageSize) => ({
								label: `Show ${pageSize}`,
								value: String(pageSize),
							}))}
						/>
					</div>
				</div>
				<div>
					<nav
						className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
						aria-label="Pagination"
					>
						<PageButton
							className="rounded-l-md"
							onClick={() => gotoPage(0)}
							disabled={!canPreviousPage}
						>
							<span className="sr-only">First</span>
							<CaretLeftOutlined className="h-3 w-3" aria-hidden="true" />
							<CaretLeftOutlined className="h-3 w-3" aria-hidden="true" />
						</PageButton>
						<PageButton
							onClick={() => previousPage()}
							disabled={!canPreviousPage}
						>
							<span className="sr-only">Previous</span>
							<CaretLeftOutlined className="h-5 w-5" aria-hidden="true" />
						</PageButton>
						<PageButton onClick={() => nextPage()} disabled={!canNextPage}>
							<span className="sr-only">Next</span>
							<CaretRightOutlined className="h-5 w-5" aria-hidden="true" />
						</PageButton>
						<PageButton
							className="rounded-r-md"
							onClick={() => gotoPage(pageCount - 1)}
							disabled={!canNextPage}
						>
							<span className="sr-only">Last</span>
							<CaretRightOutlined className="h-3 w-3" aria-hidden="true" />
							<CaretRightOutlined className="h-3 w-3" aria-hidden="true" />
						</PageButton>
					</nav>
				</div>
			</div>
		</div>
	);
}

export default Pagination;
