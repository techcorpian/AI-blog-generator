import { useContext } from 'react';
import { HiOutlineSparkles } from "react-icons/hi2";
import { BlogContext } from '../context/BlogContext';

const InputGen: React.FC = () => {
  const { topic, generate, handleGenerate, handleChange } =
  useContext(BlogContext) ?? {};

  return (
    <form
      onSubmit={handleGenerate}
      className="mb-6 flex gap-3 items-center bg-white/10 backdrop-blur-lg p-0 rounded-full shadow-lg border border-neutral-300"
    >
      <input
        type="text"
        placeholder="Enter a topic..."
        value={topic}
        onChange={handleChange}
        className="flex-1 p-3 pl-6 rounded-full bg-transparent border border-white/30 text-black placeholder-gray-400 focus:outline-none w-full"
      />
      <button
        type="submit"
        className="px-5 py-3 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 text-white font-semibold shadow-md hover:scale-105 transition-transform duration-300 disabled:opacity-50 cursor-pointer"
        disabled={generate}
      >
        {generate ? (
          <HiOutlineSparkles className="text-2xl text-white glow" />
        ) : (
          <HiOutlineSparkles className="text-xl" />
        )}
        <div className="md:block hidden">{generate ? "Generating..." : "Generate Blog"}</div>
      </button>
    </form>
  );
};

export default InputGen;
