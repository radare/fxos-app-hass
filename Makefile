PKGNAME=hass
M=@${MAKE} -s

all: pack

urls:
	@cat log | awk '{print $$3}'

domains:
	${M} -s urls | cut -d / -f 3 | sort -u

files:
	${M} -s urls | cut -d / -f 4- | grep -v '^#'

missing:
	@grep 404 log|cut -d ' ' -f 3|cut -d / -f 4-

FILES=`make -s files`
FILES+=$(shell ls icon*.png)
FILES+=manifest.webapp
FILES+=index.html

pack zip package:
	rm -f ${PKGNAME}.zip
	zip ${PKGNAME}.zip ${FILES}
