import React from 'react';
import { motion } from 'framer-motion';

const colors = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#CBA6FF'];

interface SpinningBoxesProps {
	keepAnimation?: boolean; // アニメーションをキープするオプション引数
}

const SpinningBoxes: React.FC<SpinningBoxesProps> = ({ keepAnimation = false }) => {
	const boxVariants = {
		initial: (index: number) => ({
			rotate: 0,
			scale: 1,
			x: Math.sin(index) * 30,
			y: Math.cos(index) * 30,
		}),
		animate: (index: number) => ({
			rotate: 360,
			scale: [1, 1.2, 1],
			x: [Math.sin(index) * 30, Math.sin(index) * 40, Math.sin(index) * 30],
			y: [Math.cos(index) * 30, Math.cos(index) * 40, Math.cos(index) * 30],
			transition: {
				duration: 2,
				repeat: Infinity,
				ease: 'linear',
			},
		}),
	};

	return (
		<motion.div
			initial={{ opacity: 1 }}
			animate={{ opacity: keepAnimation ? 1 : 0 }}
			transition={{ duration: 1, delay: 1 }}
			style={{
				position: 'fixed',
				top: '0',
				left: '0',
				width: '100%',
				height: '100%',
				backgroundColor: 'rgba(255, 255, 255, 1)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: 1500,
				pointerEvents: keepAnimation ? 'auto' : 'none', // 条件に応じて透過設定を切り替え
			}}
		>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-10%, -50%)', // 厳密な中央配置
					width: '100px',
					height: '100px',
				}}
			>
				{colors.map((color, index) => (
					<motion.div
						key={index}
						custom={index}
						initial="initial"
						animate="animate"
						variants={boxVariants}
						style={{
							width: '30px',
							height: '30px',
							backgroundColor: color,
							position: 'absolute',
							borderRadius: '4px', // 四角い形状
						}}
					/>
				))}
			</div>
		</motion.div>
	);
};

export default SpinningBoxes;

/*
import React from 'react';
import { motion } from 'framer-motion';

const colors = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#CBA6FF'];

interface SpinningBoxesProps {
	keepAnimation?: boolean; // アニメーションをキープするオプション引数
}

const SpinningBoxes: React.FC<SpinningBoxesProps> = ({ keepAnimation = false }) => {
	const boxVariants = {
		initial: (index: number) => ({
			rotate: 0,
			scale: 1,
			x: Math.sin(index) * 30,
			y: Math.cos(index) * 30,
		}),
		animate: (index: number) => ({
			rotate: 360,
			scale: [1, 1.2, 1],
			x: [Math.sin(index) * 30, Math.sin(index) * 40, Math.sin(index) * 30],
			y: [Math.cos(index) * 30, Math.cos(index) * 40, Math.cos(index) * 30],
			transition: {
				duration: 2,
				repeat: Infinity,
				ease: 'linear',
			},
		}),
	};

	return (
		<motion.div
			initial={{ opacity: 1 }}
			animate={{ opacity: keepAnimation ? 1 : 0 }}
			transition={{ duration: 1, delay: 1 }}
			style={{
				position: 'absolute',
				top: '0',
				left: '0',
				width: '100%',
				height: '100%',
				backgroundColor: 'rgba(255, 255, 255, 1)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: 1500,
				pointerEvents: 'none', // 透過設定
			}}
		>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-10%, -50%)', // 厳密な中央配置
					width: '100px',
					height: '100px',
				}}
			>
				{colors.map((color, index) => (
					<motion.div
						key={index}
						custom={index}
						initial="initial"
						animate="animate"
						variants={boxVariants}
						style={{
							width: '30px',
							height: '30px',
							backgroundColor: color,
							position: 'absolute',
							borderRadius: '4px', // 四角い形状
						}}
					/>
				))}
			</div>
		</motion.div>
	);
};
export default SpinningBoxes;
*/