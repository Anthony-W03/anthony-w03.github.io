;(function () {
  const t = document.createElement("link").relList
  if (t && t.supports && t.supports("modulepreload")) return
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) n(a)
  new MutationObserver((a) => {
    for (const i of a)
      if (i.type === "childList")
        for (const l of i.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && n(l)
  }).observe(document, { childList: !0, subtree: !0 })
  function r(a) {
    const i = {}
    return (
      a.integrity && (i.integrity = a.integrity),
      a.referrerPolicy && (i.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : a.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
      i
    )
  }
  function n(a) {
    if (a.ep) return
    a.ep = !0
    const i = r(a)
    fetch(a.href, i)
  }
})()
const Rt = !1
var Vt = Array.isArray,
  Qr = Array.prototype.indexOf,
  Yt = Array.from,
  Zr = Object.defineProperty,
  Ne = Object.getOwnPropertyDescriptor,
  gr = Object.getOwnPropertyDescriptors,
  Jr = Object.prototype,
  $r = Array.prototype,
  Qt = Object.getPrototypeOf
function en(e) {
  return typeof e == "function"
}
const Ge = () => {}
function tn(e) {
  return e()
}
function Ft(e) {
  for (var t = 0; t < e.length; t++) e[t]()
}
const se = 2,
  _r = 4,
  Je = 8,
  wt = 16,
  ce = 32,
  $e = 64,
  Ht = 128,
  Se = 256,
  gt = 512,
  ie = 1024,
  ye = 2048,
  xt = 4096,
  ue = 8192,
  Re = 16384,
  pr = 32768,
  kt = 65536,
  rn = 1 << 17,
  nn = 1 << 19,
  mr = 1 << 20,
  Ae = Symbol("$state"),
  an = Symbol("legacy props"),
  on = Symbol("")
function br(e) {
  return e === this.v
}
function ln(e, t) {
  return e != e
    ? t == t
    : e !== t || (e !== null && typeof e == "object") || typeof e == "function"
}
function yr(e) {
  return !ln(e, this.v)
}
function sn(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown")
}
function cn() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived")
}
function un(e) {
  throw new Error("https://svelte.dev/e/effect_orphan")
}
function fn() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")
}
function vn() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed")
}
function dn() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed")
}
function hn() {
  throw new Error("https://svelte.dev/e/state_unsafe_local_read")
}
function gn() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation")
}
let Fe = !1,
  _n = !1
function pn() {
  Fe = !0
}
const mn = 1,
  bn = 2,
  yn = 16,
  wn = 1,
  xn = 2,
  kn = 8,
  jn = 1,
  En = 2,
  Pn = 4,
  Tn = 1,
  An = 2,
  te = Symbol()
function ne(e, t) {
  var r = { f: 0, v: e, reactions: null, equals: br, version: 0 }
  return r
}
function Z(e) {
  return Sn(ne(e))
}
function In(e, t = !1) {
  var n
  const r = ne(e)
  return (
    t || (r.equals = yr),
    Fe && F !== null && F.l !== null && ((n = F.l).s ?? (n.s = [])).push(r),
    r
  )
}
function Sn(e) {
  return S !== null && S.f & se && (fe === null ? qn([e]) : fe.push(e)), e
}
function w(e, t) {
  return (
    S !== null &&
      nr() &&
      S.f & (se | wt) &&
      (fe === null || !fe.includes(e)) &&
      gn(),
    wr(e, t)
  )
}
function wr(e, t) {
  return (
    e.equals(t) ||
      (e.v,
      (e.v = t),
      (e.version = Ur()),
      xr(e, ye),
      nr() &&
        k !== null &&
        k.f & ie &&
        !(k.f & ce) &&
        (X !== null && X.includes(e)
          ? (de(k, ye), At(k))
          : be === null
            ? zn([e])
            : be.push(e))),
    t
  )
}
function xr(e, t) {
  var r = e.reactions
  if (r !== null)
    for (var n = nr(), a = r.length, i = 0; i < a; i++) {
      var l = r[i],
        d = l.f
      d & ye ||
        (!n && l === k) ||
        (de(l, t), d & (ie | Se) && (d & se ? xr(l, xt) : At(l)))
    }
}
let kr = !1
function R(e, t = null, r) {
  if (typeof e != "object" || e === null || Ae in e) return e
  const n = Qt(e)
  if (n !== Jr && n !== $r) return e
  var a = new Map(),
    i = Vt(e),
    l = ne(0)
  i && a.set("length", ne(e.length))
  var d
  return new Proxy(e, {
    defineProperty(u, c, v) {
      ;(!("value" in v) ||
        v.configurable === !1 ||
        v.enumerable === !1 ||
        v.writable === !1) &&
        vn()
      var s = a.get(c)
      return (
        s === void 0 ? ((s = ne(v.value)), a.set(c, s)) : w(s, R(v.value, d)),
        !0
      )
    },
    deleteProperty(u, c) {
      var v = a.get(c)
      if (v === void 0) c in u && a.set(c, ne(te))
      else {
        if (i && typeof c == "string") {
          var s = a.get("length"),
            f = Number(c)
          Number.isInteger(f) && f < s.v && w(s, f)
        }
        w(v, te), ar(l)
      }
      return !0
    },
    get(u, c, v) {
      var h
      if (c === Ae) return e
      var s = a.get(c),
        f = c in u
      if (
        (s === void 0 &&
          (!f || ((h = Ne(u, c)) != null && h.writable)) &&
          ((s = ne(R(f ? u[c] : te, d))), a.set(c, s)),
        s !== void 0)
      ) {
        var g = o(s)
        return g === te ? void 0 : g
      }
      return Reflect.get(u, c, v)
    },
    getOwnPropertyDescriptor(u, c) {
      var v = Reflect.getOwnPropertyDescriptor(u, c)
      if (v && "value" in v) {
        var s = a.get(c)
        s && (v.value = o(s))
      } else if (v === void 0) {
        var f = a.get(c),
          g = f == null ? void 0 : f.v
        if (f !== void 0 && g !== te)
          return { enumerable: !0, configurable: !0, value: g, writable: !0 }
      }
      return v
    },
    has(u, c) {
      var g
      if (c === Ae) return !0
      var v = a.get(c),
        s = (v !== void 0 && v.v !== te) || Reflect.has(u, c)
      if (
        v !== void 0 ||
        (k !== null && (!s || ((g = Ne(u, c)) != null && g.writable)))
      ) {
        v === void 0 && ((v = ne(s ? R(u[c], d) : te)), a.set(c, v))
        var f = o(v)
        if (f === te) return !1
      }
      return s
    },
    set(u, c, v, s) {
      var p
      var f = a.get(c),
        g = c in u
      if (i && c === "length")
        for (var h = v; h < f.v; h += 1) {
          var m = a.get(h + "")
          m !== void 0 ? w(m, te) : h in u && ((m = ne(te)), a.set(h + "", m))
        }
      f === void 0
        ? (!g || ((p = Ne(u, c)) != null && p.writable)) &&
          ((f = ne(void 0)), w(f, R(v, d)), a.set(c, f))
        : ((g = f.v !== te), w(f, R(v, d)))
      var P = Reflect.getOwnPropertyDescriptor(u, c)
      if ((P != null && P.set && P.set.call(s, v), !g)) {
        if (i && typeof c == "string") {
          var E = a.get("length"),
            _ = Number(c)
          Number.isInteger(_) && _ >= E.v && w(E, _ + 1)
        }
        ar(l)
      }
      return !0
    },
    ownKeys(u) {
      o(l)
      var c = Reflect.ownKeys(u).filter((f) => {
        var g = a.get(f)
        return g === void 0 || g.v !== te
      })
      for (var [v, s] of a) s.v !== te && !(v in u) && c.push(v)
      return c
    },
    setPrototypeOf() {
      dn()
    },
  })
}
function ar(e, t = 1) {
  w(e, e.v + t)
}
var Bt, jr, Er
function Mn() {
  if (Bt === void 0) {
    Bt = window
    var e = Element.prototype,
      t = Node.prototype
    ;(jr = Ne(t, "firstChild").get),
      (Er = Ne(t, "nextSibling").get),
      (e.__click = void 0),
      (e.__className = ""),
      (e.__attributes = null),
      (e.__styles = null),
      (e.__e = void 0),
      (Text.prototype.__t = void 0)
  }
}
function Zt(e = "") {
  return document.createTextNode(e)
}
function _t(e) {
  return jr.call(e)
}
function jt(e) {
  return Er.call(e)
}
function b(e, t) {
  return _t(e)
}
function or(e, t) {
  {
    var r = _t(e)
    return r instanceof Comment && r.data === "" ? jt(r) : r
  }
}
function j(e, t = 1, r = !1) {
  let n = e
  for (; t--; ) n = jt(n)
  return n
}
function Cn(e) {
  e.textContent = ""
}
function Ee(e) {
  var t = se | ye
  k === null ? (t |= Se) : (k.f |= mr)
  var r = S !== null && S.f & se ? S : null
  const n = {
    children: null,
    ctx: F,
    deps: null,
    equals: br,
    f: t,
    fn: e,
    reactions: null,
    v: null,
    version: 0,
    parent: r ?? k,
  }
  return r !== null && (r.children ?? (r.children = [])).push(n), n
}
function Nn(e) {
  const t = Ee(e)
  return (t.equals = yr), t
}
function Pr(e) {
  var t = e.children
  if (t !== null) {
    e.children = null
    for (var r = 0; r < t.length; r += 1) {
      var n = t[r]
      n.f & se ? Jt(n) : we(n)
    }
  }
}
function On(e) {
  for (var t = e.parent; t !== null; ) {
    if (!(t.f & se)) return t
    t = t.parent
  }
  return null
}
function Tr(e) {
  var t,
    r = k
  ae(On(e))
  try {
    Pr(e), (t = qr(e))
  } finally {
    ae(r)
  }
  return t
}
function Ar(e) {
  var t = Tr(e),
    r = (Te || e.f & Se) && e.deps !== null ? xt : ie
  de(e, r), e.equals(t) || ((e.v = t), (e.version = Ur()))
}
function Jt(e) {
  Pr(e),
    Ze(e, 0),
    de(e, Re),
    (e.v = e.children = e.deps = e.ctx = e.reactions = null)
}
function Ir(e) {
  k === null && S === null && un(), S !== null && S.f & Se && cn(), rr && sn()
}
function Dn(e, t) {
  var r = t.last
  r === null
    ? (t.last = t.first = e)
    : ((r.next = e), (e.prev = r), (t.last = e))
}
function He(e, t, r, n = !0) {
  var a = (e & $e) !== 0,
    i = k,
    l = {
      ctx: F,
      deps: null,
      deriveds: null,
      nodes_start: null,
      nodes_end: null,
      f: e | ye,
      first: null,
      fn: t,
      last: null,
      next: null,
      parent: a ? null : i,
      prev: null,
      teardown: null,
      transitions: null,
      version: 0,
    }
  if (r) {
    var d = Oe
    try {
      lr(!0), Tt(l), (l.f |= pr)
    } catch (v) {
      throw (we(l), v)
    } finally {
      lr(d)
    }
  } else t !== null && At(l)
  var u =
    r &&
    l.deps === null &&
    l.first === null &&
    l.nodes_start === null &&
    l.teardown === null &&
    (l.f & mr) === 0
  if (!u && !a && n && (i !== null && Dn(l, i), S !== null && S.f & se)) {
    var c = S
    ;(c.children ?? (c.children = [])).push(l)
  }
  return l
}
function Ln(e) {
  const t = He(Je, null, !1)
  return de(t, ie), (t.teardown = e), t
}
function Ie(e) {
  Ir()
  var t = k !== null && (k.f & ce) !== 0 && F !== null && !F.m
  if (t) {
    var r = F
    ;(r.e ?? (r.e = [])).push({ fn: e, effect: k, reaction: S })
  } else {
    var n = Et(e)
    return n
  }
}
function Rn(e) {
  return Ir(), Sr(e)
}
function Fn(e) {
  const t = He($e, e, !0)
  return (r = {}) =>
    new Promise((n) => {
      r.outro
        ? pt(t, () => {
            we(t), n(void 0)
          })
        : (we(t), n(void 0))
    })
}
function Et(e) {
  return He(_r, e, !1)
}
function Sr(e) {
  return He(Je, e, !0)
}
function B(e) {
  return $t(e)
}
function $t(e, t = 0) {
  return He(Je | wt | t, e, !0)
}
function Ve(e, t = !0) {
  return He(Je | ce, e, !0, t)
}
function Mr(e) {
  var t = e.teardown
  if (t !== null) {
    const r = rr,
      n = S
    sr(!0), ve(null)
    try {
      t.call(null)
    } finally {
      sr(r), ve(n)
    }
  }
}
function Cr(e) {
  var t = e.deriveds
  if (t !== null) {
    e.deriveds = null
    for (var r = 0; r < t.length; r += 1) Jt(t[r])
  }
}
function Nr(e, t = !1) {
  var r = e.first
  for (e.first = e.last = null; r !== null; ) {
    var n = r.next
    we(r, t), (r = n)
  }
}
function Hn(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next
    t.f & ce || we(t), (t = r)
  }
}
function we(e, t = !0) {
  var r = !1
  if ((t || e.f & nn) && e.nodes_start !== null) {
    for (var n = e.nodes_start, a = e.nodes_end; n !== null; ) {
      var i = n === a ? null : jt(n)
      n.remove(), (n = i)
    }
    r = !0
  }
  Nr(e, t && !r), Cr(e), Ze(e, 0), de(e, Re)
  var l = e.transitions
  if (l !== null) for (const u of l) u.stop()
  Mr(e)
  var d = e.parent
  d !== null && d.first !== null && Or(e),
    (e.next =
      e.prev =
      e.teardown =
      e.ctx =
      e.deps =
      e.fn =
      e.nodes_start =
      e.nodes_end =
        null)
}
function Or(e) {
  var t = e.parent,
    r = e.prev,
    n = e.next
  r !== null && (r.next = n),
    n !== null && (n.prev = r),
    t !== null && (t.first === e && (t.first = n), t.last === e && (t.last = r))
}
function pt(e, t) {
  var r = []
  er(e, r, !0),
    Dr(r, () => {
      we(e), t && t()
    })
}
function Dr(e, t) {
  var r = e.length
  if (r > 0) {
    var n = () => --r || t()
    for (var a of e) a.out(n)
  } else t()
}
function er(e, t, r) {
  if (!(e.f & ue)) {
    if (((e.f ^= ue), e.transitions !== null))
      for (const l of e.transitions) (l.is_global || r) && t.push(l)
    for (var n = e.first; n !== null; ) {
      var a = n.next,
        i = (n.f & kt) !== 0 || (n.f & ce) !== 0
      er(n, t, i ? r : !1), (n = a)
    }
  }
}
function mt(e) {
  Lr(e, !0)
}
function Lr(e, t) {
  if (e.f & ue) {
    et(e) && Tt(e), (e.f ^= ue)
    for (var r = e.first; r !== null; ) {
      var n = r.next,
        a = (r.f & kt) !== 0 || (r.f & ce) !== 0
      Lr(r, a ? t : !1), (r = n)
    }
    if (e.transitions !== null)
      for (const i of e.transitions) (i.is_global || t) && i.in()
  }
}
let bt = !1,
  Ut = []
