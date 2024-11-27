!function(window){
  const host="https://labs.heygen.com";
  const url=host+"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJjMjBmNGJkZGRiZTA0MWVjYmE5OGQ5MzQ0%0D%0ANGY4YjI5YiIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3Yz%0D%0AL2MyMGY0YmRkZGJlMDQxZWNiYTk4ZDkzNDQ0ZjhiMjliL2Z1bGwvMi4yL3ByZXZpZXdfdGFyZ2V0%0D%0ALndlYnAiLCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6IjQy%0D%0AMTFiMTk1YTE4ZDQ3NmQ5OTUzOTliMDRmNGRjMTE0IiwidXNlcm5hbWUiOiI3Zjc4ZjIyZDFiNmE0%0D%0AYTc3ODc0OTAzNWE4OTBiNzVhNiJ9&inIFrame=1";
  const clientWidth=document.body.clientWidth;
  const wrapDiv=document.createElement("div");
  wrapDiv.id="heygen-streaming-embed";
  const container=document.createElement("div");
  container.id="heygen-streaming-container";
  const stylesheet=document.createElement("style");
  stylesheet.innerHTML=`
    #heygen-streaming-embed {
      z-index: 9999;
      position: fixed;
      left: 40px;
      bottom: 40px;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 2px solid #fff;
      box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);
      transition: all linear 0.1s;
      overflow: hidden;

      opacity: 0;
      visibility: hidden;
    }
    #heygen-streaming-embed.show {
      opacity: 1;
      visibility: visible;
    }
    #heygen-streaming-embed.expand {
      ${clientWidth<540?"height: 266px; width: 96%; left: 50%; transform: translateX(-50%);":"height: 366px; width: calc(366px * 16 / 9);"}
      border: 0;
      border-radius: 8px;
    }
    #heygen-streaming-container {
      width: 100%;
      height: 100%;
    }
    #heygen-streaming-container iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
  `;
  const iframe=document.createElement("iframe");
  iframe.allowFullscreen=!1;
  iframe.title="Streaming Embed";
  iframe.role="dialog";
  iframe.allow="microphone";
  iframe.src=url;
  let visible=!1, initial=!1;
  window.addEventListener("message",(e=>{
    if(e.origin===host&&e.data&&e.data.type&&"streaming-embed"===e.data.type){
      if("init"===e.data.action){
        initial=!0;
        wrapDiv.classList.toggle("show",initial);
      }else if("show"===e.data.action){
        visible=!0;
        wrapDiv.classList.toggle("expand",visible);
      }else if("hide"===e.data.action){
        visible=!1;
        wrapDiv.classList.toggle("expand",visible);
      }
    }
  }));
  container.appendChild(iframe);
  wrapDiv.appendChild(stylesheet);
  wrapDiv.appendChild(container);
  document.body.appendChild(wrapDiv);
}(globalThis);
