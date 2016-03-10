
# If the first argument is "run"...
ifeq (del,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "run"
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(RUN_ARGS):;@:)
endif

# 变量
tar = daye
sour = 项目搭建/

run:
	touch song.js
	vim song.js

del: prog
	@echo ./prog $$FOO
	# rm song.js song-xiao-fan.js

all:run
	touch song-xiao-fan.js

mkdir:
	mkdir $(tar)

# 表示cp任务以来mkdir
cp: mkdir
	cp -r $(sour) $(tar)
