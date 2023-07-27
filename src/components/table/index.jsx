import "regenerator-runtime/runtime";
import React from "react";
import {
	useFilters,
	useGlobalFilter,
	usePagination,
	useSortBy,
	useTable,
} from "react-table";

import {
	GlobalFilter,
	GroupFilter,
	SortIcon,
	SortUpIcon,
	SortDownIcon,
} from "./components";
import Pagination from "./pagination";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

function Table({ className, columns = [], data = [] }) {
	// Use the state and functions returned from useTable to build your UI
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		// rows, // No longer using rows as a result of pagination

		state,
		preGlobalFilteredRows,
		setGlobalFilter,

		// pagination
		page, // Instead of using 'rows', we'll use page,
		// which has only the rows for the active page

		// The rest of these things are super handy, too ;)
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
	} = useTable(
		{ columns, data },
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	return (
		<React.Fragment>
			{/* Filters Start */}
			<div className="gap-6 grid mb-6 py-2 items-center sm:grid-cols-2 md:grid-cols-4">
				<GlobalFilter
					preGlobalFilteredRows={preGlobalFilteredRows}
					globalFilter={state.globalFilter}
					setGlobalFilter={setGlobalFilter}
				/>

				<GroupFilter
					headerGroups={headerGroups}
					// headerKey="Header"
					filterKey="Filter"
				/>
			</div>
			{/* Filters Stop */}

			{/* Table Start */}
			<div className="flex flex-col">
				<div
					className={classNames(
						"border border-t-0 border-gray-200 overflow-x-auto pb-2 shadow sm:rounded-lg",
						className
					)}
				>
					<table
						{...getTableProps()}
						className="divide-y divide-gray-200 min-w-full"
					>
						<thead className="bg-gray-100">
							{headerGroups.map((headerGroup, index) => (
								<tr key={index} {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map((column, index) => (
										// Add the sorting props to control sorting. For this example
										// we can add them into the header props
										<th
											key={index}
											{...column.getHeaderProps(column.getSortByToggleProps())}
											className="font-medium group px-6 py-3 text-gray-500 text-left text-xs tracking-wider uppercase"
											scope="col"
										>
											<div className="flex items-center justify-between">
												{column.render("Header")}
												{/* Add a sort direction indicator */}
												<span>
													{column.isSorted ? (
														column.isSortedDesc ? (
															<SortDownIcon className="w-4 h-4 text-gray-400" />
														) : (
															<SortUpIcon className="w-4 h-4 text-gray-400" />
														)
													) : (
														<SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
													)}
												</span>
											</div>
										</th>
									))}
								</tr>
							))}
						</thead>

						<tbody
							{...getTableBodyProps()}
							className="bg-white divide-y divide-gray-200"
						>
							{page.map((row, i) => {
								// replace row with page
								prepareRow(row);
								return (
									<tr key={i} {...row.getRowProps()}>
										{row.cells.map((cell, index) => {
											return (
												<td
													key={index}
													{...cell.getCellProps()}
													className="capitalize font-semibold px-6 py-4 text-gray-800 text-xs whitespace-nowrap md:text-sm"
												>
													{cell.column.Cell.name === "defaultRenderer" ? (
														<div className="text-sm text-gray-500">
															{cell.render("Cell")}
														</div>
													) : (
														cell.render("Cell")
													)}
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
			{/* Table Stop */}

			{/* Pagination Start */}
			<Pagination
				canNextPage={canNextPage}
				canPreviousPage={canPreviousPage}
				gotoPage={gotoPage}
				nextPage={nextPage}
				pageCount={pageCount}
				pageIndex={state.pageIndex}
				pageLength={pageOptions.length}
				pageSize={state.pageSize}
				previousPage={previousPage}
				setPageSize={setPageSize}
			/>
			{/* Pagination Stop */}
		</React.Fragment>
	);
}

export default Table;
