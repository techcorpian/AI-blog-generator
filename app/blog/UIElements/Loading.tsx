interface LoadingBlockProps {
    height: string;
    additionalClasses?: string;
  }

const LoadingBlock: React.FC<LoadingBlockProps> = ({ height, additionalClasses = '' }) => {
    return (
      <div className={`bg-gray-200 my-1 w-full rounded-xl ${height} animate-pulse ${additionalClasses}`}></div>
    );
  };

  interface LoadingItemProps {
    smallHeight?: string;
    mediumHeight?: string;
    largeHeight?: string;
  }
  
  const Loading: React.FC<LoadingItemProps> = ({
    smallHeight = 'h-5',
    mediumHeight = 'h-8',
    largeHeight = 'h-50',
  }) => {
    return (
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-14 mt-4 md:mt-6 mx-4">
        {Array(8).fill(undefined).map((_, index: number) => (
          <div key={index}>
            <LoadingBlock height={largeHeight} />
            <LoadingBlock height={smallHeight} additionalClasses="mt-6 w-3/4 rounded-lg" />
            <LoadingBlock height={mediumHeight} />
            <LoadingBlock height={mediumHeight} />
            <LoadingBlock height={smallHeight} additionalClasses="mt-6" />
            <LoadingBlock height={smallHeight} />
            <LoadingBlock height={smallHeight} />
            <LoadingBlock height={smallHeight} />
            <LoadingBlock height={smallHeight} />
          </div>
        ))}
      </div>
    );
  };
  
  export default Loading;