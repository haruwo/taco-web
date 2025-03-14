import { PresetInfo } from '@/types/settings';
import yaml from 'js-yaml';
import { Preset } from '@/types/preset';

// 本番環境でのベースパスを取得
const getBasePath = () => {
    return process.env.NODE_ENV === 'production' ? '/taco-web' : '';
};

/**
 * プリセットインデックスを読み込む
 * @returns プリセットの配列
 */
export async function loadPresets(): Promise<Preset[]> {
    try {
        const basePath = getBasePath();
        const response = await fetch(`${basePath}/presets/index.yaml`);
        if (!response.ok) {
            throw new Error(`プリセットインデックスの読み込みに失敗しました: ${response.statusText}`);
        }
        const yamlText = await response.text();
        const data = yaml.load(yamlText) as { presets: Preset[] };
        return data.presets || [];
    } catch (error) {
        console.error('プリセットの読み込みに失敗しました:', error);
        return [];
    }
}

/**
 * モデルコードからプリセットを取得する
 * @param modelCode モデルコード
 * @returns プリセット、見つからない場合は undefined
 */
export async function getPresetByModelCode(modelCode: string): Promise<Preset | undefined> {
    const presets = await loadPresets();
    return presets.find(preset => preset.modelCode === modelCode);
}

/**
 * 特定のプリセットの詳細データを読み込む
 * @param modelCode モデルコード
 * @returns プリセットの詳細データ
 */
export async function loadPresetDetails(modelCode: string): Promise<any> {
    try {
        const basePath = getBasePath();
        const response = await fetch(`${basePath}/presets/${modelCode}.yaml`);
        if (!response.ok) {
            throw new Error(`プリセット ${modelCode} の読み込みに失敗しました: ${response.statusText}`);
        }
        const yamlText = await response.text();
        return yaml.load(yamlText);
    } catch (error) {
        console.error(`プリセット ${modelCode} の詳細の読み込みに失敗しました:`, error);
        return null;
    }
}

// 後方互換性のために残す
export const presets: PresetInfo[] = [
    {
        modelCode: "ND5RC",
        description: "マツダ ロードスター（ND 1.5）",
        url: "/presets/ND5RC.yaml"
    }
];

// 後方互換性のために残す（非同期版を使用することを推奨）
export const getPresetByModelCodeSync = (modelCode: string): PresetInfo | undefined => {
    return presets.find(preset => preset.modelCode === modelCode);
};

// 後方互換性のために残す（loadPresetDetails を使用することを推奨）
export const loadPresetSettings = async (modelCode: string): Promise<any> => {
    const preset = getPresetByModelCodeSync(modelCode);
    if (!preset) {
        throw new Error(`プリセット ${modelCode} が見つかりません`);
    }

    try {
        const basePath = getBasePath();
        const response = await fetch(`${basePath}${preset.url}`);
        if (!response.ok) {
            throw new Error(`プリセットの読み込みに失敗しました: ${response.statusText}`);
        }

        const yamlText = await response.text();
        return yamlText;
    } catch (error) {
        console.error('プリセットの読み込みに失敗しました:', error);
        throw new Error(`プリセット ${modelCode} の読み込みに失敗しました`);
    }
}; 