function Rr() {
  bt = !1
  const e = Ut.slice()
  ;(Ut = []), Ft(e)
}
function tr(e) {
  bt || ((bt = !0), queueMicrotask(Rr)), Ut.push(e)
}
function Bn() {
  bt && Rr()
}
function Fr(e) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component")
}
const Hr = 0,
  Un = 1
let ut = !1,
  ft = Hr,
  Ye = !1,
  Qe = null,
  Oe = !1,
  rr = !1
function lr(e) {
  Oe = e
}
function sr(e) {
  rr = e
}
let Pe = [],
  De = 0
let S = null
function ve(e) {
  S = e
}
let k = null
function ae(e) {
  k = e
}
let fe = null
function qn(e) {
  fe = e
}
let X = null,
  re = 0,
  be = null
function zn(e) {
  be = e
}
let Br = 1,
  Te = !1,
  F = null
function Ur() {
  return ++Br
}
function nr() {
  return !Fe || (F !== null && F.l === null)
}
function et(e) {
  var c
  var t = e.f
  if (t & ye) return !0
  if (t & xt) {
    var r = e.deps,
      n = (t & Se) !== 0
    if (r !== null) {
      var a,
        i,
        l = (t & gt) !== 0,
        d = n && k !== null && !Te,
        u = r.length
      if (l || d) {
        for (a = 0; a < u; a++)
          (i = r[a]),
            (l ||
              !(
                (c = i == null ? void 0 : i.reactions) != null && c.includes(e)
              )) &&
              (i.reactions ?? (i.reactions = [])).push(e)
        l && (e.f ^= gt)
      }
      for (a = 0; a < u; a++)
        if (((i = r[a]), et(i) && Ar(i), i.version > e.version)) return !0
    }
    ;(!n || (k !== null && !Te)) && de(e, ie)
  }
  return !1
}
function Wn(e, t) {
  for (var r = t; r !== null; ) {
    if (r.f & Ht)
      try {
        r.fn(e)
        return
      } catch {
        r.f ^= Ht
      }
    r = r.parent
  }
  throw ((ut = !1), e)
}
function Gn(e) {
  return (e.f & Re) === 0 && (e.parent === null || (e.parent.f & Ht) === 0)
}
function Pt(e, t, r, n) {
  if (ut) {
    if ((r === null && (ut = !1), Gn(t))) throw e
    return
  }
  r !== null && (ut = !0)
  {
    Wn(e, t)
    return
  }
}
function qr(e) {
  var f
  var t = X,
    r = re,
    n = be,
    a = S,
    i = Te,
    l = fe,
    d = F,
    u = e.f
  ;(X = null),
    (re = 0),
    (be = null),
    (S = u & (ce | $e) ? null : e),
    (Te = !Oe && (u & Se) !== 0),
    (fe = null),
    (F = e.ctx)
  try {
    var c = (0, e.fn)(),
      v = e.deps
    if (X !== null) {
      var s
      if ((Ze(e, re), v !== null && re > 0))
        for (v.length = re + X.length, s = 0; s < X.length; s++)
          v[re + s] = X[s]
      else e.deps = v = X
      if (!Te)
        for (s = re; s < v.length; s++)
          ((f = v[s]).reactions ?? (f.reactions = [])).push(e)
    } else v !== null && re < v.length && (Ze(e, re), (v.length = re))
    return c
  } finally {
    ;(X = t), (re = r), (be = n), (S = a), (Te = i), (fe = l), (F = d)
  }
}
function Kn(e, t) {
  let r = t.reactions
  if (r !== null) {
    var n = Qr.call(r, e)
    if (n !== -1) {
      var a = r.length - 1
      a === 0 ? (r = t.reactions = null) : ((r[n] = r[a]), r.pop())
    }
  }
  r === null &&
    t.f & se &&
    (X === null || !X.includes(t)) &&
    (de(t, xt), t.f & (Se | gt) || (t.f ^= gt), Ze(t, 0))
}
function Ze(e, t) {
  var r = e.deps
  if (r !== null) for (var n = t; n < r.length; n++) Kn(e, r[n])
}
function Tt(e) {
  var t = e.f
  if (!(t & Re)) {
    de(e, ie)
    var r = k,
      n = F
    k = e
    try {
      t & wt ? Hn(e) : Nr(e), Cr(e), Mr(e)
      var a = qr(e)
      ;(e.teardown = typeof a == "function" ? a : null), (e.version = Br)
      var i = e.deps,
        l
      Rt && _n && e.f & ye
    } catch (d) {
      Pt(d, e, r, n || e.ctx)
    } finally {
      k = r
    }
  }
}
function zr() {
  if (De > 1e3) {
    De = 0
    try {
      fn()
    } catch (e) {
      if (Qe !== null) Pt(e, Qe, null)
      else throw e
    }
  }
  De++
}
function Wr(e) {
  var t = e.length
  if (t !== 0) {
    zr()
    var r = Oe
    Oe = !0
    try {
      for (var n = 0; n < t; n++) {
        var a = e[n]
        a.f & ie || (a.f ^= ie)
        var i = []
        Gr(a, i), Xn(i)
      }
    } finally {
      Oe = r
    }
  }
}
function Xn(e) {
  var t = e.length
  if (t !== 0)
    for (var r = 0; r < t; r++) {
      var n = e[r]
      if (!(n.f & (Re | ue)))
        try {
          et(n) &&
            (Tt(n),
            n.deps === null &&
              n.first === null &&
              n.nodes_start === null &&
              (n.teardown === null ? Or(n) : (n.fn = null)))
        } catch (a) {
          Pt(a, n, null, n.ctx)
        }
    }
}
function Vn() {
  if (((Ye = !1), De > 1001)) return
  const e = Pe
  ;(Pe = []), Wr(e), Ye || ((De = 0), (Qe = null))
}
function At(e) {
  ft === Hr && (Ye || ((Ye = !0), queueMicrotask(Vn))), (Qe = e)
  for (var t = e; t.parent !== null; ) {
    t = t.parent
    var r = t.f
    if (r & ($e | ce)) {
      if (!(r & ie)) return
      t.f ^= ie
    }
  }
  Pe.push(t)
}
function Gr(e, t) {
  var r = e.first,
    n = []
  e: for (; r !== null; ) {
    var a = r.f,
      i = (a & ce) !== 0,
      l = i && (a & ie) !== 0,
      d = r.next
    if (!l && !(a & ue))
      if (a & Je) {
        if (i) r.f ^= ie
        else
          try {
            et(r) && Tt(r)
          } catch (s) {
            Pt(s, r, null, r.ctx)
          }
        var u = r.first
        if (u !== null) {
          r = u
          continue
        }
      } else a & _r && n.push(r)
    if (d === null) {
      let s = r.parent
      for (; s !== null; ) {
        if (e === s) break e
        var c = s.next
        if (c !== null) {
          r = c
          continue e
        }
        s = s.parent
      }
    }
    r = d
  }
  for (var v = 0; v < n.length; v++) (u = n[v]), t.push(u), Gr(u, t)
}
function Kr(e) {
  var t = ft,
    r = Pe
  try {
    zr()
    const a = []
    ;(ft = Un), (Pe = a), (Ye = !1), Wr(r)
    var n = e == null ? void 0 : e()
    return (
      Bn(), (Pe.length > 0 || a.length > 0) && Kr(), (De = 0), (Qe = null), n
    )
  } finally {
    ;(ft = t), (Pe = r)
  }
}
async function Yn() {
  await Promise.resolve(), Kr()
}
function o(e) {
  var v
  var t = e.f,
    r = (t & se) !== 0
  if (r && t & Re) {
    var n = Tr(e)
    return Jt(e), n
  }
  if (S !== null) {
    fe !== null && fe.includes(e) && hn()
    var a = S.deps
    X === null && a !== null && a[re] === e
      ? re++
      : X === null
        ? (X = [e])
        : X.push(e),
      be !== null &&
        k !== null &&
        k.f & ie &&
        !(k.f & ce) &&
        be.includes(e) &&
        (de(k, ye), At(k))
  } else if (r && e.deps === null)
    for (var i = e, l = i.parent, d = i; l !== null; )
      if (l.f & se) {
        var u = l
        ;(d = u), (l = u.parent)
      } else {
        var c = l
        ;((v = c.deriveds) != null && v.includes(d)) ||
          (c.deriveds ?? (c.deriveds = [])).push(d)
        break
      }
  return r && ((i = e), et(i) && Ar(i)), e.v
}
function tt(e) {
  const t = S
  try {
    return (S = null), e()
  } finally {
    S = t
  }
}
const Qn = -7169
function de(e, t) {
  e.f = (e.f & Qn) | t
}
function Be(e, t = !1, r) {
  ;(F = { p: F, c: null, e: null, m: !1, s: e, x: null, l: null }),
    Fe && !t && (F.l = { s: null, u: null, r1: [], r2: ne(!1) })
}
function Ue(e) {
  const t = F
  if (t !== null) {
    e !== void 0 && (t.x = e)
    const l = t.e
    if (l !== null) {
      var r = k,
        n = S
      t.e = null
      try {
        for (var a = 0; a < l.length; a++) {
          var i = l[a]
          ae(i.effect), ve(i.reaction), Et(i.fn)
        }
      } finally {
        ae(r), ve(n)
      }
    }
    ;(F = t.p), (t.m = !0)
  }
  return e || {}
}
function Zn(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (Ae in e) qt(e)
    else if (!Array.isArray(e))
      for (let t in e) {
        const r = e[t]
        typeof r == "object" && r && Ae in r && qt(r)
      }
  }
}
function qt(e, t = new Set()) {
  if (
    typeof e == "object" &&
    e !== null &&
    !(e instanceof EventTarget) &&
    !t.has(e)
  ) {
    t.add(e), e instanceof Date && e.getTime()
    for (let n in e)
      try {
        qt(e[n], t)
      } catch {}
    const r = Qt(e)
    if (
      r !== Object.prototype &&
      r !== Array.prototype &&
      r !== Map.prototype &&
      r !== Set.prototype &&
      r !== Date.prototype
    ) {
      const n = gr(r)
      for (let a in n) {
        const i = n[a].get
        if (i)
          try {
            i.call(e)
          } catch {}
      }
    }
  }
}
const Jn = ["touchstart", "touchmove"]
function $n(e) {
  return Jn.includes(e)
}
function ei(e) {
  var t = S,
    r = k
  ve(null), ae(null)
  try {
    return e()
  } finally {
    ve(t), ae(r)
  }
}
const Xr = new Set(),
  zt = new Set()
