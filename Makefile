CORESRC := src/core.js src/util.js src/data.js src/plot.js
BUILDDIR := _build

all: production debug

debug: $(CORESRC)
	@mkdir -p $(BUILDDIR)
	cat $^ > $(BUILDDIR)/vizerator.debug.js

production: $(CORESRC)
	@mkdir -p $(BUILDDIR)
	# TODO Add src minifying
	cat $^ > $(BUILDDIR)/vizerator.js

clean:
	rm -rf $(BUILDDIR)
