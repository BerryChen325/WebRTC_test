# WebRTC_test
a simple example of WebRTC

## signal-server:
### 关于证书：
```
openssl req -x509 -newkey rsa:2048 -keyout ./keys/server_key.pem -out ./keys/server_crt.pem -days 99999 -nodes 
```
当你创建一个WebRTC信令服务器时，证书是非常重要的，尤其是在涉及到真实的、生产环境中的部署时。下面列举了为什么需要证书，以及上述`openssl`命令做了什么：

1. **WebRTC 和 HTTPS 的关系**:
   - WebRTC规范要求，当你在生产环境中部署WebRTC应用时，它必须运行在HTTPS上。这是为了确保媒体和信令都是加密的，以保护用户的隐私和数据安全。
   - 为了启用HTTPS，你需要SSL/TLS证书。当你为你的信令服务器创建证书时，你实际上是为HTTPS准备的。

2. **测试和开发**:
   - 在开发和测试阶段，你可能不希望为你的信令服务器购买一个真正的证书，特别是当服务器只在本地运行时。因此，使用`openssl`来生成自签名证书是一个简单的解决方案，它为你提供了一个免费的、但不被公共认证的证书。

3. **`openssl` 命令解释**:
   - `req -x509`: 该命令生成一个自签名的X.509证书。
   - `-newkey rsa:2048`: 创建一个新的2048位的RSA密钥。
   - `-keyout ./keys/server_key.pem`: 将新创建的私钥保存到指定的路径。
   - `-out ./keys/server_crt.pem`: 将自签名的证书保存到指定的路径。
   - `-days 99999`: 证书的有效期是99999天。
   - `-nodes`: 这意味着私钥不应该被加密。这是有用的，因为它允许服务器在没有密码提示的情况下启动。

需要注意的是，自签名证书在生产环境中通常是不被浏览器所信任的，因为它没有任何第三方机构进行认证。但是，对于开发和测试目的，它是完全可以的。在生产环境中部署时，你应该考虑从一个受信任的证书颁发机构获取证书。


### package.json:
package.json文件为项目提供了结构和元数据，它描述了项目的依赖、脚本和基本信息。


### npm i 过程：
是的，当你在项目的根目录（即包含`package.json`的目录）执行`npm i`或`npm install`时，以下事情会发生：

1. **检查`package.json`**:
   - `npm`会首先检查`package.json`文件中的`dependencies`和`devDependencies`部分。

2. **创建/更新`node_modules`目录**:
   - 如果`node_modules`目录不存在，`npm`会创建它。如果目录已存在，它将继续在该目录中安装/更新包。
   - `npm`将开始下载并安装`package.json`中列出的所有依赖项（及其递归依赖项）。

3. **更新`package-lock.json`**:
   - 如果`package-lock.json`文件不存在，`npm`会创建它。
   - `package-lock.json`文件是一个完整的依赖树，它确保了你的项目有一个一致的安装和依赖结构，无论何时或在哪里运行`npm install`。这可以确保每次安装的版本都是相同的，避免了"在我机器上运行正常"这类的问题。

4. **检查安装过程中的警告和错误**:
   - 如果某个包无法下载或安装，`npm`会显示错误。
   - 有时，某些包可能有“对等依赖”（peer dependencies）要求，它们可能不会被自动安装，但会触发警告，提示你手动安装。

基于你提供的`package.json`，执行`npm i`后，它会安装`express`, `express-session`和`socket.io`（及其所有依赖包）。这些库及其版本会被下载并保存到`node_modules`目录中。

### 关于socketIO和websocket
https://zhuanlan.zhihu.com/p/90405755