function ti(e, t, r, n) {
  function a(i) {
    if ((n.capture || Ke.call(t, i), !i.cancelBubble))
      return ei(() => r.call(this, i))
  }
  return (
    e.startsWith("pointer") || e.startsWith("touch") || e === "wheel"
      ? tr(() => {
          t.addEventListener(e, a, n)
        })
      : t.addEventListener(e, a, n),
    a
  )
}
function pe(e, t, r, n, a) {
  var i = { capture: n, passive: a },
    l = ti(e, t, r, i)
  ;(t === document.body || t === window || t === document) &&
    Ln(() => {
      t.removeEventListener(e, l, i)
    })
}
function ir(e) {
  for (var t = 0; t < e.length; t++) Xr.add(e[t])
  for (var r of zt) r(e)
}
function Ke(e) {
  var _
  var t = this,
    r = t.ownerDocument,
    n = e.type,
    a = ((_ = e.composedPath) == null ? void 0 : _.call(e)) || [],
    i = a[0] || e.target,
    l = 0,
    d = e.__root
  if (d) {
    var u = a.indexOf(d)
    if (u !== -1 && (t === document || t === window)) {
      e.__root = t
      return
    }
    var c = a.indexOf(t)
    if (c === -1) return
    u <= c && (l = u)
  }
  if (((i = a[l] || e.target), i !== t)) {
    Zr(e, "currentTarget", {
      configurable: !0,
      get() {
        return i || r
      },
    })
    var v = S,
      s = k
    ve(null), ae(null)
    try {
      for (var f, g = []; i !== null; ) {
        var h = i.assignedSlot || i.parentNode || i.host || null
        try {
          var m = i["__" + n]
          if (m !== void 0 && !i.disabled)
            if (Vt(m)) {
              var [P, ...E] = m
              P.apply(i, [e, ...E])
            } else m.call(i, e)
        } catch (p) {
          f ? g.push(p) : (f = p)
        }
        if (e.cancelBubble || h === t || h === null) break
        i = h
      }
      if (f) {
        for (let p of g)
          queueMicrotask(() => {
            throw p
          })
        throw f
      }
    } finally {
      ;(e.__root = t), delete e.currentTarget, ve(v), ae(s)
    }
  }
}
function ri(e) {
  var t = document.createElement("template")
  return (t.innerHTML = e), t.content
}
function Wt(e, t) {
  var r = k
  r.nodes_start === null && ((r.nodes_start = e), (r.nodes_end = t))
}
function O(e, t) {
  var r = (t & Tn) !== 0,
    n = (t & An) !== 0,
    a,
    i = !e.startsWith("<!>")
  return () => {
    a === void 0 && ((a = ri(i ? e : "<!>" + e)), r || (a = _t(a)))
    var l = n ? document.importNode(a, !0) : a.cloneNode(!0)
    if (r) {
      var d = _t(l),
        u = l.lastChild
      Wt(d, u)
    } else Wt(l, l)
    return l
  }
}
function ni() {
  var e = document.createDocumentFragment(),
    t = document.createComment(""),
    r = Zt()
  return e.append(t, r), Wt(t, r), e
}
function M(e, t) {
  e !== null && e.before(t)
}
let Gt = !0
function Q(e, t) {
  var r = t == null ? "" : typeof t == "object" ? t + "" : t
  r !== (e.__t ?? (e.__t = e.nodeValue)) &&
    ((e.__t = r), (e.nodeValue = r == null ? "" : r + ""))
}
function ii(e, t) {
  return ai(e, t)
}
const Ce = new Map()
function ai(
  e,
  { target: t, anchor: r, props: n = {}, events: a, context: i, intro: l = !0 }
) {
  Mn()
  var d = new Set(),
    u = (s) => {
      for (var f = 0; f < s.length; f++) {
        var g = s[f]
        if (!d.has(g)) {
          d.add(g)
          var h = $n(g)
          t.addEventListener(g, Ke, { passive: h })
          var m = Ce.get(g)
          m === void 0
            ? (document.addEventListener(g, Ke, { passive: h }), Ce.set(g, 1))
            : Ce.set(g, m + 1)
        }
      }
    }
  u(Yt(Xr)), zt.add(u)
  var c = void 0,
    v = Fn(() => {
      var s = r ?? t.appendChild(Zt())
      return (
        Ve(() => {
          if (i) {
            Be({})
            var f = F
            f.c = i
          }
          a && (n.$$events = a),
            (Gt = l),
            (c = e(s, n) || {}),
            (Gt = !0),
            i && Ue()
        }),
        () => {
          var h
          for (var f of d) {
            t.removeEventListener(f, Ke)
            var g = Ce.get(f)
            --g === 0
              ? (document.removeEventListener(f, Ke), Ce.delete(f))
              : Ce.set(f, g)
          }
          zt.delete(u),
            s !== r && ((h = s.parentNode) == null || h.removeChild(s))
        }
      )
    })
  return oi.set(c, v), c
}
let oi = new WeakMap()
function Y(e, t, r = !1) {
  var n = e,
    a = null,
    i = null,
    l = te,
    d = r ? kt : 0,
    u = !1
  const c = (s, f = !0) => {
      ;(u = !0), v(f, s)
    },
    v = (s, f) => {
      l !== (l = s) &&
        (l
          ? (a ? mt(a) : f && (a = Ve(() => f(n))),
            i &&
              pt(i, () => {
                i = null
              }))
          : (i ? mt(i) : f && (i = Ve(() => f(n))),
            a &&
              pt(a, () => {
                a = null
              })))
    }
  $t(() => {
    ;(u = !1), t(c), u || v(null, null)
  }, d)
}
function vt(e, t) {
  return t
}
function li(e, t, r, n) {
  for (var a = [], i = t.length, l = 0; l < i; l++) er(t[l].e, a, !0)
  var d = i > 0 && a.length === 0 && r !== null
  if (d) {
    var u = r.parentNode
    Cn(u), u.append(r), n.clear(), me(e, t[0].prev, t[i - 1].next)
  }
  Dr(a, () => {
    for (var c = 0; c < i; c++) {
      var v = t[c]
      d || (n.delete(v.k), me(e, v.prev, v.next)), we(v.e, !d)
    }
  })
}
function dt(e, t, r, n, a, i = null) {
  var l = e,
    d = { flags: t, items: new Map(), first: null }
  {
    var u = e
    l = u.appendChild(Zt())
  }
  var c = null,
    v = !1
  $t(() => {
    var s = r(),
      f = Vt(s) ? s : s == null ? [] : Yt(s),
      g = f.length
    if (!(v && g === 0)) {
      v = g === 0
      {
        var h = S
        si(f, d, l, a, t, (h.f & ue) !== 0, n)
      }
      i !== null &&
        (g === 0
          ? c
            ? mt(c)
            : (c = Ve(() => i(l)))
          : c !== null &&
            pt(c, () => {
              c = null
            })),
        r()
    }
  })
}
function si(e, t, r, n, a, i, l, d) {
  var u = e.length,
    c = t.items,
    v = t.first,
    s = v,
    f,
    g = null,
    h = [],
    m = [],
    P,
    E,
    _,
    p
  for (p = 0; p < u; p += 1) {
    if (((P = e[p]), (E = l(P, p)), (_ = c.get(E)), _ === void 0)) {
      var I = s ? s.e.nodes_start : r
      ;(g = ui(I, t, g, g === null ? t.first : g.next, P, E, p, n, a)),
        c.set(E, g),
        (h = []),
        (m = []),
        (s = g.next)
      continue
    }
    if ((ci(_, P, p), _.e.f & ue && mt(_.e), _ !== s)) {
      if (f !== void 0 && f.has(_)) {
        if (h.length < m.length) {
          var D = m[0],
            L
          g = D.prev
          var z = h[0],
            W = h[h.length - 1]
          for (L = 0; L < h.length; L += 1) cr(h[L], D, r)
          for (L = 0; L < m.length; L += 1) f.delete(m[L])
          me(t, z.prev, W.next),
            me(t, g, z),
            me(t, W, D),
            (s = D),
            (g = W),
            (p -= 1),
            (h = []),
            (m = [])
        } else
          f.delete(_),
            cr(_, s, r),
            me(t, _.prev, _.next),
            me(t, _, g === null ? t.first : g.next),
            me(t, g, _),
            (g = _)
        continue
      }
      for (h = [], m = []; s !== null && s.k !== E; )
        (i || !(s.e.f & ue)) && (f ?? (f = new Set())).add(s),
          m.push(s),
          (s = s.next)
      if (s === null) continue
      _ = s
    }
    h.push(_), (g = _), (s = _.next)
  }
  if (s !== null || f !== void 0) {
    for (var G = f === void 0 ? [] : Yt(f); s !== null; )
      (i || !(s.e.f & ue)) && G.push(s), (s = s.next)
    var J = G.length
    if (J > 0) {
      var K = u === 0 ? r : null
      li(t, G, K, c)
    }
  }
  ;(k.first = t.first && t.first.e), (k.last = g && g.e)
}
function ci(e, t, r, n) {
  wr(e.v, t), (e.i = r)
}
function ui(e, t, r, n, a, i, l, d, u, c) {
  var v = (u & mn) !== 0,
    s = (u & yn) === 0,
    f = v ? (s ? In(a) : ne(a)) : a,
    g = u & bn ? ne(l) : l,
    h = { i: g, v: f, k: i, a: null, e: null, prev: r, next: n }
  try {
    return (
      (h.e = Ve(() => d(e, f, g), kr)),
      (h.e.prev = r && r.e),
      (h.e.next = n && n.e),
      r === null ? (t.first = h) : ((r.next = h), (r.e.next = h.e)),
      n !== null && ((n.prev = h), (n.e.prev = h.e)),
      h
    )
  } finally {
  }
}
function cr(e, t, r) {
  for (
    var n = e.next ? e.next.e.nodes_start : r,
      a = t ? t.e.nodes_start : r,
      i = e.e.nodes_start;
    i !== n;

  ) {
    var l = jt(i)
    a.before(i), (i = l)
  }
}
function me(e, t, r) {
  t === null ? (e.first = r) : ((t.next = r), (t.e.next = r && r.e)),
    r !== null && ((r.prev = t), (r.e.prev = t && t.e))
}
function q(e, t, r, n) {
  var a = e.__attributes ?? (e.__attributes = {})
  a[t] !== (a[t] = r) &&
    (t === "style" && "__styles" in e && (e.__styles = {}),
    t === "loading" && (e[on] = r),
    r == null
      ? e.removeAttribute(t)
      : typeof r != "string" && fi(e).includes(t)
        ? (e[t] = r)
        : e.setAttribute(t, r))
}
var ur = new Map()
function fi(e) {
  var t = ur.get(e.nodeName)
  if (t) return t
  ur.set(e.nodeName, (t = []))
  for (var r, n = e, a = Element.prototype; a !== n; ) {
    r = gr(n)
    for (var i in r) r[i].set && t.push(i)
    n = Qt(n)
  }
  return t
}
function je(e, t, r) {
  var n = e.__className,
    a = vi(t)
  ;(n !== a || kr) &&
    (t == null ? e.removeAttribute("class") : (e.className = a),
    (e.__className = a))
}
function vi(e, t) {
  return (e ?? "") + ""
}
const di = () => performance.now(),
  he = {
    tick: (e) => requestAnimationFrame(e),
    now: () => di(),
    tasks: new Set(),
  }
