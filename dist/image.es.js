import { h as u, openBlock as l, createBlock as a, unref as c, createElementBlock as g } from "vue";
const s = {};
function d(e) {
  return Object.keys(e).reduce((n, t) => (e[t] !== !1 && e[t] !== null && e[t] !== void 0 && (n[t] = e[t]), n), {});
}
const h = {
  name: "InlineSvg",
  inheritAttrs: !1,
  render() {
    return this.svgElSource ? u(
      "svg",
      Object.assign(
        {},
        // source attrs
        this.getSvgAttrs(this.svgElSource),
        // component attrs and listeners
        d(this.$attrs),
        // content
        { innerHTML: this.getSvgContent(this.svgElSource) }
      )
    ) : null;
  },
  props: {
    src: {
      type: String,
      required: !0
    },
    title: {
      type: String
    },
    transformSource: {
      type: Function,
      default: (e) => e
    },
    keepDuringLoading: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["loaded", "unloaded", "error"],
  data() {
    return {
      /** @type SVGElement */
      svgElSource: null
    };
  },
  watch: {
    src(e) {
      this.getSource(e);
    }
  },
  mounted() {
    this.getSource(this.src);
  },
  methods: {
    getSvgAttrs(e) {
      let n = {};
      const t = e.attributes;
      if (!t)
        return n;
      for (let r = t.length - 1; r >= 0; r--)
        n[t[r].name] = t[r].value;
      return n;
    },
    getSvgContent(e) {
      return e = e.cloneNode(!0), e = this.transformSource(e), this.title && f(e, this.title), e.innerHTML;
    },
    /**
     * Get svgElSource
     * @param {string} src
     */
    getSource(e) {
      s[e] || (s[e] = this.download(e)), this.svgElSource && s[e].getIsPending() && !this.keepDuringLoading && (this.svgElSource = null, this.$emit("unloaded")), s[e].then((n) => {
        this.svgElSource = n, this.$nextTick(() => {
          this.$emit("loaded", this.$el);
        });
      }).catch((n) => {
        this.svgElSource && (this.svgElSource = null, this.$emit("unloaded")), delete s[e], this.$emit("error", n);
      });
    },
    /**
     * Get the contents of the SVG
     * @param {string} url
     * @returns {PromiseWithState<Element>}
     */
    download(e) {
      return S(new Promise((n, t) => {
        const r = new XMLHttpRequest();
        r.open("GET", e, !0), r.onload = () => {
          if (r.status >= 200 && r.status < 400)
            try {
              let o = new DOMParser().parseFromString(r.responseText, "text/xml").getElementsByTagName("svg")[0];
              o ? n(o) : t(new Error('Loaded file is not valid SVG"'));
            } catch (i) {
              t(i);
            }
          else
            t(new Error("Error loading SVG"));
        }, r.onerror = t, r.send();
      }));
    }
  }
};
function f(e, n) {
  const t = e.getElementsByTagName("title");
  if (t.length)
    t[0].textContent = n;
  else {
    const r = document.createElementNS("http://www.w3.org/2000/svg", "title");
    r.textContent = n, e.insertBefore(r, e.firstChild);
  }
}
function S(e) {
  if (e.getIsPending)
    return e;
  let n = !0, t = e.then(
    (r) => (n = !1, r),
    (r) => {
      throw n = !1, r;
    }
  );
  return t.getIsPending = function() {
    return n;
  }, t;
}
const m = ["src", "alt"], v = {
  __name: "Image",
  props: {
    src: {
      type: String,
      required: !0
    },
    alt: {
      type: String
    },
    alternativeSrc: {
      type: String
    }
  },
  setup(e) {
    const n = e;
    function t(r) {
      n.alternativeSrc && (r.target.src = n.alternativeSrc);
    }
    return (r, i) => e.src.includes(".svg") ? (l(), a(c(h), {
      key: 0,
      src: e.src,
      onError: t
    }, null, 8, ["src"])) : (l(), g("img", {
      key: 1,
      src: e.src,
      alt: e.alt,
      onError: t
    }, null, 40, m));
  }
}, w = {
  install: (e, n) => e.component("Image", v)
};
export {
  v as Image,
  w as default
};
