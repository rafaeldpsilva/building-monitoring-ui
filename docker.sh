docker build -t rdpds/tiocps-building-monitoring-ui .
docker tag rdpds/tiocps-building-monitoring-ui rdpds/tiocps-building-monitoring-ui:latest
docker tag rdpds/tiocps-building-monitoring-ui rdpds/tiocps-building-monitoring-ui:v0.2.1
docker push --all-tags rdpds/tiocps-building-monitoring-ui