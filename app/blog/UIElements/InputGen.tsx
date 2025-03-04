import { HiOutlineSparkles } from "react-icons/hi2";

interface InputGenProps {
  handleGenerate: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  topic: string;
}

const InputGen: React.FC<InputGenProps> = ({ handleGenerate, handleChange, loading, topic }) => {
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
        disabled={loading}
      >
        {loading ? (
          <HiOutlineSparkles className="text-2xl text-white glow" />
        ) : (
          <HiOutlineSparkles className="text-xl" />
        )}
        <div className="md:block hidden">{loading ? "Generating..." : "Generate Blog"}</div>
      </button>
    </form>
  );
};

export default InputGen;
