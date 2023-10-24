// /**
//  * dom获取
//  */
// const btnConnect = $('#connect'); // 连接dom
// const btnLogout = $('#logout'); // 挂断dom
// const domLocalVideo = $('#localVideo'); // 本地视频dom

// // fix bug
// let localStream = null; // Uncaught ReferenceError: localStream is not defined

// /**
//  * 连接
//  */
// btnConnect.click(() => {
//   //启动摄像头
//   if (localStream == null) {
//     openCamera().then(stream => {
//       localStream = stream; // fix bug
//       pushStreamToVideo(domLocalVideo[0], stream);
//     }).catch(e => alert(`getUserMedia() error: ${e.name}`));
//   }
// });

// /**
//  * 挂断
//  */
// btnLogout.click(() => {
//   closeCamera(domLocalVideo[0]);
// })

/**
 * dom获取
 */
const btnConnect = $('#connect'); // 连接dom
const btnLogout = $('#logout'); // 挂断dom
const domLocalVideo = $('#localVideo'); // 本地视频dom
const domRoom = $('#room'); // 获取房间号输入框dom

/**
 * 连接
 */
btnConnect.click(() => {
  const roomid = domRoom.val(); // 获取用户输入的房间号
  if (!roomid) {
    alert('房间号不能为空');
    return;
  };
  //启动摄像头
  if (localStream == null) {  // localStream全局变量在sdk.js中定义
    openCamera().then(stream => {
      localStream = stream; // 保存本地视频到全局变量
      pushStreamToVideo(domLocalVideo[0], stream);
      connect(roomid); // new:成功打开摄像头后，开始创建或者加入输入的房间号
    }).catch(e => alert(`getUserMedia() error: ${e.name}`));
  }
});

/**
 * 挂断
 */
btnLogout.click(() => {
  closeCamera(domLocalVideo[0]);
  logout(roomId); // 退出房间
  
  //移除远程视频
  $('#remoteDiv').empty();
})

// 上面的OpenCamera和CloseCamera都在sdk.js中定义