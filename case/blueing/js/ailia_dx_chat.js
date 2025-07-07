// ailia DX Chatbot

// ステート
var memory = {};
var processing = false;
var stream = false;

// Chatの実行
function chat_api(url) {
	if (processing){
		return;
	}

	var prompt = document.getElementById("prompt").value;
	//document.getElementById("prompt").value = "";

	api_call(url, prompt)
}

function chat_response(xhr) {
	// エラー
	if (xhr.status != 200){
		if (xhr.readyState === XMLHttpRequest.DONE){
			document.getElementById("chat").innerHTML = document.getElementById("chat").innerHTML + xhr.responseText;
			processing = false;
		}
		return;
	}

	// ストリーミング出力の受信
	if (xhr.readyState === xhr.LOADING && xhr.status === 200 && stream) {
		// EventStreamデータの分解
		results = xhr.responseText.split("\n\n");
		document.getElementById("chat_stream").innerHTML = "";
		for (var i = 0; i < results.length - 1; i++){ // 改行が含まれていない最後のデータは未完成なので削除
			var lineText = results[i];
			if (!lineText.startsWith('data:')) { // EventStreamのデータかどうか
				continue;
			}
			lineText = lineText.substring(5).trim(); // data:の削除
			const jsonObj = JSON.parse(lineText);
			console.log(jsonObj)
			if ("token" in jsonObj["data"]){
				var token = jsonObj["data"]["token"];
				document.getElementById("chat_stream").innerHTML = document.getElementById("chat_stream").innerHTML + token;
			}
		}
	}

	// 通常出力の受信
	if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
		if (stream){
			results = xhr.responseText.split("\n\n");
			lineText = results[results.length - 2] // 最後のデータを取得 
			if (lineText.startsWith('data:')) {
				lineText = lineText.substring(5).trim();
			}
		}else{
			lineText = xhr.responseText;
		}
		document.getElementById("chat_stream").innerHTML = "";
		const jsonObj = JSON.parse(lineText);
		console.log(jsonObj)
		var answer = jsonObj["data"]["answer"];
		document.getElementById("chat").innerHTML = document.getElementById("chat").innerHTML + "<p class='ans'>" + answer + "</p>";
		memory = jsonObj["data"]["memory"];
		processing = false;
	}
}

// API呼び出し
function api_call(url, prompt) {
	const xhr = new XMLHttpRequest();
	xhr.open("POST", url + "/api/v1/chat", true);

	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onreadystatechange = () => {
		chat_response(xhr);
	};

	var language = "ja"
	var topK = 1;
	var set_memory = memory
	var data = {"data": {"prompt":prompt, "memory":set_memory, "language":language, "topK":topK}};

	//data["data"]["stream"] = true;
	//data["data"]["model"] = "gpt-4";

	if (prompt != ""){
		prompt = prompt.replace("<", "＜");
		prompt = prompt.replace(">", "＞");
		document.getElementById("chat").innerHTML = document.getElementById("chat").innerHTML + "<p class='send'>" + prompt + "</p>";
	}
	document.getElementById("chat").innerHTML = document.getElementById("chat").innerHTML + "<p class='call'>" + "問い合わせ中..." + "</p>";
	processing = true;

	var json = JSON.stringify(data);
	xhr.send(json);
}

