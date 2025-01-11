import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

interface RandomImageSwitcherProps {
	imageSet: string[]; // 画像配列（1次元）
}

const RandomImageSwitcher: React.FC<RandomImageSwitcherProps> = ({ imageSet }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0); // 現在表示中の画像のインデックス
	const [fade, setFade] = useState<boolean>(false); // フェードイン・アウト制御

	// 画像切り替え処理
	useEffect(() => {
		const randomInterval = Math.random() * 2000 + 5000; // 3秒〜5秒のランダム間隔
		const timer = setInterval(() => {
			setFade(true); // フェードアウト開始
			setTimeout(() => {
				// 次の画像のインデックスを計算
				setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageSet.length); // ループ処理
				setFade(false); // フェードイン開始
			}, 300); // フェードアウト時間 (0.8秒)
		}, randomInterval);

		// クリーンアップ
		return () => clearInterval(timer);
	}, [imageSet]);

	return (
		<Box
			bg="pink.200"
			display="flex"
			justifyContent="center"
			alignItems="center"
			w="100%"
			h="100%"
			minH="280px"
			overflow="hidden"
			position="relative"
			_hover={{ cursor: 'pointer' }}
		>
			<img
				src={imageSet[currentImageIndex]} // 現在の画像を表示
				alt={`Image ${currentImageIndex}`}
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out', // スムーズな切り替えと拡大
					opacity: fade ? 0 : 1, // フェードイン・アウト
					transform: fade ? 'scale(1)' : 'scale(1.2)', // スケールアップ
					position: 'absolute', // スムーズに切り替えるために重ねる
				}}
			/>
		</Box>
	);
};

export default RandomImageSwitcher;