function Vr() {
  const e = he.now()
  he.tasks.forEach((t) => {
    t.c(e) || (he.tasks.delete(t), t.f())
  }),
    he.tasks.size !== 0 && he.tick(Vr)
}
function hi(e) {
  let t
  return (
    he.tasks.size === 0 && he.tick(Vr),
    {
      promise: new Promise((r) => {
        he.tasks.add((t = { c: e, f: r }))
      }),
      abort() {
        he.tasks.delete(t)
      },
    }
  )
}
function st(e, t) {
  e.dispatchEvent(new CustomEvent(t))
}
function gi(e) {
  if (e === "float") return "cssFloat"
  if (e === "offset") return "cssOffset"
  if (e.startsWith("--")) return e
  const t = e.split("-")
  return t.length === 1
    ? t[0]
    : t[0] +
        t
          .slice(1)
          .map((r) => r[0].toUpperCase() + r.slice(1))
          .join("")
}
function fr(e) {
  const t = {},
    r = e.split(";")
  for (const n of r) {
    const [a, i] = n.split(":")
    if (!a || i === void 0) break
    const l = gi(a.trim())
    t[l] = i.trim()
  }
  return t
}
const _i = (e) => e
function Xe(e, t, r, n) {
  var a = (e & jn) !== 0,
    i = (e & En) !== 0,
    l = a && i,
    d = (e & Pn) !== 0,
    u = l ? "both" : a ? "in" : "out",
    c,
    v = t.inert,
    s,
    f
  function g() {
    var _ = S,
      p = k
    ve(null), ae(null)
    try {
      return (
        c ?? (c = r()(t, (n == null ? void 0 : n()) ?? {}, { direction: u }))
      )
    } finally {
      ve(_), ae(p)
    }
  }
  var h = {
      is_global: d,
      in() {
        var _
        if (((t.inert = v), !a)) {
          f == null || f.abort(),
            (_ = f == null ? void 0 : f.reset) == null || _.call(f)
          return
        }
        i || s == null || s.abort(),
          st(t, "introstart"),
          (s = Kt(t, g(), f, 1, () => {
            st(t, "introend"), s == null || s.abort(), (s = c = void 0)
          }))
      },
      out(_) {
        if (!i) {
          _ == null || _(), (c = void 0)
          return
        }
        ;(t.inert = !0),
          st(t, "outrostart"),
          (f = Kt(t, g(), s, 0, () => {
            st(t, "outroend"), _ == null || _()
          }))
      },
      stop: () => {
        s == null || s.abort(), f == null || f.abort()
      },
    },
    m = k
  if (((m.transitions ?? (m.transitions = [])).push(h), a && Gt)) {
    var P = d
    if (!P) {
      for (var E = m.parent; E && E.f & kt; )
        for (; (E = E.parent) && !(E.f & wt); );
      P = !E || (E.f & pr) !== 0
    }
    P &&
      Et(() => {
        tt(() => h.in())
      })
  }
}
function Kt(e, t, r, n, a) {
  var i = n === 1
  if (en(t)) {
    var l,
      d = !1
    return (
      tr(() => {
        if (!d) {
          var P = t({ direction: i ? "in" : "out" })
          l = Kt(e, P, r, n, a)
        }
      }),
      {
        abort: () => {
          ;(d = !0), l == null || l.abort()
        },
        deactivate: () => l.deactivate(),
        reset: () => l.reset(),
        t: () => l.t(),
      }
    )
  }
  if ((r == null || r.deactivate(), !(t != null && t.duration)))
    return a(), { abort: Ge, deactivate: Ge, reset: Ge, t: () => n }
  const { delay: u = 0, css: c, tick: v, easing: s = _i } = t
  var f = []
  if (i && r === void 0 && (v && v(0, 1), c)) {
    var g = fr(c(0, 1))
    f.push(g, g)
  }
  var h = () => 1 - n,
    m = e.animate(f, { duration: u })
  return (
    (m.onfinish = () => {
      var P = (r == null ? void 0 : r.t()) ?? 1 - n
      r == null || r.abort()
      var E = n - P,
        _ = t.duration * Math.abs(E),
        p = []
      if (_ > 0) {
        if (c)
          for (
            var I = Math.ceil(_ / 16.666666666666668), D = 0;
            D <= I;
            D += 1
          ) {
            var L = P + E * s(D / I),
              z = c(L, 1 - L)
            p.push(fr(z))
          }
        ;(h = () => {
          var W = m.currentTime
          return P + E * s(W / _)
        }),
          v &&
            hi(() => {
              if (m.playState !== "running") return !1
              var W = h()
              return v(W, 1 - W), !0
            })
      }
      ;(m = e.animate(p, { duration: _, fill: "forwards" })),
        (m.onfinish = () => {
          ;(h = () => n), v == null || v(n, 1 - n), a()
        })
    }),
    {
      abort: () => {
        m && (m.cancel(), (m.effect = null), (m.onfinish = Ge))
      },
      deactivate: () => {
        a = Ge
      },
      reset: () => {
        n === 0 && (v == null || v(1, 0))
      },
      t: () => h(),
    }
  )
}
function vr(e, t) {
  return e === t || (e == null ? void 0 : e[Ae]) === t
}
function Yr(e = {}, t, r, n) {
  return (
    Et(() => {
      var a, i
      return (
        Sr(() => {
          ;(a = i),
            (i = []),
            tt(() => {
              e !== r(...i) &&
                (t(e, ...i), a && vr(r(...a), e) && t(null, ...a))
            })
        }),
        () => {
          tr(() => {
            i && vr(r(...i), e) && t(null, ...i)
          })
        }
      )
    }),
    e
  )
}
function pi(e = !1) {
  const t = F,
    r = t.l.u
  if (!r) return
  let n = () => Zn(t.s)
  if (e) {
    let a = 0,
      i = {}
    const l = Ee(() => {
      let d = !1
      const u = t.s
      for (const c in u) u[c] !== i[c] && ((i[c] = u[c]), (d = !0))
      return d && a++, a
    })
    n = () => o(l)
  }
  r.b.length &&
    Rn(() => {
      dr(t, n), Ft(r.b)
    }),
    Ie(() => {
      const a = tt(() => r.m.map(tn))
      return () => {
        for (const i of a) typeof i == "function" && i()
      }
    }),
    r.a.length &&
      Ie(() => {
        dr(t, n), Ft(r.a)
      })
}
function dr(e, t) {
  if (e.l.s) for (const r of e.l.s) o(r)
  t()
}
let ct = !1
function mi(e) {
  var t = ct
  try {
    return (ct = !1), [e(), ct]
  } finally {
    ct = t
  }
}
const bi = {
  get(e, t) {
    if (!e.exclude.includes(t)) return e.props[t]
  },
  set(e, t) {
    return !1
  },
  getOwnPropertyDescriptor(e, t) {
    if (!e.exclude.includes(t) && t in e.props)
      return { enumerable: !0, configurable: !0, value: e.props[t] }
  },
  has(e, t) {
    return e.exclude.includes(t) ? !1 : t in e.props
  },
  ownKeys(e) {
    return Reflect.ownKeys(e.props).filter((t) => !e.exclude.includes(t))
  },
}
function yi(e, t, r) {
  return new Proxy({ props: e, exclude: t }, bi)
}
function wi(e) {
  for (var t = k, r = k; t !== null && !(t.f & (ce | $e)); ) t = t.parent
  try {
    return ae(t), e()
  } finally {
    ae(r)
  }
}
function xi(e, t, r, n) {
  var g
  var a = (r & wn) !== 0,
    i = !Fe || (r & xn) !== 0,
    l = (r & kn) !== 0
  mi(() => e[t])
  var d = Ae in e || an in e
  ;((g = Ne(e, t)) == null ? void 0 : g.set) ?? (d && l && t in e)
  var u = n,
    c = !0,
    v = () => (c && ((c = !1), (u = n)), u),
    s
  if (i)
    s = () => {
      var h = e[t]
      return h === void 0 ? v() : ((c = !0), h)
    }
  else {
    var f = wi(() => (a ? Ee : Nn)(() => e[t]))
    ;(f.f |= rn),
      (s = () => {
        var h = o(f)
        return h !== void 0 && (u = void 0), h === void 0 ? u : h
      })
  }
  return s
}
function It(e) {
  F === null && Fr(),
    Fe && F.l !== null
      ? ki(F).m.push(e)
      : Ie(() => {
          const t = tt(e)
          if (typeof t == "function") return t
        })
}
function Xt(e) {
  F === null && Fr(), It(() => () => tt(e))
}
function ki(e) {
  var t = e.l
  return t.u ?? (t.u = { a: [], b: [], m: [] })
}
const ji = "5"
typeof window < "u" &&
  (window.__svelte || (window.__svelte = { v: new Set() })).v.add(ji)
