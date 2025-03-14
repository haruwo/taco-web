/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',  // 静的HTMLとしてエクスポート

    // GitHub Pagesのリポジトリ名を設定（例: /taco-web）
    // 本番環境でのみ適用
    basePath: process.env.NODE_ENV === 'production' ? '/taco-web' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/taco-web/' : '',

    // 画像の最適化を無効化（静的出力では必要）
    images: {
        unoptimized: true,
    },

    // プリセットファイルのパスを修正
    async rewrites() {
        return [
            {
                source: '/presets/:path*',
                destination: '/presets/:path*',
            },
        ];
    },
}

module.exports = nextConfig 