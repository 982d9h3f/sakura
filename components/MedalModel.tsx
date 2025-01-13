// Install required dependencies
// npm install three
// Install required dependencies
// npm install three
'use client' 
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type MedalViewerProps = {
	width: number;  // widthは数値型
	height: number; // heightは数値型
};

const MedalViewer: React.FC<MedalViewerProps> = ({ width, height }) => {
	const mountRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		// 親の幅と高さが有効でない場合は何もしない
		if (typeof window === "undefined") return; 
		if (!mountRef.current || !width || !height) return;
		if (mountRef.current.childElementCount > 0) return;

		// シーン、カメラ、レンダラーのセットアップ
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
		camera.position.z = 4.1;

		const renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setClearColor(0x000000, 0); // 背景を透明に設定
		renderer.setSize(width, height);
		mountRef.current.appendChild(renderer.domElement);

		// アンビエントライトの追加
		const ambientLight = new THREE.AmbientLight(0xffffff, 50);
		scene.add(ambientLight);

		// ディレクショナルライトの追加
		const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
		directionalLight.position.set(5, 5, 5);
		scene.add(directionalLight);

		// GLTFモデルのロード
		const loader = new GLTFLoader();
		let model: THREE.Object3D | undefined;
		let time = 0; // アニメーション用の時間変数

		loader.load(
			"/SAKURA_Medal.glb",
			(gltf) => {
				model = gltf.scene;
				model.rotation.x = Math.PI / 2; // X軸周りに90度回転
				model.rotation.y = 0;
				model.rotation.z = 0;
				scene.add(model);
			},
			undefined,
			(error) => {
				console.error("モデルの読み込み中にエラーが発生しました:", error);
			}
		);

		// オービットコントロールの追加
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableZoom = false;   // マウスホイールによるズームを無効化
		controls.enableRotate = false; // 回転を無効化
		controls.enablePan = false;    // パンを無効化

		// アニメーションループ
		const animate = () => {
			requestAnimationFrame(animate);

			if (window.innerWidth <= 7) {
				renderer.render(scene, camera);
				return;
			}
			if (model) {
				const range = Math.PI / 45; // 振動範囲を定義
				time += 0.01; // 時間変数を増加
				model.rotation.x = Math.PI / 2 + range * Math.sin(time);        // X軸周りに振動
				model.rotation.y = range * Math.sin(time * 1.5);                // Y軸周りに少し異なる速度で振動
			}

			controls.update();
			renderer.render(scene, camera);
		};
		animate();

		// コンポーネントのクリーンアップ処理
		return () => {
			if (mountRef.current && renderer.domElement) {
				mountRef.current.removeChild(renderer.domElement);
			}
			// THREE.js 関連のリソースを適切に解放する処理を追加することも検討してください。
		};
	}, [width, height]); // width, height に依存

	return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
};

export default MedalViewer;