import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PostModal({ isModalOpen, previewBlog, setPreviewBlog, setIsModalOpen, handlePostBlog }) {
    const [animatedTitle, setAnimatedTitle] = useState("");
    const [animatedContent, setAnimatedContent] = useState("");
    const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (isModalOpen && previewBlog && !hasAnimated.current) {
            setAnimatedTitle("");
            setAnimatedContent("");
            hasAnimated.current = true;

            const typeText = (text, setTextFunction, index = 0) => {
                if (index < text.length) {
                    setTextFunction((prev) => prev + text[index]);
                    setTimeout(() => typeText(text, setTextFunction, index + 1), 15);
                }
            };

            typeText(previewBlog.title, setAnimatedTitle);
            setTimeout(() => typeText(previewBlog.content, setAnimatedContent), 500);
        }
    }, [isModalOpen, previewBlog]);

    const handleTitleChange = (e) => {
        setAnimatedTitle(e.target.value);
        setPreviewBlog((prev) => ({ ...prev, title: e.target.value }));
    };

    const handleContentChange = (e) => {
        setAnimatedContent(e.target.value);
        setPreviewBlog((prev) => ({ ...prev, content: e.target.value }));
    };

    const handleImageChange = (e) => {
        setPreviewBlog((prev) => ({ ...prev, img: e.target.value }));
    };

    return (
        <>
            <AnimatePresence>
                {isModalOpen && previewBlog && (
                    <motion.div
                        className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white p-4 px-6 pb-6 rounded-lg shadow-lg w-full max-w-3xl"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-xl font-semibold mb-3">AI Generated Preview</h2>
                            {previewBlog.img && (
                                <div className="relative h-50 w-full cursor-pointer" onClick={() => setIsImagePreviewOpen(true)}>
                                    <img
                                        src={previewBlog.img}
                                        alt="Preview"
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                    {/* Overlay with gradient and text */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 flex items-center justify-center rounded-xl">
                                        <span className="text-white font-semibold text-lg">Preview Image</span>
                                    </div>
                                </div>
                            )}
                            <input
                                type="hidden"
                                value={previewBlog.img}
                                onChange={handleImageChange}
                                className="w-full p-2 px-4 bg-neutral-100 rounded-lg mt-2"
                            />
                            <input
                                type="text"
                                value={animatedTitle}
                                onChange={handleTitleChange}
                                className="w-full p-2 px-4 bg-neutral-100 rounded-lg mt-2"
                            />
                            <textarea
                                value={animatedContent}
                                onChange={handleContentChange}
                                className="w-full p-2 px-4 bg-neutral-100 rounded-lg mt-2 h-70"
                            />
                            <div className="flex justify-end mt-4 gap-2">
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        hasAnimated.current = false;
                                    }}
                                    className="px-4 py-2 text-sm border border-neutral-500 text-neutral-500 hover:border-neutral-600 hover:text-neutral-600 cursor-pointer rounded-full"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handlePostBlog}
                                    className="px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer rounded-full"
                                >
                                    Post Blog
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>

                )}
            </AnimatePresence>

            {/* Image Preview Modal */}
            <AnimatePresence>
                {isImagePreviewOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="relative bg-white p-4 rounded-lg shadow-lg"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <button
                                className="absolute top-2 right-2 text-white bg-black/50 px-2 py-1 rounded-full hover:bg-black"
                                onClick={() => setIsImagePreviewOpen(false)} // Close preview modal
                            >
                                ✕
                            </button>
                            <img src={previewBlog.img} alt="Full Preview" className="max-w-full max-h-[80vh] rounded-lg" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>

    );
}
