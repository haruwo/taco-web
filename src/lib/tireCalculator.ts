/**
 * タイヤサイズから直径を計算するユーティリティ
 * 例: 195/50/R16 -> タイヤの直径をメートルで返す
 */

/**
 * タイヤサイズの文字列をパースする
 * @param tireSize 例: "195/50/R16"
 * @returns パースされたタイヤサイズ情報
 */
export function parseTireSize(tireSize: string): { width: number; aspectRatio: number; rimDiameter: number } | null {
    // 正規表現でタイヤサイズをパース
    const regex = /^(\d+)\/(\d+)\/R(\d+)$/;
    const match = tireSize.match(regex);

    if (!match) {
        return null;
    }

    const width = parseInt(match[1], 10);        // タイヤの幅 (mm)
    const aspectRatio = parseInt(match[2], 10);  // 扁平率 (%)
    const rimDiameter = parseInt(match[3], 10);  // リム径 (インチ)

    return { width, aspectRatio, rimDiameter };
}

/**
 * タイヤの直径を計算する (メートル単位)
 * @param tireSize タイヤサイズ文字列 (例: "195/50/R16")
 * @returns タイヤの直径 (メートル)
 */
export function calculateTireDiameter(tireSize: string): number {
    const parsedSize = parseTireSize(tireSize);

    if (!parsedSize) {
        // デフォルト値を返す (一般的な乗用車のタイヤサイズ)
        return 0.65; // 約65cm
    }

    const { width, aspectRatio, rimDiameter } = parsedSize;

    // サイドウォールの高さ (mm)
    const sidewallHeight = (width * aspectRatio) / 100;

    // リム径をmmに変換 (1インチ = 25.4mm)
    const rimDiameterMm = rimDiameter * 25.4;

    // タイヤの直径 = リム径 + (サイドウォールの高さ × 2)
    const tireDiameterMm = rimDiameterMm + (sidewallHeight * 2);

    // mmをメートルに変換
    return tireDiameterMm / 1000;
} 