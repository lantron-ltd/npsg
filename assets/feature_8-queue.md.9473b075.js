import{_ as s,c as n,o as a,b as l}from"./app.dff62eda.js";const F=JSON.parse('{"title":"说明","description":"","frontmatter":{},"headers":[],"relativePath":"feature/8-queue.md","lastUpdated":1675221455000}'),p={name:"feature/8-queue.md"},o=l(`<p><a href="/npsg/feature/">返回功能介绍</a></p><h1 id="说明" tabindex="-1">说明</h1><p>这里的消息队列用到的是<code>bull</code>, <code>nestjs</code>对 bull进行了封装，能够更加的方便我们使用，这里用的是redis进行存储。</p><h2 id="使用场景" tabindex="-1">使用场景</h2><ol><li>微服务架构：</li><li>分布式系统中的消息传递；</li><li>数据导流和数据缓存；</li><li>异步任务处理；</li><li>消息通知；</li><li>应用程序的事件驱动。</li></ol><h2 id="代码示例" tabindex="-1">代码示例</h2><p>这里通过<code>@InjectQueue</code>注解注入了一个消息队列，可以往这个消息队列中添加一个名字和任意类型的数据进行处理，这里假设我们需要对媒体文件进行转码处理。</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">constructor</span><span style="color:#E1E4E8;">(@</span><span style="color:#B392F0;">InjectQueue</span><span style="color:#E1E4E8;">(queueNames.queue) private readonly queue: Queue) {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">Post</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;transcode&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">ApiConsumes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;multipart/form-data&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">ApiBody</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    description: </span><span style="color:#9ECBFF;">&#39;file&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: FileDto,</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">UseInterceptors</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">FileInterceptor</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;file&#39;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">  async </span><span style="color:#B392F0;">transcode</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#B392F0;">UploadedFile</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    file: Express.Multer.File,</span></span>
<span class="line"><span style="color:#E1E4E8;">  ) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.queue.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(jobNames.transcode, {</span></span>
<span class="line"><span style="color:#E1E4E8;">      file: file,</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">constructor</span><span style="color:#24292E;">(@</span><span style="color:#6F42C1;">InjectQueue</span><span style="color:#24292E;">(queueNames.queue) private readonly queue: Queue) {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">Post</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;transcode&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">ApiConsumes</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;multipart/form-data&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">ApiBody</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    description: </span><span style="color:#032F62;">&#39;file&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    type: FileDto,</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">UseInterceptors</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">FileInterceptor</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;file&#39;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">  async </span><span style="color:#6F42C1;">transcode</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#6F42C1;">UploadedFile</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    file: Express.Multer.File,</span></span>
<span class="line"><span style="color:#24292E;">  ) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.queue.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(jobNames.transcode, {</span></span>
<span class="line"><span style="color:#24292E;">      file: file,</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span></code></pre></div><p>然后我们需要一个处理器来处理收到的队列信息，通过<code>@Processor(queueNames.transcode)</code>注解来绑定一个消息队列，再在方法体上使用<code>@Process(jobNames.transcode)</code>对job进行处理。</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Processor</span><span style="color:#E1E4E8;">(queueNames.queue)</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">QueueProcessor</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">logger</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Logger</span><span style="color:#E1E4E8;">(QueueProcessor.name);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">Process</span><span style="color:#E1E4E8;">(jobNames.transcode)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">handleTranscode</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">job</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Job</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.logger.</span><span style="color:#B392F0;">debug</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`Start transcoding \${</span><span style="color:#E1E4E8;">job</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">name</span><span style="color:#9ECBFF;">}...\`</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3000</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.logger.</span><span style="color:#B392F0;">debug</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Transcoding completed&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Processor</span><span style="color:#24292E;">(queueNames.queue)</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">QueueProcessor</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;"> </span><span style="color:#E36209;">logger</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Logger</span><span style="color:#24292E;">(QueueProcessor.name);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">Process</span><span style="color:#24292E;">(jobNames.transcode)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">handleTranscode</span><span style="color:#24292E;">(</span><span style="color:#E36209;">job</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Job</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.logger.</span><span style="color:#6F42C1;">debug</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`Start transcoding \${</span><span style="color:#24292E;">job</span><span style="color:#032F62;">.</span><span style="color:#24292E;">name</span><span style="color:#032F62;">}...\`</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3000</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.logger.</span><span style="color:#6F42C1;">debug</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Transcoding completed&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="代码目录结构" tabindex="-1">代码目录结构</h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">├── queue.controller.ts</span></span>
<span class="line"><span style="color:#e1e4e8;">├── queue.module.ts</span></span>
<span class="line"><span style="color:#e1e4e8;">└── queue.processor.ts</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">├── queue.controller.ts</span></span>
<span class="line"><span style="color:#24292e;">├── queue.module.ts</span></span>
<span class="line"><span style="color:#24292e;">└── queue.processor.ts</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre></div>`,12),e=[o];function c(t,r,E,y,i,d){return a(),n("div",null,e)}const g=s(p,[["render",c]]);export{F as __pageData,g as default};