const Ei = (e) => e
function ht(e, { delay: t = 0, duration: r = 400, easing: n = Ei } = {}) {
  const a = +getComputedStyle(e).opacity
  return { delay: t, duration: r, easing: n, css: (i) => `opacity: ${i * a}` }
}
pn()
var Pi = O(
    '<div class="h-full overflow-y-auto"><div class="absolute bottom-1/3 space-y-4"><img class="h-1/2 w-full rounded-lg object-cover"> <h2 class="text-2xl font-bold text-white"> </h2> <p class="text-gray-300"> </p></div></div>'
  ),
  Ti = O(
    '<div class="flex h-full items-center justify-center text-gray-400">Hover over a project to see details</div>'
  ),
  Ai = O(
    '<div class=" mt-[5vh] h-[55vh] flex w-full flex-col rounded-lg bg-gray-800 p-6 transition-all duration-300"><div class="relative h-full w-full"><!></div></div>'
  )
function Ii(e, t) {
  Be(t, !1)
  let r = xi(t, "hoveredProject", 8)
  pi()
  var n = Ai(),
    a = b(n),
    i = b(a)
  {
    var l = (u) => {
        var c = Pi(),
          v = b(c),
          s = b(v),
          f = j(s, 2),
          g = b(f),
          h = j(f, 2),
          m = b(h)
        B(() => {
          q(s, "src", r().imageUrl),
            q(s, "alt", r().title),
            Q(g, r().title),
            Q(m, r().description)
        }),
          Xe(
            1,
            c,
            () => ht,
            () => ({ duration: 200 })
          ),
          Xe(
            2,
            c,
            () => ht,
            () => ({ duration: 50 })
          ),
          M(u, c)
      },
      d = (u) => {
        var c = Ti()
        Xe(
          1,
          c,
          () => ht,
          () => ({ duration: 800 })
        ),
          M(u, c)
      }
    Y(i, (u) => {
      r() ? u(l) : u(d, !1)
    })
  }
  M(e, n), Ue()
}
function yt(e) {
  const t = e - 1
  return t * t * t + 1
}
let hr = Z(!1)
const Le = {
  get sfxMuted() {
    return o(hr)
  },
  set sfxMuted(e) {
    w(hr, R(e))
  },
}
var Si = O(
    '<div class="carousel-item absolute svelte-h8ccf6"><button><div class="absolute inset-0 flex items-center justify-center text-sm font-bold text-white"> </div></button></div>'
  ),
  Mi = (e, t, r) => !o(t) && r(),
  Ci = (e, t, r, n) => !o(t) && r.onProjectSelect(r.projects[o(n)]),
  Ni = (e, t, r) => !o(t) && r(),
  Oi = O(
    '<div class="carousel-item absolute svelte-h8ccf6"><button><div class="absolute inset-0 flex items-center justify-center text-sm font-bold text-white"> </div></button></div>'
  ),
  Di = O("<button></button>"),
  Li = O(
    '<div class="carousel-container mb-8 mt-auto w-full svelte-h8ccf6"><div class="carousel-content"><div class="flex items-center justify-between"><button class="carousel-nav-btn z-10 rounded-full bg-green-700 p-3 text-white shadow-lg transition-colors duration-200 hover:bg-green-600 svelte-h8ccf6" aria-label="Previous project"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button> <div class="carousel-items relative mx-4 h-[200px] flex-1 overflow-hidden svelte-h8ccf6"><div class="carousel-track absolute inset-0 flex items-center justify-center svelte-h8ccf6"><!> <div class="carousel-item absolute svelte-h8ccf6"><button><div class="absolute inset-0 flex items-center justify-center text-sm font-bold text-white"> </div></button></div> <div class="carousel-item absolute z-10 svelte-h8ccf6"><button><div class="absolute inset-0 flex items-center justify-center font-bold text-white"> </div></button></div> <div class="carousel-item absolute svelte-h8ccf6"><button><div class="absolute inset-0 flex items-center justify-center text-sm font-bold text-white"> </div></button></div> <!></div></div> <button class="carousel-nav-btn z-10 rounded-full bg-green-700 p-3 text-white shadow-lg transition-colors duration-200 hover:bg-green-600 svelte-h8ccf6" aria-label="Next project"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div> <div class="carousel-indicators flex justify-center space-x-2 svelte-h8ccf6"></div></div></div>'
  )
