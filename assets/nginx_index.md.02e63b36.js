import{_ as n,c as s,o as e,a}from"./app.169c26a5.js";const u=JSON.parse('{"title":"基本概要","description":"","frontmatter":{},"headers":[{"level":2,"title":"特点","slug":"特点","link":"#特点","children":[]},{"level":2,"title":"工作模式","slug":"工作模式","link":"#工作模式","children":[]},{"level":2,"title":"虚拟主机","slug":"虚拟主机","link":"#虚拟主机","children":[]},{"level":2,"title":"安装目录","slug":"安装目录","link":"#安装目录","children":[]},{"level":2,"title":"常用命令","slug":"常用命令","link":"#常用命令","children":[]}],"relativePath":"nginx/index.md"}'),l={name:"nginx/index.md"},t=a(`<h1 id="基本概要" tabindex="-1">基本概要 <a class="header-anchor" href="#基本概要" aria-hidden="true">#</a></h1><p>Nginx 是一个开源且高性能、可靠的 HTTP 中间件，代理服务。可以做静态资源服务器，反向代理，负载平衡器和 HTTP 缓存。</p><h2 id="特点" tabindex="-1">特点 <a class="header-anchor" href="#特点" aria-hidden="true">#</a></h2><ul><li>Nginx 采用的是多进程（单线程）+ 多路 IO 复用模型。</li><li>Nginx 采用的 I/O 多路复用模型 <code>epoll</code>。</li><li>CPU 亲和: 把 CPU 核心和 Nginx 工作进程绑定方式，把每个 worker 进程固定在一个 CPU 上执行，减少切换 CPU 的 cache miss，获得更好的性能</li></ul><h2 id="工作模式" tabindex="-1">工作模式 <a class="header-anchor" href="#工作模式" aria-hidden="true">#</a></h2><ul><li>Nginx 在启动后，会以 daemon 的方式在后台运行，后台进程包含一个 <code>master</code> 进程和多个相互独立的 <code>worker</code> 进程。工作进程以非特权用户运行。</li><li><code>master</code> 进程主要用来管理 <code>worker</code> 进程，包含：接收来自外界的信号，向各 <code>worker</code> 进程发送信号，监控 <code>worker</code> 进程的运行状态，当 <code>worker</code> 进程退出后（异常情况下），会自动重新启动新的 <code>worker</code> 进程。</li><li><code>worker</code> 进程则是处理基本的网络事件。多个 <code>worker</code> 进程之间是对等的，他们同等竞争来自客户端的请求，各进程互相之间是独立的。一个请求，只可能在一个 <code>worker</code> 进程中处理，一个 <code>worker</code> 进程，不可能处理其它进程的请求。</li></ul><p>工作线程处理实际的请求。Nginx 使用<strong>基于事件</strong>的模型和<strong>依赖操作系统</strong>的机制来有效地在工作进程之间分发请求。</p><blockquote><p>worker 进程数，一般会设置成机器 CPU 核数。因为更多的 worker 数，只会导致进程相互竞争 CPU，从而带来不必要的上下文切换。 使用多进程模式，不仅能提高并法率，而且进程之间相互独立，一个 worker 进程挂了不会影响其他 worker 进程。</p></blockquote><h2 id="虚拟主机" tabindex="-1">虚拟主机 <a class="header-anchor" href="#虚拟主机" aria-hidden="true">#</a></h2><p>通俗的讲：就是一个 nginx 配置多个服务</p><ul><li>所谓虚拟主机，在 Web 服务里就是一个独立的网站站点，这个站点对应独立的域名（也可能是 IP 或端口），具有独立的程序及资源，可以独立地对外提供服务供用户访问。</li><li>在 Nginx 中，使用一个 server{} 标签来标 识一个虚拟主机，一个 Web 服务里可以有多个虚拟主机标签对，即可以同时支持多个虚拟主机站点。</li><li>虚拟主机有三种类型：基于域名的虚拟主机、基于端口的虚拟主机、基于 IP 的虚拟主机。</li><li>域名虚拟主机通过配置 server_name，端口和 IP 虚拟主机通过 listen 实现</li></ul><h2 id="安装目录" tabindex="-1">安装目录 <a class="header-anchor" href="#安装目录" aria-hidden="true">#</a></h2><table><thead><tr><th>路径</th><th>类型</th><th>作用</th></tr></thead><tbody><tr><td><code>/etc/nginx/conf.d</code><br><code>/etc/nginx/nginx.conf</code></td><td>目录、配置文件</td><td>nginx 配置文件</td></tr><tr><td><code>/var/cache/nginx</code></td><td>目录</td><td>nginx 的缓存目录</td></tr><tr><td><code>/var/log/nginx</code></td><td>目录</td><td>nginx 的日志目录</td></tr><tr><td><code>/usr/share/nginx/html</code></td><td>文件</td><td>nginx 默认的静态资源目录</td></tr><tr><td><code>/etc/nginx/mime.types</code></td><td>配置文件</td><td>设置 HTTP 协议的 Content-Type 与扩展名对应</td></tr></tbody></table><h2 id="常用命令" tabindex="-1">常用命令 <a class="header-anchor" href="#常用命令" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># 启动</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 启动并指定配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -c /etc/nginx/nginx.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 立即停止服务</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -s stop</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 优雅地停止服务</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -s quit</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 重载配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -s reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 指定配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -s reload -c /etc/nginx/nginx.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 重启nginx 服务</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl restart nginx.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 检查配置文件是否有语法错误</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -t</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 检查指定的配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -t -c /etc/nginx/nginx.conf</span></span>
<span class="line"></span></code></pre></div>`,15),c=[t];function i(o,r,d,p,h,g){return e(),s("div",null,c)}const C=n(l,[["render",i]]);export{u as __pageData,C as default};
