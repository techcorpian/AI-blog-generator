export default function ViewLoading() {
    return(
        <div className="flex flex-col justify-center rounded-lg items-center max-w-3xl mx-auto p-4">
            <p className="bg-gray-200 mt-12 w-1/2 h-5 rounded-lg animate-pulse "></p>
            <h1 className="bg-gray-200 my-4 w-full h-20 rounded-lg animate-pulse"></h1>
            <div className="bg-gray-200 my-4 w-full h-100 my-7 rounded-lg animate-pulse"></div>

            {Array(5).fill(undefined).map((_, index: number) => (
                <p key={index} className="bg-gray-200 my-1 w-full h-5 rounded-lg animate-pulse"></p>
            ))}

        </div>
    );
}