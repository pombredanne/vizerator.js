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
        var tkeys = d3.keys(t);
        var skeys = d3.keys(s);
        d3.merge([tkeys, skeys]).forEach(function(k) {
            if (k in skeys) {
                r[k] = s[k];
            } else {
                r[k] = t[k];
            }
        });
        return r;
    },

    /*
     * Returns a D3 dash array specification based on a line type.
     *
     */
    lineType: function(t) {
        // TODO What should the default be?
        var lt = '';
        switch (t) {
            case "dotted":
                lt = '1,1';
                break;
            case "dashed":
                lt = '5,2';
                break;
            case "solid":
                lt = '1,0';
                break;
        }
        return lt;
    },

}
