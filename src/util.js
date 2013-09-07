/*
 * Utility classes and functions.
 *
 */

viz.util = {
    /*
     * Create a new object by merging the contents of s into t. The keys
     * in the resulting object will be a union of the keys in t and s. If a key
     * exists in both t and s, the value from s will be used.
     *
     */
    extend: function(t, s) {
        var r = {};
        d3.merge([d3.keys(t), d3.keys(s)]).forEach(function(k) {
            if (s[k] === undefined) {
                r[k] = t[k];
            } else {
                r[k] = s[k];
            }
        });
        return r;
    },
}
