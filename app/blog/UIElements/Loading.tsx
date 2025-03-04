export default function Loading() {
    return (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-14 mt-4 md:mt-6 mx-4">
            {Array(8).fill(undefined).map((_, index: number) => (
                <div key={index}>
                    <div className="bg-gray-200 my-1 w-full rounded-xl h-50 animate-pulse"></div>
                    <div className="bg-gray-200 mt-6 w-3/4 rounded-lg h-5 animate-pulse"></div>
                    <div className="bg-gray-200 my-1 w-full rounded-lg h-8 animate-pulse"></div>
                    <div className="bg-gray-200 my-1 w-full rounded-lg h-8 animate-pulse"></div>
                    <div className="bg-gray-200 mt-6 w-full rounded-lg h-5 animate-pulse"></div>
                    <div className="bg-gray-200 my-1 w-full rounded-lg h-5 animate-pulse"></div>
                    <div className="bg-gray-200 my-1 w-full rounded-lg h-5 animate-pulse"></div>
                    <div className="bg-gray-200 my-1 w-full rounded-lg h-5 animate-pulse"></div>
                    <div className="bg-gray-200 my-1 w-full rounded-lg h-5 animate-pulse"></div>
                </div>
            ))}
        </div>
    );
};