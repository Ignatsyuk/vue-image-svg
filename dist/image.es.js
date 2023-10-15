import { h as u, openBlock as l, createBlock as c, unref as a, createElementBlock as g } from "vue";
const s = {};
function d(e) {
  return Object.keys(e).reduce((t, n) => (e[n] !== !1 && e[n] !== null && e[n] !== void 0 && (t[n] = e[n]), t), {});
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
      let t = {};
      const n = e.attributes;
      if (!n)
        return t;
      for (let r = n.length - 1; r >= 0; r--)
        t[n[r].name] = n[r].value;
      return t;
    },
    getSvgContent(e) {
      return e = e.cloneNode(!0), e = this.transformSource(e), this.title && f(e, this.title), e.innerHTML;
    },
    /**
     * Get svgElSource
     * @param {string} src
     */
    getSource(e) {
      s[e] || (s[e] = this.download(e)), this.svgElSource && s[e].getIsPending() && !this.keepDuringLoading && (this.svgElSource = null, this.$emit("unloaded")), s[e].then((t) => {
        this.svgElSource = t, this.$nextTick(() => {
          this.$emit("loaded", this.$el);
        });
      }).catch((t) => {
        this.svgElSource && (this.svgElSource = null, this.$emit("unloaded")), delete s[e], this.$emit("error", t);
      });
    },
    /**
     * Get the contents of the SVG
     * @param {string} url
     * @returns {PromiseWithState<Element>}
     */
    download(e) {
      return m(new Promise((t, n) => {
        const r = new XMLHttpRequest();
        r.open("GET", e, !0), r.onload = () => {
          if (r.status >= 200 && r.status < 400)
            try {
              let i = new DOMParser().parseFromString(r.responseText, "text/xml").getElementsByTagName("svg")[0];
              i ? t(i) : n(new Error('Loaded file is not valid SVG"'));
            } catch (o) {
              n(o);
            }
          else
            n(new Error("Error loading SVG"));
        }, r.onerror = n, r.send();
      }));
    }
  }
};
function f(e, t) {
  const n = e.getElementsByTagName("title");
  if (n.length)
    n[0].textContent = t;
  else {
    const r = document.createElementNS("http://www.w3.org/2000/svg", "title");
    r.textContent = t, e.insertBefore(r, e.firstChild);
  }
}
function m(e) {
  if (e.getIsPending)
    return e;
  let t = !0, n = e.then(
    (r) => (t = !1, r),
    (r) => {
      throw t = !1, r;
    }
  );
  return n.getIsPending = function() {
    return t;
  }, n;
}
const p = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
}, S = ["src", "alt"], _ = {
  __name: "Image",
  props: {
    src: {
      type: String,
      required: !0
    },
    alt: {
      type: String
    }
  },
  setup(e) {
    const t = e;
    return (n, r) => t.src.includes(".svg") ? (l(), c(a(h), {
      key: 0,
      src: t.src
    }, null, 8, ["src"])) : (l(), g("img", {
      key: 1,
      src: t.src,
      alt: t.alt
    }, null, 8, S));
  }
}, v = /* @__PURE__ */ p(_, [["__scopeId", "data-v-8d33fbf6"]]), x = {
  install: (e, t) => e.component("Image", v)
};
export {
  v as Image,
  x as default
};
