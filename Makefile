PKGNAME=hass
M=@${MAKE} -s

all: one pack manifest

urls:
	@cat log | awk '{print $$3}'

manifest:
	@echo CACHE MANIFEST > main.manifest
	@echo '# v0.1' >> main.manifest
	${M} files >> main.manifest

domains:
	${M} -s urls | cut -d / -f 3 | sort -u

files:
	${M} -s urls | cut -d / -f 4- | grep -v '^#'
	@echo main.manifest

missing:
	@grep 404 log|cut -d ' ' -f 3|cut -d / -f 4-

# npm install uglify-js

one:
	rm -rf one
	mkdir -p one
	cd js; for a in *.js ; do echo " - $$a"; uglifyjs < $$a 2>/dev/null > ../one/$$a ; done
	cd one ; cat *.js > ../index.js
	rm -rf one
.PHONY: one

FILES=`make -s files`
FILES+=$(shell ls icon*.png)
FILES+=manifest.webapp
FILES+=index.html
SZ=$(shell du -b hass.zip |awk '{print $$1}')

pack zip package:
	rm -f ${PKGNAME}.zip
	zip ${PKGNAME}.zip ${FILES}
	sed -i -e 's/"size":.*/"size":'${SZ}',/g' manifest.webapp
