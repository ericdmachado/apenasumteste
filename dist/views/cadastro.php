<div class="ui-wrapper">
	<div>
		<div>
			<h2>Cadastre-se</h2>
			<form action="{BASE_URL}cadastro" method="post">
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
	</div>
</div>