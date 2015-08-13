Sublime Text 3 快捷键精华版

Ctrl+Shift+P：打开命令面板
Ctrl+P：搜索项目中的文件
Ctrl+G：跳转到第几行
Ctrl+W：关闭当前打开文件
Ctrl+Shift+W：关闭所有打开文件
Ctrl+Shift+V：粘贴并格式化
Ctrl+D：选择单词，重复可增加选择下一个相同的单词
Ctrl+L：选择行，重复可依次增加选择下一行
Ctrl+Shift+L：选择多行
Ctrl+Shift+Enter：在当前行前插入新行
Ctrl+X：删除当前行
Ctrl+M：跳转到对应括号
Ctrl+U：软撤销，撤销光标位置
Ctrl+J：选择标签内容
Ctrl+F：查找内容
Ctrl+Shift+F：查找并替换
Ctrl+H：替换
Ctrl+R：前往 method
Ctrl+N：新建窗口
Ctrl+K+B：开关侧栏
Ctrl+Shift+M：选中当前括号内容，重复可选着括号本身
Ctrl+F2：设置/删除标记
Ctrl+/：注释当前行
Ctrl+Shift+/：当前位置插入注释
Ctrl+Alt+/：块注释，并Focus到首行，写注释说明用的
Ctrl+Shift+A：选择当前标签前后，修改标签用的
F11：全屏
Shift+F11：全屏免打扰模式，只编辑当前文件
Alt+F3：选择所有相同的词
Alt+.：闭合标签
Alt+Shift+T：恢复刚才关闭的页面
Alt+Shift+数字：分屏显示
Alt+数字：切换打开第N个文件
Shift+右键拖动：光标多不，用来更改或插入列内容
鼠标的前进后退键可切换Tab文件
按Ctrl，依次点击或选取，可需要编辑的多个位置
按Ctrl+Shift+上下键，可替换行

PS.关于Emmet 及 ST3 的快捷键什么的网上一找一堆，这里举几个个人常用的快捷键：

ctrl+shift+p  所有命令

ctrl+g 跳转行

ctrl+/ 注释

ctrl+d 选择相同字符

ctrl+shift+up/down 整行移动

ctrl+alt+right 跳到下一个编辑点

ctrl+u 图片原始大小更新

ctrl+shift+g 批量格式生成

ctrl+shift+y 直接公式计算

ctrl+up CSS数值加减1（alt+up 数值加减0.1）

选择类
Ctrl+D 选中光标所占的文本，继续操作则会选中下一个相同的文本。

Alt+F3 选中文本按下快捷键，即可一次性选择全部的相同文本进行同时编辑。举个栗子：快速选中并更改所有相同的变量名、函数名等。

Ctrl+L 选中整行，继续操作则继续选择下一行，效果和 Shift+↓ 效果一样。

Ctrl+Shift+L 先选中多行，再按下快捷键，会在每行行尾插入光标，即可同时编辑这些行。

Ctrl+Shift+M 选择括号内的内容（继续选择父括号）。举个栗子：快速选中删除函数中的代码，重写函数体代码或重写括号内里的内容。

Ctrl+M 光标移动至括号内结束或开始的位置。

Ctrl+Enter 在下一行插入新行。举个栗子：即使光标不在行尾，也能快速向下插入一行。

Ctrl+Shift+Enter 在上一行插入新行。举个栗子：即使光标不在行首，也能快速向上插入一行。

Ctrl+Shift+[ 选中代码，按下快捷键，折叠代码。

Ctrl+Shift+] 选中代码，按下快捷键，展开代码。

Ctrl+K+0 展开所有折叠代码。

Ctrl+← 向左单位性地移动光标，快速移动光标。

Ctrl+→ 向右单位性地移动光标，快速移动光标。

shift+↑ 向上选中多行。

shift+↓ 向下选中多行。

Shift+← 向左选中文本。

Shift+→ 向右选中文本。

Ctrl+Shift+← 向左单位性地选中文本。

