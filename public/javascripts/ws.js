var socket;

function entry() {
  var username = document.getElementById('user_name').value;
  if (!username) {
    alert('请你的姓名！');
    return;
  }

  socket = new WebSocket('ws://192.168.13.238:4080', encodeURI(username));
  socket.onopen = function () {
    // 发送一个初始化消息
    socket.send('进入了聊天室。');

    // 监听消息
    socket.onmessage = function (event) {
      textArea = document.getElementById('message_area');
      document.getElementById('message_area').value = textArea.value + '\r\n' + event.data;
      textArea.scrollTop = textArea.scrollHeight;
    };

    // 监听Socket的关闭
    socket.onclose = function (event) {
      console.log('Client notified socket has closed', event);
    };
  }
  document.getElementById('login').style.display = 'none';
  document.getElementById('messages').style.display = 'block';
}

function send() {
  var contentEle = document.getElementById('message_content');
  var content = contentEle.value;
  if (!content) {
    alert('请输入内容！');
    return;
  }
  socket.send(content);
  contentEle.value = '';
}