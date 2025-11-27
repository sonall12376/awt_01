const dataset = [30, 86, 150, 80, 200, 60, 120];
const margin = { top: 20, right: 30, bottom: 40, left: 40 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;
const svg = d3.select("#chart")
    .attr("viewBox", `0 0 600 400`);
const g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
const xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .range([0, width])
    .padding(0.1);
const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([height, 0]);

g.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d))
    .attr("fill", "steelblue");
g.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).tickFormat(i => i + 1));
g.append("g")
    .call(d3.axisLeft(yScale));
