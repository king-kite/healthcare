export function TableHeadCell({ title }) {
	return (
		<span className="font-medium text-gray-700 text-sm md:text-base">
			{title}
		</span>
	);
}

export function TableAvatarTitleOtherCell({ other, image, title }) {
	return (
		<div className="flex items-center py-2">
			{image ? (
				<section className="flex-shrink-0 h-10 w-10">
					<div className="h-10 relative rounded-full w-10">
						<img alt={title[0]} className="rounded-full" src={image} />
					</div>
				</section>
			) : (
				<span className="bg-primary-500 h-10 inline-flex items-center justify-center rounded-full text-gray-50 w-10">
					<span className="left-[0.05rem] relative top-[0.075rem]">
						{title[0]}
					</span>
				</span>
			)}
			<section className="ml-4 text-left">
				<div className="text-sm font-medium text-gray-700 md:text-base">
					{title}
				</div>
				<div className="normal-case font-normal text-sm text-gray-500">
					{other}
				</div>
			</section>
		</div>
	);
}