Ctrl+Shift+→ 向右单位性地选中文本。

Ctrl+Shift+↑ 将光标所在行和上一行代码互换（将光标所在行插入到上一行之前）。

Ctrl+Shift+↓ 将光标所在行和下一行代码互换（将光标所在行插入到下一行之后）。

Ctrl+Alt+↑ 向上添加多行光标，可同时编辑多行。

Ctrl+Alt+↓ 向下添加多行光标，可同时编辑多行。


编辑类
Ctrl+J 合并选中的多行代码为一行。举个栗子：将多行格式的CSS属性合并为一行。

Ctrl+Shift+D 复制光标所在整行，插入到下一行。

Tab 向右缩进。

Shift+Tab 向左缩进。

Ctrl+K+K 从光标处开始删除代码至行尾。

Ctrl+Shift+K 删除整行。

Ctrl+/ 注释单行。

Ctrl+Shift+/ 注释多行。

Ctrl+K+U 转换大写。

Ctrl+K+L 转换小写。

Ctrl+Z 撤销。

Ctrl+Y 恢复撤销。

Ctrl+U 软撤销，感觉和 Gtrl+Z 一样。

Ctrl+F2 设置书签

Ctrl+T 左右字母互换。

F6 单词检测拼写


搜索类
Ctrl+F 打开底部搜索框，查找关键字。

Ctrl+shift+F 在文件夹内查找，与普通编辑器不同的地方是sublime允许添加多个文件夹进行查找，略高端，未研究。

Ctrl+P 打开搜索框。举个栗子：1、输入当前项目中的文件名，快速搜索文件，2、输入@和关键字，查找文件中函数名，3、输入：和数字，跳转到文件中该行代码，4、输入#和关键字，查找变量名。

Ctrl+G 打开搜索框，自动带：，输入数字跳转到该行代码。举个栗子：在页面代码比较长的文件中快速定位。

Ctrl+R 打开搜索框，自动带@，输入关键字，查找文件中的函数名。举个栗子：在函数较多的页面快速查找某个函数。

Ctrl+： 打开搜索框，自动带#，输入关键字，查找文件中的变量名、属性名等。

Ctrl+Shift+P 打开命令框。场景栗子：打开命名框，输入关键字，调用sublime text或插件的功能，例如使用package安装插件。

Esc 退出光标多行选择，退出搜索框，命令框等。


显示类
Ctrl+Tab 按文件浏览过的顺序，切换当前窗口的标签页。

Ctrl+PageDown 向左切换当前窗口的标签页。

Ctrl+PageUp 向右切换当前窗口的标签页。

Alt+Shift+1 窗口分屏，恢复默认1屏（非小键盘的数字）

Alt+Shift+2 左右分屏-2列

Alt+Shift+3 左右分屏-3列

Alt+Shift+4 左右分屏-4列

Alt+Shift+5 等分4屏

Alt+Shift+8 垂直分屏-2屏

Alt+Shift+9 垂直分屏-3屏

Ctrl+K+B 开启/关闭侧边栏。

F11 全屏模式

Shift+F11 免打扰模式