> chatgpt:
>
> Socket.IO（Socket.IO）是一个流行的开源JavaScript库，用于实现实时、双向通信的网络应用程序。它构建在WebSocket之上，提供了跨浏览器的实时通信解决方案，同时也可以自动降级到使用其他传输协议，如长轮询（long polling）等，以确保在不同环境中实现最佳的实时通信性能。
>
> Socket.IO 的主要功能和特点包括：
>
> 实时通信：Socket.IO 允许服务器和客户端之间建立持久的双向通信通道，以便实时传输数据。这对于在线聊天、协作工具、多人游戏等需要实时互动的应用程序非常有用。
>
> 自动降级：Socket.IO 可以自动选择最佳的传输方式，根据客户端和服务器的支持情况，它可以使用WebSocket、轮询或其他传输方式。这确保了在不同网络环境下的兼容性和性能。
>
> 事件驱动：Socket.IO 基于事件的编程模型，允许服务器和客户端通过触发和监听事件来进行通信。这使得开发者可以轻松处理各种消息和动作。
>
> 跨平台：Socket.IO 可以在多种平台上使用，包括浏览器、Node.js、iOS、Android 等，因此可以实现跨平台的实时通信。
>
> Socket.IO 通常与Node.js结合使用，但也有许多其他语言的服务器端实现可供选择。它在构建实时Web应用程序时非常有用，提供了简单而强大的工具来处理实时数据传输和事件处理。

TODO

## webrtc-client:
### STUN和TURN
STUN (Session Traversal Utilities for NAT) 只能UDP，告诉我暴露在广域网的地址IP port ，我通过映射的广域网地址进行P2P数据通信。

TURN( Traversal Using Relays around for NAT)UDP或TCP， 打洞失败后，提供服务器中转数据，通话双方数据都通过服务器，占服务器带宽较大 - 为了确保通话在绝大多数环境下可以正常工作。跨网只能用服务器中转（测试发现的） ，使用TURN这种情况在视频通话中占10%

### WebRTC的Offer/Answer模型
WebRTC（Web实时通信）的Offer/Answer模型是一种用于建立和协商WebRTC连接的通信协议和模型。它允许两个端点（如浏览器）之间协商媒体通信参数，以建立点对点的实时通信连接，通常用于音频、视频和数据传输。Offer/Answer模型通常用于构建WebRTC应用程序，如实时音视频通话和屏幕共享。

Offer/Answer模型的基本思想是一个端点创建一个"offer"（提议），而另一个端点创建一个"answer"（回应）。这两者包含了关于媒体通信的参数，例如媒体类型、编解码器、媒体传输协议等。通常，一个端点扮演"offerer"的角色，而另一个端点扮演"answerer"的角色。

整个协商过程通常包括以下步骤：

Offer（提议）：发起端点（offerer）创建一个包含媒体参数的SDP（Session Description Protocol） offer，并将其发送给接收端点（answerer）。

Answer（回应）：接收端点（answerer）收到SDP offer，并创建一个包含其自己的媒体参数的SDP answer，然后将其发送回给发起端点（offerer）。

协商：发起端点和接收端点互相交换SDP offer和answer，以便协商最终的媒体参数。这个过程通常涉及协商媒体类型、编解码器、媒体传输方式、IP地址和端口等信息。

媒体连接：一旦协商完成，端点之间就可以建立媒体连接，开始音频、视频或数据传输。

Offer/Answer模型的关键部分是SDP（Session Description Protocol）offer和answer，它们是包含媒体协商信息的文本描述。这些文本描述包含了关于媒体通信的详细信息，以便确保两个端点能够理解和协商通信参数。

总之，WebRTC的Offer/Answer模型是一种用于建立实时通信连接的协商模型，它允许两个端点协商媒体参数，以便建立可靠的点对点通信连接。这种模型是WebRTC应用程序的核心，用于确保媒体通信的成功和质量。

TODO

## 可能可以做的改动
1. 目前打开摄像头时音频和视频一起打开，可以调整为两者分开（可以选择是否打开摄像头即视频、是否打开麦克风即音频），类似腾讯会议
2. 前端可以搞稍微好看一点
3. 或许可以增加文字聊天框，另外“某某人加入了会议”的提示也可以出现在聊天框里