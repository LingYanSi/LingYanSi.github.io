start:
	echo '-->服务器端运行'
	forever start --minUptime 1000 --spinSleepTime 1000 --uid blog -a app.js

startp:
	make stop
	make pack
	make start

stop:
	forever stop blog

pack:
	bash ./util/pro.sh

restart:
	forever restart blog

restartp:
	# 用于服务器端自动打包
	git stash
	git stash drop
	git pull
	make pack
	make restart
