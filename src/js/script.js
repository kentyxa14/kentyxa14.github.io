
function summonCommandBlock() {
	const block = document.createElement("div");
	block.innerHTML = `
	<div class="cube">
		<div class="cube-face cube-front"><img style="width: 100%;" src="./src/media/Command_block_back.webp"></div>
		<div class="cube-face cube-back"><img style="width: 100%;" src="./src/media/Command_block_back.webp"></div>
		<div class="cube-face cube-right"><img style="width: 100%;" src="./src/media/Command_block_back.webp"></div>
		<div class="cube-face cube-left"><img style="width: 100%;" src="./src/media/Command_block_back.webp"></div>
		<div class="cube-face cube-top"><img style="width: 100%;" src="./src/media/Command_block_back.webp"></div>
		<div class="cube-face cube-bottom"><img style="width: 100%;" src="./src/media/Command_block_back.webp"></div>
	</div>`;
	block.classList = "scene";

	const style = document.createElement("style");

	style.innerHTML = `
		.scene {
			perspective: 600px;
			width: 200px;
			height: 200px;
			margin: 100px auto;
		}

		.cube {
			position: relative;
			width: 100%;
			height: 100%;
			transform-style: preserve-3d;
			animation: rotateCube 8s infinite linear;
		}

		@keyframes rotateCube {
			0% { transform: rotateX(0deg) rotateY(0deg); }
			100% { transform: rotateX(360deg) rotateY(360deg); }
		}

		.cube-face {
			position: absolute;
			width: 200px;
			height: 200px;
			background: rgba(255, 255, 255, 0.9);
			border: 2px solid #333;
			font-size: 18px;
			font-family: sans-serif;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #000;
		}

		.cube-front  { transform: translateZ(100px); }
		.cube-back   { transform: rotateY(180deg) translateZ(100px); }
		.cube-right  { transform: rotateY(90deg) translateZ(100px); }
		.cube-left   { transform: rotateY(-90deg) translateZ(100px); }
		.cube-top    { transform: rotateX(90deg) translateZ(100px); }
		.cube-bottom { transform: rotateX(-90deg) translateZ(100px); }
	`;
	document.head.appendChild(style);

	return block;
}

