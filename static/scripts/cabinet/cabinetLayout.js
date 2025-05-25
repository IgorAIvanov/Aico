(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i13 = decorators.length - 1, decorator; i13 >= 0; i13--)
      if (decorator = decorators[i13])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp(target, key, result);
    return result;
  };

  // node_modules/.deno/@lit+reactive-element@2.1.0/node_modules/@lit/reactive-element/css-tag.js
  var t = globalThis;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var o = /* @__PURE__ */ new WeakMap();
  var n = class {
    constructor(t8, e17, o15) {
      if (this._$cssResult$ = true, o15 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t8, this.t = e17;
    }
    get styleSheet() {
      let t8 = this.o;
      const s7 = this.t;
      if (e && void 0 === t8) {
        const e17 = void 0 !== s7 && 1 === s7.length;
        e17 && (t8 = o.get(s7)), void 0 === t8 && ((this.o = t8 = new CSSStyleSheet()).replaceSync(this.cssText), e17 && o.set(s7, t8));
      }
      return t8;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t8) => new n("string" == typeof t8 ? t8 : t8 + "", void 0, s);
  var i = (t8, ...e17) => {
    const o15 = 1 === t8.length ? t8[0] : e17.reduce((e18, s7, o16) => e18 + ((t9) => {
      if (true === t9._$cssResult$) return t9.cssText;
      if ("number" == typeof t9) return t9;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t9 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s7) + t8[o16 + 1], t8[0]);
    return new n(o15, t8, s);
  };
  var S = (s7, o15) => {
    if (e) s7.adoptedStyleSheets = o15.map((t8) => t8 instanceof CSSStyleSheet ? t8 : t8.styleSheet);
    else for (const e17 of o15) {
      const o16 = document.createElement("style"), n12 = t.litNonce;
      void 0 !== n12 && o16.setAttribute("nonce", n12), o16.textContent = e17.cssText, s7.appendChild(o16);
    }
  };
  var c = e ? (t8) => t8 : (t8) => t8 instanceof CSSStyleSheet ? ((t9) => {
    let e17 = "";
    for (const s7 of t9.cssRules) e17 += s7.cssText;
    return r(e17);
  })(t8) : t8;

  // node_modules/.deno/@lit+reactive-element@2.1.0/node_modules/@lit/reactive-element/reactive-element.js
  var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
  var a = globalThis;
  var c2 = a.trustedTypes;
  var l = c2 ? c2.emptyScript : "";
  var p = a.reactiveElementPolyfillSupport;
  var d = (t8, s7) => t8;
  var u = { toAttribute(t8, s7) {
    switch (s7) {
      case Boolean:
        t8 = t8 ? l : null;
        break;
      case Object:
      case Array:
        t8 = null == t8 ? t8 : JSON.stringify(t8);
    }
    return t8;
  }, fromAttribute(t8, s7) {
    let i13 = t8;
    switch (s7) {
      case Boolean:
        i13 = null !== t8;
        break;
      case Number:
        i13 = null === t8 ? null : Number(t8);
        break;
      case Object:
      case Array:
        try {
          i13 = JSON.parse(t8);
        } catch (t9) {
          i13 = null;
        }
    }
    return i13;
  } };
  var f = (t8, s7) => !i2(t8, s7);
  var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
  Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var y = class extends HTMLElement {
    static addInitializer(t8) {
      this._$Ei(), (this.l ??= []).push(t8);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t8, s7 = b) {
      if (s7.state && (s7.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t8) && ((s7 = Object.create(s7)).wrapped = true), this.elementProperties.set(t8, s7), !s7.noAccessor) {
        const i13 = Symbol(), h7 = this.getPropertyDescriptor(t8, i13, s7);
        void 0 !== h7 && e2(this.prototype, t8, h7);
      }
    }
    static getPropertyDescriptor(t8, s7, i13) {
      const { get: e17, set: r14 } = h(this.prototype, t8) ?? { get() {
        return this[s7];
      }, set(t9) {
        this[s7] = t9;
      } };
      return { get: e17, set(s8) {
        const h7 = e17?.call(this);
        r14?.call(this, s8), this.requestUpdate(t8, h7, i13);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t8) {
      return this.elementProperties.get(t8) ?? b;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties"))) return;
      const t8 = n2(this);
      t8.finalize(), void 0 !== t8.l && (this.l = [...t8.l]), this.elementProperties = new Map(t8.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized"))) return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t9 = this.properties, s7 = [...r2(t9), ...o2(t9)];
        for (const i13 of s7) this.createProperty(i13, t9[i13]);
      }
      const t8 = this[Symbol.metadata];
      if (null !== t8) {
        const s7 = litPropertyMetadata.get(t8);
        if (void 0 !== s7) for (const [t9, i13] of s7) this.elementProperties.set(t9, i13);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t9, s7] of this.elementProperties) {
        const i13 = this._$Eu(t9, s7);
        void 0 !== i13 && this._$Eh.set(i13, t9);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s7) {
      const i13 = [];
      if (Array.isArray(s7)) {
        const e17 = new Set(s7.flat(1 / 0).reverse());
        for (const s8 of e17) i13.unshift(c(s8));
      } else void 0 !== s7 && i13.push(c(s7));
      return i13;
    }
    static _$Eu(t8, s7) {
      const i13 = s7.attribute;
      return false === i13 ? void 0 : "string" == typeof i13 ? i13 : "string" == typeof t8 ? t8.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t8) => this.enableUpdating = t8), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t8) => t8(this));
    }
    addController(t8) {
      (this._$EO ??= /* @__PURE__ */ new Set()).add(t8), void 0 !== this.renderRoot && this.isConnected && t8.hostConnected?.();
    }
    removeController(t8) {
      this._$EO?.delete(t8);
    }
    _$E_() {
      const t8 = /* @__PURE__ */ new Map(), s7 = this.constructor.elementProperties;
      for (const i13 of s7.keys()) this.hasOwnProperty(i13) && (t8.set(i13, this[i13]), delete this[i13]);
      t8.size > 0 && (this._$Ep = t8);
    }
    createRenderRoot() {
      const t8 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S(t8, this.constructor.elementStyles), t8;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t8) => t8.hostConnected?.());
    }
    enableUpdating(t8) {
    }
    disconnectedCallback() {
      this._$EO?.forEach((t8) => t8.hostDisconnected?.());
    }
    attributeChangedCallback(t8, s7, i13) {
      this._$AK(t8, i13);
    }
    _$ET(t8, s7) {
      const i13 = this.constructor.elementProperties.get(t8), e17 = this.constructor._$Eu(t8, i13);
      if (void 0 !== e17 && true === i13.reflect) {
        const h7 = (void 0 !== i13.converter?.toAttribute ? i13.converter : u).toAttribute(s7, i13.type);
        this._$Em = t8, null == h7 ? this.removeAttribute(e17) : this.setAttribute(e17, h7), this._$Em = null;
      }
    }
    _$AK(t8, s7) {
      const i13 = this.constructor, e17 = i13._$Eh.get(t8);
      if (void 0 !== e17 && this._$Em !== e17) {
        const t9 = i13.getPropertyOptions(e17), h7 = "function" == typeof t9.converter ? { fromAttribute: t9.converter } : void 0 !== t9.converter?.fromAttribute ? t9.converter : u;
        this._$Em = e17, this[e17] = h7.fromAttribute(s7, t9.type) ?? this._$Ej?.get(e17) ?? null, this._$Em = null;
      }
    }
    requestUpdate(t8, s7, i13) {
      if (void 0 !== t8) {
        const e17 = this.constructor, h7 = this[t8];
        if (i13 ??= e17.getPropertyOptions(t8), !((i13.hasChanged ?? f)(h7, s7) || i13.useDefault && i13.reflect && h7 === this._$Ej?.get(t8) && !this.hasAttribute(e17._$Eu(t8, i13)))) return;
        this.C(t8, s7, i13);
      }
      false === this.isUpdatePending && (this._$ES = this._$EP());
    }
    C(t8, s7, { useDefault: i13, reflect: e17, wrapped: h7 }, r14) {
      i13 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t8) && (this._$Ej.set(t8, r14 ?? s7 ?? this[t8]), true !== h7 || void 0 !== r14) || (this._$AL.has(t8) || (this.hasUpdated || i13 || (s7 = void 0), this._$AL.set(t8, s7)), true === e17 && this._$Em !== t8 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t8));
    }
    async _$EP() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t9) {
        Promise.reject(t9);
      }
      const t8 = this.scheduleUpdate();
      return null != t8 && await t8, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t10, s8] of this._$Ep) this[t10] = s8;
          this._$Ep = void 0;
        }
        const t9 = this.constructor.elementProperties;
        if (t9.size > 0) for (const [s8, i13] of t9) {
          const { wrapped: t10 } = i13, e17 = this[s8];
          true !== t10 || this._$AL.has(s8) || void 0 === e17 || this.C(s8, void 0, i13, e17);
        }
      }
      let t8 = false;
      const s7 = this._$AL;
      try {
        t8 = this.shouldUpdate(s7), t8 ? (this.willUpdate(s7), this._$EO?.forEach((t9) => t9.hostUpdate?.()), this.update(s7)) : this._$EM();
      } catch (s8) {
        throw t8 = false, this._$EM(), s8;
      }
      t8 && this._$AE(s7);
    }
    willUpdate(t8) {
    }
    _$AE(t8) {
      this._$EO?.forEach((t9) => t9.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t8)), this.updated(t8);
    }
    _$EM() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t8) {
      return true;
    }
    update(t8) {
      this._$Eq &&= this._$Eq.forEach((t9) => this._$ET(t9, this[t9])), this._$EM();
    }
    updated(t8) {
    }
    firstUpdated(t8) {
    }
  };
  y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.0");

  // node_modules/.deno/lit-html@3.3.0/node_modules/lit-html/lit-html.js
  var t2 = globalThis;
  var i3 = t2.trustedTypes;
  var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t8) => t8 }) : void 0;
  var e3 = "$lit$";
  var h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
  var o3 = "?" + h2;
  var n3 = `<${o3}>`;
  var r3 = document;
  var l2 = () => r3.createComment("");
  var c3 = (t8) => null === t8 || "object" != typeof t8 && "function" != typeof t8;
  var a2 = Array.isArray;
  var u2 = (t8) => a2(t8) || "function" == typeof t8?.[Symbol.iterator];
  var d2 = "[ 	\n\f\r]";
  var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v = /-->/g;
  var _ = />/g;
  var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var p2 = /'/g;
  var g = /"/g;
  var $ = /^(?:script|style|textarea|title)$/i;
  var y2 = (t8) => (i13, ...s7) => ({ _$litType$: t8, strings: i13, values: s7 });
  var x = y2(1);
  var b2 = y2(2);
  var w = y2(3);
  var T = Symbol.for("lit-noChange");
  var E = Symbol.for("lit-nothing");
  var A = /* @__PURE__ */ new WeakMap();
  var C = r3.createTreeWalker(r3, 129);
  function P(t8, i13) {
    if (!a2(t8) || !t8.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== s2 ? s2.createHTML(i13) : i13;
  }
  var V = (t8, i13) => {
    const s7 = t8.length - 1, o15 = [];
    let r14, l7 = 2 === i13 ? "<svg>" : 3 === i13 ? "<math>" : "", c9 = f2;
    for (let i14 = 0; i14 < s7; i14++) {
      const s8 = t8[i14];
      let a6, u7, d5 = -1, y5 = 0;
      for (; y5 < s8.length && (c9.lastIndex = y5, u7 = c9.exec(s8), null !== u7); ) y5 = c9.lastIndex, c9 === f2 ? "!--" === u7[1] ? c9 = v : void 0 !== u7[1] ? c9 = _ : void 0 !== u7[2] ? ($.test(u7[2]) && (r14 = RegExp("</" + u7[2], "g")), c9 = m) : void 0 !== u7[3] && (c9 = m) : c9 === m ? ">" === u7[0] ? (c9 = r14 ?? f2, d5 = -1) : void 0 === u7[1] ? d5 = -2 : (d5 = c9.lastIndex - u7[2].length, a6 = u7[1], c9 = void 0 === u7[3] ? m : '"' === u7[3] ? g : p2) : c9 === g || c9 === p2 ? c9 = m : c9 === v || c9 === _ ? c9 = f2 : (c9 = m, r14 = void 0);
      const x3 = c9 === m && t8[i14 + 1].startsWith("/>") ? " " : "";
      l7 += c9 === f2 ? s8 + n3 : d5 >= 0 ? (o15.push(a6), s8.slice(0, d5) + e3 + s8.slice(d5) + h2 + x3) : s8 + h2 + (-2 === d5 ? i14 : x3);
    }
    return [P(t8, l7 + (t8[s7] || "<?>") + (2 === i13 ? "</svg>" : 3 === i13 ? "</math>" : "")), o15];
  };
  var N = class _N {
    constructor({ strings: t8, _$litType$: s7 }, n12) {
      let r14;
      this.parts = [];
      let c9 = 0, a6 = 0;
      const u7 = t8.length - 1, d5 = this.parts, [f7, v3] = V(t8, s7);
      if (this.el = _N.createElement(f7, n12), C.currentNode = this.el.content, 2 === s7 || 3 === s7) {
        const t9 = this.el.content.firstChild;
        t9.replaceWith(...t9.childNodes);
      }
      for (; null !== (r14 = C.nextNode()) && d5.length < u7; ) {
        if (1 === r14.nodeType) {
          if (r14.hasAttributes()) for (const t9 of r14.getAttributeNames()) if (t9.endsWith(e3)) {
            const i13 = v3[a6++], s8 = r14.getAttribute(t9).split(h2), e17 = /([.?@])?(.*)/.exec(i13);
            d5.push({ type: 1, index: c9, name: e17[2], strings: s8, ctor: "." === e17[1] ? H : "?" === e17[1] ? I : "@" === e17[1] ? L : k }), r14.removeAttribute(t9);
          } else t9.startsWith(h2) && (d5.push({ type: 6, index: c9 }), r14.removeAttribute(t9));
          if ($.test(r14.tagName)) {
            const t9 = r14.textContent.split(h2), s8 = t9.length - 1;
            if (s8 > 0) {
              r14.textContent = i3 ? i3.emptyScript : "";
              for (let i13 = 0; i13 < s8; i13++) r14.append(t9[i13], l2()), C.nextNode(), d5.push({ type: 2, index: ++c9 });
              r14.append(t9[s8], l2());
            }
          }
        } else if (8 === r14.nodeType) if (r14.data === o3) d5.push({ type: 2, index: c9 });
        else {
          let t9 = -1;
          for (; -1 !== (t9 = r14.data.indexOf(h2, t9 + 1)); ) d5.push({ type: 7, index: c9 }), t9 += h2.length - 1;
        }
        c9++;
      }
    }
    static createElement(t8, i13) {
      const s7 = r3.createElement("template");
      return s7.innerHTML = t8, s7;
    }
  };
  function S2(t8, i13, s7 = t8, e17) {
    if (i13 === T) return i13;
    let h7 = void 0 !== e17 ? s7._$Co?.[e17] : s7._$Cl;
    const o15 = c3(i13) ? void 0 : i13._$litDirective$;
    return h7?.constructor !== o15 && (h7?._$AO?.(false), void 0 === o15 ? h7 = void 0 : (h7 = new o15(t8), h7._$AT(t8, s7, e17)), void 0 !== e17 ? (s7._$Co ??= [])[e17] = h7 : s7._$Cl = h7), void 0 !== h7 && (i13 = S2(t8, h7._$AS(t8, i13.values), h7, e17)), i13;
  }
  var M = class {
    constructor(t8, i13) {
      this._$AV = [], this._$AN = void 0, this._$AD = t8, this._$AM = i13;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t8) {
      const { el: { content: i13 }, parts: s7 } = this._$AD, e17 = (t8?.creationScope ?? r3).importNode(i13, true);
      C.currentNode = e17;
      let h7 = C.nextNode(), o15 = 0, n12 = 0, l7 = s7[0];
      for (; void 0 !== l7; ) {
        if (o15 === l7.index) {
          let i14;
          2 === l7.type ? i14 = new R(h7, h7.nextSibling, this, t8) : 1 === l7.type ? i14 = new l7.ctor(h7, l7.name, l7.strings, this, t8) : 6 === l7.type && (i14 = new z(h7, this, t8)), this._$AV.push(i14), l7 = s7[++n12];
        }
        o15 !== l7?.index && (h7 = C.nextNode(), o15++);
      }
      return C.currentNode = r3, e17;
    }
    p(t8) {
      let i13 = 0;
      for (const s7 of this._$AV) void 0 !== s7 && (void 0 !== s7.strings ? (s7._$AI(t8, s7, i13), i13 += s7.strings.length - 2) : s7._$AI(t8[i13])), i13++;
    }
  };
  var R = class _R {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t8, i13, s7, e17) {
      this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t8, this._$AB = i13, this._$AM = s7, this.options = e17, this._$Cv = e17?.isConnected ?? true;
    }
    get parentNode() {
      let t8 = this._$AA.parentNode;
      const i13 = this._$AM;
      return void 0 !== i13 && 11 === t8?.nodeType && (t8 = i13.parentNode), t8;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t8, i13 = this) {
      t8 = S2(this, t8, i13), c3(t8) ? t8 === E || null == t8 || "" === t8 ? (this._$AH !== E && this._$AR(), this._$AH = E) : t8 !== this._$AH && t8 !== T && this._(t8) : void 0 !== t8._$litType$ ? this.$(t8) : void 0 !== t8.nodeType ? this.T(t8) : u2(t8) ? this.k(t8) : this._(t8);
    }
    O(t8) {
      return this._$AA.parentNode.insertBefore(t8, this._$AB);
    }
    T(t8) {
      this._$AH !== t8 && (this._$AR(), this._$AH = this.O(t8));
    }
    _(t8) {
      this._$AH !== E && c3(this._$AH) ? this._$AA.nextSibling.data = t8 : this.T(r3.createTextNode(t8)), this._$AH = t8;
    }
    $(t8) {
      const { values: i13, _$litType$: s7 } = t8, e17 = "number" == typeof s7 ? this._$AC(t8) : (void 0 === s7.el && (s7.el = N.createElement(P(s7.h, s7.h[0]), this.options)), s7);
      if (this._$AH?._$AD === e17) this._$AH.p(i13);
      else {
        const t9 = new M(e17, this), s8 = t9.u(this.options);
        t9.p(i13), this.T(s8), this._$AH = t9;
      }
    }
    _$AC(t8) {
      let i13 = A.get(t8.strings);
      return void 0 === i13 && A.set(t8.strings, i13 = new N(t8)), i13;
    }
    k(t8) {
      a2(this._$AH) || (this._$AH = [], this._$AR());
      const i13 = this._$AH;
      let s7, e17 = 0;
      for (const h7 of t8) e17 === i13.length ? i13.push(s7 = new _R(this.O(l2()), this.O(l2()), this, this.options)) : s7 = i13[e17], s7._$AI(h7), e17++;
      e17 < i13.length && (this._$AR(s7 && s7._$AB.nextSibling, e17), i13.length = e17);
    }
    _$AR(t8 = this._$AA.nextSibling, i13) {
      for (this._$AP?.(false, true, i13); t8 && t8 !== this._$AB; ) {
        const i14 = t8.nextSibling;
        t8.remove(), t8 = i14;
      }
    }
    setConnected(t8) {
      void 0 === this._$AM && (this._$Cv = t8, this._$AP?.(t8));
    }
  };
  var k = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t8, i13, s7, e17, h7) {
      this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t8, this.name = i13, this._$AM = e17, this.options = h7, s7.length > 2 || "" !== s7[0] || "" !== s7[1] ? (this._$AH = Array(s7.length - 1).fill(new String()), this.strings = s7) : this._$AH = E;
    }
    _$AI(t8, i13 = this, s7, e17) {
      const h7 = this.strings;
      let o15 = false;
      if (void 0 === h7) t8 = S2(this, t8, i13, 0), o15 = !c3(t8) || t8 !== this._$AH && t8 !== T, o15 && (this._$AH = t8);
      else {
        const e18 = t8;
        let n12, r14;
        for (t8 = h7[0], n12 = 0; n12 < h7.length - 1; n12++) r14 = S2(this, e18[s7 + n12], i13, n12), r14 === T && (r14 = this._$AH[n12]), o15 ||= !c3(r14) || r14 !== this._$AH[n12], r14 === E ? t8 = E : t8 !== E && (t8 += (r14 ?? "") + h7[n12 + 1]), this._$AH[n12] = r14;
      }
      o15 && !e17 && this.j(t8);
    }
    j(t8) {
      t8 === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t8 ?? "");
    }
  };
  var H = class extends k {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t8) {
      this.element[this.name] = t8 === E ? void 0 : t8;
    }
  };
  var I = class extends k {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t8) {
      this.element.toggleAttribute(this.name, !!t8 && t8 !== E);
    }
  };
  var L = class extends k {
    constructor(t8, i13, s7, e17, h7) {
      super(t8, i13, s7, e17, h7), this.type = 5;
    }
    _$AI(t8, i13 = this) {
      if ((t8 = S2(this, t8, i13, 0) ?? E) === T) return;
      const s7 = this._$AH, e17 = t8 === E && s7 !== E || t8.capture !== s7.capture || t8.once !== s7.once || t8.passive !== s7.passive, h7 = t8 !== E && (s7 === E || e17);
      e17 && this.element.removeEventListener(this.name, this, s7), h7 && this.element.addEventListener(this.name, this, t8), this._$AH = t8;
    }
    handleEvent(t8) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t8) : this._$AH.handleEvent(t8);
    }
  };
  var z = class {
    constructor(t8, i13, s7) {
      this.element = t8, this.type = 6, this._$AN = void 0, this._$AM = i13, this.options = s7;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t8) {
      S2(this, t8);
    }
  };
  var j = t2.litHtmlPolyfillSupport;
  j?.(N, R), (t2.litHtmlVersions ??= []).push("3.3.0");
  var B = (t8, i13, s7) => {
    const e17 = s7?.renderBefore ?? i13;
    let h7 = e17._$litPart$;
    if (void 0 === h7) {
      const t9 = s7?.renderBefore ?? null;
      e17._$litPart$ = h7 = new R(i13.insertBefore(l2(), t9), t9, void 0, s7 ?? {});
    }
    return h7._$AI(t8), h7;
  };

  // node_modules/.deno/lit-element@4.2.0/node_modules/lit-element/lit-element.js
  var s3 = globalThis;
  var i4 = class extends y {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t8 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t8.firstChild, t8;
    }
    update(t8) {
      const r14 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t8), this._$Do = B(r14, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return T;
    }
  };
  i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
  var o4 = s3.litElementPolyfillSupport;
  o4?.({ LitElement: i4 });
  (s3.litElementVersions ??= []).push("4.2.0");

  // node_modules/.deno/lit-html@3.3.0/node_modules/lit-html/directive.js
  var t3 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e4 = (t8) => (...e17) => ({ _$litDirective$: t8, values: e17 });
  var i5 = class {
    constructor(t8) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t8, e17, i13) {
      this._$Ct = t8, this._$AM = e17, this._$Ci = i13;
    }
    _$AS(t8, e17) {
      return this.update(t8, e17);
    }
    update(t8, e17) {
      return this.render(...e17);
    }
  };

  // node_modules/.deno/lit-html@3.3.0/node_modules/lit-html/directives/unsafe-html.js
  var e5 = class extends i5 {
    constructor(i13) {
      if (super(i13), this.it = E, i13.type !== t3.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
    }
    render(r14) {
      if (r14 === E || null == r14) return this._t = void 0, this.it = r14;
      if (r14 === T) return r14;
      if ("string" != typeof r14) throw Error(this.constructor.directiveName + "() called with a non-string value");
      if (r14 === this.it) return this._t;
      this.it = r14;
      const s7 = [r14];
      return s7.raw = s7, this._t = { _$litType$: this.constructor.resultType, strings: s7, values: [] };
    }
  };
  e5.directiveName = "unsafeHTML", e5.resultType = 1;
  var o5 = e4(e5);

  // cabinet/mcp.ts
  var mcp = class extends i4 {
    render() {
      return x`
            <div>
                <h1>MCP Servers</h1>
                <p>Manage your MCP servers here.</p>
                <sl-button >Add Server</sl-button>
                <div id="server-list"></div>
            </div>
        `;
    }
  };
  customElements.define("mcp-page", mcp);

  // node_modules/.deno/@lit+reactive-element@2.1.0/node_modules/@lit/reactive-element/decorators/property.js
  var o6 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  var r4 = (t8 = o6, e17, r14) => {
    const { kind: n12, metadata: i13 } = r14;
    let s7 = globalThis.litPropertyMetadata.get(i13);
    if (void 0 === s7 && globalThis.litPropertyMetadata.set(i13, s7 = /* @__PURE__ */ new Map()), "setter" === n12 && ((t8 = Object.create(t8)).wrapped = true), s7.set(r14.name, t8), "accessor" === n12) {
      const { name: o15 } = r14;
      return { set(r15) {
        const n13 = e17.get.call(this);
        e17.set.call(this, r15), this.requestUpdate(o15, n13, t8);
      }, init(e18) {
        return void 0 !== e18 && this.C(o15, void 0, t8, e18), e18;
      } };
    }
    if ("setter" === n12) {
      const { name: o15 } = r14;
      return function(r15) {
        const n13 = this[o15];
        e17.call(this, r15), this.requestUpdate(o15, n13, t8);
      };
    }
    throw Error("Unsupported decorator location: " + n12);
  };
  function n4(t8) {
    return (e17, o15) => "object" == typeof o15 ? r4(t8, e17, o15) : ((t9, e18, o16) => {
      const r14 = e18.hasOwnProperty(o16);
      return e18.constructor.createProperty(o16, t9), r14 ? Object.getOwnPropertyDescriptor(e18, o16) : void 0;
    })(t8, e17, o15);
  }

  // node_modules/.deno/@lit+reactive-element@2.1.0/node_modules/@lit/reactive-element/decorators/state.js
  function r5(r14) {
    return n4({ ...r14, state: true, attribute: false });
  }

  // cabinet/functions.ts
  var FunctionsView = class extends i4 {
    constructor() {
      super(...arguments);
      this.functions = [];
    }
    static {
      this.styles = i`
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    th {
      background: #f5f5f5;
    }
  `;
    }
    connectedCallback() {
      super.connectedCallback();
      this.fetchFunctions();
    }
    async fetchFunctions() {
      try {
        const response = await fetch("/api/services/functions");
        const data = await response.json();
        this.functions = data;
      } catch (error) {
        console.error("Error fetching functions:", error);
      }
    }
    render() {
      return x`
      <div>
        <h1 style="text-align:center">This is functions content</h1>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>description</th>
              <th>created_at</th>
            </tr>
          </thead>
          <tbody>
            ${this.functions.map(
        (func) => x`
                <tr>
                  <td>${func.id}</td>
                  <td>${func.name}</td>
                  <td>${func.description}</td>
                  <td>${func.created_at ?? ""}</td>
                </tr>
              `
      )}
          </tbody>
        </table>
      </div>
    `;
    }
  };
  __decorateClass([
    r5()
  ], FunctionsView.prototype, "functions", 2);
  customElements.define("functions-view", FunctionsView);

  // cabinet/bots.ts
  var BotsView = class extends i4 {
    static {
      this.styles = i`
    h1 {
      text-align: center;
    }
  `;
    }
    render() {
      return x`
      <div>
        <h1>Bots page</h1>
      </div>
    `;
    }
  };
  customElements.define("bots-view", BotsView);

  // cabinet/welcome.ts
  var WelcomeView = class extends i4 {
    static {
      this.styles = i`
    h1 {
      text-align: center;
    }
  `;
    }
    render() {
      return x`
      <div>
          <h1>Welcome robot people!</h1>
      </div>
    `;
    }
  };
  customElements.define("welcome-view", WelcomeView);

  // cabinet/settings.ts
  var SettingView = class extends i4 {
    static {
      this.styles = i`
    h1 {
      text-align: center;
    }
  `;
    }
    render() {
      return x`
      <div>
          <h1 align="center">Settings page</h1>
      </div>
    `;
    }
  };
  customElements.define("setting-view", SettingView);

  // node_modules/.deno/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/css-tag.js
  var t4 = globalThis;
  var e7 = t4.ShadowRoot && (void 0 === t4.ShadyCSS || t4.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s4 = Symbol();
  var o7 = /* @__PURE__ */ new WeakMap();
  var n5 = class {
    constructor(t8, e17, o15) {
      if (this._$cssResult$ = true, o15 !== s4) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t8, this.t = e17;
    }
    get styleSheet() {
      let t8 = this.o;
      const s7 = this.t;
      if (e7 && void 0 === t8) {
        const e17 = void 0 !== s7 && 1 === s7.length;
        e17 && (t8 = o7.get(s7)), void 0 === t8 && ((this.o = t8 = new CSSStyleSheet()).replaceSync(this.cssText), e17 && o7.set(s7, t8));
      }
      return t8;
    }
    toString() {
      return this.cssText;
    }
  };
  var r6 = (t8) => new n5("string" == typeof t8 ? t8 : t8 + "", void 0, s4);
  var i6 = (t8, ...e17) => {
    const o15 = 1 === t8.length ? t8[0] : e17.reduce((e18, s7, o16) => e18 + ((t9) => {
      if (true === t9._$cssResult$) return t9.cssText;
      if ("number" == typeof t9) return t9;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t9 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s7) + t8[o16 + 1], t8[0]);
    return new n5(o15, t8, s4);
  };
  var S3 = (s7, o15) => {
    if (e7) s7.adoptedStyleSheets = o15.map((t8) => t8 instanceof CSSStyleSheet ? t8 : t8.styleSheet);
    else for (const e17 of o15) {
      const o16 = document.createElement("style"), n12 = t4.litNonce;
      void 0 !== n12 && o16.setAttribute("nonce", n12), o16.textContent = e17.cssText, s7.appendChild(o16);
    }
  };
  var c4 = e7 ? (t8) => t8 : (t8) => t8 instanceof CSSStyleSheet ? ((t9) => {
    let e17 = "";
    for (const s7 of t9.cssRules) e17 += s7.cssText;
    return r6(e17);
  })(t8) : t8;

  // node_modules/.deno/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/reactive-element.js
  var { is: i7, defineProperty: e8, getOwnPropertyDescriptor: r7, getOwnPropertyNames: h3, getOwnPropertySymbols: o8, getPrototypeOf: n6 } = Object;
  var a3 = globalThis;
  var c5 = a3.trustedTypes;
  var l3 = c5 ? c5.emptyScript : "";
  var p3 = a3.reactiveElementPolyfillSupport;
  var d3 = (t8, s7) => t8;
  var u3 = { toAttribute(t8, s7) {
    switch (s7) {
      case Boolean:
        t8 = t8 ? l3 : null;
        break;
      case Object:
      case Array:
        t8 = null == t8 ? t8 : JSON.stringify(t8);
    }
    return t8;
  }, fromAttribute(t8, s7) {
    let i13 = t8;
    switch (s7) {
      case Boolean:
        i13 = null !== t8;
        break;
      case Number:
        i13 = null === t8 ? null : Number(t8);
        break;
      case Object:
      case Array:
        try {
          i13 = JSON.parse(t8);
        } catch (t9) {
          i13 = null;
        }
    }
    return i13;
  } };
  var f3 = (t8, s7) => !i7(t8, s7);
  var y3 = { attribute: true, type: String, converter: u3, reflect: false, hasChanged: f3 };
  Symbol.metadata ??= Symbol("metadata"), a3.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var b3 = class extends HTMLElement {
    static addInitializer(t8) {
      this._$Ei(), (this.l ??= []).push(t8);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t8, s7 = y3) {
      if (s7.state && (s7.attribute = false), this._$Ei(), this.elementProperties.set(t8, s7), !s7.noAccessor) {
        const i13 = Symbol(), r14 = this.getPropertyDescriptor(t8, i13, s7);
        void 0 !== r14 && e8(this.prototype, t8, r14);
      }
    }
    static getPropertyDescriptor(t8, s7, i13) {
      const { get: e17, set: h7 } = r7(this.prototype, t8) ?? { get() {
        return this[s7];
      }, set(t9) {
        this[s7] = t9;
      } };
      return { get() {
        return e17?.call(this);
      }, set(s8) {
        const r14 = e17?.call(this);
        h7.call(this, s8), this.requestUpdate(t8, r14, i13);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t8) {
      return this.elementProperties.get(t8) ?? y3;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d3("elementProperties"))) return;
      const t8 = n6(this);
      t8.finalize(), void 0 !== t8.l && (this.l = [...t8.l]), this.elementProperties = new Map(t8.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d3("finalized"))) return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d3("properties"))) {
        const t9 = this.properties, s7 = [...h3(t9), ...o8(t9)];
        for (const i13 of s7) this.createProperty(i13, t9[i13]);
      }
      const t8 = this[Symbol.metadata];
      if (null !== t8) {
        const s7 = litPropertyMetadata.get(t8);
        if (void 0 !== s7) for (const [t9, i13] of s7) this.elementProperties.set(t9, i13);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t9, s7] of this.elementProperties) {
        const i13 = this._$Eu(t9, s7);
        void 0 !== i13 && this._$Eh.set(i13, t9);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s7) {
      const i13 = [];
      if (Array.isArray(s7)) {
        const e17 = new Set(s7.flat(1 / 0).reverse());
        for (const s8 of e17) i13.unshift(c4(s8));
      } else void 0 !== s7 && i13.push(c4(s7));
      return i13;
    }
    static _$Eu(t8, s7) {
      const i13 = s7.attribute;
      return false === i13 ? void 0 : "string" == typeof i13 ? i13 : "string" == typeof t8 ? t8.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t8) => this.enableUpdating = t8), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t8) => t8(this));
    }
    addController(t8) {
      (this._$EO ??= /* @__PURE__ */ new Set()).add(t8), void 0 !== this.renderRoot && this.isConnected && t8.hostConnected?.();
    }
    removeController(t8) {
      this._$EO?.delete(t8);
    }
    _$E_() {
      const t8 = /* @__PURE__ */ new Map(), s7 = this.constructor.elementProperties;
      for (const i13 of s7.keys()) this.hasOwnProperty(i13) && (t8.set(i13, this[i13]), delete this[i13]);
      t8.size > 0 && (this._$Ep = t8);
    }
    createRenderRoot() {
      const t8 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S3(t8, this.constructor.elementStyles), t8;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t8) => t8.hostConnected?.());
    }
    enableUpdating(t8) {
    }
    disconnectedCallback() {
      this._$EO?.forEach((t8) => t8.hostDisconnected?.());
    }
    attributeChangedCallback(t8, s7, i13) {
      this._$AK(t8, i13);
    }
    _$EC(t8, s7) {
      const i13 = this.constructor.elementProperties.get(t8), e17 = this.constructor._$Eu(t8, i13);
      if (void 0 !== e17 && true === i13.reflect) {
        const r14 = (void 0 !== i13.converter?.toAttribute ? i13.converter : u3).toAttribute(s7, i13.type);
        this._$Em = t8, null == r14 ? this.removeAttribute(e17) : this.setAttribute(e17, r14), this._$Em = null;
      }
    }
    _$AK(t8, s7) {
      const i13 = this.constructor, e17 = i13._$Eh.get(t8);
      if (void 0 !== e17 && this._$Em !== e17) {
        const t9 = i13.getPropertyOptions(e17), r14 = "function" == typeof t9.converter ? { fromAttribute: t9.converter } : void 0 !== t9.converter?.fromAttribute ? t9.converter : u3;
        this._$Em = e17, this[e17] = r14.fromAttribute(s7, t9.type), this._$Em = null;
      }
    }
    requestUpdate(t8, s7, i13) {
      if (void 0 !== t8) {
        if (i13 ??= this.constructor.getPropertyOptions(t8), !(i13.hasChanged ?? f3)(this[t8], s7)) return;
        this.P(t8, s7, i13);
      }
      false === this.isUpdatePending && (this._$ES = this._$ET());
    }
    P(t8, s7, i13) {
      this._$AL.has(t8) || this._$AL.set(t8, s7), true === i13.reflect && this._$Em !== t8 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t8);
    }
    async _$ET() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t9) {
        Promise.reject(t9);
      }
      const t8 = this.scheduleUpdate();
      return null != t8 && await t8, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t10, s8] of this._$Ep) this[t10] = s8;
          this._$Ep = void 0;
        }
        const t9 = this.constructor.elementProperties;
        if (t9.size > 0) for (const [s8, i13] of t9) true !== i13.wrapped || this._$AL.has(s8) || void 0 === this[s8] || this.P(s8, this[s8], i13);
      }
      let t8 = false;
      const s7 = this._$AL;
      try {
        t8 = this.shouldUpdate(s7), t8 ? (this.willUpdate(s7), this._$EO?.forEach((t9) => t9.hostUpdate?.()), this.update(s7)) : this._$EU();
      } catch (s8) {
        throw t8 = false, this._$EU(), s8;
      }
      t8 && this._$AE(s7);
    }
    willUpdate(t8) {
    }
    _$AE(t8) {
      this._$EO?.forEach((t9) => t9.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t8)), this.updated(t8);
    }
    _$EU() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t8) {
      return true;
    }
    update(t8) {
      this._$Ej &&= this._$Ej.forEach((t9) => this._$EC(t9, this[t9])), this._$EU();
    }
    updated(t8) {
    }
    firstUpdated(t8) {
    }
  };
  b3.elementStyles = [], b3.shadowRootOptions = { mode: "open" }, b3[d3("elementProperties")] = /* @__PURE__ */ new Map(), b3[d3("finalized")] = /* @__PURE__ */ new Map(), p3?.({ ReactiveElement: b3 }), (a3.reactiveElementVersions ??= []).push("2.0.4");

  // node_modules/.deno/lit-html@3.2.1/node_modules/lit-html/lit-html.js
  var t5 = globalThis;
  var i8 = t5.trustedTypes;
  var s5 = i8 ? i8.createPolicy("lit-html", { createHTML: (t8) => t8 }) : void 0;
  var e9 = "$lit$";
  var h4 = `lit$${Math.random().toFixed(9).slice(2)}$`;
  var o9 = "?" + h4;
  var n7 = `<${o9}>`;
  var r8 = document;
  var l4 = () => r8.createComment("");
  var c6 = (t8) => null === t8 || "object" != typeof t8 && "function" != typeof t8;
  var a4 = Array.isArray;
  var u4 = (t8) => a4(t8) || "function" == typeof t8?.[Symbol.iterator];
  var d4 = "[ 	\n\f\r]";
  var f4 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v2 = /-->/g;
  var _2 = />/g;
  var m2 = RegExp(`>|${d4}(?:([^\\s"'>=/]+)(${d4}*=${d4}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var p4 = /'/g;
  var g2 = /"/g;
  var $2 = /^(?:script|style|textarea|title)$/i;
  var y4 = (t8) => (i13, ...s7) => ({ _$litType$: t8, strings: i13, values: s7 });
  var x2 = y4(1);
  var b4 = y4(2);
  var w2 = y4(3);
  var T2 = Symbol.for("lit-noChange");
  var E2 = Symbol.for("lit-nothing");
  var A2 = /* @__PURE__ */ new WeakMap();
  var C2 = r8.createTreeWalker(r8, 129);
  function P2(t8, i13) {
    if (!a4(t8) || !t8.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== s5 ? s5.createHTML(i13) : i13;
  }
  var V2 = (t8, i13) => {
    const s7 = t8.length - 1, o15 = [];
    let r14, l7 = 2 === i13 ? "<svg>" : 3 === i13 ? "<math>" : "", c9 = f4;
    for (let i14 = 0; i14 < s7; i14++) {
      const s8 = t8[i14];
      let a6, u7, d5 = -1, y5 = 0;
      for (; y5 < s8.length && (c9.lastIndex = y5, u7 = c9.exec(s8), null !== u7); ) y5 = c9.lastIndex, c9 === f4 ? "!--" === u7[1] ? c9 = v2 : void 0 !== u7[1] ? c9 = _2 : void 0 !== u7[2] ? ($2.test(u7[2]) && (r14 = RegExp("</" + u7[2], "g")), c9 = m2) : void 0 !== u7[3] && (c9 = m2) : c9 === m2 ? ">" === u7[0] ? (c9 = r14 ?? f4, d5 = -1) : void 0 === u7[1] ? d5 = -2 : (d5 = c9.lastIndex - u7[2].length, a6 = u7[1], c9 = void 0 === u7[3] ? m2 : '"' === u7[3] ? g2 : p4) : c9 === g2 || c9 === p4 ? c9 = m2 : c9 === v2 || c9 === _2 ? c9 = f4 : (c9 = m2, r14 = void 0);
      const x3 = c9 === m2 && t8[i14 + 1].startsWith("/>") ? " " : "";
      l7 += c9 === f4 ? s8 + n7 : d5 >= 0 ? (o15.push(a6), s8.slice(0, d5) + e9 + s8.slice(d5) + h4 + x3) : s8 + h4 + (-2 === d5 ? i14 : x3);
    }
    return [P2(t8, l7 + (t8[s7] || "<?>") + (2 === i13 ? "</svg>" : 3 === i13 ? "</math>" : "")), o15];
  };
  var N2 = class _N {
    constructor({ strings: t8, _$litType$: s7 }, n12) {
      let r14;
      this.parts = [];
      let c9 = 0, a6 = 0;
      const u7 = t8.length - 1, d5 = this.parts, [f7, v3] = V2(t8, s7);
      if (this.el = _N.createElement(f7, n12), C2.currentNode = this.el.content, 2 === s7 || 3 === s7) {
        const t9 = this.el.content.firstChild;
        t9.replaceWith(...t9.childNodes);
      }
      for (; null !== (r14 = C2.nextNode()) && d5.length < u7; ) {
        if (1 === r14.nodeType) {
          if (r14.hasAttributes()) for (const t9 of r14.getAttributeNames()) if (t9.endsWith(e9)) {
            const i13 = v3[a6++], s8 = r14.getAttribute(t9).split(h4), e17 = /([.?@])?(.*)/.exec(i13);
            d5.push({ type: 1, index: c9, name: e17[2], strings: s8, ctor: "." === e17[1] ? H2 : "?" === e17[1] ? I2 : "@" === e17[1] ? L2 : k2 }), r14.removeAttribute(t9);
          } else t9.startsWith(h4) && (d5.push({ type: 6, index: c9 }), r14.removeAttribute(t9));
          if ($2.test(r14.tagName)) {
            const t9 = r14.textContent.split(h4), s8 = t9.length - 1;
            if (s8 > 0) {
              r14.textContent = i8 ? i8.emptyScript : "";
              for (let i13 = 0; i13 < s8; i13++) r14.append(t9[i13], l4()), C2.nextNode(), d5.push({ type: 2, index: ++c9 });
              r14.append(t9[s8], l4());
            }
          }
        } else if (8 === r14.nodeType) if (r14.data === o9) d5.push({ type: 2, index: c9 });
        else {
          let t9 = -1;
          for (; -1 !== (t9 = r14.data.indexOf(h4, t9 + 1)); ) d5.push({ type: 7, index: c9 }), t9 += h4.length - 1;
        }
        c9++;
      }
    }
    static createElement(t8, i13) {
      const s7 = r8.createElement("template");
      return s7.innerHTML = t8, s7;
    }
  };
  function S4(t8, i13, s7 = t8, e17) {
    if (i13 === T2) return i13;
    let h7 = void 0 !== e17 ? s7._$Co?.[e17] : s7._$Cl;
    const o15 = c6(i13) ? void 0 : i13._$litDirective$;
    return h7?.constructor !== o15 && (h7?._$AO?.(false), void 0 === o15 ? h7 = void 0 : (h7 = new o15(t8), h7._$AT(t8, s7, e17)), void 0 !== e17 ? (s7._$Co ??= [])[e17] = h7 : s7._$Cl = h7), void 0 !== h7 && (i13 = S4(t8, h7._$AS(t8, i13.values), h7, e17)), i13;
  }
  var M2 = class {
    constructor(t8, i13) {
      this._$AV = [], this._$AN = void 0, this._$AD = t8, this._$AM = i13;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t8) {
      const { el: { content: i13 }, parts: s7 } = this._$AD, e17 = (t8?.creationScope ?? r8).importNode(i13, true);
      C2.currentNode = e17;
      let h7 = C2.nextNode(), o15 = 0, n12 = 0, l7 = s7[0];
      for (; void 0 !== l7; ) {
        if (o15 === l7.index) {
          let i14;
          2 === l7.type ? i14 = new R2(h7, h7.nextSibling, this, t8) : 1 === l7.type ? i14 = new l7.ctor(h7, l7.name, l7.strings, this, t8) : 6 === l7.type && (i14 = new z2(h7, this, t8)), this._$AV.push(i14), l7 = s7[++n12];
        }
        o15 !== l7?.index && (h7 = C2.nextNode(), o15++);
      }
      return C2.currentNode = r8, e17;
    }
    p(t8) {
      let i13 = 0;
      for (const s7 of this._$AV) void 0 !== s7 && (void 0 !== s7.strings ? (s7._$AI(t8, s7, i13), i13 += s7.strings.length - 2) : s7._$AI(t8[i13])), i13++;
    }
  };
  var R2 = class _R {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t8, i13, s7, e17) {
      this.type = 2, this._$AH = E2, this._$AN = void 0, this._$AA = t8, this._$AB = i13, this._$AM = s7, this.options = e17, this._$Cv = e17?.isConnected ?? true;
    }
    get parentNode() {
      let t8 = this._$AA.parentNode;
      const i13 = this._$AM;
      return void 0 !== i13 && 11 === t8?.nodeType && (t8 = i13.parentNode), t8;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t8, i13 = this) {
      t8 = S4(this, t8, i13), c6(t8) ? t8 === E2 || null == t8 || "" === t8 ? (this._$AH !== E2 && this._$AR(), this._$AH = E2) : t8 !== this._$AH && t8 !== T2 && this._(t8) : void 0 !== t8._$litType$ ? this.$(t8) : void 0 !== t8.nodeType ? this.T(t8) : u4(t8) ? this.k(t8) : this._(t8);
    }
    O(t8) {
      return this._$AA.parentNode.insertBefore(t8, this._$AB);
    }
    T(t8) {
      this._$AH !== t8 && (this._$AR(), this._$AH = this.O(t8));
    }
    _(t8) {
      this._$AH !== E2 && c6(this._$AH) ? this._$AA.nextSibling.data = t8 : this.T(r8.createTextNode(t8)), this._$AH = t8;
    }
    $(t8) {
      const { values: i13, _$litType$: s7 } = t8, e17 = "number" == typeof s7 ? this._$AC(t8) : (void 0 === s7.el && (s7.el = N2.createElement(P2(s7.h, s7.h[0]), this.options)), s7);
      if (this._$AH?._$AD === e17) this._$AH.p(i13);
      else {
        const t9 = new M2(e17, this), s8 = t9.u(this.options);
        t9.p(i13), this.T(s8), this._$AH = t9;
      }
    }
    _$AC(t8) {
      let i13 = A2.get(t8.strings);
      return void 0 === i13 && A2.set(t8.strings, i13 = new N2(t8)), i13;
    }
    k(t8) {
      a4(this._$AH) || (this._$AH = [], this._$AR());
      const i13 = this._$AH;
      let s7, e17 = 0;
      for (const h7 of t8) e17 === i13.length ? i13.push(s7 = new _R(this.O(l4()), this.O(l4()), this, this.options)) : s7 = i13[e17], s7._$AI(h7), e17++;
      e17 < i13.length && (this._$AR(s7 && s7._$AB.nextSibling, e17), i13.length = e17);
    }
    _$AR(t8 = this._$AA.nextSibling, i13) {
      for (this._$AP?.(false, true, i13); t8 && t8 !== this._$AB; ) {
        const i14 = t8.nextSibling;
        t8.remove(), t8 = i14;
      }
    }
    setConnected(t8) {
      void 0 === this._$AM && (this._$Cv = t8, this._$AP?.(t8));
    }
  };
  var k2 = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t8, i13, s7, e17, h7) {
      this.type = 1, this._$AH = E2, this._$AN = void 0, this.element = t8, this.name = i13, this._$AM = e17, this.options = h7, s7.length > 2 || "" !== s7[0] || "" !== s7[1] ? (this._$AH = Array(s7.length - 1).fill(new String()), this.strings = s7) : this._$AH = E2;
    }
    _$AI(t8, i13 = this, s7, e17) {
      const h7 = this.strings;
      let o15 = false;
      if (void 0 === h7) t8 = S4(this, t8, i13, 0), o15 = !c6(t8) || t8 !== this._$AH && t8 !== T2, o15 && (this._$AH = t8);
      else {
        const e18 = t8;
        let n12, r14;
        for (t8 = h7[0], n12 = 0; n12 < h7.length - 1; n12++) r14 = S4(this, e18[s7 + n12], i13, n12), r14 === T2 && (r14 = this._$AH[n12]), o15 ||= !c6(r14) || r14 !== this._$AH[n12], r14 === E2 ? t8 = E2 : t8 !== E2 && (t8 += (r14 ?? "") + h7[n12 + 1]), this._$AH[n12] = r14;
      }
      o15 && !e17 && this.j(t8);
    }
    j(t8) {
      t8 === E2 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t8 ?? "");
    }
  };
  var H2 = class extends k2 {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t8) {
      this.element[this.name] = t8 === E2 ? void 0 : t8;
    }
  };
  var I2 = class extends k2 {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t8) {
      this.element.toggleAttribute(this.name, !!t8 && t8 !== E2);
    }
  };
  var L2 = class extends k2 {
    constructor(t8, i13, s7, e17, h7) {
      super(t8, i13, s7, e17, h7), this.type = 5;
    }
    _$AI(t8, i13 = this) {
      if ((t8 = S4(this, t8, i13, 0) ?? E2) === T2) return;
      const s7 = this._$AH, e17 = t8 === E2 && s7 !== E2 || t8.capture !== s7.capture || t8.once !== s7.once || t8.passive !== s7.passive, h7 = t8 !== E2 && (s7 === E2 || e17);
      e17 && this.element.removeEventListener(this.name, this, s7), h7 && this.element.addEventListener(this.name, this, t8), this._$AH = t8;
    }
    handleEvent(t8) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t8) : this._$AH.handleEvent(t8);
    }
  };
  var z2 = class {
    constructor(t8, i13, s7) {
      this.element = t8, this.type = 6, this._$AN = void 0, this._$AM = i13, this.options = s7;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t8) {
      S4(this, t8);
    }
  };
  var Z = { M: e9, P: h4, A: o9, C: 1, L: V2, R: M2, D: u4, V: S4, I: R2, H: k2, N: I2, U: L2, B: H2, F: z2 };
  var j2 = t5.litHtmlPolyfillSupport;
  j2?.(N2, R2), (t5.litHtmlVersions ??= []).push("3.2.1");
  var B2 = (t8, i13, s7) => {
    const e17 = s7?.renderBefore ?? i13;
    let h7 = e17._$litPart$;
    if (void 0 === h7) {
      const t9 = s7?.renderBefore ?? null;
      e17._$litPart$ = h7 = new R2(i13.insertBefore(l4(), t9), t9, void 0, s7 ?? {});
    }
    return h7._$AI(t8), h7;
  };

  // node_modules/.deno/lit-element@4.1.1/node_modules/lit-element/lit-element.js
  var r9 = class extends b3 {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t8 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t8.firstChild, t8;
    }
    update(t8) {
      const s7 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t8), this._$Do = B2(s7, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return T2;
    }
  };
  r9._$litElement$ = true, r9["finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: r9 });
  var i9 = globalThis.litElementPolyfillSupport;
  i9?.({ LitElement: r9 });
  (globalThis.litElementVersions ??= []).push("4.1.1");

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7DUCI5S4.js
  var spinner_styles_default = i6`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;

  // node_modules/.deno/@shoelace-style+localize@3.2.1/node_modules/@shoelace-style/localize/dist/index.js
  var connectedElements = /* @__PURE__ */ new Set();
  var translations = /* @__PURE__ */ new Map();
  var fallback;
  var documentDirection = "ltr";
  var documentLanguage = "en";
  var isClient = typeof MutationObserver !== "undefined" && typeof document !== "undefined" && typeof document.documentElement !== "undefined";
  if (isClient) {
    const documentElementObserver = new MutationObserver(update);
    documentDirection = document.documentElement.dir || "ltr";
    documentLanguage = document.documentElement.lang || navigator.language;
    documentElementObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir", "lang"]
    });
  }
  function registerTranslation(...translation2) {
    translation2.map((t8) => {
      const code = t8.$code.toLowerCase();
      if (translations.has(code)) {
        translations.set(code, Object.assign(Object.assign({}, translations.get(code)), t8));
      } else {
        translations.set(code, t8);
      }
      if (!fallback) {
        fallback = t8;
      }
    });
    update();
  }
  function update() {
    if (isClient) {
      documentDirection = document.documentElement.dir || "ltr";
      documentLanguage = document.documentElement.lang || navigator.language;
    }
    [...connectedElements.keys()].map((el) => {
      if (typeof el.requestUpdate === "function") {
        el.requestUpdate();
      }
    });
  }
  var LocalizeController = class {
    constructor(host) {
      this.host = host;
      this.host.addController(this);
    }
    hostConnected() {
      connectedElements.add(this.host);
    }
    hostDisconnected() {
      connectedElements.delete(this.host);
    }
    dir() {
      return `${this.host.dir || documentDirection}`.toLowerCase();
    }
    lang() {
      return `${this.host.lang || documentLanguage}`.toLowerCase();
    }
    getTranslationData(lang) {
      var _a, _b;
      const locale = new Intl.Locale(lang.replace(/_/g, "-"));
      const language = locale === null || locale === void 0 ? void 0 : locale.language.toLowerCase();
      const region = (_b = (_a = locale === null || locale === void 0 ? void 0 : locale.region) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : "";
      const primary = translations.get(`${language}-${region}`);
      const secondary = translations.get(language);
      return { locale, language, region, primary, secondary };
    }
    exists(key, options) {
      var _a;
      const { primary, secondary } = this.getTranslationData((_a = options.lang) !== null && _a !== void 0 ? _a : this.lang());
      options = Object.assign({ includeFallback: false }, options);
      if (primary && primary[key] || secondary && secondary[key] || options.includeFallback && fallback && fallback[key]) {
        return true;
      }
      return false;
    }
    term(key, ...args) {
      const { primary, secondary } = this.getTranslationData(this.lang());
      let term;
      if (primary && primary[key]) {
        term = primary[key];
      } else if (secondary && secondary[key]) {
        term = secondary[key];
      } else if (fallback && fallback[key]) {
        term = fallback[key];
      } else {
        console.error(`No translation found for: ${String(key)}`);
        return String(key);
      }
      if (typeof term === "function") {
        return term(...args);
      }
      return term;
    }
    date(dateToFormat, options) {
      dateToFormat = new Date(dateToFormat);
      return new Intl.DateTimeFormat(this.lang(), options).format(dateToFormat);
    }
    number(numberToFormat, options) {
      numberToFormat = Number(numberToFormat);
      return isNaN(numberToFormat) ? "" : new Intl.NumberFormat(this.lang(), options).format(numberToFormat);
    }
    relativeTime(value, unit, options) {
      return new Intl.RelativeTimeFormat(this.lang(), options).format(value, unit);
    }
  };

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7BTDLTNI.js
  var translation = {
    $code: "en",
    $name: "English",
    $dir: "ltr",
    carousel: "Carousel",
    clearEntry: "Clear entry",
    close: "Close",
    copied: "Copied",
    copy: "Copy",
    currentValue: "Current value",
    error: "Error",
    goToSlide: (slide, count) => `Go to slide ${slide} of ${count}`,
    hidePassword: "Hide password",
    loading: "Loading",
    nextSlide: "Next slide",
    numOptionsSelected: (num) => {
      if (num === 0) return "No options selected";
      if (num === 1) return "1 option selected";
      return `${num} options selected`;
    },
    previousSlide: "Previous slide",
    progress: "Progress",
    remove: "Remove",
    resize: "Resize",
    scrollToEnd: "Scroll to end",
    scrollToStart: "Scroll to start",
    selectAColorFromTheScreen: "Select a color from the screen",
    showPassword: "Show password",
    slideNum: (slide) => `Slide ${slide}`,
    toggleColorFormat: "Toggle color format"
  };
  registerTranslation(translation);
  var en_default = translation;

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6CTB5ZDJ.js
  var LocalizeController2 = class extends LocalizeController {
  };
  registerTranslation(en_default);

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TUVJKY7S.js
  var component_styles_default = i6`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KAW7D32O.js
  var __defProp2 = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a6, b5) => {
    for (var prop in b5 || (b5 = {}))
      if (__hasOwnProp.call(b5, prop))
        __defNormalProp(a6, prop, b5[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b5)) {
        if (__propIsEnum.call(b5, prop))
          __defNormalProp(a6, prop, b5[prop]);
      }
    return a6;
  };
  var __spreadProps = (a6, b5) => __defProps(a6, __getOwnPropDescs(b5));
  var __decorateClass2 = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc2(target, key) : target;
    for (var i13 = decorators.length - 1, decorator; i13 >= 0; i13--)
      if (decorator = decorators[i13])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp2(target, key, result);
    return result;
  };
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
  var __await = function(promise, isYieldStar) {
    this[0] = promise;
    this[1] = isYieldStar;
  };
  var __yieldStar = (value) => {
    var obj = value[__knownSymbol("asyncIterator")], isAwait = false, method, it = {};
    if (obj == null) {
      obj = value[__knownSymbol("iterator")]();
      method = (k3) => it[k3] = (x3) => obj[k3](x3);
    } else {
      obj = obj.call(value);
      method = (k3) => it[k3] = (v3) => {
        if (isAwait) {
          isAwait = false;
          if (k3 === "throw") throw v3;
          return v3;
        }
        isAwait = true;
        return {
          done: false,
          value: new __await(new Promise((resolve) => {
            var x3 = obj[k3](v3);
            if (!(x3 instanceof Object)) __typeError("Object expected");
            resolve(x3);
          }), 1)
        };
      };
    }
    return it[__knownSymbol("iterator")] = () => it, method("next"), "throw" in obj ? method("throw") : it.throw = (x3) => {
      throw x3;
    }, "return" in obj && method("return"), it;
  };

  // node_modules/.deno/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/decorators/property.js
  var o10 = { attribute: true, type: String, converter: u3, reflect: false, hasChanged: f3 };
  var r10 = (t8 = o10, e17, r14) => {
    const { kind: n12, metadata: i13 } = r14;
    let s7 = globalThis.litPropertyMetadata.get(i13);
    if (void 0 === s7 && globalThis.litPropertyMetadata.set(i13, s7 = /* @__PURE__ */ new Map()), s7.set(r14.name, t8), "accessor" === n12) {
      const { name: o15 } = r14;
      return { set(r15) {
        const n13 = e17.get.call(this);
        e17.set.call(this, r15), this.requestUpdate(o15, n13, t8);
      }, init(e18) {
        return void 0 !== e18 && this.P(o15, void 0, t8), e18;
      } };
    }
    if ("setter" === n12) {
      const { name: o15 } = r14;
      return function(r15) {
        const n13 = this[o15];
        e17.call(this, r15), this.requestUpdate(o15, n13, t8);
      };
    }
    throw Error("Unsupported decorator location: " + n12);
  };
  function n8(t8) {
    return (e17, o15) => "object" == typeof o15 ? r10(t8, e17, o15) : ((t9, e18, o16) => {
      const r14 = e18.hasOwnProperty(o16);
      return e18.constructor.createProperty(o16, r14 ? { ...t9, wrapped: true } : t9), r14 ? Object.getOwnPropertyDescriptor(e18, o16) : void 0;
    })(t8, e17, o15);
  }

  // node_modules/.deno/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/decorators/state.js
  function r11(r14) {
    return n8({ ...r14, state: true, attribute: false });
  }

  // node_modules/.deno/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/decorators/base.js
  var e10 = (e17, t8, c9) => (c9.configurable = true, c9.enumerable = true, Reflect.decorate && "object" != typeof t8 && Object.defineProperty(e17, t8, c9), c9);

  // node_modules/.deno/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/decorators/query.js
  function e11(e17, r14) {
    return (n12, s7, i13) => {
      const o15 = (t8) => t8.renderRoot?.querySelector(e17) ?? null;
      if (r14) {
        const { get: e18, set: r15 } = "object" == typeof s7 ? n12 : i13 ?? (() => {
          const t8 = Symbol();
          return { get() {
            return this[t8];
          }, set(e19) {
            this[t8] = e19;
          } };
        })();
        return e10(n12, s7, { get() {
          let t8 = e18.call(this);
          return void 0 === t8 && (t8 = o15(this), (null !== t8 || this.hasUpdated) && r15.call(this, t8)), t8;
        } });
      }
      return e10(n12, s7, { get() {
        return o15(this);
      } });
    };
  }

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.4TUIT776.js
  var _hasRecordedInitialProperties;
  var ShoelaceElement = class extends r9 {
    constructor() {
      super();
      __privateAdd(this, _hasRecordedInitialProperties, false);
      this.initialReflectedProperties = /* @__PURE__ */ new Map();
      Object.entries(this.constructor.dependencies).forEach(([name, component]) => {
        this.constructor.define(name, component);
      });
    }
    emit(name, options) {
      const event = new CustomEvent(name, __spreadValues({
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: {}
      }, options));
      this.dispatchEvent(event);
      return event;
    }
    /* eslint-enable */
    static define(name, elementConstructor = this, options = {}) {
      const currentlyRegisteredConstructor = customElements.get(name);
      if (!currentlyRegisteredConstructor) {
        try {
          customElements.define(name, elementConstructor, options);
        } catch (_err) {
          customElements.define(name, class extends elementConstructor {
          }, options);
        }
        return;
      }
      let newVersion = " (unknown version)";
      let existingVersion = newVersion;
      if ("version" in elementConstructor && elementConstructor.version) {
        newVersion = " v" + elementConstructor.version;
      }
      if ("version" in currentlyRegisteredConstructor && currentlyRegisteredConstructor.version) {
        existingVersion = " v" + currentlyRegisteredConstructor.version;
      }
      if (newVersion && existingVersion && newVersion === existingVersion) {
        return;
      }
      console.warn(
        `Attempted to register <${name}>${newVersion}, but <${name}>${existingVersion} has already been registered.`
      );
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (!__privateGet(this, _hasRecordedInitialProperties)) {
        this.constructor.elementProperties.forEach(
          (obj, prop) => {
            if (obj.reflect && this[prop] != null) {
              this.initialReflectedProperties.set(prop, this[prop]);
            }
          }
        );
        __privateSet(this, _hasRecordedInitialProperties, true);
      }
      super.attributeChangedCallback(name, oldValue, newValue);
    }
    willUpdate(changedProperties) {
      super.willUpdate(changedProperties);
      this.initialReflectedProperties.forEach((value, prop) => {
        if (changedProperties.has(prop) && this[prop] == null) {
          this[prop] = value;
        }
      });
    }
  };
  _hasRecordedInitialProperties = /* @__PURE__ */ new WeakMap();
  ShoelaceElement.version = "2.20.1";
  ShoelaceElement.dependencies = {};
  __decorateClass2([
    n8()
  ], ShoelaceElement.prototype, "dir", 2);
  __decorateClass2([
    n8()
  ], ShoelaceElement.prototype, "lang", 2);

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.36O46B5H.js
  var SlSpinner = class extends ShoelaceElement {
    constructor() {
      super(...arguments);
      this.localize = new LocalizeController2(this);
    }
    render() {
      return x2`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
    }
  };
  SlSpinner.styles = [component_styles_default, spinner_styles_default];

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3RPBFEDE.js
  var formCollections = /* @__PURE__ */ new WeakMap();
  var reportValidityOverloads = /* @__PURE__ */ new WeakMap();
  var checkValidityOverloads = /* @__PURE__ */ new WeakMap();
  var userInteractedControls = /* @__PURE__ */ new WeakSet();
  var interactions = /* @__PURE__ */ new WeakMap();
  var FormControlController = class {
    constructor(host, options) {
      this.handleFormData = (event) => {
        const disabled = this.options.disabled(this.host);
        const name = this.options.name(this.host);
        const value = this.options.value(this.host);
        const isButton = this.host.tagName.toLowerCase() === "sl-button";
        if (this.host.isConnected && !disabled && !isButton && typeof name === "string" && name.length > 0 && typeof value !== "undefined") {
          if (Array.isArray(value)) {
            value.forEach((val) => {
              event.formData.append(name, val.toString());
            });
          } else {
            event.formData.append(name, value.toString());
          }
        }
      };
      this.handleFormSubmit = (event) => {
        var _a;
        const disabled = this.options.disabled(this.host);
        const reportValidity = this.options.reportValidity;
        if (this.form && !this.form.noValidate) {
          (_a = formCollections.get(this.form)) == null ? void 0 : _a.forEach((control) => {
            this.setUserInteracted(control, true);
          });
        }
        if (this.form && !this.form.noValidate && !disabled && !reportValidity(this.host)) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      };
      this.handleFormReset = () => {
        this.options.setValue(this.host, this.options.defaultValue(this.host));
        this.setUserInteracted(this.host, false);
        interactions.set(this.host, []);
      };
      this.handleInteraction = (event) => {
        const emittedEvents = interactions.get(this.host);
        if (!emittedEvents.includes(event.type)) {
          emittedEvents.push(event.type);
        }
        if (emittedEvents.length === this.options.assumeInteractionOn.length) {
          this.setUserInteracted(this.host, true);
        }
      };
      this.checkFormValidity = () => {
        if (this.form && !this.form.noValidate) {
          const elements = this.form.querySelectorAll("*");
          for (const element of elements) {
            if (typeof element.checkValidity === "function") {
              if (!element.checkValidity()) {
                return false;
              }
            }
          }
        }
        return true;
      };
      this.reportFormValidity = () => {
        if (this.form && !this.form.noValidate) {
          const elements = this.form.querySelectorAll("*");
          for (const element of elements) {
            if (typeof element.reportValidity === "function") {
              if (!element.reportValidity()) {
                return false;
              }
            }
          }
        }
        return true;
      };
      (this.host = host).addController(this);
      this.options = __spreadValues({
        form: (input) => {
          const formId = input.form;
          if (formId) {
            const root2 = input.getRootNode();
            const form = root2.querySelector(`#${formId}`);
            if (form) {
              return form;
            }
          }
          return input.closest("form");
        },
        name: (input) => input.name,
        value: (input) => input.value,
        defaultValue: (input) => input.defaultValue,
        disabled: (input) => {
          var _a;
          return (_a = input.disabled) != null ? _a : false;
        },
        reportValidity: (input) => typeof input.reportValidity === "function" ? input.reportValidity() : true,
        checkValidity: (input) => typeof input.checkValidity === "function" ? input.checkValidity() : true,
        setValue: (input, value) => input.value = value,
        assumeInteractionOn: ["sl-input"]
      }, options);
    }
    hostConnected() {
      const form = this.options.form(this.host);
      if (form) {
        this.attachForm(form);
      }
      interactions.set(this.host, []);
      this.options.assumeInteractionOn.forEach((event) => {
        this.host.addEventListener(event, this.handleInteraction);
      });
    }
    hostDisconnected() {
      this.detachForm();
      interactions.delete(this.host);
      this.options.assumeInteractionOn.forEach((event) => {
        this.host.removeEventListener(event, this.handleInteraction);
      });
    }
    hostUpdated() {
      const form = this.options.form(this.host);
      if (!form) {
        this.detachForm();
      }
      if (form && this.form !== form) {
        this.detachForm();
        this.attachForm(form);
      }
      if (this.host.hasUpdated) {
        this.setValidity(this.host.validity.valid);
      }
    }
    attachForm(form) {
      if (form) {
        this.form = form;
        if (formCollections.has(this.form)) {
          formCollections.get(this.form).add(this.host);
        } else {
          formCollections.set(this.form, /* @__PURE__ */ new Set([this.host]));
        }
        this.form.addEventListener("formdata", this.handleFormData);
        this.form.addEventListener("submit", this.handleFormSubmit);
        this.form.addEventListener("reset", this.handleFormReset);
        if (!reportValidityOverloads.has(this.form)) {
          reportValidityOverloads.set(this.form, this.form.reportValidity);
          this.form.reportValidity = () => this.reportFormValidity();
        }
        if (!checkValidityOverloads.has(this.form)) {
          checkValidityOverloads.set(this.form, this.form.checkValidity);
          this.form.checkValidity = () => this.checkFormValidity();
        }
      } else {
        this.form = void 0;
      }
    }
    detachForm() {
      if (!this.form) return;
      const formCollection = formCollections.get(this.form);
      if (!formCollection) {
        return;
      }
      formCollection.delete(this.host);
      if (formCollection.size <= 0) {
        this.form.removeEventListener("formdata", this.handleFormData);
        this.form.removeEventListener("submit", this.handleFormSubmit);
        this.form.removeEventListener("reset", this.handleFormReset);
        if (reportValidityOverloads.has(this.form)) {
          this.form.reportValidity = reportValidityOverloads.get(this.form);
          reportValidityOverloads.delete(this.form);
        }
        if (checkValidityOverloads.has(this.form)) {
          this.form.checkValidity = checkValidityOverloads.get(this.form);
          checkValidityOverloads.delete(this.form);
        }
        this.form = void 0;
      }
    }
    setUserInteracted(el, hasInteracted) {
      if (hasInteracted) {
        userInteractedControls.add(el);
      } else {
        userInteractedControls.delete(el);
      }
      el.requestUpdate();
    }
    doAction(type, submitter) {
      if (this.form) {
        const button = document.createElement("button");
        button.type = type;
        button.style.position = "absolute";
        button.style.width = "0";
        button.style.height = "0";
        button.style.clipPath = "inset(50%)";
        button.style.overflow = "hidden";
        button.style.whiteSpace = "nowrap";
        if (submitter) {
          button.name = submitter.name;
          button.value = submitter.value;
          ["formaction", "formenctype", "formmethod", "formnovalidate", "formtarget"].forEach((attr) => {
            if (submitter.hasAttribute(attr)) {
              button.setAttribute(attr, submitter.getAttribute(attr));
            }
          });
        }
        this.form.append(button);
        button.click();
        button.remove();
      }
    }
    /** Returns the associated `<form>` element, if one exists. */
    getForm() {
      var _a;
      return (_a = this.form) != null ? _a : null;
    }
    /** Resets the form, restoring all the control to their default value */
    reset(submitter) {
      this.doAction("reset", submitter);
    }
    /** Submits the form, triggering validation and form data injection. */
    submit(submitter) {
      this.doAction("submit", submitter);
    }
    /**
     * Synchronously sets the form control's validity. Call this when you know the future validity but need to update
     * the host element immediately, i.e. before Lit updates the component in the next update.
     */
    setValidity(isValid) {
      const host = this.host;
      const hasInteracted = Boolean(userInteractedControls.has(host));
      const required = Boolean(host.required);
      host.toggleAttribute("data-required", required);
      host.toggleAttribute("data-optional", !required);
      host.toggleAttribute("data-invalid", !isValid);
      host.toggleAttribute("data-valid", isValid);
      host.toggleAttribute("data-user-invalid", !isValid && hasInteracted);
      host.toggleAttribute("data-user-valid", isValid && hasInteracted);
    }
    /**
     * Updates the form control's validity based on the current value of `host.validity.valid`. Call this when anything
     * that affects constraint validation changes so the component receives the correct validity states.
     */
    updateValidity() {
      const host = this.host;
      this.setValidity(host.validity.valid);
    }
    /**
     * Dispatches a non-bubbling, cancelable custom event of type `sl-invalid`.
     * If the `sl-invalid` event will be cancelled then the original `invalid`
     * event (which may have been passed as argument) will also be cancelled.
     * If no original `invalid` event has been passed then the `sl-invalid`
     * event will be cancelled before being dispatched.
     */
    emitInvalidEvent(originalInvalidEvent) {
      const slInvalidEvent = new CustomEvent("sl-invalid", {
        bubbles: false,
        composed: false,
        cancelable: true,
        detail: {}
      });
      if (!originalInvalidEvent) {
        slInvalidEvent.preventDefault();
      }
      if (!this.host.dispatchEvent(slInvalidEvent)) {
        originalInvalidEvent == null ? void 0 : originalInvalidEvent.preventDefault();
      }
    }
  };
  var validValidityState = Object.freeze({
    badInput: false,
    customError: false,
    patternMismatch: false,
    rangeOverflow: false,
    rangeUnderflow: false,
    stepMismatch: false,
    tooLong: false,
    tooShort: false,
    typeMismatch: false,
    valid: true,
    valueMissing: false
  });
  var valueMissingValidityState = Object.freeze(__spreadProps(__spreadValues({}, validValidityState), {
    valid: false,
    valueMissing: true
  }));
  var customErrorValidityState = Object.freeze(__spreadProps(__spreadValues({}, validValidityState), {
    valid: false,
    customError: true
  }));

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.MAQXLKQ7.js
  var button_styles_default = i6`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`;

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.NYIIDP5N.js
  var HasSlotController = class {
    constructor(host, ...slotNames) {
      this.slotNames = [];
      this.handleSlotChange = (event) => {
        const slot = event.target;
        if (this.slotNames.includes("[default]") && !slot.name || slot.name && this.slotNames.includes(slot.name)) {
          this.host.requestUpdate();
        }
      };
      (this.host = host).addController(this);
      this.slotNames = slotNames;
    }
    hasDefaultSlot() {
      return [...this.host.childNodes].some((node) => {
        if (node.nodeType === node.TEXT_NODE && node.textContent.trim() !== "") {
          return true;
        }
        if (node.nodeType === node.ELEMENT_NODE) {
          const el = node;
          const tagName = el.tagName.toLowerCase();
          if (tagName === "sl-visually-hidden") {
            return false;
          }
          if (!el.hasAttribute("slot")) {
            return true;
          }
        }
        return false;
      });
    }
    hasNamedSlot(name) {
      return this.host.querySelector(`:scope > [slot="${name}"]`) !== null;
    }
    test(slotName) {
      return slotName === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(slotName);
    }
    hostConnected() {
      this.host.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
    }
    hostDisconnected() {
      this.host.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
    }
  };
  function getTextContent(slot) {
    if (!slot) {
      return "";
    }
    const nodes = slot.assignedNodes({ flatten: true });
    let text = "";
    [...nodes].forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent;
      }
    });
    return text;
  }

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3Y6SB6QS.js
  var basePath = "";
  function setBasePath(path) {
    basePath = path;
  }
  function getBasePath(subpath = "") {
    if (!basePath) {
      const scripts = [...document.getElementsByTagName("script")];
      const configScript = scripts.find((script) => script.hasAttribute("data-shoelace"));
      if (configScript) {
        setBasePath(configScript.getAttribute("data-shoelace"));
      } else {
        const fallbackScript = scripts.find((s7) => {
          return /shoelace(\.min)?\.js($|\?)/.test(s7.src) || /shoelace-autoloader(\.min)?\.js($|\?)/.test(s7.src);
        });
        let path = "";
        if (fallbackScript) {
          path = fallbackScript.getAttribute("src");
        }
        setBasePath(path.split("/").slice(0, -1).join("/"));
      }
    }
    return basePath.replace(/\/$/, "") + (subpath ? `/${subpath.replace(/^\//, "")}` : ``);
  }

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P7ZG6EMR.js
  var library = {
    name: "default",
    resolver: (name) => getBasePath(`assets/icons/${name}.svg`)
  };
  var library_default_default = library;

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3TFKS637.js
  var icons = {
    caret: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,
    check: `
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
    "chevron-down": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
    "chevron-left": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,
    "chevron-right": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
    copy: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,
    eye: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,
    "eye-slash": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,
    eyedropper: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,
    "grip-vertical": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,
    indeterminate: `
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
    "person-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,
    "play-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,
    "pause-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,
    radio: `
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,
    "star-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,
    "x-lg": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,
    "x-circle-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `
  };
  var systemLibrary = {
    name: "system",
    resolver: (name) => {
      if (name in icons) {
        return `data:image/svg+xml,${encodeURIComponent(icons[name])}`;
      }
      return "";
    }
  };
  var library_system_default = systemLibrary;

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ZL53POKZ.js
  var registry = [library_default_default, library_system_default];
  var watchedIcons = [];
  function watchIcon(icon) {
    watchedIcons.push(icon);
  }
  function unwatchIcon(icon) {
    watchedIcons = watchedIcons.filter((el) => el !== icon);
  }
  function getIconLibrary(name) {
    return registry.find((lib) => lib.name === name);
  }

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.QLXRCYS4.js
  var icon_styles_default = i6`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GMYPQTFK.js
  function watch(propertyName, options) {
    const resolvedOptions = __spreadValues({
      waitUntilFirstUpdate: false
    }, options);
    return (proto, decoratedFnName) => {
      const { update: update2 } = proto;
      const watchedProperties = Array.isArray(propertyName) ? propertyName : [propertyName];
      proto.update = function(changedProps) {
        watchedProperties.forEach((property) => {
          const key = property;
          if (changedProps.has(key)) {
            const oldValue = changedProps.get(key);
            const newValue = this[key];
            if (oldValue !== newValue) {
              if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
                this[decoratedFnName](oldValue, newValue);
              }
            }
          }
        });
        update2.call(this, changedProps);
      };
    };
  }

  // node_modules/.deno/lit-html@3.2.1/node_modules/lit-html/directive-helpers.js
  var { I: t6 } = Z;
  var e12 = (o15, t8) => void 0 === t8 ? void 0 !== o15?._$litType$ : o15?._$litType$ === t8;
  var f5 = (o15) => void 0 === o15.strings;
  var u5 = {};
  var m3 = (o15, t8 = u5) => o15._$AH = t8;

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.YHLNUJ7P.js
  var CACHEABLE_ERROR = Symbol();
  var RETRYABLE_ERROR = Symbol();
  var parser;
  var iconCache = /* @__PURE__ */ new Map();
  var SlIcon = class extends ShoelaceElement {
    constructor() {
      super(...arguments);
      this.initialRender = false;
      this.svg = null;
      this.label = "";
      this.library = "default";
    }
    /** Given a URL, this function returns the resulting SVG element or an appropriate error symbol. */
    async resolveIcon(url, library2) {
      var _a;
      let fileData;
      if (library2 == null ? void 0 : library2.spriteSheet) {
        this.svg = x2`<svg part="svg">
        <use part="use" href="${url}"></use>
      </svg>`;
        return this.svg;
      }
      try {
        fileData = await fetch(url, { mode: "cors" });
        if (!fileData.ok) return fileData.status === 410 ? CACHEABLE_ERROR : RETRYABLE_ERROR;
      } catch (e17) {
        return RETRYABLE_ERROR;
      }
      try {
        const div = document.createElement("div");
        div.innerHTML = await fileData.text();
        const svg = div.firstElementChild;
        if (((_a = svg == null ? void 0 : svg.tagName) == null ? void 0 : _a.toLowerCase()) !== "svg") return CACHEABLE_ERROR;
        if (!parser) parser = new DOMParser();
        const doc = parser.parseFromString(svg.outerHTML, "text/html");
        const svgEl = doc.body.querySelector("svg");
        if (!svgEl) return CACHEABLE_ERROR;
        svgEl.part.add("svg");
        return document.adoptNode(svgEl);
      } catch (e17) {
        return CACHEABLE_ERROR;
      }
    }
    connectedCallback() {
      super.connectedCallback();
      watchIcon(this);
    }
    firstUpdated() {
      this.initialRender = true;
      this.setIcon();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      unwatchIcon(this);
    }
    getIconSource() {
      const library2 = getIconLibrary(this.library);
      if (this.name && library2) {
        return {
          url: library2.resolver(this.name),
          fromLibrary: true
        };
      }
      return {
        url: this.src,
        fromLibrary: false
      };
    }
    handleLabelChange() {
      const hasLabel = typeof this.label === "string" && this.label.length > 0;
      if (hasLabel) {
        this.setAttribute("role", "img");
        this.setAttribute("aria-label", this.label);
        this.removeAttribute("aria-hidden");
      } else {
        this.removeAttribute("role");
        this.removeAttribute("aria-label");
        this.setAttribute("aria-hidden", "true");
      }
    }
    async setIcon() {
      var _a;
      const { url, fromLibrary } = this.getIconSource();
      const library2 = fromLibrary ? getIconLibrary(this.library) : void 0;
      if (!url) {
        this.svg = null;
        return;
      }
      let iconResolver = iconCache.get(url);
      if (!iconResolver) {
        iconResolver = this.resolveIcon(url, library2);
        iconCache.set(url, iconResolver);
      }
      if (!this.initialRender) {
        return;
      }
      const svg = await iconResolver;
      if (svg === RETRYABLE_ERROR) {
        iconCache.delete(url);
      }
      if (url !== this.getIconSource().url) {
        return;
      }
      if (e12(svg)) {
        this.svg = svg;
        if (library2) {
          await this.updateComplete;
          const shadowSVG = this.shadowRoot.querySelector("[part='svg']");
          if (typeof library2.mutator === "function" && shadowSVG) {
            library2.mutator(shadowSVG);
          }
        }
        return;
      }
      switch (svg) {
        case RETRYABLE_ERROR:
        case CACHEABLE_ERROR:
          this.svg = null;
          this.emit("sl-error");
          break;
        default:
          this.svg = svg.cloneNode(true);
          (_a = library2 == null ? void 0 : library2.mutator) == null ? void 0 : _a.call(library2, this.svg);
          this.emit("sl-load");
      }
    }
    render() {
      return this.svg;
    }
  };
  SlIcon.styles = [component_styles_default, icon_styles_default];
  __decorateClass2([
    r11()
  ], SlIcon.prototype, "svg", 2);
  __decorateClass2([
    n8({ reflect: true })
  ], SlIcon.prototype, "name", 2);
  __decorateClass2([
    n8()
  ], SlIcon.prototype, "src", 2);
  __decorateClass2([
    n8()
  ], SlIcon.prototype, "label", 2);
  __decorateClass2([
    n8({ reflect: true })
  ], SlIcon.prototype, "library", 2);
  __decorateClass2([
    watch("label")
  ], SlIcon.prototype, "handleLabelChange", 1);
  __decorateClass2([
    watch(["name", "src", "library"])
  ], SlIcon.prototype, "setIcon", 1);

  // node_modules/.deno/lit-html@3.2.1/node_modules/lit-html/directive.js
  var t7 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e13 = (t8) => (...e17) => ({ _$litDirective$: t8, values: e17 });
  var i10 = class {
    constructor(t8) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t8, e17, i13) {
      this._$Ct = t8, this._$AM = e17, this._$Ci = i13;
    }
    _$AS(t8, e17) {
      return this.update(t8, e17);
    }
    update(t8, e17) {
      return this.render(...e17);
    }
  };

  // node_modules/.deno/lit-html@3.2.1/node_modules/lit-html/directives/class-map.js
  var e14 = e13(class extends i10 {
    constructor(t8) {
      if (super(t8), t8.type !== t7.ATTRIBUTE || "class" !== t8.name || t8.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t8) {
      return " " + Object.keys(t8).filter((s7) => t8[s7]).join(" ") + " ";
    }
    update(s7, [i13]) {
      if (void 0 === this.st) {
        this.st = /* @__PURE__ */ new Set(), void 0 !== s7.strings && (this.nt = new Set(s7.strings.join(" ").split(/\s/).filter((t8) => "" !== t8)));
        for (const t8 in i13) i13[t8] && !this.nt?.has(t8) && this.st.add(t8);
        return this.render(i13);
      }
      const r14 = s7.element.classList;
      for (const t8 of this.st) t8 in i13 || (r14.remove(t8), this.st.delete(t8));
      for (const t8 in i13) {
        const s8 = !!i13[t8];
        s8 === this.st.has(t8) || this.nt?.has(t8) || (s8 ? (r14.add(t8), this.st.add(t8)) : (r14.remove(t8), this.st.delete(t8)));
      }
      return T2;
    }
  });

  // node_modules/.deno/lit-html@3.2.1/node_modules/lit-html/static.js
  var a5 = Symbol.for("");
  var o11 = (t8) => {
    if (t8?.r === a5) return t8?._$litStatic$;
  };
  var i11 = (t8, ...r14) => ({ _$litStatic$: r14.reduce((r15, e17, a6) => r15 + ((t9) => {
    if (void 0 !== t9._$litStatic$) return t9._$litStatic$;
    throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t9}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
  })(e17) + t8[a6 + 1], t8[0]), r: a5 });
  var l5 = /* @__PURE__ */ new Map();
  var n9 = (t8) => (r14, ...e17) => {
    const a6 = e17.length;
    let s7, i13;
    const n12 = [], u7 = [];
    let c9, $4 = 0, f7 = false;
    for (; $4 < a6; ) {
      for (c9 = r14[$4]; $4 < a6 && void 0 !== (i13 = e17[$4], s7 = o11(i13)); ) c9 += s7 + r14[++$4], f7 = true;
      $4 !== a6 && u7.push(i13), n12.push(c9), $4++;
    }
    if ($4 === a6 && n12.push(r14[a6]), f7) {
      const t9 = n12.join("$$lit$$");
      void 0 === (r14 = l5.get(t9)) && (n12.raw = n12, l5.set(t9, r14 = n12)), e17 = u7;
    }
    return t8(r14, ...e17);
  };
  var u6 = n9(x2);
  var c7 = n9(b4);
  var $3 = n9(w2);

  // node_modules/.deno/lit-html@3.2.1/node_modules/lit-html/directives/if-defined.js
  var o12 = (o15) => o15 ?? E2;

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.SBCFYC2S.js
  var SlButton = class extends ShoelaceElement {
    constructor() {
      super(...arguments);
      this.formControlController = new FormControlController(this, {
        assumeInteractionOn: ["click"]
      });
      this.hasSlotController = new HasSlotController(this, "[default]", "prefix", "suffix");
      this.localize = new LocalizeController2(this);
      this.hasFocus = false;
      this.invalid = false;
      this.title = "";
      this.variant = "default";
      this.size = "medium";
      this.caret = false;
      this.disabled = false;
      this.loading = false;
      this.outline = false;
      this.pill = false;
      this.circle = false;
      this.type = "button";
      this.name = "";
      this.value = "";
      this.href = "";
      this.rel = "noreferrer noopener";
    }
    /** Gets the validity state object */
    get validity() {
      if (this.isButton()) {
        return this.button.validity;
      }
      return validValidityState;
    }
    /** Gets the validation message */
    get validationMessage() {
      if (this.isButton()) {
        return this.button.validationMessage;
      }
      return "";
    }
    firstUpdated() {
      if (this.isButton()) {
        this.formControlController.updateValidity();
      }
    }
    handleBlur() {
      this.hasFocus = false;
      this.emit("sl-blur");
    }
    handleFocus() {
      this.hasFocus = true;
      this.emit("sl-focus");
    }
    handleClick() {
      if (this.type === "submit") {
        this.formControlController.submit(this);
      }
      if (this.type === "reset") {
        this.formControlController.reset(this);
      }
    }
    handleInvalid(event) {
      this.formControlController.setValidity(false);
      this.formControlController.emitInvalidEvent(event);
    }
    isButton() {
      return this.href ? false : true;
    }
    isLink() {
      return this.href ? true : false;
    }
    handleDisabledChange() {
      if (this.isButton()) {
        this.formControlController.setValidity(this.disabled);
      }
    }
    /** Simulates a click on the button. */
    click() {
      this.button.click();
    }
    /** Sets focus on the button. */
    focus(options) {
      this.button.focus(options);
    }
    /** Removes focus from the button. */
    blur() {
      this.button.blur();
    }
    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity() {
      if (this.isButton()) {
        return this.button.checkValidity();
      }
      return true;
    }
    /** Gets the associated form, if one exists. */
    getForm() {
      return this.formControlController.getForm();
    }
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity() {
      if (this.isButton()) {
        return this.button.reportValidity();
      }
      return true;
    }
    /** Sets a custom validation message. Pass an empty string to restore validity. */
    setCustomValidity(message) {
      if (this.isButton()) {
        this.button.setCustomValidity(message);
        this.formControlController.updateValidity();
      }
    }
    render() {
      const isLink = this.isLink();
      const tag = isLink ? i11`a` : i11`button`;
      return u6`
      <${tag}
        part="base"
        class=${e14({
        button: true,
        "button--default": this.variant === "default",
        "button--primary": this.variant === "primary",
        "button--success": this.variant === "success",
        "button--neutral": this.variant === "neutral",
        "button--warning": this.variant === "warning",
        "button--danger": this.variant === "danger",
        "button--text": this.variant === "text",
        "button--small": this.size === "small",
        "button--medium": this.size === "medium",
        "button--large": this.size === "large",
        "button--caret": this.caret,
        "button--circle": this.circle,
        "button--disabled": this.disabled,
        "button--focused": this.hasFocus,
        "button--loading": this.loading,
        "button--standard": !this.outline,
        "button--outline": this.outline,
        "button--pill": this.pill,
        "button--rtl": this.localize.dir() === "rtl",
        "button--has-label": this.hasSlotController.test("[default]"),
        "button--has-prefix": this.hasSlotController.test("prefix"),
        "button--has-suffix": this.hasSlotController.test("suffix")
      })}
        ?disabled=${o12(isLink ? void 0 : this.disabled)}
        type=${o12(isLink ? void 0 : this.type)}
        title=${this.title}
        name=${o12(isLink ? void 0 : this.name)}
        value=${o12(isLink ? void 0 : this.value)}
        href=${o12(isLink && !this.disabled ? this.href : void 0)}
        target=${o12(isLink ? this.target : void 0)}
        download=${o12(isLink ? this.download : void 0)}
        rel=${o12(isLink ? this.rel : void 0)}
        role=${o12(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton() ? this.handleInvalid : null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret ? u6` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> ` : ""}
        ${this.loading ? u6`<sl-spinner part="spinner"></sl-spinner>` : ""}
      </${tag}>
    `;
    }
  };
  SlButton.styles = [component_styles_default, button_styles_default];
  SlButton.dependencies = {
    "sl-icon": SlIcon,
    "sl-spinner": SlSpinner
  };
  __decorateClass2([
    e11(".button")
  ], SlButton.prototype, "button", 2);
  __decorateClass2([
    r11()
  ], SlButton.prototype, "hasFocus", 2);
  __decorateClass2([
    r11()
  ], SlButton.prototype, "invalid", 2);
  __decorateClass2([
    n8()
  ], SlButton.prototype, "title", 2);
  __decorateClass2([
    n8({ reflect: true })
  ], SlButton.prototype, "variant", 2);
  __decorateClass2([
    n8({ reflect: true })
  ], SlButton.prototype, "size", 2);
  __decorateClass2([
    n8({ type: Boolean, reflect: true })
  ], SlButton.prototype, "caret", 2);
  __decorateClass2([
    n8({ type: Boolean, reflect: true })
  ], SlButton.prototype, "disabled", 2);
  __decorateClass2([
    n8({ type: Boolean, reflect: true })
  ], SlButton.prototype, "loading", 2);
  __decorateClass2([
    n8({ type: Boolean, reflect: true })
  ], SlButton.prototype, "outline", 2);
  __decorateClass2([
    n8({ type: Boolean, reflect: true })
  ], SlButton.prototype, "pill", 2);
  __decorateClass2([
    n8({ type: Boolean, reflect: true })
  ], SlButton.prototype, "circle", 2);
  __decorateClass2([
    n8()
  ], SlButton.prototype, "type", 2);
  __decorateClass2([
    n8()
  ], SlButton.prototype, "name", 2);
  __decorateClass2([
    n8()
  ], SlButton.prototype, "value", 2);
  __decorateClass2([
    n8()
  ], SlButton.prototype, "href", 2);
  __decorateClass2([
    n8()
  ], SlButton.prototype, "target", 2);
  __decorateClass2([
    n8()
  ], SlButton.prototype, "rel", 2);
  __decorateClass2([
    n8()
  ], SlButton.prototype, "download", 2);
  __decorateClass2([
    n8()
  ], SlButton.prototype, "form", 2);
  __decorateClass2([
    n8({ attribute: "formaction" })
  ], SlButton.prototype, "formAction", 2);
  __decorateClass2([
    n8({ attribute: "formenctype" })
  ], SlButton.prototype, "formEnctype", 2);
  __decorateClass2([
    n8({ attribute: "formmethod" })
  ], SlButton.prototype, "formMethod", 2);
  __decorateClass2([
    n8({ attribute: "formnovalidate", type: Boolean })
  ], SlButton.prototype, "formNoValidate", 2);
  __decorateClass2([
    n8({ attribute: "formtarget" })
  ], SlButton.prototype, "formTarget", 2);
  __decorateClass2([
    watch("disabled", { waitUntilFirstUpdate: true })
  ], SlButton.prototype, "handleDisabledChange", 1);

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.JCXLDPQF.js
  SlButton.define("sl-button");

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GGT72J62.js
  var input_styles_default = i6`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`;

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GI7VDIWX.js
  var defaultValue = (propertyName = "value") => (proto, key) => {
    const ctor = proto.constructor;
    const attributeChangedCallback = ctor.prototype.attributeChangedCallback;
    ctor.prototype.attributeChangedCallback = function(name, old, value) {
      var _a;
      const options = ctor.getPropertyOptions(propertyName);
      const attributeName = typeof options.attribute === "string" ? options.attribute : propertyName;
      if (name === attributeName) {
        const converter = options.converter || u3;
        const fromAttribute = typeof converter === "function" ? converter : (_a = converter == null ? void 0 : converter.fromAttribute) != null ? _a : u3.fromAttribute;
        const newValue = fromAttribute(value, options.type);
        if (this[propertyName] !== newValue) {
          this[key] = newValue;
        }
      }
      attributeChangedCallback.call(this, name, old, value);
    };
  };

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.SI4ACBFK.js
  var form_control_styles_default = i6`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`;

  // node_modules/.deno/lit-html@3.2.1/node_modules/lit-html/directives/live.js
  var l6 = e13(class extends i10 {
    constructor(r14) {
      if (super(r14), r14.type !== t7.PROPERTY && r14.type !== t7.ATTRIBUTE && r14.type !== t7.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
      if (!f5(r14)) throw Error("`live` bindings can only contain a single expression");
    }
    render(r14) {
      return r14;
    }
    update(i13, [t8]) {
      if (t8 === T2 || t8 === E2) return t8;
      const o15 = i13.element, l7 = i13.name;
      if (i13.type === t7.PROPERTY) {
        if (t8 === o15[l7]) return T2;
      } else if (i13.type === t7.BOOLEAN_ATTRIBUTE) {
        if (!!t8 === o15.hasAttribute(l7)) return T2;
      } else if (i13.type === t7.ATTRIBUTE && o15.getAttribute(l7) === t8 + "") return T2;
      return m3(i13), t8;
    }
  });

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VM65NPGC.js
  var SlInput = class extends ShoelaceElement {
    constructor() {
      super(...arguments);
      this.formControlController = new FormControlController(this, {
        assumeInteractionOn: ["sl-blur", "sl-input"]
      });
      this.hasSlotController = new HasSlotController(this, "help-text", "label");
      this.localize = new LocalizeController2(this);
      this.hasFocus = false;
      this.title = "";
      this.__numberInput = Object.assign(document.createElement("input"), { type: "number" });
      this.__dateInput = Object.assign(document.createElement("input"), { type: "date" });
      this.type = "text";
      this.name = "";
      this.value = "";
      this.defaultValue = "";
      this.size = "medium";
      this.filled = false;
      this.pill = false;
      this.label = "";
      this.helpText = "";
      this.clearable = false;
      this.disabled = false;
      this.placeholder = "";
      this.readonly = false;
      this.passwordToggle = false;
      this.passwordVisible = false;
      this.noSpinButtons = false;
      this.form = "";
      this.required = false;
      this.spellcheck = true;
    }
    //
    // NOTE: We use an in-memory input for these getters/setters instead of the one in the template because the properties
    // can be set before the component is rendered.
    //
    /**
     * Gets or sets the current value as a `Date` object. Returns `null` if the value can't be converted. This will use the native `<input type="{{type}}">` implementation and may result in an error.
     */
    get valueAsDate() {
      var _a;
      this.__dateInput.type = this.type;
      this.__dateInput.value = this.value;
      return ((_a = this.input) == null ? void 0 : _a.valueAsDate) || this.__dateInput.valueAsDate;
    }
    set valueAsDate(newValue) {
      this.__dateInput.type = this.type;
      this.__dateInput.valueAsDate = newValue;
      this.value = this.__dateInput.value;
    }
    /** Gets or sets the current value as a number. Returns `NaN` if the value can't be converted. */
    get valueAsNumber() {
      var _a;
      this.__numberInput.value = this.value;
      return ((_a = this.input) == null ? void 0 : _a.valueAsNumber) || this.__numberInput.valueAsNumber;
    }
    set valueAsNumber(newValue) {
      this.__numberInput.valueAsNumber = newValue;
      this.value = this.__numberInput.value;
    }
    /** Gets the validity state object */
    get validity() {
      return this.input.validity;
    }
    /** Gets the validation message */
    get validationMessage() {
      return this.input.validationMessage;
    }
    firstUpdated() {
      this.formControlController.updateValidity();
    }
    handleBlur() {
      this.hasFocus = false;
      this.emit("sl-blur");
    }
    handleChange() {
      this.value = this.input.value;
      this.emit("sl-change");
    }
    handleClearClick(event) {
      event.preventDefault();
      if (this.value !== "") {
        this.value = "";
        this.emit("sl-clear");
        this.emit("sl-input");
        this.emit("sl-change");
      }
      this.input.focus();
    }
    handleFocus() {
      this.hasFocus = true;
      this.emit("sl-focus");
    }
    handleInput() {
      this.value = this.input.value;
      this.formControlController.updateValidity();
      this.emit("sl-input");
    }
    handleInvalid(event) {
      this.formControlController.setValidity(false);
      this.formControlController.emitInvalidEvent(event);
    }
    handleKeyDown(event) {
      const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
      if (event.key === "Enter" && !hasModifier) {
        setTimeout(() => {
          if (!event.defaultPrevented && !event.isComposing) {
            this.formControlController.submit();
          }
        });
      }
    }
    handlePasswordToggle() {
      this.passwordVisible = !this.passwordVisible;
    }
    handleDisabledChange() {
      this.formControlController.setValidity(this.disabled);
    }
    handleStepChange() {
      this.input.step = String(this.step);
      this.formControlController.updateValidity();
    }
    async handleValueChange() {
      await this.updateComplete;
      this.formControlController.updateValidity();
    }
    /** Sets focus on the input. */
    focus(options) {
      this.input.focus(options);
    }
    /** Removes focus from the input. */
    blur() {
      this.input.blur();
    }
    /** Selects all the text in the input. */
    select() {
      this.input.select();
    }
    /** Sets the start and end positions of the text selection (0-based). */
    setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
      this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
    }
    /** Replaces a range of text with a new string. */
    setRangeText(replacement, start, end, selectMode = "preserve") {
      const selectionStart = start != null ? start : this.input.selectionStart;
      const selectionEnd = end != null ? end : this.input.selectionEnd;
      this.input.setRangeText(replacement, selectionStart, selectionEnd, selectMode);
      if (this.value !== this.input.value) {
        this.value = this.input.value;
      }
    }
    /** Displays the browser picker for an input element (only works if the browser supports it for the input type). */
    showPicker() {
      if ("showPicker" in HTMLInputElement.prototype) {
        this.input.showPicker();
      }
    }
    /** Increments the value of a numeric input type by the value of the step attribute. */
    stepUp() {
      this.input.stepUp();
      if (this.value !== this.input.value) {
        this.value = this.input.value;
      }
    }
    /** Decrements the value of a numeric input type by the value of the step attribute. */
    stepDown() {
      this.input.stepDown();
      if (this.value !== this.input.value) {
        this.value = this.input.value;
      }
    }
    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity() {
      return this.input.checkValidity();
    }
    /** Gets the associated form, if one exists. */
    getForm() {
      return this.formControlController.getForm();
    }
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity() {
      return this.input.reportValidity();
    }
    /** Sets a custom validation message. Pass an empty string to restore validity. */
    setCustomValidity(message) {
      this.input.setCustomValidity(message);
      this.formControlController.updateValidity();
    }
    render() {
      const hasLabelSlot = this.hasSlotController.test("label");
      const hasHelpTextSlot = this.hasSlotController.test("help-text");
      const hasLabel = this.label ? true : !!hasLabelSlot;
      const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
      const hasClearIcon = this.clearable && !this.disabled && !this.readonly;
      const isClearIconVisible = hasClearIcon && (typeof this.value === "number" || this.value.length > 0);
      return x2`
      <div
        part="form-control"
        class=${e14({
        "form-control": true,
        "form-control--small": this.size === "small",
        "form-control--medium": this.size === "medium",
        "form-control--large": this.size === "large",
        "form-control--has-label": hasLabel,
        "form-control--has-help-text": hasHelpText
      })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? "false" : "true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${e14({
        input: true,
        // Sizes
        "input--small": this.size === "small",
        "input--medium": this.size === "medium",
        "input--large": this.size === "large",
        // States
        "input--pill": this.pill,
        "input--standard": !this.filled,
        "input--filled": this.filled,
        "input--disabled": this.disabled,
        "input--focused": this.hasFocus,
        "input--empty": !this.value,
        "input--no-spin-buttons": this.noSpinButtons
      })}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type === "password" && this.passwordVisible ? "text" : this.type}
              title=${this.title}
              name=${o12(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${o12(this.placeholder)}
              minlength=${o12(this.minlength)}
              maxlength=${o12(this.maxlength)}
              min=${o12(this.min)}
              max=${o12(this.max)}
              step=${o12(this.step)}
              .value=${l6(this.value)}
              autocapitalize=${o12(this.autocapitalize)}
              autocomplete=${o12(this.autocomplete)}
              autocorrect=${o12(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${o12(this.pattern)}
              enterkeyhint=${o12(this.enterkeyhint)}
              inputmode=${o12(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${isClearIconVisible ? x2`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                ` : ""}
            ${this.passwordToggle && !this.disabled ? x2`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible ? "hidePassword" : "showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible ? x2`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        ` : x2`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                ` : ""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
    }
  };
  SlInput.styles = [component_styles_default, form_control_styles_default, input_styles_default];
  SlInput.dependencies = { "sl-icon": SlIcon };
  __decorateClass2([
    e11(".input__control")
  ], SlInput.prototype, "input", 2);
  __decorateClass2([
    r11()
  ], SlInput.prototype, "hasFocus", 2);
  __decorateClass2([
    n8()
  ], SlInput.prototype, "title", 2);
  __decorateClass2([
    n8({ reflect: true })
  ], SlInput.prototype, "type", 2);
  __decorateClass2([
    n8()
  ], SlInput.prototype, "name", 2);
  __decorateClass2([
    n8()
  ], SlInput.prototype, "value", 2);
  __decorateClass2([
    defaultValue()
  ], SlInput.prototype, "defaultValue", 2);
  __decorateClass2([
    n8({ reflect: true })
  ], SlInput.prototype, "size", 2);
  __decorateClass2([
    n8({ type: Boolean, reflect: true })
  ], SlInput.prototype, "filled", 2);
  __decorateClass2([
    n8({ type: Boolean, reflect: true })
  ], SlInput.prototype, "pill", 2);
  __decorateClass2([
    n8()
  ], SlInput.prototype, "label", 2);
  __decorateClass2([
    n8({ attribute: "help-text" })
  ], SlInput.prototype, "helpText", 2);
  __decorateClass2([
    n8({ type: Boolean })
  ], SlInput.prototype, "clearable", 2);
  __decorateClass2([
    n8({ type: Boolean, reflect: true })
  ], SlInput.prototype, "disabled", 2);
  __decorateClass2([
    n8()
  ], SlInput.prototype, "placeholder", 2);
  __decorateClass2([
    n8({ type: Boolean, reflect: true })
  ], SlInput.prototype, "readonly", 2);
  __decorateClass2([
    n8({ attribute: "password-toggle", type: Boolean })
  ], SlInput.prototype, "passwordToggle", 2);
  __decorateClass2([
    n8({ attribute: "password-visible", type: Boolean })
  ], SlInput.prototype, "passwordVisible", 2);
  __decorateClass2([
    n8({ attribute: "no-spin-buttons", type: Boolean })
  ], SlInput.prototype, "noSpinButtons", 2);
  __decorateClass2([
    n8({ reflect: true })
  ], SlInput.prototype, "form", 2);
  __decorateClass2([
    n8({ type: Boolean, reflect: true })
  ], SlInput.prototype, "required", 2);
  __decorateClass2([
    n8()
  ], SlInput.prototype, "pattern", 2);
  __decorateClass2([
    n8({ type: Number })
  ], SlInput.prototype, "minlength", 2);
  __decorateClass2([
    n8({ type: Number })
  ], SlInput.prototype, "maxlength", 2);
  __decorateClass2([
    n8()
  ], SlInput.prototype, "min", 2);
  __decorateClass2([
    n8()
  ], SlInput.prototype, "max", 2);
  __decorateClass2([
    n8()
  ], SlInput.prototype, "step", 2);
  __decorateClass2([
    n8()
  ], SlInput.prototype, "autocapitalize", 2);
  __decorateClass2([
    n8()
  ], SlInput.prototype, "autocorrect", 2);
  __decorateClass2([
    n8()
  ], SlInput.prototype, "autocomplete", 2);
  __decorateClass2([
    n8({ type: Boolean })
  ], SlInput.prototype, "autofocus", 2);
  __decorateClass2([
    n8()
  ], SlInput.prototype, "enterkeyhint", 2);
  __decorateClass2([
    n8({
      type: Boolean,
      converter: {
        // Allow "true|false" attribute values but keep the property boolean
        fromAttribute: (value) => !value || value === "false" ? false : true,
        toAttribute: (value) => value ? "true" : "false"
      }
    })
  ], SlInput.prototype, "spellcheck", 2);
  __decorateClass2([
    n8()
  ], SlInput.prototype, "inputmode", 2);
  __decorateClass2([
    watch("disabled", { waitUntilFirstUpdate: true })
  ], SlInput.prototype, "handleDisabledChange", 1);
  __decorateClass2([
    watch("step", { waitUntilFirstUpdate: true })
  ], SlInput.prototype, "handleStepChange", 1);
  __decorateClass2([
    watch("value", { waitUntilFirstUpdate: true })
  ], SlInput.prototype, "handleValueChange", 1);

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.XA43ZQPC.js
  SlInput.define("sl-input");

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BRQKZQRB.js
  var drawer_styles_default = i6`
  :host {
    --size: 25rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .drawer {
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .drawer--contained {
    position: absolute;
    z-index: initial;
  }

  .drawer--fixed {
    position: fixed;
    z-index: var(--sl-z-index-drawer);
  }

  .drawer__panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    max-width: 100%;
    max-height: 100%;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-large);
    overflow: auto;
    pointer-events: all;
  }

  .drawer__panel:focus {
    outline: none;
  }

  .drawer--top .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--end .drawer__panel {
    top: 0;
    inset-inline-end: 0;
    bottom: auto;
    inset-inline-start: auto;
    width: var(--size);
    height: 100%;
  }

  .drawer--bottom .drawer__panel {
    top: auto;
    inset-inline-end: auto;
    bottom: 0;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--start .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: var(--size);
    height: 100%;
  }

  .drawer__header {
    display: flex;
  }

  .drawer__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .drawer__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .drawer__header-actions sl-icon-button,
  .drawer__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .drawer__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .drawer__footer {
    text-align: right;
    padding: var(--footer-spacing);
  }

  .drawer__footer ::slotted(sl-button:not(:last-of-type)) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .drawer:not(.drawer--has-footer) .drawer__footer {
    display: none;
  }

  .drawer__overlay {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
    pointer-events: all;
  }

  .drawer--contained .drawer__overlay {
    display: none;
  }

  @media (forced-colors: active) {
    .drawer__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`;

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VESXC477.js
  function* activeElements(activeElement = document.activeElement) {
    if (activeElement === null || activeElement === void 0) return;
    yield activeElement;
    if ("shadowRoot" in activeElement && activeElement.shadowRoot && activeElement.shadowRoot.mode !== "closed") {
      yield* __yieldStar(activeElements(activeElement.shadowRoot.activeElement));
    }
  }
  function getDeepestActiveElement() {
    return [...activeElements()].pop();
  }
  var computedStyleMap = /* @__PURE__ */ new WeakMap();
  function getCachedComputedStyle(el) {
    let computedStyle = computedStyleMap.get(el);
    if (!computedStyle) {
      computedStyle = window.getComputedStyle(el, null);
      computedStyleMap.set(el, computedStyle);
    }
    return computedStyle;
  }
  function isVisible(el) {
    if (typeof el.checkVisibility === "function") {
      return el.checkVisibility({ checkOpacity: false, checkVisibilityCSS: true });
    }
    const computedStyle = getCachedComputedStyle(el);
    return computedStyle.visibility !== "hidden" && computedStyle.display !== "none";
  }
  function isOverflowingAndTabbable(el) {
    const computedStyle = getCachedComputedStyle(el);
    const { overflowY, overflowX } = computedStyle;
    if (overflowY === "scroll" || overflowX === "scroll") {
      return true;
    }
    if (overflowY !== "auto" || overflowX !== "auto") {
      return false;
    }
    const isOverflowingY = el.scrollHeight > el.clientHeight;
    if (isOverflowingY && overflowY === "auto") {
      return true;
    }
    const isOverflowingX = el.scrollWidth > el.clientWidth;
    if (isOverflowingX && overflowX === "auto") {
      return true;
    }
    return false;
  }
  function isTabbable(el) {
    const tag = el.tagName.toLowerCase();
    const tabindex = Number(el.getAttribute("tabindex"));
    const hasTabindex = el.hasAttribute("tabindex");
    if (hasTabindex && (isNaN(tabindex) || tabindex <= -1)) {
      return false;
    }
    if (el.hasAttribute("disabled")) {
      return false;
    }
    if (el.closest("[inert]")) {
      return false;
    }
    if (tag === "input" && el.getAttribute("type") === "radio") {
      const rootNode = el.getRootNode();
      const findRadios = `input[type='radio'][name="${el.getAttribute("name")}"]`;
      const firstChecked = rootNode.querySelector(`${findRadios}:checked`);
      if (firstChecked) {
        return firstChecked === el;
      }
      const firstRadio = rootNode.querySelector(findRadios);
      return firstRadio === el;
    }
    if (!isVisible(el)) {
      return false;
    }
    if ((tag === "audio" || tag === "video") && el.hasAttribute("controls")) {
      return true;
    }
    if (el.hasAttribute("tabindex")) {
      return true;
    }
    if (el.hasAttribute("contenteditable") && el.getAttribute("contenteditable") !== "false") {
      return true;
    }
    const isNativelyTabbable = [
      "button",
      "input",
      "select",
      "textarea",
      "a",
      "audio",
      "video",
      "summary",
      "iframe"
    ].includes(tag);
    if (isNativelyTabbable) {
      return true;
    }
    return isOverflowingAndTabbable(el);
  }
  function getSlottedChildrenOutsideRootElement(slotElement, root2) {
    var _a;
    return ((_a = slotElement.getRootNode({ composed: true })) == null ? void 0 : _a.host) !== root2;
  }
  function getTabbableElements(root2) {
    const walkedEls = /* @__PURE__ */ new WeakMap();
    const tabbableElements = [];
    function walk(el) {
      if (el instanceof Element) {
        if (el.hasAttribute("inert") || el.closest("[inert]")) {
          return;
        }
        if (walkedEls.has(el)) {
          return;
        }
        walkedEls.set(el, true);
        if (!tabbableElements.includes(el) && isTabbable(el)) {
          tabbableElements.push(el);
        }
        if (el instanceof HTMLSlotElement && getSlottedChildrenOutsideRootElement(el, root2)) {
          el.assignedElements({ flatten: true }).forEach((assignedEl) => {
            walk(assignedEl);
          });
        }
        if (el.shadowRoot !== null && el.shadowRoot.mode === "open") {
          walk(el.shadowRoot);
        }
      }
      for (const e17 of el.children) {
        walk(e17);
      }
    }
    walk(root2);
    return tabbableElements.sort((a6, b5) => {
      const aTabindex = Number(a6.getAttribute("tabindex")) || 0;
      const bTabindex = Number(b5.getAttribute("tabindex")) || 0;
      return bTabindex - aTabindex;
    });
  }

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.EMN3H5QW.js
  var activeModals = [];
  var Modal = class {
    constructor(element) {
      this.tabDirection = "forward";
      this.handleFocusIn = () => {
        if (!this.isActive()) return;
        this.checkFocus();
      };
      this.handleKeyDown = (event) => {
        var _a;
        if (event.key !== "Tab" || this.isExternalActivated) return;
        if (!this.isActive()) return;
        const currentActiveElement = getDeepestActiveElement();
        this.previousFocus = currentActiveElement;
        if (this.previousFocus && this.possiblyHasTabbableChildren(this.previousFocus)) {
          return;
        }
        if (event.shiftKey) {
          this.tabDirection = "backward";
        } else {
          this.tabDirection = "forward";
        }
        const tabbableElements = getTabbableElements(this.element);
        let currentFocusIndex = tabbableElements.findIndex((el) => el === currentActiveElement);
        this.previousFocus = this.currentFocus;
        const addition = this.tabDirection === "forward" ? 1 : -1;
        while (true) {
          if (currentFocusIndex + addition >= tabbableElements.length) {
            currentFocusIndex = 0;
          } else if (currentFocusIndex + addition < 0) {
            currentFocusIndex = tabbableElements.length - 1;
          } else {
            currentFocusIndex += addition;
          }
          this.previousFocus = this.currentFocus;
          const nextFocus = (
            /** @type {HTMLElement} */
            tabbableElements[currentFocusIndex]
          );
          if (this.tabDirection === "backward") {
            if (this.previousFocus && this.possiblyHasTabbableChildren(this.previousFocus)) {
              return;
            }
          }
          if (nextFocus && this.possiblyHasTabbableChildren(nextFocus)) {
            return;
          }
          event.preventDefault();
          this.currentFocus = nextFocus;
          (_a = this.currentFocus) == null ? void 0 : _a.focus({ preventScroll: false });
          const allActiveElements = [...activeElements()];
          if (allActiveElements.includes(this.currentFocus) || !allActiveElements.includes(this.previousFocus)) {
            break;
          }
        }
        setTimeout(() => this.checkFocus());
      };
      this.handleKeyUp = () => {
        this.tabDirection = "forward";
      };
      this.element = element;
      this.elementsWithTabbableControls = ["iframe"];
    }
    /** Activates focus trapping. */
    activate() {
      activeModals.push(this.element);
      document.addEventListener("focusin", this.handleFocusIn);
      document.addEventListener("keydown", this.handleKeyDown);
      document.addEventListener("keyup", this.handleKeyUp);
    }
    /** Deactivates focus trapping. */
    deactivate() {
      activeModals = activeModals.filter((modal) => modal !== this.element);
      this.currentFocus = null;
      document.removeEventListener("focusin", this.handleFocusIn);
      document.removeEventListener("keydown", this.handleKeyDown);
      document.removeEventListener("keyup", this.handleKeyUp);
    }
    /** Determines if this modal element is currently active or not. */
    isActive() {
      return activeModals[activeModals.length - 1] === this.element;
    }
    /** Activates external modal behavior and temporarily disables focus trapping. */
    activateExternal() {
      this.isExternalActivated = true;
    }
    /** Deactivates external modal behavior and re-enables focus trapping. */
    deactivateExternal() {
      this.isExternalActivated = false;
    }
    checkFocus() {
      if (this.isActive() && !this.isExternalActivated) {
        const tabbableElements = getTabbableElements(this.element);
        if (!this.element.matches(":focus-within")) {
          const start = tabbableElements[0];
          const end = tabbableElements[tabbableElements.length - 1];
          const target = this.tabDirection === "forward" ? start : end;
          if (typeof (target == null ? void 0 : target.focus) === "function") {
            this.currentFocus = target;
            target.focus({ preventScroll: false });
          }
        }
      }
    }
    possiblyHasTabbableChildren(element) {
      return this.elementsWithTabbableControls.includes(element.tagName.toLowerCase()) || element.hasAttribute("controls");
    }
  };

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.RWUUFNUL.js
  var locks = /* @__PURE__ */ new Set();
  function getScrollbarWidth() {
    const documentWidth = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - documentWidth);
  }
  function getExistingBodyPadding() {
    const padding = Number(getComputedStyle(document.body).paddingRight.replace(/px/, ""));
    if (isNaN(padding) || !padding) {
      return 0;
    }
    return padding;
  }
  function lockBodyScrolling(lockingEl) {
    locks.add(lockingEl);
    if (!document.documentElement.classList.contains("sl-scroll-lock")) {
      const scrollbarWidth = getScrollbarWidth() + getExistingBodyPadding();
      let scrollbarGutterProperty = getComputedStyle(document.documentElement).scrollbarGutter;
      if (!scrollbarGutterProperty || scrollbarGutterProperty === "auto") {
        scrollbarGutterProperty = "stable";
      }
      if (scrollbarWidth < 2) {
        scrollbarGutterProperty = "";
      }
      document.documentElement.style.setProperty("--sl-scroll-lock-gutter", scrollbarGutterProperty);
      document.documentElement.classList.add("sl-scroll-lock");
      document.documentElement.style.setProperty("--sl-scroll-lock-size", `${scrollbarWidth}px`);
    }
  }
  function unlockBodyScrolling(lockingEl) {
    locks.delete(lockingEl);
    if (locks.size === 0) {
      document.documentElement.classList.remove("sl-scroll-lock");
      document.documentElement.style.removeProperty("--sl-scroll-lock-size");
    }
  }

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LD4M4QGE.js
  var blurActiveElement = (elm) => {
    var _a;
    const { activeElement } = document;
    if (activeElement && elm.contains(activeElement)) {
      (_a = document.activeElement) == null ? void 0 : _a.blur();
    }
  };

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6I2T3DLI.js
  var icon_button_styles_default = i6`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7E4JTYWU.js
  var SlIconButton = class extends ShoelaceElement {
    constructor() {
      super(...arguments);
      this.hasFocus = false;
      this.label = "";
      this.disabled = false;
    }
    handleBlur() {
      this.hasFocus = false;
      this.emit("sl-blur");
    }
    handleFocus() {
      this.hasFocus = true;
      this.emit("sl-focus");
    }
    handleClick(event) {
      if (this.disabled) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
    /** Simulates a click on the icon button. */
    click() {
      this.button.click();
    }
    /** Sets focus on the icon button. */
    focus(options) {
      this.button.focus(options);
    }
    /** Removes focus from the icon button. */
    blur() {
      this.button.blur();
    }
    render() {
      const isLink = this.href ? true : false;
      const tag = isLink ? i11`a` : i11`button`;
      return u6`
      <${tag}
        part="base"
        class=${e14({
        "icon-button": true,
        "icon-button--disabled": !isLink && this.disabled,
        "icon-button--focused": this.hasFocus
      })}
        ?disabled=${o12(isLink ? void 0 : this.disabled)}
        type=${o12(isLink ? void 0 : "button")}
        href=${o12(isLink ? this.href : void 0)}
        target=${o12(isLink ? this.target : void 0)}
        download=${o12(isLink ? this.download : void 0)}
        rel=${o12(isLink && this.target ? "noreferrer noopener" : void 0)}
        role=${o12(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-label="${this.label}"
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${o12(this.name)}
          library=${o12(this.library)}
          src=${o12(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${tag}>
    `;
    }
  };
  SlIconButton.styles = [component_styles_default, icon_button_styles_default];
  SlIconButton.dependencies = { "sl-icon": SlIcon };
  __decorateClass2([
    e11(".icon-button")
  ], SlIconButton.prototype, "button", 2);
  __decorateClass2([
    r11()
  ], SlIconButton.prototype, "hasFocus", 2);
  __decorateClass2([
    n8()
  ], SlIconButton.prototype, "name", 2);
  __decorateClass2([
    n8()
  ], SlIconButton.prototype, "library", 2);
  __decorateClass2([
    n8()
  ], SlIconButton.prototype, "src", 2);
  __decorateClass2([
    n8()
  ], SlIconButton.prototype, "href", 2);
  __decorateClass2([
    n8()
  ], SlIconButton.prototype, "target", 2);
  __decorateClass2([
    n8()
  ], SlIconButton.prototype, "download", 2);
  __decorateClass2([
    n8()
  ], SlIconButton.prototype, "label", 2);
  __decorateClass2([
    n8({ type: Boolean, reflect: true })
  ], SlIconButton.prototype, "disabled", 2);

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.K7JGTRV7.js
  var defaultAnimationRegistry = /* @__PURE__ */ new Map();
  var customAnimationRegistry = /* @__PURE__ */ new WeakMap();
  function ensureAnimation(animation) {
    return animation != null ? animation : { keyframes: [], options: { duration: 0 } };
  }
  function getLogicalAnimation(animation, dir) {
    if (dir.toLowerCase() === "rtl") {
      return {
        keyframes: animation.rtlKeyframes || animation.keyframes,
        options: animation.options
      };
    }
    return animation;
  }
  function setDefaultAnimation(animationName, animation) {
    defaultAnimationRegistry.set(animationName, ensureAnimation(animation));
  }
  function getAnimation(el, animationName, options) {
    const customAnimation = customAnimationRegistry.get(el);
    if (customAnimation == null ? void 0 : customAnimation[animationName]) {
      return getLogicalAnimation(customAnimation[animationName], options.dir);
    }
    const defaultAnimation = defaultAnimationRegistry.get(animationName);
    if (defaultAnimation) {
      return getLogicalAnimation(defaultAnimation, options.dir);
    }
    return {
      keyframes: [],
      options: { duration: 0 }
    };
  }

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.B4BZKR24.js
  function waitForEvent(el, eventName) {
    return new Promise((resolve) => {
      function done(event) {
        if (event.target === el) {
          el.removeEventListener(eventName, done);
          resolve();
        }
      }
      el.addEventListener(eventName, done);
    });
  }

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.AJ3ENQ5C.js
  function animateTo(el, keyframes, options) {
    return new Promise((resolve) => {
      if ((options == null ? void 0 : options.duration) === Infinity) {
        throw new Error("Promise-based animations must be finite.");
      }
      const animation = el.animate(keyframes, __spreadProps(__spreadValues({}, options), {
        duration: prefersReducedMotion() ? 0 : options.duration
      }));
      animation.addEventListener("cancel", resolve, { once: true });
      animation.addEventListener("finish", resolve, { once: true });
    });
  }
  function prefersReducedMotion() {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    return query.matches;
  }
  function stopAnimations(el) {
    return Promise.all(
      el.getAnimations().map((animation) => {
        return new Promise((resolve) => {
          animation.cancel();
          requestAnimationFrame(resolve);
        });
      })
    );
  }

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.C5MXLBOG.js
  function uppercaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  var SlDrawer = class extends ShoelaceElement {
    constructor() {
      super(...arguments);
      this.hasSlotController = new HasSlotController(this, "footer");
      this.localize = new LocalizeController2(this);
      this.modal = new Modal(this);
      this.open = false;
      this.label = "";
      this.placement = "end";
      this.contained = false;
      this.noHeader = false;
      this.handleDocumentKeyDown = (event) => {
        if (this.contained) {
          return;
        }
        if (event.key === "Escape" && this.modal.isActive() && this.open) {
          event.stopImmediatePropagation();
          this.requestClose("keyboard");
        }
      };
    }
    firstUpdated() {
      this.drawer.hidden = !this.open;
      if (this.open) {
        this.addOpenListeners();
        if (!this.contained) {
          this.modal.activate();
          lockBodyScrolling(this);
        }
      }
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      unlockBodyScrolling(this);
      this.removeOpenListeners();
    }
    requestClose(source) {
      const slRequestClose = this.emit("sl-request-close", {
        cancelable: true,
        detail: { source }
      });
      if (slRequestClose.defaultPrevented) {
        const animation = getAnimation(this, "drawer.denyClose", { dir: this.localize.dir() });
        animateTo(this.panel, animation.keyframes, animation.options);
        return;
      }
      this.hide();
    }
    addOpenListeners() {
      var _a;
      if ("CloseWatcher" in window) {
        (_a = this.closeWatcher) == null ? void 0 : _a.destroy();
        if (!this.contained) {
          this.closeWatcher = new CloseWatcher();
          this.closeWatcher.onclose = () => this.requestClose("keyboard");
        }
      } else {
        document.addEventListener("keydown", this.handleDocumentKeyDown);
      }
    }
    removeOpenListeners() {
      var _a;
      document.removeEventListener("keydown", this.handleDocumentKeyDown);
      (_a = this.closeWatcher) == null ? void 0 : _a.destroy();
    }
    async handleOpenChange() {
      if (this.open) {
        this.emit("sl-show");
        this.addOpenListeners();
        this.originalTrigger = document.activeElement;
        if (!this.contained) {
          this.modal.activate();
          lockBodyScrolling(this);
        }
        const autoFocusTarget = this.querySelector("[autofocus]");
        if (autoFocusTarget) {
          autoFocusTarget.removeAttribute("autofocus");
        }
        await Promise.all([stopAnimations(this.drawer), stopAnimations(this.overlay)]);
        this.drawer.hidden = false;
        requestAnimationFrame(() => {
          const slInitialFocus = this.emit("sl-initial-focus", { cancelable: true });
          if (!slInitialFocus.defaultPrevented) {
            if (autoFocusTarget) {
              autoFocusTarget.focus({ preventScroll: true });
            } else {
              this.panel.focus({ preventScroll: true });
            }
          }
          if (autoFocusTarget) {
            autoFocusTarget.setAttribute("autofocus", "");
          }
        });
        const panelAnimation = getAnimation(this, `drawer.show${uppercaseFirstLetter(this.placement)}`, {
          dir: this.localize.dir()
        });
        const overlayAnimation = getAnimation(this, "drawer.overlay.show", { dir: this.localize.dir() });
        await Promise.all([
          animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
          animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
        ]);
        this.emit("sl-after-show");
      } else {
        blurActiveElement(this);
        this.emit("sl-hide");
        this.removeOpenListeners();
        if (!this.contained) {
          this.modal.deactivate();
          unlockBodyScrolling(this);
        }
        await Promise.all([stopAnimations(this.drawer), stopAnimations(this.overlay)]);
        const panelAnimation = getAnimation(this, `drawer.hide${uppercaseFirstLetter(this.placement)}`, {
          dir: this.localize.dir()
        });
        const overlayAnimation = getAnimation(this, "drawer.overlay.hide", { dir: this.localize.dir() });
        await Promise.all([
          animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options).then(() => {
            this.overlay.hidden = true;
          }),
          animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options).then(() => {
            this.panel.hidden = true;
          })
        ]);
        this.drawer.hidden = true;
        this.overlay.hidden = false;
        this.panel.hidden = false;
        const trigger = this.originalTrigger;
        if (typeof (trigger == null ? void 0 : trigger.focus) === "function") {
          setTimeout(() => trigger.focus());
        }
        this.emit("sl-after-hide");
      }
    }
    handleNoModalChange() {
      if (this.open && !this.contained) {
        this.modal.activate();
        lockBodyScrolling(this);
      }
      if (this.open && this.contained) {
        this.modal.deactivate();
        unlockBodyScrolling(this);
      }
    }
    /** Shows the drawer. */
    async show() {
      if (this.open) {
        return void 0;
      }
      this.open = true;
      return waitForEvent(this, "sl-after-show");
    }
    /** Hides the drawer */
    async hide() {
      if (!this.open) {
        return void 0;
      }
      this.open = false;
      return waitForEvent(this, "sl-after-hide");
    }
    render() {
      return x2`
      <div
        part="base"
        class=${e14({
        drawer: true,
        "drawer--open": this.open,
        "drawer--top": this.placement === "top",
        "drawer--end": this.placement === "end",
        "drawer--bottom": this.placement === "bottom",
        "drawer--start": this.placement === "start",
        "drawer--contained": this.contained,
        "drawer--fixed": !this.contained,
        "drawer--rtl": this.localize.dir() === "rtl",
        "drawer--has-footer": this.hasSlotController.test("footer")
      })}
      >
        <div part="overlay" class="drawer__overlay" @click=${() => this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? "false" : "true"}
          aria-label=${o12(this.noHeader ? this.label : void 0)}
          aria-labelledby=${o12(!this.noHeader ? "title" : void 0)}
          tabindex="0"
        >
          ${!this.noHeader ? x2`
                <header part="header" class="drawer__header">
                  <h2 part="title" class="drawer__title" id="title">
                    <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                    <slot name="label"> ${this.label.length > 0 ? this.label : String.fromCharCode(65279)} </slot>
                  </h2>
                  <div part="header-actions" class="drawer__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="drawer__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click=${() => this.requestClose("close-button")}
                    ></sl-icon-button>
                  </div>
                </header>
              ` : ""}

          <slot part="body" class="drawer__body"></slot>

          <footer part="footer" class="drawer__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `;
    }
  };
  SlDrawer.styles = [component_styles_default, drawer_styles_default];
  SlDrawer.dependencies = { "sl-icon-button": SlIconButton };
  __decorateClass2([
    e11(".drawer")
  ], SlDrawer.prototype, "drawer", 2);
  __decorateClass2([
    e11(".drawer__panel")
  ], SlDrawer.prototype, "panel", 2);
  __decorateClass2([
    e11(".drawer__overlay")
  ], SlDrawer.prototype, "overlay", 2);
  __decorateClass2([
    n8({ type: Boolean, reflect: true })
  ], SlDrawer.prototype, "open", 2);
  __decorateClass2([
    n8({ reflect: true })
  ], SlDrawer.prototype, "label", 2);
  __decorateClass2([
    n8({ reflect: true })
  ], SlDrawer.prototype, "placement", 2);
  __decorateClass2([
    n8({ type: Boolean, reflect: true })
  ], SlDrawer.prototype, "contained", 2);
  __decorateClass2([
    n8({ attribute: "no-header", type: Boolean, reflect: true })
  ], SlDrawer.prototype, "noHeader", 2);
  __decorateClass2([
    watch("open", { waitUntilFirstUpdate: true })
  ], SlDrawer.prototype, "handleOpenChange", 1);
  __decorateClass2([
    watch("contained", { waitUntilFirstUpdate: true })
  ], SlDrawer.prototype, "handleNoModalChange", 1);
  setDefaultAnimation("drawer.showTop", {
    keyframes: [
      { opacity: 0, translate: "0 -100%" },
      { opacity: 1, translate: "0 0" }
    ],
    options: { duration: 250, easing: "ease" }
  });
  setDefaultAnimation("drawer.hideTop", {
    keyframes: [
      { opacity: 1, translate: "0 0" },
      { opacity: 0, translate: "0 -100%" }
    ],
    options: { duration: 250, easing: "ease" }
  });
  setDefaultAnimation("drawer.showEnd", {
    keyframes: [
      { opacity: 0, translate: "100%" },
      { opacity: 1, translate: "0" }
    ],
    rtlKeyframes: [
      { opacity: 0, translate: "-100%" },
      { opacity: 1, translate: "0" }
    ],
    options: { duration: 250, easing: "ease" }
  });
  setDefaultAnimation("drawer.hideEnd", {
    keyframes: [
      { opacity: 1, translate: "0" },
      { opacity: 0, translate: "100%" }
    ],
    rtlKeyframes: [
      { opacity: 1, translate: "0" },
      { opacity: 0, translate: "-100%" }
    ],
    options: { duration: 250, easing: "ease" }
  });
  setDefaultAnimation("drawer.showBottom", {
    keyframes: [
      { opacity: 0, translate: "0 100%" },
      { opacity: 1, translate: "0 0" }
    ],
    options: { duration: 250, easing: "ease" }
  });
  setDefaultAnimation("drawer.hideBottom", {
    keyframes: [
      { opacity: 1, translate: "0 0" },
      { opacity: 0, translate: "0 100%" }
    ],
    options: { duration: 250, easing: "ease" }
  });
  setDefaultAnimation("drawer.showStart", {
    keyframes: [
      { opacity: 0, translate: "-100%" },
      { opacity: 1, translate: "0" }
    ],
    rtlKeyframes: [
      { opacity: 0, translate: "100%" },
      { opacity: 1, translate: "0" }
    ],
    options: { duration: 250, easing: "ease" }
  });
  setDefaultAnimation("drawer.hideStart", {
    keyframes: [
      { opacity: 1, translate: "0" },
      { opacity: 0, translate: "-100%" }
    ],
    rtlKeyframes: [
      { opacity: 1, translate: "0" },
      { opacity: 0, translate: "100%" }
    ],
    options: { duration: 250, easing: "ease" }
  });
  setDefaultAnimation("drawer.denyClose", {
    keyframes: [{ scale: 1 }, { scale: 1.01 }, { scale: 1 }],
    options: { duration: 250 }
  });
  setDefaultAnimation("drawer.overlay.show", {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    options: { duration: 250 }
  });
  setDefaultAnimation("drawer.overlay.hide", {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    options: { duration: 250 }
  });

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.SAPQLUO4.js
  SlDrawer.define("sl-drawer");

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VVA35HTY.js
  var menu_styles_default = i6`
  :host {
    display: block;
    position: relative;
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`;

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.Q6CVTR7F.js
  var SlMenu = class extends ShoelaceElement {
    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("role", "menu");
    }
    handleClick(event) {
      const menuItemTypes = ["menuitem", "menuitemcheckbox"];
      const composedPath = event.composedPath();
      const target = composedPath.find((el) => {
        var _a;
        return menuItemTypes.includes(((_a = el == null ? void 0 : el.getAttribute) == null ? void 0 : _a.call(el, "role")) || "");
      });
      if (!target) return;
      const closestMenu = composedPath.find((el) => {
        var _a;
        return ((_a = el == null ? void 0 : el.getAttribute) == null ? void 0 : _a.call(el, "role")) === "menu";
      });
      const clickHasSubmenu = closestMenu !== this;
      if (clickHasSubmenu) return;
      const item = target;
      if (item.type === "checkbox") {
        item.checked = !item.checked;
      }
      this.emit("sl-select", { detail: { item } });
    }
    handleKeyDown(event) {
      if (event.key === "Enter" || event.key === " ") {
        const item = this.getCurrentItem();
        event.preventDefault();
        event.stopPropagation();
        item == null ? void 0 : item.click();
      } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
        const items = this.getAllItems();
        const activeItem = this.getCurrentItem();
        let index = activeItem ? items.indexOf(activeItem) : 0;
        if (items.length > 0) {
          event.preventDefault();
          event.stopPropagation();
          if (event.key === "ArrowDown") {
            index++;
          } else if (event.key === "ArrowUp") {
            index--;
          } else if (event.key === "Home") {
            index = 0;
          } else if (event.key === "End") {
            index = items.length - 1;
          }
          if (index < 0) {
            index = items.length - 1;
          }
          if (index > items.length - 1) {
            index = 0;
          }
          this.setCurrentItem(items[index]);
          items[index].focus();
        }
      }
    }
    handleMouseDown(event) {
      const target = event.target;
      if (this.isMenuItem(target)) {
        this.setCurrentItem(target);
      }
    }
    handleSlotChange() {
      const items = this.getAllItems();
      if (items.length > 0) {
        this.setCurrentItem(items[0]);
      }
    }
    isMenuItem(item) {
      var _a;
      return item.tagName.toLowerCase() === "sl-menu-item" || ["menuitem", "menuitemcheckbox", "menuitemradio"].includes((_a = item.getAttribute("role")) != null ? _a : "");
    }
    /** @internal Gets all slotted menu items, ignoring dividers, headers, and other elements. */
    getAllItems() {
      return [...this.defaultSlot.assignedElements({ flatten: true })].filter((el) => {
        if (el.inert || !this.isMenuItem(el)) {
          return false;
        }
        return true;
      });
    }
    /**
     * @internal Gets the current menu item, which is the menu item that has `tabindex="0"` within the roving tab index.
     * The menu item may or may not have focus, but for keyboard interaction purposes it's considered the "active" item.
     */
    getCurrentItem() {
      return this.getAllItems().find((i13) => i13.getAttribute("tabindex") === "0");
    }
    /**
     * @internal Sets the current menu item to the specified element. This sets `tabindex="0"` on the target element and
     * `tabindex="-1"` to all other items. This method must be called prior to setting focus on a menu item.
     */
    setCurrentItem(item) {
      const items = this.getAllItems();
      items.forEach((i13) => {
        i13.setAttribute("tabindex", i13 === item ? "0" : "-1");
      });
    }
    render() {
      return x2`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `;
    }
  };
  SlMenu.styles = [component_styles_default, menu_styles_default];
  __decorateClass2([
    e11("slot")
  ], SlMenu.prototype, "defaultSlot", 2);

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.JHOXTQXA.js
  SlMenu.define("sl-menu");

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KZJNDGFO.js
  var menu_item_styles_default = i6`
  :host {
    --submenu-offset: -2px;

    display: block;
  }

  :host([inert]) {
    display: none;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item.menu-item--loading {
    outline: none;
    cursor: wait;
  }

  .menu-item.menu-item--loading *:not(sl-spinner) {
    opacity: 0.5;
  }

  .menu-item--loading sl-spinner {
    --indicator-color: currentColor;
    --track-width: 1px;
    position: absolute;
    font-size: 0.75em;
    top: calc(50% - 0.5em);
    left: 0.65rem;
    opacity: 1;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /* Safe triangle */
  .menu-item--submenu-expanded::after {
    content: '';
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
      var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
      var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
    );
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'], :focus-visible)) .menu-item,
  .menu-item--submenu-expanded {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  :host(:focus-visible) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }

  /* Add elevation and z-index to submenus */
  sl-popup::part(popup) {
    box-shadow: var(--sl-shadow-large);
    z-index: var(--sl-z-index-dropdown);
    margin-left: var(--submenu-offset);
  }

  .menu-item--rtl sl-popup::part(popup) {
    margin-left: calc(-1 * var(--submenu-offset));
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .menu-item,
    :host(:focus-visible) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }

  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;

  // node_modules/.deno/lit-html@3.2.1/node_modules/lit-html/async-directive.js
  var s6 = (i13, t8) => {
    const e17 = i13._$AN;
    if (void 0 === e17) return false;
    for (const i14 of e17) i14._$AO?.(t8, false), s6(i14, t8);
    return true;
  };
  var o13 = (i13) => {
    let t8, e17;
    do {
      if (void 0 === (t8 = i13._$AM)) break;
      e17 = t8._$AN, e17.delete(i13), i13 = t8;
    } while (0 === e17?.size);
  };
  var r12 = (i13) => {
    for (let t8; t8 = i13._$AM; i13 = t8) {
      let e17 = t8._$AN;
      if (void 0 === e17) t8._$AN = e17 = /* @__PURE__ */ new Set();
      else if (e17.has(i13)) break;
      e17.add(i13), c8(t8);
    }
  };
  function h5(i13) {
    void 0 !== this._$AN ? (o13(this), this._$AM = i13, r12(this)) : this._$AM = i13;
  }
  function n10(i13, t8 = false, e17 = 0) {
    const r14 = this._$AH, h7 = this._$AN;
    if (void 0 !== h7 && 0 !== h7.size) if (t8) if (Array.isArray(r14)) for (let i14 = e17; i14 < r14.length; i14++) s6(r14[i14], false), o13(r14[i14]);
    else null != r14 && (s6(r14, false), o13(r14));
    else s6(this, i13);
  }
  var c8 = (i13) => {
    i13.type == t7.CHILD && (i13._$AP ??= n10, i13._$AQ ??= h5);
  };
  var f6 = class extends i10 {
    constructor() {
      super(...arguments), this._$AN = void 0;
    }
    _$AT(i13, t8, e17) {
      super._$AT(i13, t8, e17), r12(this), this.isConnected = i13._$AU;
    }
    _$AO(i13, t8 = true) {
      i13 !== this.isConnected && (this.isConnected = i13, i13 ? this.reconnected?.() : this.disconnected?.()), t8 && (s6(this, i13), o13(this));
    }
    setValue(t8) {
      if (f5(this._$Ct)) this._$Ct._$AI(t8, this);
      else {
        const i13 = [...this._$Ct._$AH];
        i13[this._$Ci] = t8, this._$Ct._$AI(i13, this, 0);
      }
    }
    disconnected() {
    }
    reconnected() {
    }
  };

  // node_modules/.deno/lit-html@3.2.1/node_modules/lit-html/directives/ref.js
  var e15 = () => new h6();
  var h6 = class {
  };
  var o14 = /* @__PURE__ */ new WeakMap();
  var n11 = e13(class extends f6 {
    render(i13) {
      return E2;
    }
    update(i13, [s7]) {
      const e17 = s7 !== this.Y;
      return e17 && void 0 !== this.Y && this.rt(void 0), (e17 || this.lt !== this.ct) && (this.Y = s7, this.ht = i13.options?.host, this.rt(this.ct = i13.element)), E2;
    }
    rt(t8) {
      if (this.isConnected || (t8 = void 0), "function" == typeof this.Y) {
        const i13 = this.ht ?? globalThis;
        let s7 = o14.get(i13);
        void 0 === s7 && (s7 = /* @__PURE__ */ new WeakMap(), o14.set(i13, s7)), void 0 !== s7.get(this.Y) && this.Y.call(this.ht, void 0), s7.set(this.Y, t8), void 0 !== t8 && this.Y.call(this.ht, t8);
      } else this.Y.value = t8;
    }
    get lt() {
      return "function" == typeof this.Y ? o14.get(this.ht ?? globalThis)?.get(this.Y) : this.Y?.value;
    }
    disconnected() {
      this.lt === this.ct && this.rt(void 0);
    }
    reconnected() {
      this.rt(this.ct);
    }
  });

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ZLIGP6HZ.js
  var SubmenuController = class {
    constructor(host, hasSlotController) {
      this.popupRef = e15();
      this.enableSubmenuTimer = -1;
      this.isConnected = false;
      this.isPopupConnected = false;
      this.skidding = 0;
      this.submenuOpenDelay = 100;
      this.handleMouseMove = (event) => {
        this.host.style.setProperty("--safe-triangle-cursor-x", `${event.clientX}px`);
        this.host.style.setProperty("--safe-triangle-cursor-y", `${event.clientY}px`);
      };
      this.handleMouseOver = () => {
        if (this.hasSlotController.test("submenu")) {
          this.enableSubmenu();
        }
      };
      this.handleKeyDown = (event) => {
        switch (event.key) {
          case "Escape":
          case "Tab":
            this.disableSubmenu();
            break;
          case "ArrowLeft":
            if (event.target !== this.host) {
              event.preventDefault();
              event.stopPropagation();
              this.host.focus();
              this.disableSubmenu();
            }
            break;
          case "ArrowRight":
          case "Enter":
          case " ":
            this.handleSubmenuEntry(event);
            break;
          default:
            break;
        }
      };
      this.handleClick = (event) => {
        var _a;
        if (event.target === this.host) {
          event.preventDefault();
          event.stopPropagation();
        } else if (event.target instanceof Element && (event.target.tagName === "sl-menu-item" || ((_a = event.target.role) == null ? void 0 : _a.startsWith("menuitem")))) {
          this.disableSubmenu();
        }
      };
      this.handleFocusOut = (event) => {
        if (event.relatedTarget && event.relatedTarget instanceof Element && this.host.contains(event.relatedTarget)) {
          return;
        }
        this.disableSubmenu();
      };
      this.handlePopupMouseover = (event) => {
        event.stopPropagation();
      };
      this.handlePopupReposition = () => {
        const submenuSlot = this.host.renderRoot.querySelector("slot[name='submenu']");
        const menu = submenuSlot == null ? void 0 : submenuSlot.assignedElements({ flatten: true }).filter((el) => el.localName === "sl-menu")[0];
        const isRtl = getComputedStyle(this.host).direction === "rtl";
        if (!menu) {
          return;
        }
        const { left, top, width, height } = menu.getBoundingClientRect();
        this.host.style.setProperty("--safe-triangle-submenu-start-x", `${isRtl ? left + width : left}px`);
        this.host.style.setProperty("--safe-triangle-submenu-start-y", `${top}px`);
        this.host.style.setProperty("--safe-triangle-submenu-end-x", `${isRtl ? left + width : left}px`);
        this.host.style.setProperty("--safe-triangle-submenu-end-y", `${top + height}px`);
      };
      (this.host = host).addController(this);
      this.hasSlotController = hasSlotController;
    }
    hostConnected() {
      if (this.hasSlotController.test("submenu") && !this.host.disabled) {
        this.addListeners();
      }
    }
    hostDisconnected() {
      this.removeListeners();
    }
    hostUpdated() {
      if (this.hasSlotController.test("submenu") && !this.host.disabled) {
        this.addListeners();
        this.updateSkidding();
      } else {
        this.removeListeners();
      }
    }
    addListeners() {
      if (!this.isConnected) {
        this.host.addEventListener("mousemove", this.handleMouseMove);
        this.host.addEventListener("mouseover", this.handleMouseOver);
        this.host.addEventListener("keydown", this.handleKeyDown);
        this.host.addEventListener("click", this.handleClick);
        this.host.addEventListener("focusout", this.handleFocusOut);
        this.isConnected = true;
      }
      if (!this.isPopupConnected) {
        if (this.popupRef.value) {
          this.popupRef.value.addEventListener("mouseover", this.handlePopupMouseover);
          this.popupRef.value.addEventListener("sl-reposition", this.handlePopupReposition);
          this.isPopupConnected = true;
        }
      }
    }
    removeListeners() {
      if (this.isConnected) {
        this.host.removeEventListener("mousemove", this.handleMouseMove);
        this.host.removeEventListener("mouseover", this.handleMouseOver);
        this.host.removeEventListener("keydown", this.handleKeyDown);
        this.host.removeEventListener("click", this.handleClick);
        this.host.removeEventListener("focusout", this.handleFocusOut);
        this.isConnected = false;
      }
      if (this.isPopupConnected) {
        if (this.popupRef.value) {
          this.popupRef.value.removeEventListener("mouseover", this.handlePopupMouseover);
          this.popupRef.value.removeEventListener("sl-reposition", this.handlePopupReposition);
          this.isPopupConnected = false;
        }
      }
    }
    handleSubmenuEntry(event) {
      const submenuSlot = this.host.renderRoot.querySelector("slot[name='submenu']");
      if (!submenuSlot) {
        console.error("Cannot activate a submenu if no corresponding menuitem can be found.", this);
        return;
      }
      let menuItems = null;
      for (const elt of submenuSlot.assignedElements()) {
        menuItems = elt.querySelectorAll("sl-menu-item, [role^='menuitem']");
        if (menuItems.length !== 0) {
          break;
        }
      }
      if (!menuItems || menuItems.length === 0) {
        return;
      }
      menuItems[0].setAttribute("tabindex", "0");
      for (let i13 = 1; i13 !== menuItems.length; ++i13) {
        menuItems[i13].setAttribute("tabindex", "-1");
      }
      if (this.popupRef.value) {
        event.preventDefault();
        event.stopPropagation();
        if (this.popupRef.value.active) {
          if (menuItems[0] instanceof HTMLElement) {
            menuItems[0].focus();
          }
        } else {
          this.enableSubmenu(false);
          this.host.updateComplete.then(() => {
            if (menuItems[0] instanceof HTMLElement) {
              menuItems[0].focus();
            }
          });
          this.host.requestUpdate();
        }
      }
    }
    setSubmenuState(state) {
      if (this.popupRef.value) {
        if (this.popupRef.value.active !== state) {
          this.popupRef.value.active = state;
          this.host.requestUpdate();
        }
      }
    }
    // Shows the submenu. Supports disabling the opening delay, e.g. for keyboard events that want to set the focus to the
    // newly opened menu.
    enableSubmenu(delay = true) {
      if (delay) {
        window.clearTimeout(this.enableSubmenuTimer);
        this.enableSubmenuTimer = window.setTimeout(() => {
          this.setSubmenuState(true);
        }, this.submenuOpenDelay);
      } else {
        this.setSubmenuState(true);
      }
    }
    disableSubmenu() {
      window.clearTimeout(this.enableSubmenuTimer);
      this.setSubmenuState(false);
    }
    // Calculate the space the top of a menu takes-up, for aligning the popup menu-item with the activating element.
    updateSkidding() {
      var _a;
      if (!((_a = this.host.parentElement) == null ? void 0 : _a.computedStyleMap)) {
        return;
      }
      const styleMap = this.host.parentElement.computedStyleMap();
      const attrs = ["padding-top", "border-top-width", "margin-top"];
      const skidding = attrs.reduce((accumulator, attr) => {
        var _a2;
        const styleValue = (_a2 = styleMap.get(attr)) != null ? _a2 : new CSSUnitValue(0, "px");
        const unitValue = styleValue instanceof CSSUnitValue ? styleValue : new CSSUnitValue(0, "px");
        const pxValue = unitValue.to("px");
        return accumulator - pxValue.value;
      }, 0);
      this.skidding = skidding;
    }
    isExpanded() {
      return this.popupRef.value ? this.popupRef.value.active : false;
    }
    renderSubmenu() {
      const isRtl = getComputedStyle(this.host).direction === "rtl";
      if (!this.isConnected) {
        return x2` <slot name="submenu" hidden></slot> `;
      }
      return x2`
      <sl-popup
        ${n11(this.popupRef)}
        placement=${isRtl ? "left-start" : "right-start"}
        anchor="anchor"
        flip
        flip-fallback-strategy="best-fit"
        skidding="${this.skidding}"
        strategy="fixed"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `;
    }
  };

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3KSWVBQ5.js
  var popup_styles_default = i6`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;

  // node_modules/.deno/@floating-ui+utils@0.2.9/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
  var min = Math.min;
  var max = Math.max;
  var round = Math.round;
  var floor = Math.floor;
  var createCoords = (v3) => ({
    x: v3,
    y: v3
  });
  var oppositeSideMap = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  var oppositeAlignmentMap = {
    start: "end",
    end: "start"
  };
  function clamp(start, value, end) {
    return max(start, min(value, end));
  }
  function evaluate(value, param) {
    return typeof value === "function" ? value(param) : value;
  }
  function getSide(placement) {
    return placement.split("-")[0];
  }
  function getAlignment(placement) {
    return placement.split("-")[1];
  }
  function getOppositeAxis(axis) {
    return axis === "x" ? "y" : "x";
  }
  function getAxisLength(axis) {
    return axis === "y" ? "height" : "width";
  }
  function getSideAxis(placement) {
    return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
  }
  function getAlignmentAxis(placement) {
    return getOppositeAxis(getSideAxis(placement));
  }
  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
    const alignment = getAlignment(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const length = getAxisLength(alignmentAxis);
    let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
  }
  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }
  function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
  }
  function getSideList(side, isStart, rtl) {
    const lr = ["left", "right"];
    const rl = ["right", "left"];
    const tb = ["top", "bottom"];
    const bt = ["bottom", "top"];
    switch (side) {
      case "top":
      case "bottom":
        if (rtl) return isStart ? rl : lr;
        return isStart ? lr : rl;
      case "left":
      case "right":
        return isStart ? tb : bt;
      default:
        return [];
    }
  }
  function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    const alignment = getAlignment(placement);
    let list = getSideList(getSide(placement), direction === "start", rtl);
    if (alignment) {
      list = list.map((side) => side + "-" + alignment);
      if (flipAlignment) {
        list = list.concat(list.map(getOppositeAlignmentPlacement));
      }
    }
    return list;
  }
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
  }
  function expandPaddingObject(padding) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...padding
    };
  }
  function getPaddingObject(padding) {
    return typeof padding !== "number" ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  function rectToClientRect(rect) {
    const {
      x: x3,
      y: y5,
      width,
      height
    } = rect;
    return {
      width,
      height,
      top: y5,
      left: x3,
      right: x3 + width,
      bottom: y5 + height,
      x: x3,
      y: y5
    };
  }

  // node_modules/.deno/@floating-ui+core@1.6.9/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
      reference,
      floating
    } = _ref;
    const sideAxis = getSideAxis(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const alignLength = getAxisLength(alignmentAxis);
    const side = getSide(placement);
    const isVertical = sideAxis === "y";
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
    let coords;
    switch (side) {
      case "top":
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case "bottom":
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case "right":
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case "left":
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    switch (getAlignment(placement)) {
      case "start":
        coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
        break;
      case "end":
        coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
        break;
    }
    return coords;
  }
  var computePosition = async (reference, floating, config) => {
    const {
      placement = "bottom",
      strategy = "absolute",
      middleware = [],
      platform: platform2
    } = config;
    const validMiddleware = middleware.filter(Boolean);
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
    let rects = await platform2.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x: x3,
      y: y5
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let middlewareData = {};
    let resetCount = 0;
    for (let i13 = 0; i13 < validMiddleware.length; i13++) {
      const {
        name,
        fn
      } = validMiddleware[i13];
      const {
        x: nextX,
        y: nextY,
        data,
        reset
      } = await fn({
        x: x3,
        y: y5,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform: platform2,
        elements: {
          reference,
          floating
        }
      });
      x3 = nextX != null ? nextX : x3;
      y5 = nextY != null ? nextY : y5;
      middlewareData = {
        ...middlewareData,
        [name]: {
          ...middlewareData[name],
          ...data
        }
      };
      if (reset && resetCount <= 50) {
        resetCount++;
        if (typeof reset === "object") {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
          if (reset.rects) {
            rects = reset.rects === true ? await platform2.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
          ({
            x: x3,
            y: y5
          } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
        i13 = -1;
      }
    }
    return {
      x: x3,
      y: y5,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };
  async function detectOverflow(state, options) {
    var _await$platform$isEle;
    if (options === void 0) {
      options = {};
    }
    const {
      x: x3,
      y: y5,
      platform: platform2,
      rects,
      elements,
      strategy
    } = state;
    const {
      boundary = "clippingAncestors",
      rootBoundary = "viewport",
      elementContext = "floating",
      altBoundary = false,
      padding = 0
    } = evaluate(options, state);
    const paddingObject = getPaddingObject(padding);
    const altContext = elementContext === "floating" ? "reference" : "floating";
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
      element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
      boundary,
      rootBoundary,
      strategy
    }));
    const rect = elementContext === "floating" ? {
      x: x3,
      y: y5,
      width: rects.floating.width,
      height: rects.floating.height
    } : rects.reference;
    const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
    const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    };
    const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements,
      rect,
      offsetParent,
      strategy
    }) : rect);
    return {
      top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
      bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
      left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
      right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
  }
  var arrow = (options) => ({
    name: "arrow",
    options,
    async fn(state) {
      const {
        x: x3,
        y: y5,
        placement,
        rects,
        platform: platform2,
        elements,
        middlewareData
      } = state;
      const {
        element,
        padding = 0
      } = evaluate(options, state) || {};
      if (element == null) {
        return {};
      }
      const paddingObject = getPaddingObject(padding);
      const coords = {
        x: x3,
        y: y5
      };
      const axis = getAlignmentAxis(placement);
      const length = getAxisLength(axis);
      const arrowDimensions = await platform2.getDimensions(element);
      const isYAxis = axis === "y";
      const minProp = isYAxis ? "top" : "left";
      const maxProp = isYAxis ? "bottom" : "right";
      const clientProp = isYAxis ? "clientHeight" : "clientWidth";
      const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
      const startDiff = coords[axis] - rects.reference[axis];
      const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
      let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
      if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
        clientSize = elements.floating[clientProp] || rects.floating[length];
      }
      const centerToReference = endDiff / 2 - startDiff / 2;
      const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
      const minPadding = min(paddingObject[minProp], largestPossiblePadding);
      const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
      const min$1 = minPadding;
      const max2 = clientSize - arrowDimensions[length] - maxPadding;
      const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
      const offset3 = clamp(min$1, center, max2);
      const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset3 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
      const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
      return {
        [axis]: coords[axis] + alignmentOffset,
        data: {
          [axis]: offset3,
          centerOffset: center - offset3 - alignmentOffset,
          ...shouldAddOffset && {
            alignmentOffset
          }
        },
        reset: shouldAddOffset
      };
    }
  });
  var flip = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "flip",
      options,
      async fn(state) {
        var _middlewareData$arrow, _middlewareData$flip;
        const {
          placement,
          middlewareData,
          rects,
          initialPlacement,
          platform: platform2,
          elements
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = "bestFit",
          fallbackAxisSideDirection = "none",
          flipAlignment = true,
          ...detectOverflowOptions
        } = evaluate(options, state);
        if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        const side = getSide(placement);
        const initialSideAxis = getSideAxis(initialPlacement);
        const isBasePlacement = getSide(initialPlacement) === initialPlacement;
        const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
        if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
          fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
        }
        const placements2 = [initialPlacement, ...fallbackPlacements];
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
        if (checkCrossAxis) {
          const sides2 = getAlignmentSides(placement, rects, rtl);
          overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
        }
        overflowsData = [...overflowsData, {
          placement,
          overflows
        }];
        if (!overflows.every((side2) => side2 <= 0)) {
          var _middlewareData$flip2, _overflowsData$filter;
          const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
          const nextPlacement = placements2[nextIndex];
          if (nextPlacement) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
          let resetPlacement = (_overflowsData$filter = overflowsData.filter((d5) => d5.overflows[0] <= 0).sort((a6, b5) => a6.overflows[1] - b5.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
          if (!resetPlacement) {
            switch (fallbackStrategy) {
              case "bestFit": {
                var _overflowsData$filter2;
                const placement2 = (_overflowsData$filter2 = overflowsData.filter((d5) => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = getSideAxis(d5.placement);
                    return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === "y";
                  }
                  return true;
                }).map((d5) => [d5.placement, d5.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a6, b5) => a6[1] - b5[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement2) {
                  resetPlacement = placement2;
                }
                break;
              }
              case "initialPlacement":
                resetPlacement = initialPlacement;
                break;
            }
          }
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
        return {};
      }
    };
  };
  async function convertValueToCoords(state, options) {
    const {
      placement,
      platform: platform2,
      elements
    } = state;
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getSideAxis(placement) === "y";
    const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options, state);
    let {
      mainAxis,
      crossAxis,
      alignmentAxis
    } = typeof rawValue === "number" ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: rawValue.mainAxis || 0,
      crossAxis: rawValue.crossAxis || 0,
      alignmentAxis: rawValue.alignmentAxis
    };
    if (alignment && typeof alignmentAxis === "number") {
      crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  }
  var offset = function(options) {
    if (options === void 0) {
      options = 0;
    }
    return {
      name: "offset",
      options,
      async fn(state) {
        var _middlewareData$offse, _middlewareData$arrow;
        const {
          x: x3,
          y: y5,
          placement,
          middlewareData
        } = state;
        const diffCoords = await convertValueToCoords(state, options);
        if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        return {
          x: x3 + diffCoords.x,
          y: y5 + diffCoords.y,
          data: {
            ...diffCoords,
            placement
          }
        };
      }
    };
  };
  var shift = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "shift",
      options,
      async fn(state) {
        const {
          x: x3,
          y: y5,
          placement
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: (_ref) => {
              let {
                x: x4,
                y: y6
              } = _ref;
              return {
                x: x4,
                y: y6
              };
            }
          },
          ...detectOverflowOptions
        } = evaluate(options, state);
        const coords = {
          x: x3,
          y: y5
        };
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const crossAxis = getSideAxis(getSide(placement));
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        if (checkMainAxis) {
          const minSide = mainAxis === "y" ? "top" : "left";
          const maxSide = mainAxis === "y" ? "bottom" : "right";
          const min2 = mainAxisCoord + overflow[minSide];
          const max2 = mainAxisCoord - overflow[maxSide];
          mainAxisCoord = clamp(min2, mainAxisCoord, max2);
        }
        if (checkCrossAxis) {
          const minSide = crossAxis === "y" ? "top" : "left";
          const maxSide = crossAxis === "y" ? "bottom" : "right";
          const min2 = crossAxisCoord + overflow[minSide];
          const max2 = crossAxisCoord - overflow[maxSide];
          crossAxisCoord = clamp(min2, crossAxisCoord, max2);
        }
        const limitedCoords = limiter.fn({
          ...state,
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        });
        return {
          ...limitedCoords,
          data: {
            x: limitedCoords.x - x3,
            y: limitedCoords.y - y5,
            enabled: {
              [mainAxis]: checkMainAxis,
              [crossAxis]: checkCrossAxis
            }
          }
        };
      }
    };
  };
  var size = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "size",
      options,
      async fn(state) {
        var _state$middlewareData, _state$middlewareData2;
        const {
          placement,
          rects,
          platform: platform2,
          elements
        } = state;
        const {
          apply = () => {
          },
          ...detectOverflowOptions
        } = evaluate(options, state);
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const side = getSide(placement);
        const alignment = getAlignment(placement);
        const isYAxis = getSideAxis(placement) === "y";
        const {
          width,
          height
        } = rects.floating;
        let heightSide;
        let widthSide;
        if (side === "top" || side === "bottom") {
          heightSide = side;
          widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
        } else {
          widthSide = side;
          heightSide = alignment === "end" ? "top" : "bottom";
        }
        const maximumClippingHeight = height - overflow.top - overflow.bottom;
        const maximumClippingWidth = width - overflow.left - overflow.right;
        const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
        const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
        const noShift = !state.middlewareData.shift;
        let availableHeight = overflowAvailableHeight;
        let availableWidth = overflowAvailableWidth;
        if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
          availableWidth = maximumClippingWidth;
        }
        if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
          availableHeight = maximumClippingHeight;
        }
        if (noShift && !alignment) {
          const xMin = max(overflow.left, 0);
          const xMax = max(overflow.right, 0);
          const yMin = max(overflow.top, 0);
          const yMax = max(overflow.bottom, 0);
          if (isYAxis) {
            availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
          } else {
            availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
          }
        }
        await apply({
          ...state,
          availableWidth,
          availableHeight
        });
        const nextDimensions = await platform2.getDimensions(elements.floating);
        if (width !== nextDimensions.width || height !== nextDimensions.height) {
          return {
            reset: {
              rects: true
            }
          };
        }
        return {};
      }
    };
  };

  // node_modules/.deno/@floating-ui+utils@0.2.9/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
  function hasWindow() {
    return typeof window !== "undefined";
  }
  function getNodeName(node) {
    if (isNode(node)) {
      return (node.nodeName || "").toLowerCase();
    }
    return "#document";
  }
  function getWindow(node) {
    var _node$ownerDocument;
    return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
  }
  function getDocumentElement(node) {
    var _ref;
    return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
  }
  function isNode(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Node || value instanceof getWindow(value).Node;
  }
  function isElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Element || value instanceof getWindow(value).Element;
  }
  function isHTMLElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
  }
  function isShadowRoot(value) {
    if (!hasWindow() || typeof ShadowRoot === "undefined") {
      return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
  }
  function isOverflowElement(element) {
    const {
      overflow,
      overflowX,
      overflowY,
      display
    } = getComputedStyle2(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
  }
  function isTableElement(element) {
    return ["table", "td", "th"].includes(getNodeName(element));
  }
  function isTopLayer(element) {
    return [":popover-open", ":modal"].some((selector) => {
      try {
        return element.matches(selector);
      } catch (e17) {
        return false;
      }
    });
  }
  function isContainingBlock(elementOrCss) {
    const webkit = isWebKit();
    const css2 = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
    return ["transform", "translate", "scale", "rotate", "perspective"].some((value) => css2[value] ? css2[value] !== "none" : false) || (css2.containerType ? css2.containerType !== "normal" : false) || !webkit && (css2.backdropFilter ? css2.backdropFilter !== "none" : false) || !webkit && (css2.filter ? css2.filter !== "none" : false) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((value) => (css2.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css2.contain || "").includes(value));
  }
  function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else if (isTopLayer(currentNode)) {
        return null;
      }
      currentNode = getParentNode(currentNode);
    }
    return null;
  }
  function isWebKit() {
    if (typeof CSS === "undefined" || !CSS.supports) return false;
    return CSS.supports("-webkit-backdrop-filter", "none");
  }
  function isLastTraversableNode(node) {
    return ["html", "body", "#document"].includes(getNodeName(node));
  }
  function getComputedStyle2(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.scrollX,
      scrollTop: element.scrollY
    };
  }
  function getParentNode(node) {
    if (getNodeName(node) === "html") {
      return node;
    }
    const result = (
      // Step into the shadow DOM of the parent of a slotted node.
      node.assignedSlot || // DOM Element detected.
      node.parentNode || // ShadowRoot detected.
      isShadowRoot(node) && node.host || // Fallback.
      getDocumentElement(node)
    );
    return isShadowRoot(result) ? result.host : result;
  }
  function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
      return node.ownerDocument ? node.ownerDocument.body : node.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }
  function getOverflowAncestors(node, list, traverseIframes) {
    var _node$ownerDocument2;
    if (list === void 0) {
      list = [];
    }
    if (traverseIframes === void 0) {
      traverseIframes = true;
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
      const frameElement = getFrameElement(win);
      return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
    }
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
  function getFrameElement(win) {
    return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
  }

  // node_modules/.deno/@floating-ui+dom@1.6.13/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
  function getCssDimensions(element) {
    const css2 = getComputedStyle2(element);
    let width = parseFloat(css2.width) || 0;
    let height = parseFloat(css2.height) || 0;
    const hasOffset = isHTMLElement(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width,
      height,
      $: shouldFallback
    };
  }
  function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
  }
  function getScale(element) {
    const domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
      return createCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const {
      width,
      height,
      $: $4
    } = getCssDimensions(domElement);
    let x3 = ($4 ? round(rect.width) : rect.width) / width;
    let y5 = ($4 ? round(rect.height) : rect.height) / height;
    if (!x3 || !Number.isFinite(x3)) {
      x3 = 1;
    }
    if (!y5 || !Number.isFinite(y5)) {
      y5 = 1;
    }
    return {
      x: x3,
      y: y5
    };
  }
  var noOffsets = /* @__PURE__ */ createCoords(0);
  function getVisualOffsets(element) {
    const win = getWindow(element);
    if (!isWebKit() || !win.visualViewport) {
      return noOffsets;
    }
    return {
      x: win.visualViewport.offsetLeft,
      y: win.visualViewport.offsetTop
    };
  }
  function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
      return false;
    }
    return isFixed;
  }
  function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);
    let scale = createCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement(offsetParent)) {
          scale = getScale(offsetParent);
        }
      } else {
        scale = getScale(element);
      }
    }
    const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
    let x3 = (clientRect.left + visualOffsets.x) / scale.x;
    let y5 = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement) {
      const win = getWindow(domElement);
      const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
      let currentWin = win;
      let currentIFrame = getFrameElement(currentWin);
      while (currentIFrame && offsetParent && offsetWin !== currentWin) {
        const iframeScale = getScale(currentIFrame);
        const iframeRect = currentIFrame.getBoundingClientRect();
        const css2 = getComputedStyle2(currentIFrame);
        const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css2.paddingLeft)) * iframeScale.x;
        const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css2.paddingTop)) * iframeScale.y;
        x3 *= iframeScale.x;
        y5 *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x3 += left;
        y5 += top;
        currentWin = getWindow(currentIFrame);
        currentIFrame = getFrameElement(currentWin);
      }
    }
    return rectToClientRect({
      width,
      height,
      x: x3,
      y: y5
    });
  }
  function getWindowScrollBarX(element, rect) {
    const leftScroll = getNodeScroll(element).scrollLeft;
    if (!rect) {
      return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
    }
    return rect.left + leftScroll;
  }
  function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
    if (ignoreScrollbarX === void 0) {
      ignoreScrollbarX = false;
    }
    const htmlRect = documentElement.getBoundingClientRect();
    const x3 = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 : (
      // RTL <body> scrollbar.
      getWindowScrollBarX(documentElement, htmlRect)
    ));
    const y5 = htmlRect.top + scroll.scrollTop;
    return {
      x: x3,
      y: y5
    };
  }
  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      elements,
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isFixed = strategy === "fixed";
    const documentElement = getDocumentElement(offsetParent);
    const topLayer = elements ? isTopLayer(elements.floating) : false;
    if (offsetParent === documentElement || topLayer && isFixed) {
      return rect;
    }
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    let scale = createCoords(1);
    const offsets = createCoords(0);
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent);
        scale = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
    return {
      width: rect.width * scale.x,
      height: rect.height * scale.y,
      x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
      y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
    };
  }
  function getClientRects(element) {
    return Array.from(element.getClientRects());
  }
  function getDocumentRect(element) {
    const html = getDocumentElement(element);
    const scroll = getNodeScroll(element);
    const body = element.ownerDocument.body;
    const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    let x3 = -scroll.scrollLeft + getWindowScrollBarX(element);
    const y5 = -scroll.scrollTop;
    if (getComputedStyle2(body).direction === "rtl") {
      x3 += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
      width,
      height,
      x: x3,
      y: y5
    };
  }
  function getViewportRect(element, strategy) {
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x3 = 0;
    let y5 = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      const visualViewportBased = isWebKit();
      if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
        x3 = visualViewport.offsetLeft;
        y5 = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x: x3,
      y: y5
    };
  }
  function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
    const width = element.clientWidth * scale.x;
    const height = element.clientHeight * scale.y;
    const x3 = left * scale.x;
    const y5 = top * scale.y;
    return {
      width,
      height,
      x: x3,
      y: y5
    };
  }
  function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === "viewport") {
      rect = getViewportRect(element, strategy);
    } else if (clippingAncestor === "document") {
      rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      const visualOffsets = getVisualOffsets(element);
      rect = {
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y,
        width: clippingAncestor.width,
        height: clippingAncestor.height
      };
    }
    return rectToClientRect(rect);
  }
  function hasFixedPositionAncestor(element, stopNode) {
    const parentNode = getParentNode(element);
    if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
      return false;
    }
    return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
  }
  function getClippingElementAncestors(element, cache) {
    const cachedResult = cache.get(element);
    if (cachedResult) {
      return cachedResult;
    }
    let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
    let currentContainingBlockComputedStyle = null;
    const elementIsFixed = getComputedStyle2(element).position === "fixed";
    let currentNode = elementIsFixed ? getParentNode(element) : element;
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
      const computedStyle = getComputedStyle2(currentNode);
      const currentNodeIsContaining = isContainingBlock(currentNode);
      if (!currentNodeIsContaining && computedStyle.position === "fixed") {
        currentContainingBlockComputedStyle = null;
      }
      const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
      if (shouldDropCurrentNode) {
        result = result.filter((ancestor) => ancestor !== currentNode);
      } else {
        currentContainingBlockComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
  }
  function getClippingRect(_ref) {
    let {
      element,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
    const clippingAncestors = [...elementClippingAncestors, rootBoundary];
    const firstClippingAncestor = clippingAncestors[0];
    const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
      width: clippingRect.right - clippingRect.left,
      height: clippingRect.bottom - clippingRect.top,
      x: clippingRect.left,
      y: clippingRect.top
    };
  }
  function getDimensions(element) {
    const {
      width,
      height
    } = getCssDimensions(element);
    return {
      width,
      height
    };
  }
  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const isFixed = strategy === "fixed";
    const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = createCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
    const x3 = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
    const y5 = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
    return {
      x: x3,
      y: y5,
      width: rect.width,
      height: rect.height
    };
  }
  function isStaticPositioned(element) {
    return getComputedStyle2(element).position === "static";
  }
  function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
      return null;
    }
    if (polyfill) {
      return polyfill(element);
    }
    let rawOffsetParent = element.offsetParent;
    if (getDocumentElement(element) === rawOffsetParent) {
      rawOffsetParent = rawOffsetParent.ownerDocument.body;
    }
    return rawOffsetParent;
  }
  function getOffsetParent(element, polyfill) {
    const win = getWindow(element);
    if (isTopLayer(element)) {
      return win;
    }
    if (!isHTMLElement(element)) {
      let svgOffsetParent = getParentNode(element);
      while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
        if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
          return svgOffsetParent;
        }
        svgOffsetParent = getParentNode(svgOffsetParent);
      }
      return win;
    }
    let offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
      return win;
    }
    return offsetParent || getContainingBlock(element) || win;
  }
  var getElementRects = async function(data) {
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    const floatingDimensions = await getDimensionsFn(data.floating);
    return {
      reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
      floating: {
        x: 0,
        y: 0,
        width: floatingDimensions.width,
        height: floatingDimensions.height
      }
    };
  };
  function isRTL(element) {
    return getComputedStyle2(element).direction === "rtl";
  }
  var platform = {
    convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement,
    getClippingRect,
    getOffsetParent,
    getElementRects,
    getClientRects,
    getDimensions,
    getScale,
    isElement,
    isRTL
  };
  function rectsAreEqual(a6, b5) {
    return a6.x === b5.x && a6.y === b5.y && a6.width === b5.width && a6.height === b5.height;
  }
  function observeMove(element, onMove) {
    let io = null;
    let timeoutId;
    const root2 = getDocumentElement(element);
    function cleanup() {
      var _io;
      clearTimeout(timeoutId);
      (_io = io) == null || _io.disconnect();
      io = null;
    }
    function refresh(skip, threshold) {
      if (skip === void 0) {
        skip = false;
      }
      if (threshold === void 0) {
        threshold = 1;
      }
      cleanup();
      const elementRectForRootMargin = element.getBoundingClientRect();
      const {
        left,
        top,
        width,
        height
      } = elementRectForRootMargin;
      if (!skip) {
        onMove();
      }
      if (!width || !height) {
        return;
      }
      const insetTop = floor(top);
      const insetRight = floor(root2.clientWidth - (left + width));
      const insetBottom = floor(root2.clientHeight - (top + height));
      const insetLeft = floor(left);
      const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
      const options = {
        rootMargin,
        threshold: max(0, min(1, threshold)) || 1
      };
      let isFirstUpdate = true;
      function handleObserve(entries) {
        const ratio = entries[0].intersectionRatio;
        if (ratio !== threshold) {
          if (!isFirstUpdate) {
            return refresh();
          }
          if (!ratio) {
            timeoutId = setTimeout(() => {
              refresh(false, 1e-7);
            }, 1e3);
          } else {
            refresh(false, ratio);
          }
        }
        if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
          refresh();
        }
        isFirstUpdate = false;
      }
      try {
        io = new IntersectionObserver(handleObserve, {
          ...options,
          // Handle <iframe>s
          root: root2.ownerDocument
        });
      } catch (e17) {
        io = new IntersectionObserver(handleObserve, options);
      }
      io.observe(element);
    }
    refresh(true);
    return cleanup;
  }
  function autoUpdate(reference, floating, update2, options) {
    if (options === void 0) {
      options = {};
    }
    const {
      ancestorScroll = true,
      ancestorResize = true,
      elementResize = typeof ResizeObserver === "function",
      layoutShift = typeof IntersectionObserver === "function",
      animationFrame = false
    } = options;
    const referenceEl = unwrapElement(reference);
    const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.addEventListener("scroll", update2, {
        passive: true
      });
      ancestorResize && ancestor.addEventListener("resize", update2);
    });
    const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update2) : null;
    let reobserveFrame = -1;
    let resizeObserver = null;
    if (elementResize) {
      resizeObserver = new ResizeObserver((_ref) => {
        let [firstEntry] = _ref;
        if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
          resizeObserver.unobserve(floating);
          cancelAnimationFrame(reobserveFrame);
          reobserveFrame = requestAnimationFrame(() => {
            var _resizeObserver;
            (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
          });
        }
        update2();
      });
      if (referenceEl && !animationFrame) {
        resizeObserver.observe(referenceEl);
      }
      resizeObserver.observe(floating);
    }
    let frameId;
    let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
    if (animationFrame) {
      frameLoop();
    }
    function frameLoop() {
      const nextRefRect = getBoundingClientRect(reference);
      if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
        update2();
      }
      prevRefRect = nextRefRect;
      frameId = requestAnimationFrame(frameLoop);
    }
    update2();
    return () => {
      var _resizeObserver2;
      ancestors.forEach((ancestor) => {
        ancestorScroll && ancestor.removeEventListener("scroll", update2);
        ancestorResize && ancestor.removeEventListener("resize", update2);
      });
      cleanupIo == null || cleanupIo();
      (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
      resizeObserver = null;
      if (animationFrame) {
        cancelAnimationFrame(frameId);
      }
    };
  }
  var offset2 = offset;
  var shift2 = shift;
  var flip2 = flip;
  var size2 = size;
  var arrow2 = arrow;
  var computePosition2 = (reference, floating, options) => {
    const cache = /* @__PURE__ */ new Map();
    const mergedOptions = {
      platform,
      ...options
    };
    const platformWithCache = {
      ...mergedOptions.platform,
      _c: cache
    };
    return computePosition(reference, floating, {
      ...mergedOptions,
      platform: platformWithCache
    });
  };

  // node_modules/.deno/composed-offset-position@0.0.6/node_modules/composed-offset-position/dist/composed-offset-position.browser.min.mjs
  function e16(t8) {
    return i12(t8);
  }
  function r13(t8) {
    return t8.assignedSlot ? t8.assignedSlot : t8.parentNode instanceof ShadowRoot ? t8.parentNode.host : t8.parentNode;
  }
  function i12(e17) {
    for (let t8 = e17; t8; t8 = r13(t8)) if (t8 instanceof Element && "none" === getComputedStyle(t8).display) return null;
    for (let n12 = r13(e17); n12; n12 = r13(n12)) {
      if (!(n12 instanceof Element)) continue;
      const e18 = getComputedStyle(n12);
      if ("contents" !== e18.display) {
        if ("static" !== e18.position || isContainingBlock(e18)) return n12;
        if ("BODY" === n12.tagName) return n12;
      }
    }
    return null;
  }

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.5JY5FUCG.js
  function isVirtualElement(e17) {
    return e17 !== null && typeof e17 === "object" && "getBoundingClientRect" in e17 && ("contextElement" in e17 ? e17.contextElement instanceof Element : true);
  }
  var SlPopup = class extends ShoelaceElement {
    constructor() {
      super(...arguments);
      this.localize = new LocalizeController2(this);
      this.active = false;
      this.placement = "top";
      this.strategy = "absolute";
      this.distance = 0;
      this.skidding = 0;
      this.arrow = false;
      this.arrowPlacement = "anchor";
      this.arrowPadding = 10;
      this.flip = false;
      this.flipFallbackPlacements = "";
      this.flipFallbackStrategy = "best-fit";
      this.flipPadding = 0;
      this.shift = false;
      this.shiftPadding = 0;
      this.autoSizePadding = 0;
      this.hoverBridge = false;
      this.updateHoverBridge = () => {
        if (this.hoverBridge && this.anchorEl) {
          const anchorRect = this.anchorEl.getBoundingClientRect();
          const popupRect = this.popup.getBoundingClientRect();
          const isVertical = this.placement.includes("top") || this.placement.includes("bottom");
          let topLeftX = 0;
          let topLeftY = 0;
          let topRightX = 0;
          let topRightY = 0;
          let bottomLeftX = 0;
          let bottomLeftY = 0;
          let bottomRightX = 0;
          let bottomRightY = 0;
          if (isVertical) {
            if (anchorRect.top < popupRect.top) {
              topLeftX = anchorRect.left;
              topLeftY = anchorRect.bottom;
              topRightX = anchorRect.right;
              topRightY = anchorRect.bottom;
              bottomLeftX = popupRect.left;
              bottomLeftY = popupRect.top;
              bottomRightX = popupRect.right;
              bottomRightY = popupRect.top;
            } else {
              topLeftX = popupRect.left;
              topLeftY = popupRect.bottom;
              topRightX = popupRect.right;
              topRightY = popupRect.bottom;
              bottomLeftX = anchorRect.left;
              bottomLeftY = anchorRect.top;
              bottomRightX = anchorRect.right;
              bottomRightY = anchorRect.top;
            }
          } else {
            if (anchorRect.left < popupRect.left) {
              topLeftX = anchorRect.right;
              topLeftY = anchorRect.top;
              topRightX = popupRect.left;
              topRightY = popupRect.top;
              bottomLeftX = anchorRect.right;
              bottomLeftY = anchorRect.bottom;
              bottomRightX = popupRect.left;
              bottomRightY = popupRect.bottom;
            } else {
              topLeftX = popupRect.right;
              topLeftY = popupRect.top;
              topRightX = anchorRect.left;
              topRightY = anchorRect.top;
              bottomLeftX = popupRect.right;
              bottomLeftY = popupRect.bottom;
              bottomRightX = anchorRect.left;
              bottomRightY = anchorRect.bottom;
            }
          }
          this.style.setProperty("--hover-bridge-top-left-x", `${topLeftX}px`);
          this.style.setProperty("--hover-bridge-top-left-y", `${topLeftY}px`);
          this.style.setProperty("--hover-bridge-top-right-x", `${topRightX}px`);
          this.style.setProperty("--hover-bridge-top-right-y", `${topRightY}px`);
          this.style.setProperty("--hover-bridge-bottom-left-x", `${bottomLeftX}px`);
          this.style.setProperty("--hover-bridge-bottom-left-y", `${bottomLeftY}px`);
          this.style.setProperty("--hover-bridge-bottom-right-x", `${bottomRightX}px`);
          this.style.setProperty("--hover-bridge-bottom-right-y", `${bottomRightY}px`);
        }
      };
    }
    async connectedCallback() {
      super.connectedCallback();
      await this.updateComplete;
      this.start();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.stop();
    }
    async updated(changedProps) {
      super.updated(changedProps);
      if (changedProps.has("active")) {
        if (this.active) {
          this.start();
        } else {
          this.stop();
        }
      }
      if (changedProps.has("anchor")) {
        this.handleAnchorChange();
      }
      if (this.active) {
        await this.updateComplete;
        this.reposition();
      }
    }
    async handleAnchorChange() {
      await this.stop();
      if (this.anchor && typeof this.anchor === "string") {
        const root2 = this.getRootNode();
        this.anchorEl = root2.getElementById(this.anchor);
      } else if (this.anchor instanceof Element || isVirtualElement(this.anchor)) {
        this.anchorEl = this.anchor;
      } else {
        this.anchorEl = this.querySelector('[slot="anchor"]');
      }
      if (this.anchorEl instanceof HTMLSlotElement) {
        this.anchorEl = this.anchorEl.assignedElements({ flatten: true })[0];
      }
      if (this.anchorEl && this.active) {
        this.start();
      }
    }
    start() {
      if (!this.anchorEl || !this.active) {
        return;
      }
      this.cleanup = autoUpdate(this.anchorEl, this.popup, () => {
        this.reposition();
      });
    }
    async stop() {
      return new Promise((resolve) => {
        if (this.cleanup) {
          this.cleanup();
          this.cleanup = void 0;
          this.removeAttribute("data-current-placement");
          this.style.removeProperty("--auto-size-available-width");
          this.style.removeProperty("--auto-size-available-height");
          requestAnimationFrame(() => resolve());
        } else {
          resolve();
        }
      });
    }
    /** Forces the popup to recalculate and reposition itself. */
    reposition() {
      if (!this.active || !this.anchorEl) {
        return;
      }
      const middleware = [
        // The offset middleware goes first
        offset2({ mainAxis: this.distance, crossAxis: this.skidding })
      ];
      if (this.sync) {
        middleware.push(
          size2({
            apply: ({ rects }) => {
              const syncWidth = this.sync === "width" || this.sync === "both";
              const syncHeight = this.sync === "height" || this.sync === "both";
              this.popup.style.width = syncWidth ? `${rects.reference.width}px` : "";
              this.popup.style.height = syncHeight ? `${rects.reference.height}px` : "";
            }
          })
        );
      } else {
        this.popup.style.width = "";
        this.popup.style.height = "";
      }
      if (this.flip) {
        middleware.push(
          flip2({
            boundary: this.flipBoundary,
            // @ts-expect-error - We're converting a string attribute to an array here
            fallbackPlacements: this.flipFallbackPlacements,
            fallbackStrategy: this.flipFallbackStrategy === "best-fit" ? "bestFit" : "initialPlacement",
            padding: this.flipPadding
          })
        );
      }
      if (this.shift) {
        middleware.push(
          shift2({
            boundary: this.shiftBoundary,
            padding: this.shiftPadding
          })
        );
      }
      if (this.autoSize) {
        middleware.push(
          size2({
            boundary: this.autoSizeBoundary,
            padding: this.autoSizePadding,
            apply: ({ availableWidth, availableHeight }) => {
              if (this.autoSize === "vertical" || this.autoSize === "both") {
                this.style.setProperty("--auto-size-available-height", `${availableHeight}px`);
              } else {
                this.style.removeProperty("--auto-size-available-height");
              }
              if (this.autoSize === "horizontal" || this.autoSize === "both") {
                this.style.setProperty("--auto-size-available-width", `${availableWidth}px`);
              } else {
                this.style.removeProperty("--auto-size-available-width");
              }
            }
          })
        );
      } else {
        this.style.removeProperty("--auto-size-available-width");
        this.style.removeProperty("--auto-size-available-height");
      }
      if (this.arrow) {
        middleware.push(
          arrow2({
            element: this.arrowEl,
            padding: this.arrowPadding
          })
        );
      }
      const getOffsetParent2 = this.strategy === "absolute" ? (element) => platform.getOffsetParent(element, e16) : platform.getOffsetParent;
      computePosition2(this.anchorEl, this.popup, {
        placement: this.placement,
        middleware,
        strategy: this.strategy,
        platform: __spreadProps(__spreadValues({}, platform), {
          getOffsetParent: getOffsetParent2
        })
      }).then(({ x: x3, y: y5, middlewareData, placement }) => {
        const isRtl = this.localize.dir() === "rtl";
        const staticSide = { top: "bottom", right: "left", bottom: "top", left: "right" }[placement.split("-")[0]];
        this.setAttribute("data-current-placement", placement);
        Object.assign(this.popup.style, {
          left: `${x3}px`,
          top: `${y5}px`
        });
        if (this.arrow) {
          const arrowX = middlewareData.arrow.x;
          const arrowY = middlewareData.arrow.y;
          let top = "";
          let right = "";
          let bottom = "";
          let left = "";
          if (this.arrowPlacement === "start") {
            const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
            top = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
            right = isRtl ? value : "";
            left = isRtl ? "" : value;
          } else if (this.arrowPlacement === "end") {
            const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
            right = isRtl ? "" : value;
            left = isRtl ? value : "";
            bottom = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          } else if (this.arrowPlacement === "center") {
            left = typeof arrowX === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
            top = typeof arrowY === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
          } else {
            left = typeof arrowX === "number" ? `${arrowX}px` : "";
            top = typeof arrowY === "number" ? `${arrowY}px` : "";
          }
          Object.assign(this.arrowEl.style, {
            top,
            right,
            bottom,
            left,
            [staticSide]: "calc(var(--arrow-size-diagonal) * -1)"
          });
        }
      });
      requestAnimationFrame(() => this.updateHoverBridge());
      this.emit("sl-reposition");
    }
    render() {
      return x2`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${e14({
        "popup-hover-bridge": true,
        "popup-hover-bridge--visible": this.hoverBridge && this.active
      })}
      ></span>

      <div
        part="popup"
        class=${e14({
        popup: true,
        "popup--active": this.active,
        "popup--fixed": this.strategy === "fixed",
        "popup--has-arrow": this.arrow
      })}
      >
        <slot></slot>
        ${this.arrow ? x2`<div part="arrow" class="popup__arrow" role="presentation"></div>` : ""}
      </div>
    `;
    }
  };
  SlPopup.styles = [component_styles_default, popup_styles_default];
  __decorateClass2([
    e11(".popup")
  ], SlPopup.prototype, "popup", 2);
  __decorateClass2([
    e11(".popup__arrow")
  ], SlPopup.prototype, "arrowEl", 2);
  __decorateClass2([
    n8()
  ], SlPopup.prototype, "anchor", 2);
  __decorateClass2([
    n8({ type: Boolean, reflect: true })
  ], SlPopup.prototype, "active", 2);
  __decorateClass2([
    n8({ reflect: true })
  ], SlPopup.prototype, "placement", 2);
  __decorateClass2([
    n8({ reflect: true })
  ], SlPopup.prototype, "strategy", 2);
  __decorateClass2([
    n8({ type: Number })
  ], SlPopup.prototype, "distance", 2);
  __decorateClass2([
    n8({ type: Number })
  ], SlPopup.prototype, "skidding", 2);
  __decorateClass2([
    n8({ type: Boolean })
  ], SlPopup.prototype, "arrow", 2);
  __decorateClass2([
    n8({ attribute: "arrow-placement" })
  ], SlPopup.prototype, "arrowPlacement", 2);
  __decorateClass2([
    n8({ attribute: "arrow-padding", type: Number })
  ], SlPopup.prototype, "arrowPadding", 2);
  __decorateClass2([
    n8({ type: Boolean })
  ], SlPopup.prototype, "flip", 2);
  __decorateClass2([
    n8({
      attribute: "flip-fallback-placements",
      converter: {
        fromAttribute: (value) => {
          return value.split(" ").map((p5) => p5.trim()).filter((p5) => p5 !== "");
        },
        toAttribute: (value) => {
          return value.join(" ");
        }
      }
    })
  ], SlPopup.prototype, "flipFallbackPlacements", 2);
  __decorateClass2([
    n8({ attribute: "flip-fallback-strategy" })
  ], SlPopup.prototype, "flipFallbackStrategy", 2);
  __decorateClass2([
    n8({ type: Object })
  ], SlPopup.prototype, "flipBoundary", 2);
  __decorateClass2([
    n8({ attribute: "flip-padding", type: Number })
  ], SlPopup.prototype, "flipPadding", 2);
  __decorateClass2([
    n8({ type: Boolean })
  ], SlPopup.prototype, "shift", 2);
  __decorateClass2([
    n8({ type: Object })
  ], SlPopup.prototype, "shiftBoundary", 2);
  __decorateClass2([
    n8({ attribute: "shift-padding", type: Number })
  ], SlPopup.prototype, "shiftPadding", 2);
  __decorateClass2([
    n8({ attribute: "auto-size" })
  ], SlPopup.prototype, "autoSize", 2);
  __decorateClass2([
    n8()
  ], SlPopup.prototype, "sync", 2);
  __decorateClass2([
    n8({ type: Object })
  ], SlPopup.prototype, "autoSizeBoundary", 2);
  __decorateClass2([
    n8({ attribute: "auto-size-padding", type: Number })
  ], SlPopup.prototype, "autoSizePadding", 2);
  __decorateClass2([
    n8({ attribute: "hover-bridge", type: Boolean })
  ], SlPopup.prototype, "hoverBridge", 2);

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.WGYPSPL3.js
  var SlMenuItem = class extends ShoelaceElement {
    constructor() {
      super(...arguments);
      this.localize = new LocalizeController2(this);
      this.type = "normal";
      this.checked = false;
      this.value = "";
      this.loading = false;
      this.disabled = false;
      this.hasSlotController = new HasSlotController(this, "submenu");
      this.submenuController = new SubmenuController(this, this.hasSlotController);
      this.handleHostClick = (event) => {
        if (this.disabled) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      };
      this.handleMouseOver = (event) => {
        this.focus();
        event.stopPropagation();
      };
    }
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("click", this.handleHostClick);
      this.addEventListener("mouseover", this.handleMouseOver);
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("click", this.handleHostClick);
      this.removeEventListener("mouseover", this.handleMouseOver);
    }
    handleDefaultSlotChange() {
      const textLabel = this.getTextLabel();
      if (typeof this.cachedTextLabel === "undefined") {
        this.cachedTextLabel = textLabel;
        return;
      }
      if (textLabel !== this.cachedTextLabel) {
        this.cachedTextLabel = textLabel;
        this.emit("slotchange", { bubbles: true, composed: false, cancelable: false });
      }
    }
    handleCheckedChange() {
      if (this.checked && this.type !== "checkbox") {
        this.checked = false;
        console.error('The checked attribute can only be used on menu items with type="checkbox"', this);
        return;
      }
      if (this.type === "checkbox") {
        this.setAttribute("aria-checked", this.checked ? "true" : "false");
      } else {
        this.removeAttribute("aria-checked");
      }
    }
    handleDisabledChange() {
      this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }
    handleTypeChange() {
      if (this.type === "checkbox") {
        this.setAttribute("role", "menuitemcheckbox");
        this.setAttribute("aria-checked", this.checked ? "true" : "false");
      } else {
        this.setAttribute("role", "menuitem");
        this.removeAttribute("aria-checked");
      }
    }
    /** Returns a text label based on the contents of the menu item's default slot. */
    getTextLabel() {
      return getTextContent(this.defaultSlot);
    }
    isSubmenu() {
      return this.hasSlotController.test("submenu");
    }
    render() {
      const isRtl = this.localize.dir() === "rtl";
      const isSubmenuExpanded = this.submenuController.isExpanded();
      return x2`
      <div
        id="anchor"
        part="base"
        class=${e14({
        "menu-item": true,
        "menu-item--rtl": isRtl,
        "menu-item--checked": this.checked,
        "menu-item--disabled": this.disabled,
        "menu-item--loading": this.loading,
        "menu-item--has-submenu": this.isSubmenu(),
        "menu-item--submenu-expanded": isSubmenuExpanded
      })}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${isSubmenuExpanded ? true : false}"
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span part="submenu-icon" class="menu-item__chevron">
          <sl-icon name=${isRtl ? "chevron-left" : "chevron-right"} library="system" aria-hidden="true"></sl-icon>
        </span>

        ${this.submenuController.renderSubmenu()}
        ${this.loading ? x2` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> ` : ""}
      </div>
    `;
    }
  };
  SlMenuItem.styles = [component_styles_default, menu_item_styles_default];
  SlMenuItem.dependencies = {
    "sl-icon": SlIcon,
    "sl-popup": SlPopup,
    "sl-spinner": SlSpinner
  };
  __decorateClass2([
    e11("slot:not([name])")
  ], SlMenuItem.prototype, "defaultSlot", 2);
  __decorateClass2([
    e11(".menu-item")
  ], SlMenuItem.prototype, "menuItem", 2);
  __decorateClass2([
    n8()
  ], SlMenuItem.prototype, "type", 2);
  __decorateClass2([
    n8({ type: Boolean, reflect: true })
  ], SlMenuItem.prototype, "checked", 2);
  __decorateClass2([
    n8()
  ], SlMenuItem.prototype, "value", 2);
  __decorateClass2([
    n8({ type: Boolean, reflect: true })
  ], SlMenuItem.prototype, "loading", 2);
  __decorateClass2([
    n8({ type: Boolean, reflect: true })
  ], SlMenuItem.prototype, "disabled", 2);
  __decorateClass2([
    watch("checked")
  ], SlMenuItem.prototype, "handleCheckedChange", 1);
  __decorateClass2([
    watch("disabled")
  ], SlMenuItem.prototype, "handleDisabledChange", 1);
  __decorateClass2([
    watch("type")
  ], SlMenuItem.prototype, "handleTypeChange", 1);

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.HVTXQL7M.js
  SlMenuItem.define("sl-menu-item");

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.SUSCR7CI.js
  var divider_styles_default = i6`
  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`;

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.5ZSXZIE6.js
  var SlDivider = class extends ShoelaceElement {
    constructor() {
      super(...arguments);
      this.vertical = false;
    }
    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("role", "separator");
    }
    handleVerticalChange() {
      this.setAttribute("aria-orientation", this.vertical ? "vertical" : "horizontal");
    }
  };
  SlDivider.styles = [component_styles_default, divider_styles_default];
  __decorateClass2([
    n8({ type: Boolean, reflect: true })
  ], SlDivider.prototype, "vertical", 2);
  __decorateClass2([
    watch("vertical")
  ], SlDivider.prototype, "handleVerticalChange", 1);

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.IVVHNXMC.js
  SlDivider.define("sl-divider");

  // node_modules/.deno/@shoelace-style+shoelace@2.20.1/node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ZGGPD2XJ.js
  SlIcon.define("sl-icon");

  // cabinet/cabinetLayout.ts
  var CabinetLayout = class extends i4 {
    constructor() {
      super(...arguments);
      this.menu = [
        { id: 1, name: "\u0413\u043E\u043B\u043E\u0432\u043D\u0430", icon: "house-door", teg: "<welcome-view></welcome-view>" },
        { id: 0, name: "", icon: "", teg: "" },
        // Пустий елемент для розділення
        { id: 2, name: "\u0424\u0443\u043D\u043A\u0446\u0456\u0457", icon: "hammer", teg: "<functions-view></functions-view>" },
        { id: 3, name: "MCP \u0441\u0435\u0440\u0432\u0435\u0440\u044B", icon: "files", teg: "<mcp-page></mcp-page>" },
        { id: 4, name: "\u0411\u043E\u0442\u044B", icon: "robot", teg: "<bots-view></bots-view>" },
        { id: 5, name: "\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F", icon: "gear", teg: "<setting-view></setting-view>" }
      ];
      this.currentView = "<welcome-view></welcome-view>";
    }
    static {
      this.styles = i`
    .container {
      display: flex;
      height: 100vh;
    }
    .sidebar {
      width: 220px;
      height: 100vh;
      border-right: 1px solid #eee;
    }
    #content {
      flex: 1;
      padding: 2rem;
    }
  `;
    }
    handleMenuEvent(e17) {
      console.log("Menu item clicked:", e17);
      const target = e17.currentTarget;
      const value = target?.getAttribute("value") || "1";
      this.currentView = this.menu.find((item) => item.id === parseInt(value))?.teg || "<welcome-view></welcome-view>";
      this.requestUpdate();
    }
    render() {
      return x`
      <div class="container">
        <div class="sidebar">
          <sl-menu label="Menu" style="width: 220px; height: 100vh;">
            ${this.menu.map((item) => x`
              ${item.id === 0 ? x`<sl-divider></sl-divider>` : ""}
              <sl-menu-item value="${item.id}" @click=${this.handleMenuEvent.bind(this)}>
                ${item.icon ? x`<sl-icon slot="prefix" name="${item.icon}"></sl-icon>` : ""}
                ${item.name}
              </sl-menu-item>
            `)}
          </sl-menu>
        </div>
        <div id="content">
          ${o5(this.currentView)}
        </div>
      </div>
    `;
    }
  };
  __decorateClass([
    r5()
  ], CabinetLayout.prototype, "menu", 2);
  __decorateClass([
    r5()
  ], CabinetLayout.prototype, "currentView", 2);
  customElements.define("cabinet-layout", CabinetLayout);
  var root = document.getElementById("root");
  if (root) {
    root.innerHTML = "";
    root.appendChild(document.createElement("cabinet-layout"));
  }
})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
lit-html/directive.js:
lit-html/directives/unsafe-html.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
lit-html/async-directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
lit-html/static.js:
lit-html/directives/live.js:
lit-html/directives/ref.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
