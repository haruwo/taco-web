import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TachometerProps {
    rpm: number;
    maxRpm: number;
    yellowZone: number;
    redZone: number;
    speed: number;
    gearNumber: number | string;
}

const Tachometer: React.FC<TachometerProps> = ({
    rpm,
    maxRpm = 8000,
    yellowZone = 7000,
    redZone = 7500,
    speed,
    gearNumber,
}) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        // SVGのサイズと中心点
        const width = 300;
        const height = 300;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 20;

        // 角度の範囲（タコメーターは通常、180度から0度まで）
        const startAngle = -Math.PI * 0.75; // -135度
        const endAngle = Math.PI * 0.75;    // 135度

        // RPMの範囲を角度に変換する関数
        const scaleRpm = d3.scaleLinear()
            .domain([0, maxRpm])
            .range([startAngle, endAngle]);

        // 背景の円弧を描画
        const arcBackground = d3.arc()
            .innerRadius(radius - 30)
            .outerRadius(radius)
            .startAngle(startAngle)
            .endAngle(endAngle);

        svg.append('path')
            .attr('d', arcBackground as any)
            .attr('transform', `translate(${centerX}, ${centerY})`)
            .attr('fill', '#e0e0e0');

        // イエローゾーンの円弧を描画
        const arcYellow = d3.arc()
            .innerRadius(radius - 30)
            .outerRadius(radius)
            .startAngle(scaleRpm(yellowZone))
            .endAngle(scaleRpm(redZone));

        svg.append('path')
            .attr('d', arcYellow as any)
            .attr('transform', `translate(${centerX}, ${centerY})`)
            .attr('fill', '#FFD700');

        // レッドゾーンの円弧を描画
        const arcRed = d3.arc()
            .innerRadius(radius - 30)
            .outerRadius(radius)
            .startAngle(scaleRpm(redZone))
            .endAngle(endAngle);

        svg.append('path')
            .attr('d', arcRed as any)
            .attr('transform', `translate(${centerX}, ${centerY})`)
            .attr('fill', '#FF0000');

        // 目盛りを描画
        const ticks = d3.range(0, maxRpm + 1, 1000);

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

            // 1000単位の目盛りにラベルを追加
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
        const needleLength = radius - 40;
        const needleX = centerX + needleLength * Math.cos(needleAngle);
        const needleY = centerY + needleLength * Math.sin(needleAngle);

        svg.append('line')
            .attr('x1', centerX)
            .attr('y1', centerY)
            .attr('x2', needleX)
            .attr('y2', needleY)
            .attr('stroke', 'red')
            .attr('stroke-width', 3);

        // 中心の円を描画
        svg.append('circle')
            .attr('cx', centerX)
            .attr('cy', centerY)
            .attr('r', 10)
            .attr('fill', 'black');

        // RPM値を表示
        svg.append('text')
            .attr('x', centerX)
            .attr('y', centerY + 50)
            .attr('text-anchor', 'middle')
            .attr('font-size', '24px')
            .attr('font-weight', 'bold')
            .text(`${rpm} RPM`);

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

    }, [rpm, maxRpm, yellowZone, redZone, speed, gearNumber]);

    return (
        <svg ref={svgRef} width="300" height="300"></svg>
    );
};

export default Tachometer; 