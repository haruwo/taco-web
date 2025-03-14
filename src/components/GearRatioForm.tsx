import React, { useState, useEffect, useRef } from 'react';
import Tachometer from './Tachometer';
import { calculateRPMForAllGears } from '@/lib/rpmCalculator';
import { calculateTireDiameter, calculateTireCircumference, calculateRotationsPerKm } from '@/lib/tireCalculator';
import { dump as yamlDump, load as yamlLoad } from 'js-yaml';

interface GearRatioFormProps { }

// 設定のインターフェース
interface Settings {
    gearRatios: {
        first: number;
        second: number;
        third: number;
        fourth: number;
        fifth: number;
        sixth: number;
        seventh: number;
        eighth: number;
        ninth: number;
        reverse: number;
    };
    finalDriveRatio: number;
    tireSize: string;
    yellowZone: number;
    redZone: number;
    maxRpm: number;
    startAngle: number;
    endAngle: number;
    columnsCount: number;
}

const GearRatioForm: React.FC<GearRatioFormProps> = () => {
    // デフォルト値
    const defaultGearRatios = {
        first: 5.087,
        second: 2.991,
        third: 2.035,
        fourth: 1.594,
        fifth: 1.286,
        sixth: 1.000,
        seventh: 0,
        eighth: 0,
        ninth: 0,
        reverse: 4.696
    };

    const defaultFinalDriveRatio = 2.866;
    const defaultTireSize = "195/50/R16";
    const defaultYellowZone = 7000;
    const defaultRedZone = 7500;
    const defaultMaxRpm = 8000;
    const defaultWidth = 300;
    const defaultHeight = 300;
    const defaultStartAngle = Math.PI * 0.5;
    const defaultEndAngle = Math.PI * 2.0;
    const defaultColumnsCount = 3; // デフォルトの列数

    // 状態管理
    const [gearRatios, setGearRatios] = useState(defaultGearRatios);
    const [finalDriveRatio, setFinalDriveRatio] = useState(defaultFinalDriveRatio);
    const [tireSize, setTireSize] = useState(defaultTireSize);
    const [yellowZone, setYellowZone] = useState(defaultYellowZone);
    const [redZone, setRedZone] = useState(defaultRedZone);
    const [maxRpm, setMaxRpm] = useState(defaultMaxRpm);
    const [speed, setSpeed] = useState(60);
    const [selectedGear, setSelectedGear] = useState(1);
    const [startAngle, setStartAngle] = useState(defaultStartAngle);
    const [endAngle, setEndAngle] = useState(defaultEndAngle);
    const [columnsCount, setColumnsCount] = useState(defaultColumnsCount); // 列数の状態

    // タコメーターのサイズ管理
    const [tachometerSize, setTachometerSize] = useState({ width: 300, height: 300 });
    const tachometerGridRef = useRef<HTMLDivElement>(null);

    // 各ギアでのRPMを計算
    const [rpms, setRpms] = useState<number[]>([]);

    // タイヤ外径と外周を計算
    const tireDiameter = calculateTireDiameter(tireSize);
    const tireDiameterCm = (tireDiameter * 100).toFixed(1);
    const tireCircumference = calculateTireCircumference(tireSize);
    const tireCircumferenceCm = (tireCircumference * 100).toFixed(1);
    const rotationsPerKm = calculateRotationsPerKm(tireSize).toFixed(1);

    useEffect(() => {
        const gearRatiosArray = [
            gearRatios.first,
            gearRatios.second,
            gearRatios.third,
            gearRatios.fourth,
            gearRatios.fifth,
            gearRatios.sixth,
            gearRatios.seventh,
            gearRatios.eighth,
            gearRatios.ninth,
            gearRatios.reverse
        ].filter(ratio => ratio > 0);

        const calculatedRpms = calculateRPMForAllGears(
            speed,
            gearRatiosArray,
            finalDriveRatio,
            tireSize
        );

        setRpms(calculatedRpms);
    }, [speed, gearRatios, finalDriveRatio, tireSize]);

    // タコメーターのサイズをグリッドに合わせて調整
    useEffect(() => {
        if (!tachometerGridRef.current) return;

        const updateTachometerSize = () => {
            const tachometerItems = tachometerGridRef.current?.querySelectorAll('.tachometer-item');
            if (!tachometerItems || tachometerItems.length === 0) return;

            // 最初のタコメーターアイテムのサイズを取得
            const firstItem = tachometerItems[0] as HTMLElement;
            const itemWidth = firstItem.clientWidth;
            const itemHeight = firstItem.clientHeight;

            // パディングを考慮してサイズを調整
            const padding = 32; // p-4 = 16px × 2
            const newWidth = Math.max(itemWidth - padding, 100);
            const newHeight = Math.max(newWidth, 100); // 正方形に近い形に

            setTachometerSize({ width: newWidth, height: newHeight });
        };

        // 初期サイズ設定
        updateTachometerSize();

        // ResizeObserverを使用してサイズ変更を監視
        const resizeObserver = new ResizeObserver(() => {
            updateTachometerSize();
        });

        resizeObserver.observe(tachometerGridRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, [rpms.length, columnsCount]); // RPMの数と列数が変わったときにも再計算

    // ギア比の入力ハンドラー
    const handleGearRatioChange = (gear: keyof typeof gearRatios, value: string) => {
        const numValue = parseFloat(value) || 0;
        setGearRatios(prev => ({ ...prev, [gear]: numValue }));
    };

    // 最終減速比の入力ハンドラー
    const handleFinalDriveRatioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0;
        setFinalDriveRatio(value);
    };

    // タイヤサイズの入力ハンドラー
    const handleTireSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTireSize(e.target.value);
    };

    // イエローゾーン、レッドゾーンの入力ハンドラー
    const handleYellowZoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setYellowZone(value);
    };

    const handleRedZoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setRedZone(value);
    };

    // maxRpmの入力ハンドラー
    const handleMaxRpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setMaxRpm(value);
    };

    // startAngleの入力ハンドラー
    const handleStartAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0;
        setStartAngle(value * Math.PI);
    };

    // endAngleの入力ハンドラー
    const handleEndAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0;
        setEndAngle(value * Math.PI);
    };

    // 速度の入力ハンドラー
    const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setSpeed(value);
    };

    // 選択されたギアの変更ハンドラー
    const handleGearSelect = (gear: number) => {
        setSelectedGear(gear);
    };

    // 列数の変更ハンドラー
    const handleColumnsCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 1;
        // 1〜6の範囲に制限
        const clampedValue = Math.max(1, Math.min(6, value));
        setColumnsCount(clampedValue);
    };

    // 有効なギア数を計算
    const validGearCount = Object.values(gearRatios)
        .filter((ratio, index) => ratio > 0 && index < 9) // 前進ギアのみカウント
        .length;

    // 列数に基づいたグリッドクラスを生成
    const getGridColumnsClass = () => {
        switch (columnsCount) {
            case 1: return "grid-cols-1";
            case 2: return "grid-cols-2";
            case 3: return "grid-cols-3";
            case 4: return "grid-cols-4";
            case 5: return "grid-cols-5";
            case 6: return "grid-cols-6";
            default: return "grid-cols-3";
        }
    };

    // 設定を保存する関数
    const saveSettings = () => {
        const settings: Settings = {
            gearRatios,
            finalDriveRatio,
            tireSize,
            yellowZone,
            redZone,
            maxRpm,
            startAngle,
            endAngle,
            columnsCount
        };

        const yamlStr = yamlDump(settings);
        const blob = new Blob([yamlStr], { type: 'text/yaml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'gear_settings.yaml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // 設定を読み込む関数
    const loadSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const yamlStr = e.target?.result as string;
                const settings = yamlLoad(yamlStr) as Settings;

                setGearRatios(settings.gearRatios);
                setFinalDriveRatio(settings.finalDriveRatio);
                setTireSize(settings.tireSize);
                setYellowZone(settings.yellowZone);
                setRedZone(settings.redZone);
                setMaxRpm(settings.maxRpm);
                setStartAngle(settings.startAngle);
                setEndAngle(settings.endAngle);
                setColumnsCount(settings.columnsCount);
            } catch (error) {
                console.error('設定ファイルの読み込みに失敗しました:', error);
                alert('設定ファイルの読み込みに失敗しました。ファイル形式を確認してください。');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">ギア比タコメーターアプリ</h1>

            <div className="mb-4 flex gap-4">
                <button
                    onClick={saveSettings}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    設定を保存
                </button>
                <label className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                    設定を読み込む
                    <input
                        type="file"
                        accept=".yaml,.yml"
                        onChange={loadSettings}
                        className="hidden"
                    />
                </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* タコメーター表示 */}
                <div>
                    <div className="mb-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <label className="block text-sm font-medium mb-1">速度: {speed} km/h</label>
                            <input
                                type="range"
                                min="0"
                                max="300"
                                value={speed}
                                onChange={handleSpeedChange}
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div ref={tachometerGridRef} className={`grid ${getGridColumnsClass()} gap-4`}>
                        {rpms.map((rpm, index) => {
                            // 後退ギアは除外（rpmsの最後の要素）
                            if (index === rpms.length - 1) return null;

                            let nextGearRpm: number | undefined = rpms[index + 1];
                            if (nextGearRpm > rpm) {
                                nextGearRpm = undefined;
                            }

                            return (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-md tachometer-item">
                                    <Tachometer
                                        rpm={rpm}
                                        maxRpm={maxRpm}
                                        yellowZone={yellowZone}
                                        redZone={redZone}
                                        speed={speed}
                                        gearNumber={index + 1}
                                        nextGearRpm={nextGearRpm}
                                        width={tachometerSize.width}
                                        height={tachometerSize.height}
                                        startAngle={startAngle}
                                        endAngle={endAngle}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 入力フォーム */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">ギア比設定</h2>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">第1速</label>
                            <input
                                type="number"
                                step="0.001"
                                value={gearRatios.first || ''}
                                onChange={(e) => handleGearRatioChange('first', e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">第2速</label>
                            <input
                                type="number"
                                step="0.001"
                                value={gearRatios.second || ''}
                                onChange={(e) => handleGearRatioChange('second', e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">第3速</label>
                            <input
                                type="number"
                                step="0.001"
                                value={gearRatios.third || ''}
                                onChange={(e) => handleGearRatioChange('third', e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">第4速</label>
                            <input
                                type="number"
                                step="0.001"
                                value={gearRatios.fourth || ''}
                                onChange={(e) => handleGearRatioChange('fourth', e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">第5速</label>
                            <input
                                type="number"
                                step="0.001"
                                value={gearRatios.fifth || ''}
                                onChange={(e) => handleGearRatioChange('fifth', e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">第6速</label>
                            <input
                                type="number"
                                step="0.001"
                                value={gearRatios.sixth || ''}
                                onChange={(e) => handleGearRatioChange('sixth', e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">第7速</label>
                            <input
                                type="number"
                                step="0.001"
                                value={gearRatios.seventh || ''}
                                onChange={(e) => handleGearRatioChange('seventh', e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">第8速</label>
                            <input
                                type="number"
                                step="0.001"
                                value={gearRatios.eighth || ''}
                                onChange={(e) => handleGearRatioChange('eighth', e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">第9速</label>
                            <input
                                type="number"
                                step="0.001"
                                value={gearRatios.ninth || ''}
                                onChange={(e) => handleGearRatioChange('ninth', e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">後退 (R)</label>
                            <input
                                type="number"
                                step="0.001"
                                value={gearRatios.reverse || ''}
                                onChange={(e) => handleGearRatioChange('reverse', e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">最終減速比</label>
                        <input
                            type="number"
                            step="0.001"
                            value={finalDriveRatio || ''}
                            onChange={handleFinalDriveRatioChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">タイヤサイズ (例: 195/50/R16)</label>
                        <input
                            type="text"
                            value={tireSize}
                            onChange={handleTireSizeChange}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="195/50/R16"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">開始角度 (π×)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={startAngle / Math.PI}
                                onChange={handleStartAngleChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">終了角度 (π×)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={endAngle / Math.PI}
                                onChange={handleEndAngleChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">イエローゾーン開始 (rpm)</label>
                            <input
                                type="number"
                                step="100"
                                value={yellowZone || ''}
                                onChange={handleYellowZoneChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">レッドゾーン開始 (rpm)</label>
                            <input
                                type="number"
                                step="100"
                                value={redZone || ''}
                                onChange={handleRedZoneChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">最大RPM</label>
                            <input
                                type="number"
                                step="100"
                                value={maxRpm || ''}
                                onChange={handleMaxRpmChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">タコメーター列数 (1-6)</label>
                            <input
                                type="number"
                                min="1"
                                max="6"
                                value={columnsCount}
                                onChange={handleColumnsCountChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">タイヤ情報と計算式</h3>
                    <div className="mb-2">
                        <span className="font-medium">現在のタイヤサイズ:</span> {tireSize}
                    </div>
                    <div className="mb-2">
                        <span className="font-medium">タイヤ外径:</span> {tireDiameterCm} cm
                    </div>
                    <div className="mb-2">
                        <span className="font-medium">タイヤ外周:</span> {tireCircumferenceCm} cm
                    </div>
                    <div className="mb-2">
                        <span className="font-medium">1km走行あたりの回転数:</span> {rotationsPerKm} 回転
                    </div>
                    <div className="mb-3">
                        <span className="font-medium">タイヤ外径の計算式:</span>
                        <div className="mt-1 text-sm bg-gray-50 p-2 rounded">
                            タイヤ外径 = リム径(インチ) × 25.4 + 2 × (タイヤ幅(mm) × 扁平率 ÷ 100)
                            <br />
                            <span className="text-gray-600">例: {tireSize} の場合</span>
                            <br />
                            リム径 = 16インチ, タイヤ幅 = 195mm, 扁平率 = 50%
                            <br />
                            タイヤ外径 = 16 × 25.4 + 2 × (195 × 50 ÷ 100) = {tireDiameterCm} cm
                        </div>
                    </div>
                    <div className="mb-2">
                        <span className="font-medium">タイヤ外周の計算式:</span>
                        <div className="mt-1 text-sm bg-gray-50 p-2 rounded">
                            タイヤ外周 = π × タイヤ外径
                            <br />
                            <span className="text-gray-600">例: {tireSize} の場合</span>
                            <br />
                            タイヤ外周 = π × {tireDiameterCm} cm = {tireCircumferenceCm} cm
                        </div>
                    </div>
                    <div className="mb-2">
                        <span className="font-medium">RPM計算式:</span>
                        <div className="mt-1 text-sm bg-gray-50 p-2 rounded">
                            RPM = (速度[km/h] × ギア比 × 最終減速比 × 60) ÷ (タイヤ外周[m] × 3.6)
                        </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">現在の設定:</span> 最終減速比 = {finalDriveRatio}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GearRatioForm; 