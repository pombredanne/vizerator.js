/*
 * Generic plot class to hold attributes and allow the creation of concrete
 * plots from a single set of data and parameters.
 *
 */

viz.Plot = function(data, attrs) {
    // TODO Track the type of data?
    if (data === undefined) {
        throw "missing parameter: data";
    }
    if (attrs === undefined) {
        attrs = {}
    }
    this._attrs = viz.util.extend(
            viz.plots.defaultAttrs,
            attrs);
    this._attrs.selection = d3.select(this._attrs.selector)
        .append('svg');
    this._attrs.plotData = data;
    // Create scales
    // TODO This shouldn't be here in case data aren't just xy
    var xMin = d3.min(data, function(d) { return d.x; });
    var xMax = d3.max(data, function(d) { return d.x; });
    var xDim = xMax - xMin;
    this._attrs.xScale = d3.scale[this._attrs.xScaleType]()
        .domain([xMin - this._attrs.xOffset * xDim,
                 xMax + this._attrs.xOffset * xDim])
        .range([this._attrs.plotPadding[3],
                this._attrs.plotWidth - this._attrs.plotPadding[1]]);
    var yMin = d3.min(data, function(d) { return d.y; });
    var yMax = d3.max(data, function(d) { return d.y; });
    var yDim = yMax - yMin;
    this._attrs.yScale = d3.scale[this._attrs.yScaleType]()
        .domain([yMin - this._attrs.yOffset * yDim,
                 yMax + this._attrs.yOffset * yDim])
        .range([this._attrs.plotHeight - this._attrs.plotPadding[2],
                this._attrs.plotPadding[0]]);
}

viz.Plot.prototype = {
    setAttr: function(a, v) {
        this._attrs[a] = v;
        return this;
    },
    getAttr: function(a) {
        return this._attrs[a];
    },
    updateAttrs: function(attrs) {
        this._attrs = viz.util.extend(this._attrs, attrs);
        return this;
    },
    attr: function(a, v) {
        if (v === undefined) {
            return this.getAttr(a);
        } else {
            return this.setAttr(a, v);
        }
    },
    create: function(type) {
        return new (viz.plots.registered[type])(this._attrs);
    }
}

viz.plots.defaultAttrs = {
    selector: "body",
    // Title
    plotTitle: undefined,
    plotTitleSize: 22,
    plotTitleFontFamily: "sans-serif",
    // Subtitle
    plotSubtitle: undefined,
    plotSubtitleSize: 16,
    plotSubtitleFontFamily: "sans-serif",
    // Dimensions
    plotWidth: 600,
    plotHeight: 300,
    plotPadding: [50, 50, 50, 50],
    xOffset: 0.25,
    yOffset: 0.25,
    // Grid lines
    xGridLines: undefined,
    yGridLines: undefined,
    gridLines: 10,
    xGridLineWidth: undefined,
    yGridLineWidth: undefined,
    gridLineWidth: 1,
    xGridLineColor: undefined,
    yGridLineColor: undefined,
    gridLineColor: "#000",
    xGridLineType: undefined,
    yGridLineType: undefined,
    gridLineType: "dotted",
    // Scales
    xScaleType: 'linear',
    yScaleType: 'linear',
    // Axes
    xAxis: undefined,
    yAxis: undefined,
    axes: undefined,
    xAxisTicks: undefined,
    yAxisTicks: undefined,
    axesTicks: undefined,
    xAxisTickSize: undefined,
    yAxisTickSize: undefined,
    axesTickSize: 5,
    xAxisTickWidth: undefined,
    yAxisTickWidth: undefined,
    axesTickWidth: 1,
    xAxisTickColor: undefined,
    yAxisTickColor: undefined,
    axesTickColor: '#000',
    xAxisTickType: undefined,
    yAxisTickType: undefined,
    axesTickType: 'solid',
    xAxisLineWidth: undefined,
    yAxisLineWidth: undefined,
    axesLineWidth: undefined,
    xAxisLineColor: undefined,
    yAxisLineColor: undefined,
    axesLineColor: undefined,
    xAxisLineType: undefined,
    yAxisLineType: undefined,
    axesLineType: undefined,
}

/*
 * Concrete plots can inject their own custom attribute defaults to avoid
 * having to deal with them separately. Overriding global defaults is not
 * allowed.
 *
 */
viz.plots.registered = {};
viz.plots.register(name, plotClass) {
    viz.plots.defaultAttrs = viz.util.merge(
            plotClass.defaultAttrs,
            viz.plots.defaultAttrs);
    viz.plots.registered[name] = plotClass;
}