function Ri(e, t) {
  Be(t, !0)
  let r = Z(0),
    n = Z(!1),
    a = Z(0),
    i = Z(R([-100, 0, 100])),
    l = Z(R([0.75, 1, 0.75])),
    d = Z(R([0.6, 1, 0.6])),
    u = Z(0)
  const c = new Audio("src/media/audio/projectSelect.mp3")
  ;(c.volume = 0.05),
    Ie(() => {
      v(), w(u, R(o(r)))
    })
  function v() {
    w(i, R([-100, 0, 100])),
      w(l, R([0.75, 1, 0.75])),
      w(d, R([0.6, 1, 0.6])),
      w(a, 0)
  }
  function s() {
    !Le.sfxMuted &&
      c &&
      ((c.currentTime = 0),
      c.play().catch((T) => {
        console.error("Playback failed:", T)
      }))
  }
  async function f() {
    if (o(n)) return
    w(n, !0), w(a, 1), s()
    let T = [...o(i)],
      H = [...o(l)],
      C = [...o(d)]
    const N = (o(r) + 1) % t.projects.length
    w(i, R([...T, 200])),
      w(l, R([...H, 0.5])),
      w(d, R([...C, 0])),
      await new Promise((U) => setTimeout(U, 10))
    for (let U = 0; U <= 100; U += 4) {
      const y = yt(U / 100)
      ;(o(i)[0] = T[0] - 100 * y),
        (o(i)[1] = T[1] - 100 * y),
        (o(i)[2] = T[2] - 100 * y),
        (o(i)[3] = 200 - 100 * y),
        (o(l)[0] = H[0] * (1 - y) + 0.5 * y),
        (o(l)[1] = H[1] * (1 - y) + 0.75 * y),
        (o(l)[2] = H[2] * (1 - y) + 1 * y),
        (o(l)[3] = 0.5 * (1 - y) + 0.75 * y),
        (o(d)[0] = Math.max(0, C[0] * (1 - y))),
        (o(d)[1] = Math.max(0.6, C[1] * (1 - y) + 0.6 * y)),
        (o(d)[2] = Math.max(0.6, C[2])),
        (o(d)[3] = 0 * (1 - y) + 0.6 * y),
        U >= 50 && o(u) !== N && (w(u, N), t.onProjectHover(t.projects[N])),
        await new Promise((le) => setTimeout(le, 10))
    }
    w(r, N), v(), w(n, !1), t.onProjectHover(m())
  }
  async function g() {
    if (o(n)) return
    w(n, !0), w(a, -1), s()
    let T = [...o(i)],
      H = [...o(l)],
      C = [...o(d)]
    const N = (o(r) - 1 + t.projects.length) % t.projects.length
    w(i, R([-200, ...T])),
      w(l, R([0.5, ...H])),
      w(d, R([0, ...C])),
      await new Promise((U) => setTimeout(U, 10))
    for (let U = 0; U <= 100; U += 4) {
      const y = yt(U / 100)
      ;(o(i)[0] = -200 + 100 * y),
        (o(i)[1] = T[0] + 100 * y),
        (o(i)[2] = T[1] + 100 * y),
        (o(i)[3] = T[2] + 100 * y),
        (o(l)[0] = 0.5 * (1 - y) + 0.75 * y),
        (o(l)[1] = H[0] * (1 - y) + 1 * y),
        (o(l)[2] = H[1] * (1 - y) + 0.75 * y),
        (o(l)[3] = H[2] * (1 - y) + 0.5 * y),
        (o(d)[0] = 0 * (1 - y) + 0.6 * y),
        (o(d)[1] = Math.max(0.6, C[0] * (1 - y) + 1 * y)),
        (o(d)[2] = Math.max(0.6, C[1] * (1 - y) + 0.6 * y)),
        (o(d)[3] = Math.max(0, C[2] * (1 - y))),
        U >= 50 && o(u) !== N && (w(u, N), t.onProjectHover(t.projects[N])),
        await new Promise((le) => setTimeout(le, 10))
    }
    w(r, N), v(), w(n, !1), t.onProjectHover(m())
  }
  function h(T) {
    return (o(r) + T + t.projects.length) % t.projects.length
  }
  function m() {
    return t.projects[o(r)]
  }
  function P() {
    o(n) || f()
  }
  function E() {
    o(n) || g()
  }
  function _(T) {
    if (o(n) || T === o(r)) return
    const H = T > o(r) ? 1 : -1,
      C = Math.min(Math.abs(T - o(r)), t.projects.length - Math.abs(T - o(r)))
    if (H > 0) for (let N = 0; N < C; N++) f()
    else for (let N = 0; N < C; N++) g()
  }
  Ie(() => {
    t.projects.length > 0 && !o(n) && t.onProjectHover(t.projects[o(r)])
  })
  var p = Li(),
    I = b(p),
    D = b(I),
    L = b(D)
  L.__click = g
  var z = j(L, 2),
    W = b(z),
    G = b(W)
  {
    var J = (T) => {
      var H = Si(),
        C = b(H)
      const N = Ee(
        () => `hexagon-btn relative
                        ${(o(u) === h(-2) ? "bg-green-500" : "bg-green-700 hover:bg-green-600") ?? ""} svelte-h8ccf6`
      )
      var U = b(C),
        y = b(U)
      B(() => Q(y, t.projects[h(-2)].title)),
        B(() => {
          q(
            H,
            "style",
            `transform: translateX(${o(i)[0] ?? ""}%) scale(${o(l)[0] ?? ""}); opacity: ${o(d)[0] ?? ""};`
          ),
            je(C, o(N))
        }),
        M(T, H)
    }
    Y(G, (T) => {
      o(i).length > 3 && T(J)
    })
  }
  var K = j(G, 2),
    oe = b(K)
  const ge = Ee(
    () => `hexagon-btn relative
                      ${(o(u) === h(-1) ? "bg-green-500" : "bg-green-700 hover:bg-green-600") ?? ""} svelte-h8ccf6`
  )
  oe.__click = [Mi, n, g]
  var rt = b(oe),
    St = b(rt)
  B(() =>
    Q(St, o(n) && o(a) === 1 ? t.projects[o(r)].title : t.projects[h(-1)].title)
  )
  var Me = j(K, 2),
    xe = b(Me)
  xe.__click = [Ci, n, t, r]
  var nt = b(xe),
    it = b(nt)
  B(() =>
    Q(it, o(n) && o(a) === 1 ? t.projects[h(1)].title : t.projects[o(r)].title)
  )
  var qe = j(Me, 2),
    _e = b(qe)
  const Mt = Ee(
    () => `hexagon-btn relative
                      ${(o(u) === h(1) ? "bg-green-500" : "bg-green-700 hover:bg-green-600") ?? ""} svelte-h8ccf6`
  )
  _e.__click = [Ni, n, f]
  var at = b(_e),
    Ct = b(at)
  B(() =>
    Q(Ct, o(n) && o(a) === 1 ? t.projects[h(2)].title : t.projects[h(1)].title)
  )
  var ot = j(qe, 2)
  {
    var Nt = (T) => {
      var H = Oi(),
        C = b(H)
      const N = Ee(
        () => `hexagon-btn relative
                        ${(o(u) === h(2) ? "bg-green-500" : "bg-green-700 hover:bg-green-600") ?? ""} svelte-h8ccf6`
      )
      var U = b(C),
        y = b(U)
      B(() => Q(y, t.projects[h(2)].title)),
        B(() => {
          q(
            H,
            "style",
            `transform: translateX(${o(i)[o(i).length - 1] ?? ""}%) scale(${o(l)[o(l).length - 1] ?? ""}); opacity: ${o(d)[o(d).length - 1] ?? ""};`
          ),
            je(C, o(N))
        }),
        M(T, H)
    }
    Y(ot, (T) => {
      o(i).length > 3 && T(Nt)
    })
  }
  var ze = j(z, 2)
  ze.__click = f
  var Ot = j(D, 2)
  return (
    dt(
      Ot,
      21,
      () => t.projects,
      vt,
      (T, H, C) => {
        var N = Di()
        ;(N.__click = async () => {
          if (o(n) || C === o(r)) return
          const U = C > o(r) ? 1 : -1,
            y = Math.min(
              Math.abs(C - o(r)),
              t.projects.length - Math.abs(C - o(r))
            )
          if (U > 0) for (let le = 0; le < y; le++) await f()
          else for (let le = 0; le < y; le++) await g()
        }),
          q(N, "aria-label", `Go to project ${C + 1}`),
          B(() =>
            je(
              N,
              `h-2 w-8 rounded-full transition-colors duration-200 ${(C === o(r) ? "bg-green-500" : "bg-gray-600 hover:bg-gray-500") ?? ""}`
            )
          ),
          M(T, N)
      }
    ),
    B(() => {
      ;(L.disabled = o(n)),
        q(
          K,
          "style",
          `transform: translateX(${o(i)[o(i).length > 3 ? 1 : 0] ?? ""}%) scale(${o(l)[o(i).length > 3 ? 1 : 0] ?? ""}); opacity: ${o(d)[o(i).length > 3 ? 1 : 0] ?? ""};`
        ),
        je(oe, o(ge)),
        q(
          Me,
          "style",
          `transform: translateX(${o(i)[o(i).length > 3 ? 2 : 1] ?? ""}%) scale(${o(l)[o(i).length > 3 ? 2 : 1] ?? ""}); opacity: ${o(d)[o(i).length > 3 ? 2 : 1] ?? ""};`
        ),
        je(
          xe,
          `hexagon-btn relative
                      ${(o(u) === o(r) ? "bg-green-500" : "bg-green-700 hover:bg-green-600") ?? ""} svelte-h8ccf6`
        ),
        q(
          qe,
          "style",
          `transform: translateX(${o(i)[o(i).length > 3 ? 3 : 2] ?? ""}%) scale(${o(l)[o(i).length > 3 ? 3 : 2] ?? ""}); opacity: ${o(d)[o(i).length > 3 ? 3 : 2] ?? ""};`
        ),
        je(_e, o(Mt)),
        (ze.disabled = o(n))
    }),
    pe("mouseenter", oe, () => !o(n) && t.onProjectHover(t.projects[h(-1)])),
    pe("mouseleave", oe, () => !o(n) && t.onProjectHover(m())),
    pe("mouseenter", xe, () => !o(n) && t.onProjectHover(m())),
    pe("mouseleave", xe, () => !o(n) && t.onProjectHover(m())),
    pe("mouseenter", _e, () => !o(n) && t.onProjectHover(t.projects[h(1)])),
    pe("mouseleave", _e, () => !o(n) && t.onProjectHover(m())),
    M(e, p),
    Ue({ next: P, prev: E, goTo: _ })
  )
}
ir(["click"])
var Fi = (e, t, r) => r.onClose(),
  Hi = (e, t, r) => e.key === "Enter" && r.onClose(),
  Bi = (e, t, r) => r.onClose(),
  Ui = O("<button></button>"),
  qi = O(
    '<img class="h-full w-full object-contain"> <button class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70" aria-label="Previous image"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button> <button class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70" aria-label="Next image"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button> <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2"></div>',
    1
  ),
  zi = O('<img class="h-full w-full object-cover">'),
  Wi = O(
    '<section><h3 class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200">About this project</h3> <div class="prose prose-lg dark:prose-invert max-w-none"><p class="text-gray-700 dark:text-gray-300"> </p></div></section>'
  ),
  Gi = O(
    '<section><h3 class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200">Problem Statement</h3> <div class="prose prose-lg dark:prose-invert max-w-none"><p class="text-gray-700 dark:text-gray-300"> </p></div></section>'
  ),
  Ki = O(
    '<section><h3 class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200">Solution</h3> <div class="prose prose-lg dark:prose-invert max-w-none"><p class="text-gray-700 dark:text-gray-300"> </p></div></section>'
  ),
  Xi = O("<li> </li>"),
  Vi = O(
    '<section><h3 class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200">Key Features</h3> <ul class="list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300"></ul></section>'
  ),
  Yi = O(
    '<section><h3 class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200">Challenges & Learnings</h3> <div class="prose prose-lg dark:prose-invert max-w-none"><p class="text-gray-700 dark:text-gray-300"> </p></div></section>'
  ),
  Qi = O(
    '<span class="rounded-full bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"> </span>'
  ),
  Zi = O(
    '<section><h3 class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200">Technologies Used</h3> <div class="mt-3 flex flex-wrap gap-2"></div></section>'
  ),
  Ji = O(
    '<a target="_blank" rel="noopener noreferrer" class="flex items-center rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"><svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg> Live Demo</a>'
  ),
  $i = O(
    '<a target="_blank" rel="noopener noreferrer" class="flex items-center rounded-md bg-gray-800 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-900"><svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg> GitHub Repository</a>'
  ),
  ea = O(
    '<div role="dialog" aria-modal="true" aria-labelledby="modal-title" class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"><div class="absolute inset-0 bg-black/70" tabindex="0" role="button" aria-label="Close modal"></div> <div class="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden flex flex-col modal-container svelte-ingdci"><div class="absolute right-4 top-4 z-10 flex flex-col items-center svelte-ingdci"><button class="rounded-full bg-white/80 p-2 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700" aria-label="Close modal"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button> <span class="text-s text-gray-500 dark:text-gray-400">esc</span></div>  <div class="flex-grow overflow-y-auto modal-content svelte-ingdci"><div class="relative h-72 w-full bg-gray-900 sm:h-80 md:h-96"><!></div> <div class="p-6 md:p-8"><h2 id="modal-title" class="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white"> </h2> <p class="mb-8 text-lg text-gray-700 dark:text-gray-300"> </p> <div class="space-y-8"><!> <!> <!> <!> <!> <!></div> <div class="mt-10 flex flex-wrap justify-center gap-4 border-t border-gray-200 pt-6 sm:justify-start dark:border-gray-700"><!> <!></div></div></div></div></div>'
  )
