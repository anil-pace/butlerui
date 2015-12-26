#!/bin/bash

case "$1" in
    run)
        mkdir butler-ui
	install -d butler-ui/opt/butler-ui
	cp index.html butler-ui/opt/butler-ui
	cp -r assets butler-ui/opt/butler-ui
	install -d butler-ui/var/log/butler-ui
	install -d butler-ui/usr/local/bin/
	install -d butler-ui/etc/butler-ui
	install -d butler-ui/etc/init.d
	cp -r ../dpkg_conf/butler-ui butler-ui/etc/init.d/butler-ui
	mkdir butler-ui/DEBIAN
	cp ../dpkg_conf/butler-ui/control butler-ui/DEBIAN/control
	cp ../dpkg_conf/butler-ui/rules butler-ui/DEBIAN/rules
	cp ../dpkg_conf/butler-ui/copyright butler-ui/DEBIAN/copyright
	cp ../dpkg_conf/butler-ui/changelog butler-ui/DEBIAN/changelog
	ln -sf /opt/butler-ui/bin/butler-ui butler-ui/usr/local/bin/
	ln -sf /opt/butler-ui/log butler-ui/var/log/butler-ui
	chmod u+rw ./butler-ui
	fakeroot dpkg-deb --build butler-ui
	rm -rf ./butler-ui
	;;
    *)
        echo "Usage: $SCRIPT {run}"
        exit 1
        ;;
esac

exit 0

