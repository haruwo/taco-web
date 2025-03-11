import { parseTireSize, calculateTireDiameter, calculateTireCircumference, calculateRotationsPerKm } from '../lib/tireCalculator';

/**
 * タイヤ計算のテスト
 */
describe('タイヤ計算', () => {
    // タイヤサイズのパースのテスト
    describe('parseTireSize', () => {
        it('正しいフォーマットのタイヤサイズをパースできる', () => {
            const result = parseTireSize('195/50/R16');
            expect(result).toEqual({
                width: 195,
                aspectRatio: 50,
                rimDiameter: 16
            });
        });

        it('不正なフォーマットの場合はnullを返す', () => {
            expect(parseTireSize('invalid')).toBeNull();
            expect(parseTireSize('195/50R16')).toBeNull();
            expect(parseTireSize('195-50-R16')).toBeNull();
        });
    });

    // タイヤ直径計算のテスト
    describe('calculateTireDiameter', () => {
        it('タイヤの直径を正しく計算する', () => {
            // 195/50/R16の場合
            // リム径: 16インチ = 16 * 25.4 = 406.4mm
            // サイドウォール: 195mm * 50% = 97.5mm
            // 直径: 406.4 + (97.5 * 2) = 601.4mm = 0.6014m
            const diameter = calculateTireDiameter('195/50/R16');
            expect(diameter).toBeCloseTo(0.6014, 4);
        });

        it('別のタイヤサイズでも正しく計算する', () => {
            // 205/55/R17の場合
            // リム径: 17インチ = 17 * 25.4 = 431.8mm
            // サイドウォール: 205mm * 55% = 112.75mm
            // 直径: 431.8 + (112.75 * 2) = 657.3mm = 0.6573m
            const diameter = calculateTireDiameter('205/55/R17');
            expect(diameter).toBeCloseTo(0.6573, 4);
        });

        it('不正なフォーマットの場合はデフォルト値を返す', () => {
            const diameter = calculateTireDiameter('invalid');
            expect(diameter).toBe(0.65);
        });
    });

    // タイヤ外周計算のテスト
    describe('calculateTireCircumference', () => {
        it('タイヤの外周を正しく計算する', () => {
            // 195/50/R16の場合
            // 直径: 0.6014m
            // 外周: π * 直径 = π * 0.6014 ≈ 1.8894m
            const circumference = calculateTireCircumference('195/50/R16');
            expect(circumference).toBeCloseTo(1.8894, 4);
        });

        it('別のタイヤサイズでも外周を正しく計算する', () => {
            // 205/55/R17の場合
            // 直径: 0.6573m
            // 外周: π * 直径 = π * 0.6573 ≈ 2.0650m
            const circumference = calculateTireCircumference('205/55/R17');
            expect(circumference).toBeCloseTo(2.0650, 4);
        });

        it('不正なフォーマットの場合はデフォルト値に基づいて計算する', () => {
            // デフォルト直径: 0.65m
            // 外周: π * 0.65 ≈ 2.0420m
            const circumference = calculateTireCircumference('invalid');
            expect(circumference).toBeCloseTo(2.0420, 4);
        });
    });

    // 1kmあたりの回転数計算のテスト
    describe('calculateRotationsPerKm', () => {
        it('1kmあたりの回転数を正しく計算する', () => {
            // 195/50/R16の場合
            // 外周: 1.8894m
            // 1kmを走行するのに必要な回転数: 1000 / 1.8894 ≈ 529.28回転
            const rotationsPerKm = calculateRotationsPerKm('195/50/R16');
            expect(rotationsPerKm).toBeCloseTo(529.28, 2);
        });

        it('別のタイヤサイズでも1kmあたりの回転数を正しく計算する', () => {
            // 205/55/R17の場合
            // 外周: 2.0650m
            // 1kmを走行するのに必要な回転数: 1000 / 2.0650 ≈ 484.27回転
            const rotationsPerKm = calculateRotationsPerKm('205/55/R17');
            expect(rotationsPerKm).toBeCloseTo(484.27, 2);
        });
    });
});

/**
 * 実際の車両データと比較するテスト
 * 実際の車両データと計算結果を比較して、計算式が現実に即しているかを確認
 */
describe('実車データとの比較', () => {
    // 一般的な車両のデータ
    it('一般的な車両のRPM計算が実際の値に近い', () => {
        // 例: 195/50/R16, 最終減速比2.866, 5速ギア比1.286で100km/hを走行時のRPM
        // 実際の車両では約3000rpm程度になることが多い

        // タイヤの外周を計算
        const circumference = calculateTireCircumference('195/50/R16');

        // 車速100km/hをm/sに変換
        const speedMs = 100 / 3.6; // 約27.78 m/s

        // タイヤの回転数（rps）
        const wheelRps = speedMs / circumference;

        // タイヤの回転数（rpm）
        const wheelRpm = wheelRps * 60;

        // エンジン回転数 = タイヤの回転数 × ギア比 × 最終減速比
        const gearRatio = 1.286; // 5速
        const finalDriveRatio = 2.866;
        const engineRpm = wheelRpm * gearRatio * finalDriveRatio;

        // 実際の車両では約3000rpm程度になることが多いので、2700〜3300rpmの範囲内であれば妥当
        expect(engineRpm).toBeGreaterThan(2700);
        expect(engineRpm).toBeLessThan(3300);
    });
}); 