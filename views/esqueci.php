<div class="ui-wrapper">
	<div>
		<div>
			<h2>Esqueceu sua senha?</h2>
			<form action="{BASE_URL}login" method="post">
				<input type="hidden" name="csrftk" id="csrftk" value="{CSRF_TOKEN}">
				<label for="email">
					Digite abaixo seu e-mail:
					<input type="text" name="email" id="email" value="">
				</label>

				<label for="submit">
					<button name="submit" id="submit" class="ui-btn ui-btn-success">Enviar</button>
				</label>
			</form>
		</div>
		<div>
			<a href="{BASE_URL}" class="ui-btn ui-btn-link">Home</a>
			<a href="{BASE_URL}cadastro" class="ui-btn ui-btn-link">Cadastre-se</a>
			<a href="{BASE_URL}cadastro/convide" class="ui-btn ui-btn-link">Convide</a>
		</div>
	</div>
</div>