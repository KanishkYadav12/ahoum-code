interface SkeletonProps {
	className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
	return <div className={`animate-pulse rounded-md bg-[#F2F3F2] ${className}`} />;
}

export function ProductSkeleton() {
	return (
		<div className="h-[248px] w-[173px] shrink-0 rounded-[18px] border border-[#E2E2E2] p-4 md:h-[280px] md:w-[200px]">
			<Skeleton className="h-[100px] w-full" />
			<Skeleton className="mt-4 h-4 w-3/4" />
			<Skeleton className="mt-2 h-3 w-1/2" />
			<div className="mt-6 flex items-center justify-between">
				<Skeleton className="h-6 w-1/3" />
				<Skeleton className="h-[45px] w-[45px] rounded-[17px]" />
			</div>
		</div>
	);
}

export function CategorySkeleton() {
	return (
		<div className="h-[105px] w-[248px] shrink-0 rounded-[18px] p-4">
			<div className="flex items-center gap-4">
				<Skeleton className="h-[70px] w-[70px] rounded-lg" />
				<Skeleton className="h-5 w-1/2" />
			</div>
		</div>
	);
}
