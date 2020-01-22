<div class="ui-wrapper">
	<div>
		<div>
			<h2>Login</h2>
			<form action="" method="post">
				<input type="hidden" name="csrftk" id="csrftk" value="{CSRF_TOKEN}">
				<label for="email">
					E-mail:
					<input type="text" name="email" id="email" value="">
				</label>
				<label for="senha">
					Senha:
					<input type="password" name="senha" id="senha" value="">
				</label>
				
				<label for="submit">
					<button name="submit" id="submit" class="ui-btn ui-btn-success">Enviar</button>
				</label>
			</form>
		</div>
		<div>
			<a href="{BASE_URL}" class="ui-btn ui-btn-link">Home</a>
			<a href="{BASE_URL}login/esqueci" class="ui-btn ui-btn-link">Esqueceu Senha?</a>
			<a href="{BASE_URL}cadastro" class="ui-btn ui-btn-link">Cadastre-se</a>
			<a href="{BASE_URL}cadastro/convide" class="ui-btn ui-btn-link">Convide</a>
		</div>
	</div>
</div>