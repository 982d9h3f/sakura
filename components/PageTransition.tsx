import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps extends HTMLMotionProps<"div"> {
	children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, ...props }) => {
	return (
		<motion.div
			initial={{ y: "100vh" }}
			animate={{ y: 0 }}
			exit={{ y: "-100vh" }}
			transition={{ duration: 0.8, ease: "easeOut" }}
			style={{ position: "absolute", width: "100%", height: "100%" }}
			{...props}
		>
			{children}
		</motion.div>
	);
};

export default PageTransition;
