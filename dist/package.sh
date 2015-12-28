#!/bin/bash

RELVSNCMD="git describe --dirty --abbrev=7 --tags --always --first-parent"

case "$1" in
    run)
	RELVSN=$(exec ${RELVSNCMD})
	mkdir butler_ui-$RELVSN
	install -d butler_ui-$RELVSN/opt/butler_ui
	cp index.html butler_ui-$RELVSN/opt/butler_ui
	cp -r assets butler_ui-$RELVSN/opt/butler_ui
	install -d butler_ui-$RELVSN/var/log/butler_ui
	install -d butler_ui-$RELVSN/usr/local/bin/
	install -d butler_ui-$RELVSN/etc/butler_ui
	install -d butler_ui-$RELVSN/etc/init.d
	cp -r ../dpkg_conf/butler-ui butler_ui-$RELVSN/etc/init.d/butler-ui
	mkdir butler_ui-$RELVSN/DEBIAN
	cp ../dpkg_conf/butler_ui/control butler_ui-$RELVSN/DEBIAN/control
	cp ../dpkg_conf/butler_ui/rules butler_ui-$RELVSN/DEBIAN/rules
	cp ../dpkg_conf/butler_ui/copyright butler_ui-$RELVSN/DEBIAN/copyright
	cp ../dpkg_conf/butler_ui/changelog butler_ui-$RELVSN/DEBIAN/changelog
	ln -sf /opt/butler_ui/bin/butler_ui butler_ui-$RELVSN/usr/local/bin/
	ln -sf /opt/butler_ui/log butler_ui-$RELVSN/var/log/butler_ui
	chmod u+rw ./butler_ui-$RELVSN
	echo "about to construct the debian package"
	fakeroot dpkg-deb --build butler_ui-$RELVSN
	rm -rf ./butler_ui-$RELVSN
	;;
    *)
        echo "Usage: $SCRIPT {run}"
        exit 1
        ;;
esac

exit 0