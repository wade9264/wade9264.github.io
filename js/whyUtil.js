(function () {
  var why = {
    // 问候语
    sayhi: () => {
      if (document.querySelector("#author-info__sayhi")) {
        let hour = new Date().getHours();
        let str =
          hour < 5
            ? "夜深了，记得早点休息哦💤"
            : hour < 8
            ? "早上好，今天又是元气满满的一天🎉"
            : hour < 11
            ? "上午好，很高兴见到你👋"
            : hour < 13
            ? "中午好，很高兴见到你👋"
            : hour < 18
            ? "下午好，很高兴见到你👋"
            : hour < 23
            ? "晚上好，忙碌了一天，记得好好休息😋"
            : "夜深了，记得早点休息哦💤";
        document.getElementById("author-info__sayhi").innerHTML = str;
      }
    },
    // 文字切换动画
    pursuitInterval: () => {
      if (document.querySelector("span[data-show]")) {
        setInterval(() => {
          const show = document.querySelector("span[data-show]");
          const next =
            show.nextElementSibling || document.querySelector(".first-tips");
          const up = document.querySelector("span[data-up]");
          if (up) {
            up.removeAttribute("data-up");
          }
          show.removeAttribute("data-show");
          show.setAttribute("data-up", "");
          next.setAttribute("data-show", "");
        }, 3000);
      }
    },
    //hex -> rgb
    hexToRgb: (hex) => {
      return (
        "rgb(" +
        parseInt("0x" + hex.slice(1, 3)) +
        "," +
        parseInt("0x" + hex.slice(3, 5)) +
        "," +
        parseInt("0x" + hex.slice(5, 7)) +
        ")"
      );
    },
    isDarkColor: (rbg) => {
      var RgbValueArry = rbg
        .replace("rgb(", "")
        .replace(")", "")
        .split(",")
        .map(Number);
      let $grayLevel =
        RgbValueArry[0] * 0.299 +
        RgbValueArry[1] * 0.587 +
        RgbValueArry[2] * 0.114;
      console.log($grayLevel);
      return $grayLevel <= 192;
    },
    getDeepColor: (color, level) => {
      let rgbc = color
        .replace("rgb(", "")
        .replace(")", "")
        .split(",")
        .map(Number);
      for (let i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level));
      return `rgb(${rgbc[0]},${rgbc[1]},${rgbc[2]})`;
    },
    getThemeColor: (why) => {
      const img = document.getElementById("post-cover");
      const Http = new XMLHttpRequest();
      const url = img.src + "?imageAve";
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
        if (Http.readyState == 4 && Http.status == 200) {
          let obj = eval("(" + Http.responseText + ")");
          let value = "#" + obj.RGB.slice(2);
          document.documentElement.style.setProperty("--heo-theme", value);
          let rgb = why.hexToRgb(value);
          let isDark = why.isDarkColor(rgb);
          if (!isDark) {
            rgb = why.getDeepColor(rgb, 0.2);
            document.documentElement.style.setProperty("--heo-theme", rgb);
            // let fontColor = getComputedStyle(
            //   document.documentElement
            // ).getPropertyValue("--heo-shadow-black");
            // document.documentElement.style.setProperty(
            //   "--heo-white",
            //   fontColor
            // );
          }
        }
      };
    },
  };
  why.sayhi();
  why.pursuitInterval();
  if (document.getElementById("post-cover")) {
    why.getThemeColor(why);
  }
})();
