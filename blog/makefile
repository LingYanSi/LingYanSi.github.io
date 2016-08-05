start:
	echo '-->关闭应用'
	make stop

	make pack

	echo '-->服务器端运行'
	forever start --minUptime 1000 --spinSleepTime --uid blog 1000 app.js

stop:
	forever stop blog

pack:
	bash pro.sh

restart:
	forever restart blog

restartp:
	# 用于服务器端自动打包
	make pack
	make restart
