import React from 'react';
import { PresetInfo } from '@/types/settings';
import { Preset } from '@/types/preset';

interface PresetSelectorProps {
    onSelect: (preset: PresetInfo) => void;
    presets?: Preset[];
}

const PresetSelector: React.FC<PresetSelectorProps> = ({ onSelect, presets = [] }) => {
    if (presets.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <h2 className="text-xl font-semibold mb-4">プリセット選択</h2>
                <p>プリセットを読み込み中...</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-4">プリセット選択</h2>
            <div className="grid gap-4">
                {presets.map((preset) => (
                    <button
                        key={preset.modelCode}
                        onClick={() => onSelect({
                            modelCode: preset.modelCode,
                            description: preset.description,
                            url: `/presets/${preset.modelCode}.yaml`
                        })}
                        className="flex flex-col items-start p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <span className="font-medium">{preset.modelCode}</span>
                        <span className="text-gray-600">{preset.description}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PresetSelector; 