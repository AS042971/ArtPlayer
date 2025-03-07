describe("Document", function () {
  afterEach(function () {
    [...Artplayer.instances].forEach((art) => {
      art.destroy(true);
    });
  });

  function testAll(art, done) {
    let isDone = false;
    art.on("ready", () => {
      expect(art.id).to.be.an("number");

      if (!isDone) {
        isDone = true;
        done();
      }
    });

    art.on("video:error", () => {
      expect(art.id).to.be.an("number");

      if (!isDone) {
        isDone = true;
        done();
      }
    });

    setTimeout(() => {
      expect(art.id).to.be.an("number");

      if (!isDone) {
        isDone = true;
        done();
      }
    }, 1000);
  }

  it("Test0", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      var $video = art.template.query(".art-video");
      console.info($video);
    });

    testAll(art, done);
  });

  it("Test1", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      var $video = art.query(".art-video");
      console.info($video);
    });

    testAll(art, done);
  });

  it("Test2", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.storage.set("your-key", "your-value");
    art.storage.get("your-key");
    art.storage.del("your-key");
    art.storage.clean();

    testAll(art, done);
  });

  it("Test3", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      console.info(art.i18n.get("Play"));
    });

    testAll(art, done);
  });

  it("Test4", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      lang: "jp",
    });
    art.i18n.update({
      "zh-cn": {
        Language: "简体",
      },
      "zh-tw": {
        Language: "繁體",
      },
      en: {
        Language: "English",
      },
      jp: {
        Language: "日文",
      },
      fr: {
        Language: "Français",
      },
      ru: {
        Language: "Russe",
      },
    });

    testAll(art, done);
  });

  it("Test5", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      subtitle: {
        url: "./assets/sample/subtitle.srt",
      },
    });
    art.on("ready", () => {
      art.seek = 20;
      art.subtitle.show = false;
      setTimeout(() => {
        art.subtitle.show = true;
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test6", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      subtitle: {
        url: "./assets/sample/subtitle.srt",

        encoding: "utf-8",

        style: {
          color: "#03A9F4",

          "font-size": "30px",
        },
      },
    });
    art.on("ready", () => {
      art.seek = 20;
      setTimeout(() => {
        art.subtitle.style({
          color: "red",

          "font-size": "40px",
        });
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test7", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      subtitle: {
        url: "./assets/sample/subtitle.srt",

        encoding: "utf-8",

        style: {
          color: "#03A9F4",

          "font-size": "30px",
        },
      },
    });
    art.on("ready", () => {
      console.info(art.subtitle.url);
      setTimeout(() => {
        art.subtitle.url = "./assets/sample/subtitle.srt?t=1";
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test8", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      subtitle: {
        url: "./assets/sample/subtitle.srt",

        encoding: "utf-8",

        style: {
          color: "red",

          "font-size": "30px",
        },
      },
    });
    art.on("ready", () => {
      art.seek = 20;
      setTimeout(() => {
        art.subtitle.switch("./assets/sample/subtitle.srt?t=1", {
          name: "The new subtitle",

          style: {
            color: "green",

            "font-size": "24px",
          },
        });
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test9", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    var img = "./assets/sample/layer.png";
    art.on("ready", () => {
      setTimeout(() => {
        art.layers.add({
          html: `<img style="width: 100px" src="${img}">`,

          style: {
            position: "absolute",

            top: "20px",

            right: "20px",

            opacity: ".9",
          },
        });
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test10", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      art.notice.show = "自定义提示信息1";
      art.notice.show = "自定义提示信息2";
    });

    testAll(art, done);
  });

  it("Test11", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      setTimeout(() => {
        art.controls.show = false;
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test12", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      setTimeout(() => {
        art.controls.add({
          position: "right",

          index: 10,

          html: "自定义按钮",

          tooltip: "自定义按钮的提示",

          click: function () {
            console.log("你点击了自定义按钮");
          },
        });
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test13", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      art.contextmenu.show = true;
      setTimeout(() => {
        art.contextmenu.show = false;
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test14", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      art.contextmenu.show = true;
      setTimeout(() => {
        art.contextmenu.add({
          html: "自定义菜单",

          click: function () {
            console.info("你点击了自定义菜单");

            art.contextmenu.show = false;
          },
        });
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test15", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      art.loading.show = true;
      setTimeout(() => {
        art.loading.show = false;
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test16", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      art.mask.show = true;
      setTimeout(() => {
        art.mask.show = false;
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test17", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      art.hotkey.add(65, () => {
        console.info("你点击了 A 键");
      });
      art.hotkey.add(66, () => {
        console.info("你点击了 B 键");
      });
    });

    testAll(art, done);
  });

  it("Test18", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      setting: true,
      autoSize: true,
    });
    art.on("ready", () => {
      art.seek = 20;
      art.setting.show = true;
      setTimeout(() => {
        art.setting.show = false;
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test19", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      console.info(Artplayer.instances.length);
    });

    testAll(art, done);
  });

  it("Test20", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("video:play", (...args) => {
      console.info(args);
    });

    testAll(art, done);
  });

  it("Test21", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", (...args) => {
      console.info(args);
    });

    testAll(art, done);
  });

  it("Test22", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("play", (...args) => {
      console.info(args);
    });

    testAll(art, done);
  });

  it("Test23", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("pause", (...args) => {
      console.info(args);
    });

    testAll(art, done);
  });

  it("Test24", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("seek", (...args) => {
      console.info(args);
    });
    art.on("ready", (...args) => {
      art.seek = 5;
    });

    testAll(art, done);
  });

  it("Test25", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("volume", (...args) => {
      console.info(args);
    });
    art.on("ready", (...args) => {
      art.volume = 0.5;
    });

    testAll(art, done);
  });

  it("Test26", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("destroy", (...args) => {
      console.info(args);
    });
    art.on("ready", (...args) => {
      art.destroy();
    });

    testAll(art, done);
  });

  it("Test27", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("focus", (...args) => {
      console.info(args);
    });

    testAll(art, done);
  });

  it("Test28", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("blur", (...args) => {
      console.info(args);
    });

    testAll(art, done);
  });

  it("Test29", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("hover", (state) => {
      // state 为true时，鼠标从外面移进播放器
      // state 为false时，鼠标从播放器移出外面
      console.info(state);
    });

    testAll(art, done);
  });

  it("Test30", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      autoSize: true,
    });
    art.on("resize", (...args) => {
      console.info(args);
    });

    testAll(art, done);
  });

  it("Test31", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("mousemove", (...args) => {
      console.info(args);
    });

    testAll(art, done);
  });

  it("Test32", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("url", (...args) => {
      console.info(args);
    });
    art.on("ready", (...args) => {
      art.url = "./assets/sample/video.mp4?t=0";
    });

    testAll(art, done);
  });

  it("Test33", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      fullscreen: true,
    });
    art.on("fullscreen", (...args) => {
      console.info(args);
    });

    testAll(art, done);
  });

  it("Test34", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      fullscreenWeb: true,
    });
    art.on("fullscreenWeb", (...args) => {
      console.info(args);
    });

    testAll(art, done);
  });

  it("Test35", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("hotkey", (...args) => {
      console.info(args);
    });

    testAll(art, done);
  });

  it("Test36", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });

    testAll(art, done);
  });

  it("Test37", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      // container: document.querySelector('.artplayer-app'),
      url: "./assets/sample/video.mp4",
    });

    testAll(art, done);
  });

  it("Test38", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });

    testAll(art, done);
  });

  it("Test39", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      poster: "./assets/sample/poster.jpg",
    });

    testAll(art, done);
  });

  it("Test40", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      title: "【新海诚动画】『秒速5センチメートル』",
      screenshot: true,
    });

    testAll(art, done);
  });

  it("Test41", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      theme: "#ffad00",
    });

    testAll(art, done);
  });

  it("Test42", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      volume: 0.5,
    });

    testAll(art, done);
  });

  it("Test43", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      isLive: true,
    });

    testAll(art, done);
  });

  it("Test44", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      muted: true,
    });

    testAll(art, done);
  });

  it("Test45", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      autoplay: true,
      muted: true,
    });

    testAll(art, done);
  });

  it("Test46", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      autoMini: true,
    });

    testAll(art, done);
  });

  it("Test47", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      loop: true,
    });

    testAll(art, done);
  });

  it("Test48", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      flip: true,
      setting: true,
    });

    testAll(art, done);
  });

  it("Test49", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      playbackRate: true,
      setting: true,
    });

    testAll(art, done);
  });

  it("Test50", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      aspectRatio: true,
      setting: true,
    });

    testAll(art, done);
  });

  it("Test51", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      screenshot: true,
      // 可选
      moreVideoAttr: {
        crossOrigin: "anonymous",
      },
    });

    testAll(art, done);
  });

  it("Test52", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      setting: true,
    });

    testAll(art, done);
  });

  it("Test53", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      hotkey: true,
    });

    testAll(art, done);
  });

  it("Test54", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      pip: true,
    });

    testAll(art, done);
  });

  it("Test55", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      mutex: true,
    });

    testAll(art, done);
  });

  it("Test56", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      fullscreen: true,
    });

    testAll(art, done);
  });

  it("Test57", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      fullscreenWeb: true,
    });

    testAll(art, done);
  });

  it("Test58", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      subtitle: {
        url: "./assets/sample/subtitle.srt",
      },
      setting: true,
      subtitleOffset: true,
    });

    testAll(art, done);
  });

  it("Test59", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      miniProgressBar: true,
    });

    testAll(art, done);
  });

  it("Test60", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      setting: true,
      settings: [
        {
          html: "自定义设置01",

          selector: [
            {
              html: "子菜单01",
            },

            {
              html: "子菜单02",
            },
          ],

          onSelect: function (item) {
            console.log(item.html);
          },
        },

        {
          html: "自定义设置02",

          selector: [
            {
              html: "子菜单01",
            },

            {
              html: "子菜单02",
            },
          ],

          onSelect: function (item) {
            console.log(item.html);
          },
        },
      ],
    });

    testAll(art, done);
  });

  it("Test61", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      contextmenu: [
        {
          html: "自定义菜单",

          click: function () {
            console.info("你点击了自定义菜单");

            art.contextmenu.show = false;
          },
        },
      ],
    });
    art.on("ready", () => {
      art.contextmenu.show = true;
    });

    testAll(art, done);
  });

  it("Test62", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      controls: [
        {
          disable: false,

          name: "button",

          index: 10,

          position: "right",

          html: "自定义按钮",

          tooltip: "自定义按钮的提示1",

          style: {
            color: "red",
          },

          click: function () {
            console.log("你点击了自定义按钮1");
          },

          mounted: function () {
            console.log("自定义按钮挂载完成1");
          },
        },

        {
          position: "left",

          html: "自定义按钮2",

          tooltip: "自定义按钮的提示2",

          style: {
            color: "green",
          },

          click: function () {
            console.log("你点击了自定义按钮2");
          },
        },
      ],
    });

    testAll(art, done);
  });

  it("Test63", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      quality: [
        {
          default: true,

          html: "SD 480P",

          url: "./assets/sample/video.mp4",
        },

        {
          html: "HD 720P",

          url: "./assets/sample/video.mp4",
        },
      ],
    });

    testAll(art, done);
  });

  it("Test64", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      highlight: [
        {
          time: 60,

          text: "One more chance",
        },

        {
          time: 120,

          text: "谁でもいいはずなのに",
        },

        {
          time: 180,

          text: "夏の想い出がまわる",
        },

        {
          time: 240,

          text: "こんなとこにあるはずもないのに",
        },

        {
          time: 300,

          text: "－－终わり－－",
        },
      ],
    });

    testAll(art, done);
  });

  it("Test65", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      whitelist: ["iPhone OS 11"],
      // whitelist: ['*'],
      // whitelist: [(ua) => /iPhone OS 11/gi.test(ua)],
      // whitelist: [/iPhone OS 11/gi],
    });

    testAll(art, done);
  });

  it("Test66", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      thumbnails: {
        url: "./assets/sample/thumbnails.png",

        number: 100,

        column: 10,
      },
    });

    testAll(art, done);
  });

  it("Test67", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      subtitle: {
        url: "./assets/sample/subtitle.srt",

        type: "srt",

        encoding: "utf-8",

        style: {
          color: "#03A9F4",

          "font-size": "30px",
        },
      },
    });

    testAll(art, done);
  });

  it("Test68", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      moreVideoAttr: {
        "webkit-playsinline": true,

        playsInline: true,
      },
    });

    testAll(art, done);
  });

  it("Test69", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      icons: {
        loading: '<img src="./assets/img/ploading.gif">',

        state: '<img src="./assets/img/state.png">',

        play: "",

        pause: "",

        volume: "",

        volumeClose: "",

        subtitle: "",

        screenshot: "",

        setting: "",

        fullscreen: "",

        fullscreenWeb: "",

        pip: "",

        indicator: "",
      },
    });

    testAll(art, done);
  });

  it("Test70", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.flv",
      type: "flv",
    });

    testAll(art, done);
  });

  it("Test71", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.flv",
      customType: {
        flv: function (video, url, art) {
          // video: 视频dom元素
          // url: 视频地址
          // art: 当前实例
        },
      },
    });

    testAll(art, done);
  });

  it("Test72", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      lang: "en",
    });

    testAll(art, done);
  });

  it("Test73", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      autoSize: true,
      setting: true,
      playbackRate: true,
      fullscreenWeb: true,
      plugins: [
        artplayerPluginDanmuku({
          // 弹幕数组

          danmuku: [
            {
              text: "111", // 弹幕文本

              time: 1, // 发送时间，单位秒

              color: "#fff", // 弹幕局部颜色

              border: false, // 是否显示描边

              mode: 0, // 弹幕模式: 0表示滚动、1静止
            },

            {
              text: "222",

              time: 2,

              color: "red",

              border: true,

              mode: 0,
            },

            {
              text: "333",

              time: 3,

              color: "green",

              border: false,

              mode: 1,
            },
          ],

          speed: 5, // 全局持续时间

          opacity: 1, // 全局透明度

          color: "#fff", // 全局字体颜色

          size: 25, // 全局字体大小

          maxlength: 50, // 全局最大长度

          margin: [10, 20], // 距离顶部和距离底部的高度值

          synchronousPlayback: false, // 是否同步到播放速度
        }),
      ],
    });

    testAll(art, done);
  });

  it("Test74", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      plugins: [
        artplayerPluginDanmuku({
          // 弹幕 XML 文件，和 Bilibili 网站的弹幕格式一致

          danmuku: "./assets/sample/danmuku.xml",
        }),
      ],
    });

    testAll(art, done);
  });

  it("Test75", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      plugins: [
        artplayerPluginDanmuku({
          // 使用 Promise 异步返回

          danmuku: function () {
            return new Promise((resovle) => {
              return resovle([
                {
                  text: "111",

                  time: 1,
                },

                {
                  text: "222",

                  time: 2,
                },

                {
                  text: "333",

                  time: 3,
                },
              ]);
            });
          },
        }),
      ],
    });

    testAll(art, done);
  });

  it("Test76", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      plugins: [
        artplayerPluginDanmuku({
          danmuku: "./assets/sample/danmuku.xml",
        }),
      ],
      controls: [
        {
          position: "right",

          html: "隐藏弹幕",

          click: function () {
            art.plugins.artplayerPluginDanmuku.hide();
          },
        },

        {
          position: "right",

          html: "显示弹幕",

          click: function () {
            art.plugins.artplayerPluginDanmuku.show();
          },
        },
      ],
    });

    testAll(art, done);
  });

  it("Test77", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      plugins: [
        artplayerPluginDanmuku({
          danmuku: "./assets/sample/danmuku.xml",
        }),
      ],
      controls: [
        {
          position: "right",

          html: "隐藏弹幕",

          click: function (_, event) {
            if (art.plugins.artplayerPluginDanmuku.isHide) {
              art.plugins.artplayerPluginDanmuku.show();

              event.target.innerText = "隐藏弹幕";
            } else {
              art.plugins.artplayerPluginDanmuku.hide();

              event.target.innerText = "显示弹幕";
            }
          },
        },
      ],
    });

    testAll(art, done);
  });

  it("Test78", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      plugins: [
        artplayerPluginDanmuku({
          danmuku: "./assets/sample/danmuku.xml",
        }),
      ],
      controls: [
        {
          position: "right",

          html: "发送弹幕",

          click: function () {
            var text = prompt("请输入弹幕文本", "弹幕测试文本");

            if (!text || !text.trim()) return;

            var color = "#" + Math.floor(Math.random() * 0xffffff).toString(16);

            art.plugins.artplayerPluginDanmuku.emit({
              text: text,

              color: color,

              border: true,
            });
          },
        },
      ],
    });

    testAll(art, done);
  });

  it("Test79", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      plugins: [
        artplayerPluginDanmuku({
          danmuku: "./assets/sample/danmuku.xml",
        }),
      ],
      controls: [
        {
          position: "right",

          html: '弹幕大小：<input type="range" min="12" max="50" step="1" value="25">',

          style: {
            display: "flex",

            alignItems: "center",
          },

          mounted: function ($setting) {
            const $range = $setting.querySelector("input[type=range]");

            $range.addEventListener("change", () => {
              art.plugins.artplayerPluginDanmuku.config({
                fontSize: Number($range.value),
              });
            });
          },
        },
      ],
    });

    testAll(art, done);
  });

  it("Test80", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      muted: true,
    });
    art.on("ready", () => {
      art.play();
    });

    testAll(art, done);
  });

  it("Test81", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      muted: true,
    });
    art.on("ready", () => {
      art.play();
      setTimeout(() => {
        art.pause();
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test82", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      muted: true,
    });
    art.on("ready", () => {
      art.toggle();
      setTimeout(() => {
        art.toggle();
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test83", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      art.seek = 5;
    });

    testAll(art, done);
  });

  it("Test84", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      art.forward = 5;
    });

    testAll(art, done);
  });

  it("Test85", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      art.seek = 5;
      setTimeout(() => {
        art.backward = 2;
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test86", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      console.info(art.volume);
      art.volume = 0.5;
      console.info(art.volume);
    });

    testAll(art, done);
  });

  it("Test87", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      console.info(art.url);
      art.url = "./assets/sample/video.mp4?t=0";
      console.info(art.url);
    });

    testAll(art, done);
  });

  it("Test88", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      art.seek = 10;
      setTimeout(() => {
        art.switchUrl("./assets/sample/video.mp4?t=0", "新视频名字");
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test89", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      art.seek = 10;
      setTimeout(() => {
        art.switchQuality("./assets/sample/video.mp4?t=0", "新视频地址");
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test90", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      console.info(art.muted);
      art.muted = true;
      console.info(art.muted);
    });

    testAll(art, done);
  });

  it("Test91", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      console.info(art.currentTime);
      art.currentTime = 5;
      console.info(art.currentTime);
    });

    testAll(art, done);
  });

  it("Test92", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      console.info(art.duration);
    });

    testAll(art, done);
  });

  it("Test93", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      art.seek = 10;
      art.once("video:canplay", () => {
        art.screenshot();
      });
    });

    testAll(art, done);
  });

  it("Test94", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      art.seek = 10;
      art.getDataURL().then((url) => console.info(url));
    });

    testAll(art, done);
  });

  it("Test95", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      art.seek = 10;
      art.getBlobUrl().then((url) => console.info(url));
    });

    testAll(art, done);
  });

  it("Test96", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      fullscreen: true,
    });
    art.on("ready", () => {
      art.fullscreen = true;
      setTimeout(() => {
        art.fullscreen = false;
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test97", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      fullscreenWeb: true,
    });
    art.on("ready", () => {
      art.fullscreenWeb = true;
      setTimeout(() => {
        art.fullscreenWeb = false;
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test98", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      fullscreenWeb: true,
    });
    art.on("ready", () => {
      art.pip = true;
      setTimeout(() => {
        art.pip = false;
      }, 3000);
    });

    testAll(art, done);
  });

  it("Test99", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      poster: "./assets/sample/poster.jpg",
    });
    art.on("ready", () => {
      console.info(art.poster);
      art.poster = "./assets/sample/poster.jpg?t=0";
      console.info(art.poster);
    });

    testAll(art, done);
  });

  it("Test100", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      art.mini = true;
    });

    testAll(art, done);
  });

  it("Test101", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      muted: true,
    });
    art.on("ready", () => {
      console.info(art.playing);
      art.play();
      console.info(art.playing);
    });

    testAll(art, done);
  });

  it("Test102", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      console.info(art.autoSize);
      art.autoSize = true;
      console.info(art.autoSize);
    });

    testAll(art, done);
  });

  it("Test103", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      console.info(JSON.stringify(art.rect));
    });

    testAll(art, done);
  });

  it("Test104", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      console.info(art.flip);
      art.flip = "horizontal";
      console.info(art.flip);
    });

    testAll(art, done);
  });

  it("Test105", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      autoSize: true,
    });
    art.on("ready", () => {
      console.info(art.rotate);
      art.rotate = 90;
      console.info(art.rotate);
    });

    testAll(art, done);
  });

  it("Test106", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      console.info(art.playbackRate);
      art.playbackRate = 2;
      console.info(art.playbackRate);
    });

    testAll(art, done);
  });

  it("Test107", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      console.info(art.aspectRatio);
      art.aspectRatio = "16:9";
      console.info(art.aspectRatio);
    });

    testAll(art, done);
  });

  it("Test108", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      console.info(art.loop);
      art.loop = [5, 10];
      console.info(art.loop);
    });

    testAll(art, done);
  });

  it("Test109", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      console.info(art.autoHeight);
      art.autoHeight = true;
      console.info(art.autoHeight);
    });

    testAll(art, done);
  });

  it("Test110", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      console.info(art.attr("playsInline"));
      art.attr("playsInline", true);
      console.info(art.attr("playsInline"));
    });

    testAll(art, done);
  });

  it("Test111", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      console.info(art.title);
      art.title = "新标题";
      console.info(art.title);
    });

    testAll(art, done);
  });

  it("Test112", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      console.info(art.theme);
      art.theme = "#000";
      console.info(art.theme);
    });

    testAll(art, done);
  });

  it("Test113", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
    });
    art.on("ready", () => {
      art.destroy();
    });

    testAll(art, done);
  });

  it("Test114", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      controls: [
        {
          position: "right",

          html: "Subtitle 01",

          selector: [
            {
              default: true,

              html: '<span style="color:red">Subtitle 01</span>',

              url: "./assets/sample/subtitle.srt?id=1",
            },

            {
              html: '<span style="color:yellow">Subtitle 02</span>',

              url: "./assets/sample/subtitle.srt?id=2",
            },
          ],

          onSelect: function (item, $dom) {
            console.info(item, $dom);

            art.subtitle.url = item.url;

            return "你点击了 " + item.html;
          },
        },
      ],
    });

    testAll(art, done);
  });

  it("Test115", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      setting: true,
    });
    art.on("ready", () => {
      art.layers.add({
        name: "layer1",

        html: "your-layer",

        mounted: function ($layer1) {
          //
        },
      });
      art.contextmenu.add({
        name: "contextmenu1",

        html: "your-contextmenu",

        mounted: function ($contextmenu1) {
          //
        },
      });
      art.controls.add({
        name: "control1",

        html: "your-control",

        position: "right",

        mounted: function ($control1) {
          //
        },
      });
      // 使用查询 query 获取组件的DOM元素
      var $layer1 = art.query(".art-layer-layer1");
      var $contextmenu1 = art.query(".art-contextmenu-contextmenu1");
      var $control1 = art.query(".art-control-control1");
      // 推荐使用 name 获取组件的DOM元素
      var $layer1 = art.layers["layer1"];
      var $contextmenu1 = art.contextmenu["contextmenu1"];
      var $control1 = art.controls["control1"];
    });

    testAll(art, done);
  });

  it("Test116", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "./assets/sample/video.mp4",
      setting: true,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      settings: [
        {
          html: "选择字幕",

          width: 250,

          tooltip: "字幕 01",

          selector: [
            {
              default: true,

              html: '<span style="color:red">字幕 01</span>',

              url: "./assets/sample/subtitle.srt?id=1",
            },

            {
              html: '<span style="color:yellow">字幕 02</span>',

              url: "./assets/sample/subtitle.srt?id=2",
            },
          ],

          onSelect: function (item, $dom) {
            console.info(item, $dom);

            art.subtitle.url = item.url;

            // 改变提示文本

            return item.html;
          },
        },

        {
          html: "选择画质",

          width: 150,

          tooltip: "1080P",

          selector: [
            {
              default: true,

              html: "1080P",

              url: "./assets/sample/video.mp4?id=1080",
            },

            {
              html: "720P",

              url: "./assets/sample/video.mp4?id=720",
            },

            {
              html: "360P",

              url: "./assets/sample/video.mp4?id=360",
            },
          ],

          onSelect: function (item, $dom) {
            console.info(item, $dom);

            art.switchQuality(item.url, item.html);

            // 改变提示文本

            return item.html;
          },
        },

        {
          html: "多层嵌套",

          selector: [
            {
              html: "嵌套01",

              selector: [
                {
                  html: "嵌套02",
                },

                {
                  html: "嵌套02",
                },
              ],
            },

            {
              html: "嵌套01",

              selector: [
                {
                  html: "嵌套02",
                },

                {
                  html: "嵌套02",
                },
              ],
            },
          ],
        },
      ],
    });

    testAll(art, done);
  });

  it("Test117", function (done) {
    var art = new Artplayer({
      container: ".artplayer-app",
      url: "https://artplayer.org./assets/sample/video.mp4",
      muted: true,
      autoSize: true,
      autoplay: true,
      ads: [
        {
          url: "./assets/sample/test1.mp4",
        },

        {
          url: "./assets/sample/test2.webm",
        },
      ],
      controls: [
        {
          position: "right",

          html: "跳过广告",

          click: function () {
            art.ads.end();
          },
        },
      ],
      layers: [
        {
          html: "跳过广告",

          style: {
            position: "absolute",

            top: "20px",

            right: "20px",
          },

          click: function () {
            art.ads.end();
          },
        },
      ],
    });
    art.on("ready", function () {
      // 当每个视频广告播放时触发
      art.on("ads:start", function (item) {
        console.info("广告开始播放: " + item.url);
      });
      // 当全部视频广告播放完成
      art.on("ads:end", function () {
        console.info("广告已经结束");
      });
      // 当前广告的下标
      console.info(art.ads.index);
      // 广告是否已经结束
      console.info(art.ads.isEnd);
      // 广告是否正在播放
      console.info(art.ads.playing);
      // 上一个广告的对象
      console.info(art.ads.prev);
      // 当前广告的对象
      console.info(art.ads.current);
      // 下一个广告的对象
      console.info(art.ads.next);
    });

    testAll(art, done);
  });
});
