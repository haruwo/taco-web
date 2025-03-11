import React, { useState, useEffect } from 'react';
import Tachometer from './Tachometer';
import { calculateRPMForAllGears } from '@/lib/rpmCalculator';

interface GearRatioFormProps { }

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

    // 状態管理
    const [gearRatios, setGearRatios] = useState(defaultGearRatios);
    const [finalDriveRatio, setFinalDriveRatio] = useState(defaultFinalDriveRatio);
    const [tireSize, setTireSize] = useState(defaultTireSize);
    const [yellowZone, setYellowZone] = useState(defaultYellowZone);
    const [redZone, setRedZone] = useState(defaultRedZone);
    const [maxRpm, setMaxRpm] = useState(defaultMaxRpm);
    const [speed, setSpeed] = useState(60);
    const [selectedGear, setSelectedGear] = useState(1);

    // 各ギアでのRPMを計算
    const [rpms, setRpms] = useState<number[]>([]);

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

    // 速度の入力ハンドラー
    const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setSpeed(value);
    };

    // 選択されたギアの変更ハンドラー
    const handleGearSelect = (gear: number) => {
        setSelectedGear(gear);
    };

    // 有効なギア数を計算
    const validGearCount = Object.values(gearRatios)
        .filter((ratio, index) => ratio > 0 && index < 9) // 前進ギアのみカウント
        .length;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">ギア比タコメーターアプリ</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 左側: 入力フォーム */}
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
                            <label className="block text-sm font-medium mb-1">第7速 (オプション)</label>
                            <input
                                type="number"
                                step="0.001"
                                value={gearRatios.seventh || ''}
                                onChange={(e) => handleGearRatioChange('seventh', e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">第8速 (オプション)</label>
                            <input
                                type="number"
                                step="0.001"
                                value={gearRatios.eighth || ''}
                                onChange={(e) => handleGearRatioChange('eighth', e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">第9速 (オプション)</label>
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
                    </div>

                    <div className="mb-6">
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

                {/* 右側: タコメーター表示 */}
                <div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">速度 (km/h)</label>
                        <input
                            type="number"
                            value={speed}
                            onChange={handleSpeedChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {rpms.map((rpm, index) => {
                            // 後退ギアは除外（rpmsの最後の要素）
                            if (index === rpms.length - 1) return null;

                            return (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                                    <Tachometer
                                        rpm={rpm}
                                        maxRpm={maxRpm}
                                        yellowZone={yellowZone}
                                        redZone={redZone}
                                        speed={speed}
                                        gearNumber={index + 1}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GearRatioForm; 