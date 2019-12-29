CKEDITOR.plugins.add('btcolors', {
	requires: 'richcombo,smethods',
	lang: 'en,ru,uk',

	init: function(editor){
		var lang = editor.lang.btcolors,
			text = {
				primary: 'color: #007bff;',
				secondary: 'color: #6c757d;',
				success: 'color: #28a745;',
				danger: 'color: #dc3545;',
				warning: 'color: #ffc107;',
				info: 'color: #17a2b8;',
				light: 'color: #f8f9fa; background-color: #343a40;',
				dark: 'color: #343a40;',
				body: 'color: #212529;',
				muted: 'color: #6c757d;',
				white: 'color: #fff; background-color: #343a40;',
				'black-50': 'color: rgba(0,0,0,.5);',
				'white-50': 'color: rgba(255,255,255,.5); background-color: #343a40;',
				reset: 'color: inherit;'
			},
			bg = {
				primary: 'background-color: #007bff; color: #fff;',
				secondary: 'background-color: #6c757d; color: #fff;',
				success: 'background-color: #28a745; color: #fff;',
				danger: 'background-color: #dc3545; color: #fff;',
				warning: 'background-color: #ffc107; color: #343a40;',
				info: 'background-color: #17a2b8; color: #fff;',
				light: 'background-color: #f8f9fa; color: #343a40;',
				dark: 'background-color: #343a40; color: #fff;',
				white: 'background-color: #fff; color: #343a40;',
				transparent: 'background-color: transparent; color: #343a40',
			};

		addCombo('text', new RegExp(`(text-${CKEDITOR.tools.objectKeys(text).join('|text-')})(?=\\s|$)`, 'g'));
		addCombo('bg', new RegExp(`bg-${CKEDITOR.tools.objectKeys(bg).join('|bg-')}`, 'g'));

		function addCombo(name, re){
			editor.ui.addRichCombo(`${name}colors`, {
				label: lang[name],
				title: lang[name],
				panel: {
					css: [CKEDITOR.skin.getPath('editor')].concat(editor.config.contentsCss),
					multiSelect: false,
					attributes: {'aria-label': lang.panelTitle}
				},
				init: function(){
					this.startGroup(lang.panelTitle);
					for(const item in eval(name))
						this.add(`${name}-${item}`, `<p style="${eval(name)[item]}">${lang[item]}</p>`, lang[item]);
				},
				onClick: function(item){
					editor.focus();
					editor.fire('saveSnapshot');
					if (this.insertMode){
						this.element = editor.document.createElement('span');
						this.element.setHtml(editor.getSelectedHtml().getHtml());
						editor.insertElement(this.element);
					}
					this.element.toggleClass(item, re);
					if (this.element.is('span') && !this.element.hasAttributes())
						this.element.remove(true);
					editor.fire('saveSnapshot');
				},
				onOpen: function(){
					if (editor.getSelectedHtml().getHtml())
						return this.insertMode = true;
					this.element = editor.getSelection().getStartElement();
					this.insertMode = false;

					if (this.element && this.element.matchClass(re))
						this.mark(this.element.matchClass(re));
				}
			});
		}
	}
});
