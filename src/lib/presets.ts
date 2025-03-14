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

// 後方互換性のために残す関数
// 非同期版の loadPresets() を使用することを推奨
export const presets: PresetInfo[] = [];

// 初期化時に index.yaml からプリセットを読み込む
if (typeof window !== 'undefined') {
    loadPresets().then(loadedPresets => {
        // 既存の配列を空にする
        presets.length = 0;
        // 読み込んだプリセットを追加
        loadedPresets.forEach(preset => {
            presets.push({
                modelCode: preset.modelCode,
                description: preset.description,
                url: `/presets/${preset.modelCode}.yaml`
            });
        });
    }).catch(error => {
        console.error('プリセットの初期化に失敗しました:', error);
    });
}

// 後方互換性のために残す（非同期版を使用することを推奨）
export const getPresetByModelCodeSync = (modelCode: string): PresetInfo | undefined => {
    return presets.find(preset => preset.modelCode === modelCode);
};

// 後方互換性のために残す（loadPresetDetails を使用することを推奨）
export const loadPresetSettings = async (modelCode: string): Promise<any> => {
    // 非同期版を使用
    const preset = await getPresetByModelCode(modelCode);
    if (!preset) {
        throw new Error(`プリセット ${modelCode} が見つかりません`);
    }

    return loadPresetDetails(modelCode);
}; 