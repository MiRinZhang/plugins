/**
 * File: CodeInput.js
 * Date: 2018/5/5
 * Author: MiRinZhang <mirinzhang@gmail.com>
 */
'use strict';
(function (win) {
    /**
     * 创建codeInput
     * @param containerID - input元素容器ID
     * @param opts - 配置
     * @constructor
     */
    function CodeInput (containerID, opts) {
        this.values = [];
        this.refs = [];
        this.options = {
            number: opts.number || 6,
            complete: opts.complete || null,
            width: opts.width || '35px',
            height: opts.height || '35px',
            fontSize: opts.fontSize || '18px',
            type: opts.type || 'number',
            autofocus: opts.hasOwnProperty('autofocus') ? opts.autofocus : true,
        };
        
        var container = document.getElementById(containerID);
        var frage = document.createDocumentFragment();
       
        // 为container添加自定义类名
        container.classList.add('inputs-container');
        
        for (var i = 0; i < this.options.number; i++) {
            var input = document.createElement('input');
            // 设置输入框类型
            input.type = this.options.type;
            
            // 设置输入框样式
            input.style.width = this.options.width;
            input.style.height = this.options.height;
            input.style.fontSize = this.options.fontSize;
            
            // 设置默认值
            this.values[i] = '';
            
            // 保存input引用
            this.refs[i] = input;
            
            // 添加事件监听
            this._addListener(input, i);
            
            // 添加input元素
            frage.appendChild(input);
        }
        
        // 将input框添加到页面
        container.appendChild(frage);
        
        // 自动聚焦
        this.options.autofocus && this.refs[0].focus()
    }
    
    // 检查键盘输入类型
    function _keyBoardIsNumber (e) {
        var code = e.which || e.keyCode;
        
        return (code >= 48 && code <= 57)
            || (code >= 96 && code <= 108)
            || code === 8;
    }
    
    CodeInput.prototype._addListener = function (input, key) {
        var self = this;
        var opt = this.options;
        
        input.addEventListener('keydown', function (e) {
            var value = e.target.value;
            var code = e.which || e.keyCode;
            
            // 过滤中文输入法下的空字符
            e.target.value = value.trim();
            
            // 限制输入长度及输入类型
            if ((value.length >= 1 && code !== 8) || (opt.type === 'number' && !_keyBoardIsNumber(e))) {
                e.preventDefault();
            }
        });
        
        input.addEventListener('keyup', function (e) {
            var value = e.target.value || '';
            var code = e.which || e.keyCode;
            var oldValue = self.values.join(''); // 暂存上次输入值
            
            // 删除可能存在的空字符
            value = value.trim();
            
            // 自动聚焦下一个输入框
            if (value && key < (opt.number - 1) && code !== 8) {
                self.refs[key + 1].focus();
            }
            
            // 删除当前输入框值时，自动聚焦前一个输入框
            if (code === 8 && !self.values[key] && key) {
                self.refs[key - 1].focus();
            }
            
            // 更新当前输入值
            self.values[key] = value;
            // 更新后的输入值
            var newValue = self.values.join('');
            
            // 当输入完成且输入有变动时，自动调用回调函数
            if (newValue.length === opt.number && oldValue !== newValue) {
                opt.complete && opt.complete(self.values.join(''));
            }
        });
    };
    
    win.CodeInput = CodeInput;
})(window);