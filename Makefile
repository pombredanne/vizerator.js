CORESRC := src/core.js src/util.js src/data.js src/plot.js
PLUGINSRC := $(wildcard src/plugins/*.js)
PLOTSRC := $(wildcard src/plots/*.js)
BUILDDIR := _build
LIBDIR := _lib
D3URL := http://d3js.org/d3.v3.js

all: production debug

debug: $(CORESRC) $(PLUGINSRC) $(PLOTSRC)
	@mkdir -p $(BUILDDIR)
	cat $^ > $(BUILDDIR)/vizerator.debug.js

production: $(CORESRC) $(PLUGINSRC) $(PLOTSRC)
	@mkdir -p $(BUILDDIR)
	# TODO Add src minifying
	cat $^ > $(BUILDDIR)/vizerator.js

examples: debug
	@mkdir -p $(LIBDIR)
	wget -O $(LIBDIR)/d3.js $(D3URL)

clean:
	rm -rf $(BUILDDIR) $(LIBDIR)
