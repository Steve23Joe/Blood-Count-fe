import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface AgeSexDistributionData {
    ageRange: string;
    male: number;
    female: number;
}

const data: AgeSexDistributionData[] = [
    { ageRange: '0-10', male: 5, female: 4 },
    { ageRange: '10-20', male: 10, female: 8 },
    { ageRange: '20-30', male: 15, female: 12 },
    { ageRange: '30-40', male: 12, female: 14 },
    { ageRange: '40-50', male: 10, female: 10 },
    { ageRange: '50-60', male: 8, female: 9 },
    { ageRange: '60-70', male: 6, female: 7 },
    { ageRange: '70-80', male: 4, female: 5 },
    { ageRange: '>80', male: 2, female: 3 },
];

const AgeSexDistributionChart: React.FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr('width', 'auto')
            .attr('height', 350)
            .style('overflow', 'visible')
            .style('margin-top', '20px')
            .style('padding-left', '50px');

        const xScale = d3.scaleLinear()
            .domain([-d3.max(data, d => d.male)!, d3.max(data, d => d.female)!])
            .range([0, 800]);

        const yScale = d3.scaleBand()
            .domain(data.map(d => d.ageRange))
            .range([400, 0])  // Reverse the range here
            .padding(0.1);

        const xAxis = d3.axisBottom(xScale).ticks(10);
        const yAxis = d3.axisLeft(yScale);

        svg.append('g')
            .call(xAxis)
            .attr('transform', 'translate(0, 400)')
            .style('font-size', '14px');

        svg.append('g')
            .call(yAxis)
            .style('font-size', '14px');

        // Male bars (on the left side)
        svg.selectAll('.bar-male')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar-male')
            .attr('x', d => xScale(-d.male))
            .attr('y', d => yScale(d.ageRange)!)
            .attr('width', d => xScale(0) - xScale(-d.male))
            .attr('height', yScale.bandwidth())
            .attr('fill', '#8884d8');

        // Female bars (on the right side)
        svg.selectAll('.bar-female')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar-female')
            .attr('x', xScale(0))
            .attr('y', d => yScale(d.ageRange)!)
            .attr('width', d => xScale(d.female) - xScale(0))
            .attr('height', yScale.bandwidth())
            .attr('fill', '#82ca9d');

        // Add legend
        svg.append('rect')
            .attr('x', 650)
            .attr('y', 10)
            .attr('width', 20)
            .attr('height', 20)
            .attr('fill', '#82ca9d');
        svg.append('text')
            .attr('x', 680)
            .attr('y', 25)
            .text('Male')
            .style('font-size', '14px')
            .attr('alignment-baseline', 'middle');

        svg.append('rect')
            .attr('x', 650)
            .attr('y', 40)
            .attr('width', 20)
            .attr('height', 20)
            .attr('fill', '#8884d8');
        svg.append('text')
            .attr('x', 680)
            .attr('y', 55)
            .text('Female')
            .style('font-size', '14px')
            .attr('alignment-baseline', 'middle');
    }, []);

    return (
        <svg ref={svgRef}></svg>
    );
};

export default AgeSexDistributionChart;