function cmd(command) {
	// minecraft command
	if (command === "minecraft -m give @p command_block") {
		window.location.href = "./entertainment/command_block.html"

	} else if (command === "minecraft -m summon command_block ~ ~ ~") {
		const block = document.createElement("div");
		block.classList = "conteiner";
		block.id = "command-block";
		block.appendChild(summonCommandBlock());

		document.querySelector(".content").appendChild(block);

	// orther command
	} else if (command === "cd osu-skins") {
		window.location.href = "./osu-skins.html"

	} else if (command === "pizza") {
		const blockPizza = document.createElement("div");
		blockPizza.classList = "conteiner";
		blockPizza.id = "pizza";

		const blockPizzaVideo = document.createElement("video");
		blockPizzaVideo.src = "./src/media/oYYDeyOkQIf71IPMeeNiuG8LuIMZgxIeAA6LtN.mp4";
		blockPizzaVideo.setAttribute("autoplay", "")
		blockPizza.appendChild(blockPizzaVideo);

		blockPizzaVideo.addEventListener('ended', (event) => {
				document.getElementById("pizza").remove();
		});

		document.querySelector(".content").appendChild(blockPizza);

	} else if (command === "bash") {
		const blockBash = document.createElement("div");
		blockBash.classList = "conteiner";
		blockBash.id = "bash";

		const blockBashDiv = document.createElement("div"); // <div id="html-console"></div>
		blockBashDiv.classList = "terminal";
		blockBashDiv.innerHTML = `
		  <!-- Блок, куда выводятся все логи -->
		  <div id="terminal-logs"></div>
		  
		  <!-- Строка ввода команд -->
		  <div class="terminal-input-line">
		    <span class="prompt">&gt;</span>
		    <input type="text" id="terminal-input" placeholder="Введите JS-код... (например: alert('Привет') или 2+2)" autofocus>
		  </div>
		`
		
		blockBash.appendChild(blockBashDiv);
		document.querySelector(".content").appendChild(blockBash);

		const blockStyleTerminal = document.createElement("style");
		blockStyleTerminal.innerHTML = `
		.terminal {
		  background-color: #1e1e1e;
		  border-radius: 6px;
		  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
		  padding: 15px;
		  width: stretch;
		}

		#terminal-logs {
		  height: 300px;
		  overflow-y: auto;
		  font-family: 'Courier New', Courier, monospace;
		  font-size: 14px;
		  margin-bottom: 10px;
		}

		.log-line {
		  margin: 4px 0;
		  white-space: pre-wrap;
		  word-break: break-all;
		}

		/* Цвета для разных типов сообщений */
		.log-default { color: #ffffff; }
		.log-info { color: #00bcd4; }
		.log-error { color: #ff5252; font-weight: bold; }
		.log-command { color: #8bc34a; font-style: italic; }

		.terminal-input-line {
		  display: flex;
		  align-items: center;
		  font-family: 'Courier New', Courier, monospace;
		}

		.prompt {
		  color: #8bc34a;
		  margin-right: 8px;
		  font-weight: bold;
		}

		#terminal-input {
		  flex: 1;
		  background: transparent;
		  border: none;
		  color: #fff;
		  font-family: inherit;
		  font-size: 14px;
		  outline: none;
		}

		`;
		document.head.appendChild(blockStyleTerminal);


		const logsContainer = document.getElementById('terminal-logs');
		const terminalInput = document.getElementById('terminal-input');

		// Функция для красивого добавления строки в нашу HTML-консоль
		function appendToTerminal(text, type = 'default') {
		    const line = document.createElement('div');
		    line.className = `log-line log-${type}`;
		    line.innerText = text;
		    logsContainer.appendChild(line);
		    
		    // Всегда прокручиваем вниз к новым записям
		    logsContainer.scrollTop = logsContainer.scrollHeight;
		}

		// 1. ПЕРЕХВАТЫВАЕМ ОБЫЧНЫЕ ЛОГИ (console.log, console.info)
		const originalLog = console.log;
		console.log = function (...args) {
		    originalLog.apply(console, args);
		    appendToTerminal(args.join(' '), 'default');
		};

		const originalInfo = console.info;
		console.info = function (...args) {
		    originalInfo.apply(console, args);
		    appendToTerminal(args.join(' '), 'info');
		};

		// 2. ПЕРЕХВАТЫВАЕМ СИСТЕМНЫЕ ОШИБКИ JS (например, если в коде опечатка)
		window.onerror = function (message, source, lineno, colno, error) {
		    appendToTerminal(`Ошибка: ${message} (Строка: ${lineno})`, 'error');
		    return false; // Позволяет ошибке также дублироваться в стандартную консоль браузера
		};


		// 3. ОБРАБОТКА ВВОДА КОМАНД
		terminalInput.addEventListener('keydown', function (event) {
		    // Проверяем, что нажат именно Enter
		    if (event.key === 'Enter') {
		        const command = terminalInput.value.trim();
		        if (!command) return;

		        // Показываем в консоли, какую команду ввел пользователь
		        appendToTerminal(`> ${command}`, 'command');

		        try {
		            // Выполняем введенный JS-код с помощью функции eval()
		            const result = eval(command);
		            
		            // Если команда что-то вернула (например, результат вычисления), выводим это
		            if (result !== undefined) {
		                console.log(String(result));
		            }
		        } catch (error) {
		            // Если пользователь ввел код с ошибкой — выводим её красным
		            appendToTerminal(`Ошибка выполнения: ${error.message}`, 'error');
		        }

		        // Очищаем поле ввода для следующей команды
		        terminalInput.value = '';
		    }
		});




	} else {
		alert("Not command found :(");
	}
}

window.addEventListener("keydown", (event) => {
	if (event.code === "Slash" && !document.getElementById("cmd")) {
		const command = prompt("Open command line!");
		cmd(command);
		// const line = document.createElement("input");
		// line.id = "cmd";
		// line.classList = "conteiner";

		// const content = document.querySelector(".content");
		// content.appendChild(line);
	}

	// if (event.code === "Enter") {
	// 	cmd(document.getElementById("cmd").value)
	// }
})







