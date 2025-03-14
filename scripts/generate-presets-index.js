const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// プリセットディレクトリのパス
const presetsDir = path.join(process.cwd(), 'public', 'presets');
// 出力ファイルのパス
const outputFile = path.join(presetsDir, 'index.yaml');

// プリセットディレクトリ内のYAMLファイルを取得
const presetFiles = fs.readdirSync(presetsDir)
    .filter(file => file.endsWith('.yaml') || file.endsWith('.yml'))
    .filter(file => file !== 'index.yaml'); // index.yaml 自体を除外

// 各プリセットファイルから情報を抽出
const presets = presetFiles.map(file => {
    const filePath = path.join(presetsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(content);

    return {
        modelCode: data.modelCode,
        description: data.description
    };
});

// YAML形式でデータを出力
const yamlContent = yaml.dump({ presets }, {
    indent: 2,
    lineWidth: -1, // 行の折り返しを無効化
    noRefs: true // 参照を使用しない
});

// ファイルに書き込み
fs.writeFileSync(outputFile, yamlContent);

console.log(`✅ プリセットインデックスを生成しました: ${outputFile}`); 