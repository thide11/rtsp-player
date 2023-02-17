export default class HtmlPlayer {

  constructor(private cameraId : string, private videoRef : HTMLVideoElement) {
    this.init();
  }

  private active = true
  private type = 'live'
  private hls = null
  private ws : WebSocket | null = null;
  private mseSourceBuffer : SourceBuffer | any = {};
  private mse : MediaSource | null = null;
  private mseQueue : any[] = []
  private mseStreamingStarted = false

  private init() {

    const streamId = "cameras";
    const canalId = this.cameraId;
    console.log("Id do canal:")
    console.log(canalId)
    const url = `ws://187.255.186.172:8083/stream/${streamId}/channel/${canalId}/mse?uuid=${streamId}&channel=${canalId}`

    this.mse = new MediaSource();
    this.videoRef.src = window.URL.createObjectURL(this.mse);
    this.videoRef.load();
  this.mse.addEventListener('sourceopen', () => {
    this.ws = new WebSocket(url);
    this.ws.binaryType = "arraybuffer";
    this.ws.onopen = function (event) {
      console.log('Connect to ws');
    }

    this.ws.onmessage = (event) => {
      console.log("Mensagem recebida!");
      var data = new Uint8Array(event.data);
      if (data[0] == 9) {
        let decoded_arr = data.slice(1);
        let mimeCodec;
        if (window.TextDecoder) {
          mimeCodec = new TextDecoder("utf-8").decode(decoded_arr);
        } else {
          console.log("Sem decodificador apropriado")
          return;
        }
        console.log(mimeCodec);
        this.mseSourceBuffer = this.mse!.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"');
        this.mseSourceBuffer.mode = "segments"
        this.mseSourceBuffer.addEventListener("updateend", this.pushPacket.bind(this));

      } else {
        this.readPacket(event.data);
      }
    };
  }, false);
  }

  private pushPacket() {
    if (!this.mseSourceBuffer.updating) {
      if (this.mseQueue.length > 0) {
        let packet = this.mseQueue.shift();
        var view = new Uint8Array(packet);
        this.mseSourceBuffer.appendBuffer(packet);
      } else {
        this.mseStreamingStarted = false;
      }
    }
  }

  private readPacket (packet : any) {
    if (!this.mseStreamingStarted) {
      this.mseSourceBuffer.appendBuffer(packet);
      this.mseStreamingStarted = true;
      return;
    }
    this.mseQueue.push(packet);

    if (!this.mseSourceBuffer.updating) {
      this.pushPacket();
    }
  }

  //console.log(this.streamPlayUrl('mse'));
}