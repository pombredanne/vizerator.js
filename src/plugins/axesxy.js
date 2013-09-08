/*
 * Plugin to create XY axes.
 *
 */

viz.plugins.axesXY = function() {
    var self = this;
    var xMin = d3.min(self.xScale.range());
    var xMax = d3.max(self.xScale.range());
    var xTickDelta = 0.5 * (self.xAxisTickSize || self.axesTickSize);
    var yMin = d3.min(self.yScale.range());
    var yMax = d3.max(self.yScale.range());
    var yTickDelta = 0.5 * (self.yAxisTickSize || self.axesTickSize);
    var axes = self.selection
        .append('g')
            .attr('class', 'axesXY');
    // x axis line
    if (self.xAxis || self.axes) {
        axes.append('line')
            .attr('class', 'xLine')
            .attr('x1', xMin)
            .attr('y1', yMax)
            .attr('x2', xMax)
            .attr('y2', yMax)
            .style('stroke', self.xAxisLineColor || self.axesLineColor)
            .style('stroke-width', self.xAxisLineWidth || self.axesLineWidth)
            .style('stroke-dasharray', viz.util.lineType(
                        self.xAxisLineType || self.axesLineType));
    }
    // y axis line
    if (self.yAxis || self.axes) {
        axes.append('line')
            .attr('class', 'yLine')
            .attr('x1', xMin)
            .attr('y1', yMin)
            .attr('x2', xMin)
            .attr('y2', yMax)
            .style('stroke', self.yAxisLineColor || self.axesLineColor)
            .style('stroke-width', self.yAxisLineWidth || self.axesLineWidth)
            .style('stroke-dasharray', viz.util.lineType(
                        self.yAxisLineType || self.axesLineType));
    }
    // x ticks
    if (self.xAxisTicks || self.axesTicks) {
        var xTicks = axes
            .append('g')
                .attr('class', 'xTicks')
                .selectAll('line')
                    .data(self.xScale.ticks(
                                self.xAxisTicks || self.axesTicks));
        xTicks.enter()
            .append('line')
                .attr('x1', function(d) { return self.xScale(d); })
                .attr('y1', yMax - xTickDelta)
                .attr('x2', function(d) { return self.xScale(d); })
                .attr('y2', yMax + xTickDelta);
        xTicks
            .style('stroke', self.xAxisTickColor || self.axesTickColor)
            .style('stroke-width', self.xAxisTickWidth || self.axesTickWidth)
            .style('stroke-dasharray', viz.util.lineType(
                        self.xAxisTickType || self.axesTickType));
        xTicks.exit().remove();
    }
    // y ticks
    if (self.yAxisTicks || self.axesTicks) {
        var yTicks = axes
            .append('g')
                .attr('class', 'yTicks')
                .selectAll('line')
                    .data(self.yScale.ticks(
                                self.yAxisTicks || self.axesTicks));
        yTicks.enter()
            .append('line')
                .attr('x1', xMin - yTickDelta)
                .attr('y1', function(d) { return self.yScale(d); })
                .attr('x2', xMin + yTickDelta)
                .attr('y2', function(d) { return self.yScale(d); });
        yTicks
            .style('stroke', self.yAxisTickColor || self.axesTickColor)
            .style('stroke-width', self.yAxisTickWidth || self.axesTickWidth)
            .style('stroke-dasharray', viz.util.lineType(
                        self.yAxisTickType || self.axesTickType));
        yTicks.exit().remove();
    }
}
