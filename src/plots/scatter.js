/*
 * A standard scatter plot.
 *
 */

viz.plots.scatter = function(attrs) {
    this.attrs = attrs;
    this.refresh();
}
viz.plots.scatter.prototype = {
    refresh: function() {
        viz.plugins.axesXY.call(this.attrs);
    },
}

viz.plots.scatter.defaultAttrs = {};
viz.plots.register('scatter', viz.plots.scatter);
