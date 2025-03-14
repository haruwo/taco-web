import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TachometerProps {
    rpm: number;
    maxRpm: number;
    yellowZone: number;
    redZone: number;
    speed: number;
    gearNumber: number | string;
    width?: number;
    height?: number;
    startAngle?: number;
    endAngle?: number;
    nextGearRpm?: number;
}

const Tachometer: React.FC<TachometerProps> = ({
    rpm,
    maxRpm = 8000,
    yellowZone = 7000,
    redZone = 7500,
    speed,
    gearNumber,
    width = 300,
    height = 300,
    startAngle = Math.PI * 0.5,
    endAngle = Math.PI * 2.0,
    nextGearRpm,
}) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        // SVGのサイズと中心点
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 20;

        // サイズに応じたフォントサイズを計算
        const scaleFactor = Math.min(width, height) / 300; // 300pxを基準にスケーリング
        const tickFontSize = Math.max(8, Math.round(12 * scaleFactor));
        const rpmFontSize = Math.max(16, Math.round(24 * scaleFactor));
        const speedFontSize = Math.max(14, Math.round(20 * scaleFactor));
        const gearFontSize = Math.max(18, Math.round(28 * scaleFactor));

        // 針と目盛りのサイズも調整
        const needleBaseSize = Math.max(2, Math.round(3 * scaleFactor));
        const tickWidth = Math.max(1, Math.round(2 * scaleFactor));
        const centerCircleRadius = Math.max(6, Math.round(10 * scaleFactor));
        const innerCircleRadius = Math.max(4, Math.round(6 * scaleFactor));

        // 角度の範囲（左下から右下まで、時計回り）
        const quarterAngle = Math.PI * 0.5;

        // RPMの範囲を角度に変換する関数（時計回りに回転）
        const scaleRpm = d3.scaleLinear()
            .domain([0, maxRpm])
            .range([startAngle, endAngle]);

        // 背景の円弧を描画
        const arcBackground = d3.arc()
            .innerRadius(radius - (30 * scaleFactor))
            .outerRadius(radius)
            .startAngle(startAngle + quarterAngle)
            .endAngle(endAngle + quarterAngle);

        svg.append('path')
            .attr('d', arcBackground as any)
            .attr('transform', `translate(${centerX}, ${centerY})`)
            .attr('fill', '#e0e0e0');

        // イエローゾーンの円弧を描画
        if (yellowZone < maxRpm) {
            const arcYellow = d3.arc()
                .innerRadius(radius - (30 * scaleFactor))
                .outerRadius(radius)
                .startAngle(scaleRpm(yellowZone) + quarterAngle)
                .endAngle(scaleRpm(Math.min(redZone, maxRpm)) + quarterAngle);

            svg.append('path')
                .attr('d', arcYellow as any)
                .attr('transform', `translate(${centerX}, ${centerY})`)
                .attr('fill', '#FFD700');
        }

        // レッドゾーンの円弧を描画
        if (redZone < maxRpm) {
            const arcRed = d3.arc()
                .innerRadius(radius - (30 * scaleFactor))
                .outerRadius(radius)
                .startAngle(scaleRpm(redZone) + quarterAngle)
                .endAngle(scaleRpm(maxRpm) + quarterAngle);

            svg.append('path')
                .attr('d', arcRed as any)
                .attr('transform', `translate(${centerX}, ${centerY})`)
                .attr('fill', '#FF0000');
        }

        // 目盛りを描画
        const tickStep = maxRpm <= 10000 ? 1000 : 2000;
        const ticks = d3.range(0, maxRpm + 1, tickStep);

        ticks.forEach(tick => {
            const angle = scaleRpm(tick);
            const x1 = centerX + (radius - (30 * scaleFactor)) * Math.cos(angle);
            const y1 = centerY + (radius - (30 * scaleFactor)) * Math.sin(angle);
            const x2 = centerX + (radius - (10 * scaleFactor)) * Math.cos(angle);
            const y2 = centerY + (radius - (10 * scaleFactor)) * Math.sin(angle);

            svg.append('line')
                .attr('x1', x1)
                .attr('y1', y1)
                .attr('x2', x2)
                .attr('y2', y2)
                .attr('stroke', 'black')
                .attr('stroke-width', tickWidth);

            // 目盛りにラベルを追加
            const labelX = centerX + (radius - (45 * scaleFactor)) * Math.cos(angle);
            const labelY = centerY + (radius - (45 * scaleFactor)) * Math.sin(angle);

            svg.append('text')
                .attr('x', labelX)
                .attr('y', labelY)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .attr('font-size', `${tickFontSize}px`)
                .text(tick / 1000);
        });

        // 針を描画
        const needleAngle = scaleRpm(Math.min(rpm, maxRpm));
        const needleLength = radius - (8 * scaleFactor);
        const needleX = centerX + needleLength * Math.cos(needleAngle);
        const needleY = centerY + needleLength * Math.sin(needleAngle);

        // 針の根元部分（三角形）
        const needleBaseAngle1 = needleAngle + Math.PI / 2;
        const needleBaseAngle2 = needleAngle - Math.PI / 2;
        const needleBaseX1 = centerX + needleBaseSize * Math.cos(needleBaseAngle1);
        const needleBaseY1 = centerY + needleBaseSize * Math.sin(needleBaseAngle1);
        const needleBaseX2 = centerX + needleBaseSize * Math.cos(needleBaseAngle2);
        const needleBaseY2 = centerY + needleBaseSize * Math.sin(needleBaseAngle2);

        svg.append('path')
            .attr('d', `M ${needleBaseX1} ${needleBaseY1} L ${needleX} ${needleY} L ${needleBaseX2} ${needleBaseY2} Z`)
            .attr('fill', 'red')
            .attr('stroke', 'none');

        // 次のギアの針を描画（存在する場合）
        if (nextGearRpm !== undefined) {
            const nextNeedleAngle = scaleRpm(Math.min(nextGearRpm, maxRpm));
            const nextNeedleX = centerX + needleLength * Math.cos(nextNeedleAngle);
            const nextNeedleY = centerY + needleLength * Math.sin(nextNeedleAngle);

            const nextNeedleBaseAngle1 = nextNeedleAngle + Math.PI / 2;
            const nextNeedleBaseAngle2 = nextNeedleAngle - Math.PI / 2;
            const nextNeedleBaseX1 = centerX + needleBaseSize * Math.cos(nextNeedleBaseAngle1);
            const nextNeedleBaseY1 = centerY + needleBaseSize * Math.sin(nextNeedleBaseAngle1);
            const nextNeedleBaseX2 = centerX + needleBaseSize * Math.cos(nextNeedleBaseAngle2);
            const nextNeedleBaseY2 = centerY + needleBaseSize * Math.sin(nextNeedleBaseAngle2);

            svg.append('path')
                .attr('d', `M ${nextNeedleBaseX1} ${nextNeedleBaseY1} L ${nextNeedleX} ${nextNeedleY} L ${nextNeedleBaseX2} ${nextNeedleBaseY2} Z`)
                .attr('fill', '#0066cc')
                .attr('stroke', 'none');
        }

        // 中心の円を描画
        svg.append('circle')
            .attr('cx', centerX)
            .attr('cy', centerY)
            .attr('r', centerCircleRadius)
            .attr('fill', '#333');

        svg.append('circle')
            .attr('cx', centerX)
            .attr('cy', centerY)
            .attr('r', innerCircleRadius)
            .attr('fill', '#666');

        // テキスト位置の調整
        const rpmTextY = centerY + (50 * scaleFactor);
        const speedTextY = centerY + (80 * scaleFactor);
        const gearTextY = centerY + (110 * scaleFactor);

        // RPM値がレッドゾーン以上かどうかを判定
        const isInRedZone = rpm >= redZone;
        const rpmTextColor = isInRedZone ? '#FF0000' : 'black';

        // RPM値を表示（レッドゾーン以上なら赤色で表示）
        svg.append('text')
            .attr('x', centerX)
            .attr('y', rpmTextY)
            .attr('text-anchor', 'middle')
            .attr('font-size', `${rpmFontSize}px`)
            .attr('font-weight', 'bold')
            .attr('fill', rpmTextColor)
            .text(`${Math.round(rpm)} RPM`);

        // 速度を表示
        svg.append('text')
            .attr('x', centerX)
            .attr('y', speedTextY)
            .attr('text-anchor', 'middle')
            .attr('font-size', `${speedFontSize}px`)
            .text(`${speed} km/h`);

        // ギア番号を表示
        svg.append('text')
            .attr('x', centerX)
            .attr('y', gearTextY)
            .attr('text-anchor', 'middle')
            .attr('font-size', `${gearFontSize}px`)
            .attr('font-weight', 'bold')
            .text(`${gearNumber}`);

    }, [rpm, maxRpm, yellowZone, redZone, speed, gearNumber, width, height, startAngle, endAngle, nextGearRpm]);

    return (
        <div className="tachometer-container">
            <svg ref={svgRef} width={width} height={height}></svg>
        </div>
    );
};

export default Tachometer; 