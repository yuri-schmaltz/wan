const path = require('path')
module.exports = {
  version: "3.6",
  title: "Wan 2.1",
  description: "[NVIDIA ONLY] Super Optimized Gradio UI for Wan2.1 video for GPU poor machines (5GB+ VRAM). Generate up to 12 sec videos https://github.com/deepbeepmeep/Wan2GP",
  icon: "icon.jpg",
  menu: async (kernel, info) => {
    let installed = info.exists("app/env")
    let running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js")
    }
    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running.start) {
        let local = info.local("start.js")
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        } else {
          return [{
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        }
      } else if (running.update) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Updating",
          href: "update.js",
        }]
      } else if (running.reset) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Resetting",
          href: "reset.js",
        }]
      } else {
        return [{
          icon: "fa-solid fa-power-off",
          text: "<div>Text-to-Video</div>",
          href: "start.js",
          params: {
            profile: 4,
            mode: "--t2v"
          }
        }, {
          icon: "fa-solid fa-power-off",
          text: "<div>Image-to-Video</div>",
          href: "start.js",
          params: {
            profile: 4,
            mode: "--i2v"
          }
        }, {
          icon: "fa-solid fa-power-off",
          text: "advanced",
          menu: [{
            icon: "fa-solid fa-power-off",
            text: "<div><strong>Text-to-Video Compiled</strong><br><div>text-to-video but faster, but might not work on all platforms</div></div>",
            href: "start.js",
            params: {
              profile: 4,
              mode: "--t2v",
              compile: true
            }
          }, {
            icon: "fa-solid fa-power-off",
            text: "<div><strong>Image-to-Video Compiled</strong><br><div>image-to-video but faster, but might now work on all platforms.</div></div>",
            href: "start.js",
            params: {
              profile: 4,
              mode: "--i2v",
              compile: true
            }
          }]
        }, {
          icon: "fa-regular fa-folder-open",
          text: "T2V Loras (save lora files here)",
          href: "app/loras",
          fs: true
        }, {
          icon: "fa-regular fa-folder-open",
          text: "I2V Loras (save lora files here)",
          href: "app/loras_i2v",
          fs: true
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "Reset",
          href: "reset.js",
        }]
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