function ta(e, t) {
  Be(t, !0)
  const r = yi(t, ["$$slots", "$$events", "$$legacy"])
  let n = Z(null),
    a = Z(0)
  const i = new Audio("src/media/audio/modalOpen.wav")
  i.volume = 0.05
  const l = new Audio("src/media/audio/modalClose.wav")
  l.volume = 0.05
  function d() {
    var _, p
    ;(p = (_ = t.project) == null ? void 0 : _.galleryImages) != null &&
      p.length &&
      w(a, (o(a) + 1) % t.project.galleryImages.length)
  }
  function u() {
    var _, p
    ;(p = (_ = t.project) == null ? void 0 : _.galleryImages) != null &&
      p.length &&
      w(
        a,
        (o(a) - 1 + t.project.galleryImages.length) %
          t.project.galleryImages.length
      )
  }
  Ie(() => {
    t.project && w(a, 0)
  })
  function c(_) {
    var p, I, D, L
    _.key === "Escape"
      ? t.onClose()
      : _.key === "ArrowLeft" &&
          (I = (p = t.project) == null ? void 0 : p.galleryImages) != null &&
          I.length
        ? u()
        : _.key === "ArrowRight" &&
          (L = (D = t.project) == null ? void 0 : D.galleryImages) != null &&
          L.length &&
          d()
  }
  It(() => {
    document.addEventListener("keydown", c),
      (document.body.style.overflow = "hidden")
  }),
    Xt(() => {
      document.removeEventListener("keydown", c),
        (document.body.style.overflow = "")
    })
  function v() {
    !Le.sfxMuted &&
      i &&
      ((i.currentTime = 0),
      i.play().catch((_) => {
        console.error("Playback failed:", _)
      }))
  }
  function s() {
    !Le.sfxMuted &&
      l &&
      ((l.currentTime = 0),
      l.play().catch((_) => {
        console.error("Playback failed:", _)
      }))
  }
  function f(_, { duration: p = 1200, easing: I = yt }) {
    const D = _.offsetWidth,
      L = _.offsetHeight,
      z = 12
    return (
      v(),
      console.log("domain expanded"),
      {
        duration: p,
        easing: I,
        css: (W) => {
          let G, J
          if (W < 0.35) {
            const K = W / 0.65
            ;(G = D * K), (J = z)
          } else {
            const K = (W - 0.65) / 0.35
            ;(G = D), (J = z + (L - z) * K)
          }
          return `
        width: ${G}px;
        height: ${J}px;
        opacity: 1;
      `
        },
      }
    )
  }
  function g(_, { duration: p = 1200, easing: I = yt }) {
    const D = _.offsetWidth,
      L = _.offsetHeight,
      z = 12
    return (
      console.log("smol"),
      {
        duration: p,
        easing: I,
        css: (W, G) => {
          let J, K, oe
          if (G > 0.35) {
            const ge = (G - 0.35) / 0.65
            ;(K = z + (L - z) * ge), (J = D), (oe = 1)
          } else {
            const ge = G / 0.35
            ;(J = D * ge), (K = z), (oe = ge)
          }
          return `
        width: ${J}px;
        height: ${K}px;
        opacity: ${oe};
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-${J / 2}px, -${K / 2}px);
        overflow: hidden;
      `
        },
      }
    )
  }
  let h = Z(!1)
  Ie(() => {
    t.project &&
      (w(h, !1),
      Yn().then(() => {
        setTimeout(() => {
          w(h, !0), o(n) && o(n).classList.add("animation-complete")
        }, 600)
      }))
  }),
    Xt(() => {
      o(n) && (o(n).classList.remove("animation-complete"), s())
    })
  var m = ni(),
    P = or(m)
  {
    var E = (_) => {
      var p = ea(),
        I = b(p)
      ;(I.__click = [Fi, r, t]), (I.__keydown = [Hi, r, t])
      var D = j(I, 2),
        L = b(D),
        z = b(L)
      z.__click = [Bi, r, t]
      var W = j(L, 2),
        G = b(W),
        J = b(G)
      {
        var K = (x) => {
            var A = qi(),
              V = or(A),
              $ = j(V, 2)
            $.__click = u
            var ee = j($, 2)
            ee.__click = d
            var ke = j(ee, 2)
            dt(
              ke,
              21,
              () => t.project.galleryImages,
              vt,
              (We, ua, Dt) => {
                var lt = Ui()
                ;(lt.__click = () => w(a, R(Dt))),
                  q(lt, "aria-label", `Go to image ${Dt + 1}`),
                  B(() =>
                    je(
                      lt,
                      `h-2.5 w-2.5 rounded-full ${(Dt === o(a) ? "bg-white" : "bg-white/50") ?? ""}`
                    )
                  ),
                  M(We, lt)
              }
            ),
              B(() => {
                q(V, "src", t.project.galleryImages[o(a)]),
                  q(V, "alt", `${t.project.title} - Image ${o(a) + 1}`)
              }),
              M(x, A)
          },
          oe = (x) => {
            var A = zi()
            B(() => {
              q(A, "src", t.project.imageUrl), q(A, "alt", t.project.title)
            }),
              M(x, A)
          }
        Y(J, (x) => {
          t.project.galleryImages.length > 0 ? x(K) : x(oe, !1)
        })
      }
      var ge = j(G, 2),
        rt = b(ge),
        St = b(rt),
        Me = j(rt, 2),
        xe = b(Me),
        nt = j(Me, 2),
        it = b(nt)
      {
        var qe = (x) => {
          var A = Wi(),
            V = j(b(A), 2),
            $ = b(V),
            ee = b($)
          B(() => Q(ee, t.project.detailedDescription)), M(x, A)
        }
        Y(it, (x) => {
          t.project.detailedDescription && x(qe)
        })
      }
      var _e = j(it, 2)
      {
        var Mt = (x) => {
          var A = Gi(),
            V = j(b(A), 2),
            $ = b(V),
            ee = b($)
          B(() => Q(ee, t.project.problem)), M(x, A)
        }
        Y(_e, (x) => {
          t.project.problem && x(Mt)
        })
      }
      var at = j(_e, 2)
      {
        var Ct = (x) => {
          var A = Ki(),
            V = j(b(A), 2),
            $ = b(V),
            ee = b($)
          B(() => Q(ee, t.project.solution)), M(x, A)
        }
        Y(at, (x) => {
          t.project.solution && x(Ct)
        })
      }
      var ot = j(at, 2)
      {
        var Nt = (x) => {
          var A = Vi(),
            V = j(b(A), 2)
          dt(
            V,
            21,
            () => t.project.features,
            vt,
            ($, ee) => {
              var ke = Xi(),
                We = b(ke)
              B(() => Q(We, o(ee))), M($, ke)
            }
          ),
            M(x, A)
        }
        Y(ot, (x) => {
          t.project.features && t.project.features.length > 0 && x(Nt)
        })
      }
      var ze = j(ot, 2)
      {
        var Ot = (x) => {
          var A = Yi(),
            V = j(b(A), 2),
            $ = b(V),
            ee = b($)
          B(() => Q(ee, t.project.challenges)), M(x, A)
        }
        Y(ze, (x) => {
          t.project.challenges && x(Ot)
        })
      }
      var T = j(ze, 2)
      {
        var H = (x) => {
          var A = Zi(),
            V = j(b(A), 2)
          dt(
            V,
            21,
            () => t.project.technologies,
            vt,
            ($, ee) => {
              var ke = Qi(),
                We = b(ke)
              B(() => Q(We, o(ee))), M($, ke)
            }
          ),
            M(x, A)
        }
        Y(T, (x) => {
          t.project.technologies && t.project.technologies.length > 0 && x(H)
        })
      }
      var C = j(nt, 2),
        N = b(C)
      {
        var U = (x) => {
          var A = Ji()
          B(() => q(A, "href", t.project.demoUrl)), M(x, A)
        }
        Y(N, (x) => {
          t.project.demoUrl && x(U)
        })
      }
      var y = j(N, 2)
      {
        var le = (x) => {
          var A = $i()
          B(() => q(A, "href", t.project.githubUrl)), M(x, A)
        }
        Y(y, (x) => {
          t.project.githubUrl && x(le)
        })
      }
      Yr(
        D,
        (x) => w(n, x),
        () => o(n)
      ),
        B(() => {
          Q(St, t.project.title), Q(xe, t.project.description)
        }),
        pe("outroend", D, () => t.onClose()),
        Xe(
          1,
          D,
          () => f,
          () => ({ duration: 1e3 })
        ),
        Xe(
          3,
          p,
          () => ht,
          () => ({ duration: 200 })
        ),
        M(_, p)
    }
    Y(P, (_) => {
      t.project && _(E)
    })
  }
  return M(e, m), Ue({ shrinkAnimation: g })
}
ir(["click", "keydown"])
var ra = O('<img alt="Background Muted" class="w-6 h-6">'),
  na = O('<img alt="Background Unmuted" class="w-6 h-6">'),
  ia = O('<img alt="SFX Muted" class="w-6 h-6">'),
  aa = O('<img alt="SFX Unmuted" class="w-6 h-6">'),
  oa = O(
    '<div class="absolute top-4 left-4 flex flex-row gap-2 z-50"><button class="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition" aria-label="Toggle Background Music"><!></button> <button class="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition" aria-label="Toggle SFX"><!></button></div>'
  )
