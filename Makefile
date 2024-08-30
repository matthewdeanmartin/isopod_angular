
install_angular:
	@npm install -g @angular/cli@17
	@ng version


init:
	@ng new isopod-game --routing
	@cd isopod-game
	@ng add @angular/material

run_once_generate:
	@ng generate component game
	@ng generate component location
	@ng generate component inventory
	@ng generate component actions
	@ng generate service game
