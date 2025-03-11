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

        // 角度の範囲（左下から右下まで、時計回り）
        // 左下は225度 = 5π/4、右下は315度 = 7π/4
        const startAngle = Math.PI * 1.001; // 左
        const endAngle = Math.PI * 1.999;   // 右
        const quarterAngle = Math.PI * 0.5;

        // RPMの範囲を角度に変換する関数（時計回りに回転）
        const scaleRpm = d3.scaleLinear()
            .domain([0, maxRpm])
            .range([startAngle, endAngle]);

        // 背景の円弧を描画
        const arcBackground = d3.arc()
            .innerRadius(radius - 30)
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
                .innerRadius(radius - 30)
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
                .innerRadius(radius - 30)
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
            const x1 = centerX + (radius - 30) * Math.cos(angle);
            const y1 = centerY + (radius - 30) * Math.sin(angle);
            const x2 = centerX + (radius - 10) * Math.cos(angle);
            const y2 = centerY + (radius - 10) * Math.sin(angle);

            svg.append('line')
                .attr('x1', x1)
                .attr('y1', y1)
                .attr('x2', x2)
                .attr('y2', y2)
                .attr('stroke', 'black')
                .attr('stroke-width', 2);

            // 目盛りにラベルを追加
            const labelX = centerX + (radius - 45) * Math.cos(angle);
            const labelY = centerY + (radius - 45) * Math.sin(angle);

            svg.append('text')
                .attr('x', labelX)
                .attr('y', labelY)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .attr('font-size', '12px')
                .text(tick / 1000);
        });

        // 針を描画
        const needleAngle = scaleRpm(Math.min(rpm, maxRpm));
        const needleLength = radius - 8;
        const needleX = centerX + needleLength * Math.cos(needleAngle);
        const needleY = centerY + needleLength * Math.sin(needleAngle);

        // 針の根元部分（三角形）
        const needleBaseSize = 3;
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

        // 中心の円を描画
        svg.append('circle')
            .attr('cx', centerX)
            .attr('cy', centerY)
            .attr('r', 10)
            .attr('fill', '#333');

        svg.append('circle')
            .attr('cx', centerX)
            .attr('cy', centerY)
            .attr('r', 6)
            .attr('fill', '#666');

        // RPM値を表示
        svg.append('text')
            .attr('x', centerX)
            .attr('y', centerY + 50)
            .attr('text-anchor', 'middle')
            .attr('font-size', '24px')
            .attr('font-weight', 'bold')
            .text(`${Math.round(rpm)} RPM`);

        // 速度を表示
        svg.append('text')
            .attr('x', centerX)
            .attr('y', centerY + 80)
            .attr('text-anchor', 'middle')
            .attr('font-size', '20px')
            .text(`${speed} km/h`);

        // ギア番号を表示
        svg.append('text')
            .attr('x', centerX)
            .attr('y', centerY + 110)
            .attr('text-anchor', 'middle')
            .attr('font-size', '28px')
            .attr('font-weight', 'bold')
            .text(`${gearNumber}`);

    }, [rpm, maxRpm, yellowZone, redZone, speed, gearNumber, width, height]);

    return (
        <div className="tachometer-container">
            <svg ref={svgRef} width={width} height={height}></svg>
        </div>
    );
};

export default Tachometer; 