function la(e, t) {
  Be(t, !0)
  const r = "src/media/images/backgroundmusic.svg",
    n = "src/media/images/sfx.svg",
    a = "src/media/images/mute.svg"
  let i = Z(!0)
  const l = new Audio("src/media/audio/backgroundMusic.mp3")
  ;(l.volume = 0.2), (l.loop = !0)
  function d() {
    w(i, !o(i)),
      l &&
        ((l.muted = o(i)),
        o(i)
          ? l.pause()
          : l.play().catch((p) => {
              console.error("Playback failed:", p)
            }))
  }
  function u() {
    Le.sfxMuted = !Le.sfxMuted
  }
  function c(p) {
    console.log("Key pressed:", p.key),
      p.key === "m" || p.key === "M"
        ? (d(), u())
        : p.key === "b" || p.key === "B"
          ? d()
          : (p.key === "n" || p.key === "N") && u()
  }
  It(
    () => (
      document.addEventListener("keydown", c),
      () => {
        document.removeEventListener("keydown", c)
      }
    )
  )
  var v = oa(),
    s = b(v)
  s.__click = d
  var f = b(s)
  {
    var g = (p) => {
        var I = ra()
        q(I, "src", a), M(p, I)
      },
      h = (p) => {
        var I = na()
        q(I, "src", r), M(p, I)
      }
    Y(f, (p) => {
      o(i) ? p(g) : p(h, !1)
    })
  }
  var m = j(s, 2)
  m.__click = u
  var P = b(m)
  {
    var E = (p) => {
        var I = ia()
        q(I, "src", a), M(p, I)
      },
      _ = (p) => {
        var I = aa()
        q(I, "src", n), M(p, I)
      }
    Y(P, (p) => {
      Le.sfxMuted ? p(E) : p(_, !1)
    })
  }
  M(e, v), Ue()
}
ir(["click"])
const Lt = [
  {
    id: "1",
    title: "Project A",
    description: "A revolutionary project that showcases innovative technology",
    imageUrl: "/placeholder-image-1.jpg",
    path: "/project-alpha",
    detailedDescription:
      "This project was developed to solve a critical problem in the industry. It leverages cutting-edge technology to provide a seamless user experience while maintaining high performance and scalability.",
    problem:
      "Traditional solutions in this space were slow, inefficient, and difficult to use, leading to poor user adoption and wasted resources.",
    solution:
      "We designed a modern architecture using microservices and real-time data processing to create a responsive and intuitive platform that addresses all key pain points.",
    challenges:
      "The biggest challenge was optimizing performance while handling large datasets. We implemented advanced caching strategies and database optimizations to achieve sub-second response times.",
    technologies: [
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Docker",
      "AWS",
    ],
    features: [
      "Real-time data visualization",
      "Collaborative editing",
      "Advanced search capabilities",
      "Automated reporting",
      "Custom workflow automation",
    ],
    githubUrl: "https://github.com/yourusername/project-a",
    galleryImages: [
      "/placeholder-image-1.jpg",
      "/placeholder-image-2.jpg",
      "/placeholder-image-3.jpg",
    ],
  },
  {
    id: "2",
    title: "Project B",
    description: "Exploring the boundaries of what's possible",
    imageUrl: "/placeholder-image-2.jpg",
    path: "/project-beta",
    detailedDescription:
      "Project B is an experimental platform that pushes the boundaries of web technology. It demonstrates how modern frameworks and innovative approaches can create unique user experiences.",
    problem:
      "Conventional web applications often follow the same patterns, leading to predictable and sometimes uninspiring user experiences.",
    solution:
      "By combining cutting-edge animation techniques, 3D rendering, and interactive elements, we've created an immersive digital experience that engages users in new ways.",
    challenges:
      "Balancing performance with visual complexity was a significant challenge. We implemented progressive enhancement techniques to ensure the experience scales well across different devices.",
    technologies: ["Three.js", "WebGL", "Svelte", "GSAP", "WebAssembly"],
    features: [
      "Interactive 3D visualizations",
      "Physics-based animations",
      "Gesture-controlled interface",
      "Audio-reactive elements",
      "Accessibility features for all users",
    ],
    githubUrl: "https://github.com/yourusername/project-b",
    galleryImages: [
      "/placeholder-image-2.jpg",
      "/placeholder-image-1.jpg",
      "/placeholder-image-3.jpg",
    ],
  },
  {
    id: "3",
    title: "Project C",
    description: "Pushing the envelope of development",
    imageUrl: "/placeholder-image-3.jpg",
    path: "/project-gamma",
    detailedDescription:
      "Project C is a comprehensive solution for data analysis and visualization. It helps organizations make sense of complex datasets through intuitive interfaces and powerful processing capabilities.",
    problem:
      "Data analysis tools are often either too complex for non-technical users or too limited for advanced analysis needs.",
    solution:
      "We've created a platform that scales in complexity based on user expertise, providing both simple dashboards and advanced analysis tools in one cohesive system.",
    challenges:
      "Creating an interface that works for both beginners and experts required careful UX research and multiple iterations based on user feedback.",
    technologies: [
      "D3.js",
      "Python",
      "Flask",
      "PostgreSQL",
      "Redis",
      "TensorFlow",
    ],
    features: [
      "Customizable dashboards",
      "Machine learning insights",
      "Data transformation tools",
      "Export and sharing options",
      "Automated report generation",
    ],
    githubUrl: "https://github.com/yourusername/project-c",
    galleryImages: [
      "/placeholder-image-3.jpg",
      "/placeholder-image-1.jpg",
      "/placeholder-image-2.jpg",
    ],
  },
]
var sa = O(
  '<main class="flex min-h-screen flex-col items-center overflow-hidden bg-gray-700 p-6"><!> <div class="relative w-full max-w-5xl flex-1"><!> <!></div> <!></main>'
)
function ca(e, t) {
  Be(t, !0)
  let r = Z(null),
    n = Z(null),
    a = Z(null)
  function i(m) {
    var P, E
    if (!o(n))
      switch (
        (["ArrowLeft", "ArrowRight", "Enter"].includes(m.key) &&
          m.preventDefault(),
        m.key)
      ) {
        case "ArrowLeft":
          ;(P = o(a)) == null || P.prev()
          break
        case "ArrowRight":
          ;(E = o(a)) == null || E.next()
          break
        case "Enter":
          o(r) && (w(n, R(o(r))), console.log(`Navigating to ${o(r).path}`))
          break
      }
  }
  It(() => {
    window.addEventListener("keydown", i), Lt.length > 0 && w(r, R(Lt[0]))
  }),
    Xt(() => {
      window.removeEventListener("keydown", i)
    })
  function l(m) {
    w(r, R(m))
  }
  function d(m) {
    w(n, R(m))
  }
  function u() {
    console.log(o(n) + " is closing"), w(n, null)
  }
  var c = sa()
  pe("keydown", Bt, i)
  var v = b(c)
  la(v, {})
  var s = j(v, 2),
    f = b(s)
  Ii(f, {
    get hoveredProject() {
      return o(r)
    },
  })
  var g = j(f, 2)
  Yr(
    Ri(g, {
      projects: Lt,
      get hoveredProject() {
        return o(r)
      },
      onProjectHover: l,
      onProjectSelect: d,
    }),
    (m) => w(a, R(m)),
    () => o(a)
  )
  var h = j(s, 2)
  ta(h, {
    get project() {
      return o(n)
    },
    onClose: u,
  }),
    M(e, c),
    Ue()
}
ii(ca, { target: document.getElementById("app") })
