import { PresetInfo } from '@/types/settings';

// 本番環境でのベースパスを取得
const getBasePath = () => {
    return process.env.NODE_ENV === 'production' ? '/taco-web' : '';
};

export const presets: PresetInfo[] = [
    {
        modelCode: "ND5RC",
        description: "マツダ ロードスター（ND 1.5）",
        url: "/presets/ND5RC.yaml"
    }
];

export const getPresetByModelCode = (modelCode: string): PresetInfo | undefined => {
    return presets.find(preset => preset.modelCode === modelCode);
};

export const loadPresetSettings = async (modelCode: string): Promise<any> => {
    const preset = getPresetByModelCode(modelCode);
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