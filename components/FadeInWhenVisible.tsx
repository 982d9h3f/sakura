'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInWhenVisibleProps {
	children: React.ReactNode;
}

const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({ children }) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true }); // 一度だけトリガー

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 70 }} // 初期状態（透明で下から）
			animate={isInView ? { opacity: 1, y: 0 } : {}} // 表示時の状態
			transition={{ duration: 1, ease: "easeOut" }} // アニメーションの時間とイージング
		>
			{children}
		</motion.div>
	);
};

export default FadeInWhenVisible;