// -----------------------------------
一些插件
	1.SideBarEnhancement 侧边栏文件操作 只对project起作用 对单个打开的文件无效，需要添加project

	2.emmet原来的zeCoding 方便html标签的书写，emmet提供了一个快速构建html文件的快捷键 html:5 ctrl+e

	3.html-js-css 格式化 插件 需要使用 nodejs 在C:/programe/nodejs/node.js 如此便可

	4.auto-prefixer-css ? css前缀自动补全

	5.LESS
		功能：LESS高亮插件
		简介：用LESS的同学都知道，sublime没有支持less的语法高亮，所以这个插件可以帮上我们
		使用：打开.less文件或者设置为less格式
	6.Less2CSS
		功能：编译Less
		简介：监测到文件改动时，编译保存为.css文件
		使用：打开.less文件，编写代码保存即可看到同时生成.css的文件，
				如果没有则需要安装node。不推荐用这种方法编译，要么用koala，要么就用grunt编译。
	7.AutoFileName
		功能：快捷输入文件名
		简介：自动完成文件名的输入，如图片选取
		使用：输入”/”即可看到相对于本项目文件夹的其他文件

	8.Bracket Highlighter
		功能：代码匹配
		简介：可匹配[], (), {}, “”, ”, <tag></tag>，高亮标记，便于查看起始和结束标记
		使用：点击对应代码即可

	9.AutoFileName
		功能：快捷输入文件名
		简介：自动完成文件名的输入，如图片选取
		使用：输入”/”即可看到相对于本项目文件夹的其他文件
	10.php-connector就可以安装完成了。
		如果用Sublime 写markdown，推荐一个不错的插件。可以把markdown转换成HTML或者PDF的格式。
		插件使用的快捷键为Ctrl + Shift + R。
    11.Quote​HTML，把HTML拼接成js插入字符串，神器
    12.ClickableURLs 使用小插件ClickableURLs可以让文件中的URL能够点击。【右键可打开链接】
    13.IMESupport 解决在win8系统下。sublime输入法不跟随的现象


// -----------------------------------
Preferences/setting-user 配置
    {
        "font_size": 12, // 字体大小
        "ignored_packages":
        [
            "CSScomb",
            "Vintage"
        ],
        "preview_on_click": false, // 文件双击打开
        "translate_tabs_to_spaces": true,
        "tab_size": 4, // tab缩进4空格
        "trim_trailing_white_space_on_save": true,
        "update_check": false, // 更新检查
        "word_separators": "()\"',;<>~!@#$%^&*|+=[]{}`~?",
        "word_wrap": true,
        "ensure_newline_at_eof_on_save": true, // 文件末尾自动保留一个空行，懂的人自然知道它的用处。
        "highlight_line": true, // 当前行高亮
    }

基础用户设置
"trim_trailing_white_space_on_save": true,  自动移除行尾多余空格，处女座更安心了。
"ensure_newline_at_eof_on_save": true,      文件末尾自动保留一个空行，懂的人自然知道它的用处。
"font_face": "Microsoft YaHei Mono",        设置字体。Microsoft YaHei Mono 是一款混合字体，专为代码优化，看起来很舒服。当然你也可以使用你自己喜欢的字体，或者删掉本行，使用默认字体。
"disable_tab_abbreviations": true,          设置为 true ，禁用 Emmet 的 tab 键功能（请使用 ctrl+e），系统自带的 tab 功能还是可圈可点的。当然你也可以不设置它，以完全使用 Emmet 的 tab 补全功能。
"translate_tabs_to_spaces": true,           很明白就是把代码 tab 对齐转换为空格对齐，tab_size 配合设置空格数。这个需求因人而异了，不喜欢可以去掉。
"tab_size": 2,
"draw_minimap_border": true,                用于右侧代码预览时给所在区域加上边框，方便识别。
"save_on_focus_lost": true,                 窗口失焦立即保存文件，嘛嘛再也不用担心你忘记保存了。
"highlight_line": true,                     当前行高亮。word_wrap，设置自动换行。
"word_wrap": "true",
"fade_fold_buttons": false,                 默认显示行号右侧的代码段闭合展开三角号
"bold_folder_labels": true,                 侧边栏文件夹显示加粗，区别于文件。
"highlight_modified_tabs": true,            高亮未保存文件。

Microsoft YaHei Mono 字体下载，链接: http://pan.baidu.com/s/1mgnAyBA  密码: q5wd



// -----------------------------------
Sublime Text 3：并不能直接安装插件，需要开启此功能，开启方法如下
从菜单 View - Show Console 或者 ctrl + ~ 快捷键，调出 console。将以下 Python 代码粘贴进去并 enter 执行，不出意外即完成安装。以下提供 ST3 和 ST2 的安装代码：


import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener(urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen('http://sublime.wbond.net/' + pf.replace(' ','%20')).read())
