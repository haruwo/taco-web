import { calculateTireDiameter } from './tireCalculator';

/**
 * 車両の速度とギア比からエンジン回転数を計算する
 * @param speedKmh 車両の速度 (km/h)
 * @param gearRatio ギア比
 * @param finalDriveRatio 最終減速比
 * @param tireSize タイヤサイズ (例: "195/50/R16")
 * @returns エンジン回転数 (rpm)
 */
export function calculateRPM(
    speedKmh: number,
    gearRatio: number,
    finalDriveRatio: number,
    tireSize: string
): number {
    // タイヤの直径 (メートル)
    const tireDiameter = calculateTireDiameter(tireSize);

    // タイヤの円周 (メートル)
    const tireCircumference = Math.PI * tireDiameter;

    // 速度をm/sに変換
    const speedMs = speedKmh / 3.6;

    // タイヤの回転数 (rps - 1秒あたりの回転数)
    const wheelRps = speedMs / tireCircumference;

    // タイヤの回転数 (rpm - 1分あたりの回転数)
    const wheelRpm = wheelRps * 60;

    // エンジン回転数 = タイヤの回転数 × ギア比 × 最終減速比
    const engineRpm = wheelRpm * gearRatio * finalDriveRatio;

    return Math.round(engineRpm);
}

/**
 * 各ギアでのRPMを計算する
 * @param speedKmh 車両の速度 (km/h)
 * @param gearRatios 各ギアのギア比の配列
 * @param finalDriveRatio 最終減速比
 * @param tireSize タイヤサイズ
 * @returns 各ギアでのRPMの配列
 */
export function calculateRPMForAllGears(
    speedKmh: number,
    gearRatios: number[],
    finalDriveRatio: number,
    tireSize: string
): number[] {
    return gearRatios.map(ratio =>
        calculateRPM(speedKmh, ratio, finalDriveRatio, tireSize)
    );
} 