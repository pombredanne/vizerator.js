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
    this._data = data;
    this._attrs = viz.util.merge(
            viz.Plot.defaultAttrs,
            attrs);
}

viz.Plot.defaultAttrs = {
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
        yScaleType: 'linear'
    }

/*
 * Concrete plots can inject their own custom attribute defaults to avoid
 * having to deal with them separately. Overriding global defaults is not
 * allowed.
 *
 */
viz.Plot.register(name, plotClass) {
    viz.Plot.defaultAttrs = viz.util.merge(
            plotClass.defaultAttrs,
            viz.Plot.defaultAttrs);
    viz.Plot.plots[name] = plotClass;
}

viz.Plot.prototype = {
    setAttr: function(a, v) {
        this._attr.set(a, v)
        return this;
    },
    getAttr: function(a) {
        return this._attrs.get(a);
    },
    updateAttrs: function(attrs) {
        this._attrs = viz.util.merge(this._attrs, attrs);
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
        return new (viz.Plot.plots[type])(this._data, this._attrs);
    }
}
