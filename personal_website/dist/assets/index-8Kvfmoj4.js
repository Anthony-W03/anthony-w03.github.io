;(function () {
  const t = document.createElement("link").relList
  if (t && t.supports && t.supports("modulepreload")) return
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) n(i)
  new MutationObserver((i) => {
    for (const a of i)
      if (a.type === "childList")
        for (const l of a.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && n(l)
  }).observe(document, { childList: !0, subtree: !0 })
  function r(i) {
    const a = {}
    return (
      i.integrity && (a.integrity = i.integrity),
      i.referrerPolicy && (a.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (a.credentials = "include")
        : i.crossOrigin === "anonymous"
          ? (a.credentials = "omit")
          : (a.credentials = "same-origin"),
      a
    )
  }
  function n(i) {
    if (i.ep) return
    i.ep = !0
    const a = r(i)
    fetch(i.href, a)
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
  ue = 32,
  $e = 64,
  Ht = 128,
  Se = 256,
  gt = 512,
  ae = 1024,
  ye = 2048,
  xt = 4096,
  ce = 8192,
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
function un() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived")
}
function cn(e) {
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
        k.f & ae &&
        !(k.f & ue) &&
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
    for (var n = nr(), i = r.length, a = 0; a < i; a++) {
      var l = r[a],
        d = l.f
      d & ye ||
        (!n && l === k) ||
        (de(l, t), d & (ae | Se) && (d & se ? xr(l, xt) : At(l)))
    }
}
let kr = !1
function R(e, t = null, r) {
  if (typeof e != "object" || e === null || Ae in e) return e
  const n = Qt(e)
  if (n !== Jr && n !== $r) return e
  var i = new Map(),
    a = Vt(e),
    l = ne(0)
  a && i.set("length", ne(e.length))
  var d
  return new Proxy(e, {
    defineProperty(c, u, v) {
      ;(!("value" in v) ||
        v.configurable === !1 ||
        v.enumerable === !1 ||
        v.writable === !1) &&
        vn()
      var s = i.get(u)
      return (
        s === void 0 ? ((s = ne(v.value)), i.set(u, s)) : w(s, R(v.value, d)),
        !0
      )
    },
    deleteProperty(c, u) {
      var v = i.get(u)
      if (v === void 0) u in c && i.set(u, ne(te))
      else {
        if (a && typeof u == "string") {
          var s = i.get("length"),
            f = Number(u)
          Number.isInteger(f) && f < s.v && w(s, f)
        }
        w(v, te), ir(l)
      }
      return !0
    },
    get(c, u, v) {
      var h
      if (u === Ae) return e
      var s = i.get(u),
        f = u in c
      if (
        (s === void 0 &&
          (!f || ((h = Ne(c, u)) != null && h.writable)) &&
          ((s = ne(R(f ? c[u] : te, d))), i.set(u, s)),
        s !== void 0)
      ) {
        var g = o(s)
        return g === te ? void 0 : g
      }
      return Reflect.get(c, u, v)
    },
    getOwnPropertyDescriptor(c, u) {
      var v = Reflect.getOwnPropertyDescriptor(c, u)
      if (v && "value" in v) {
        var s = i.get(u)
        s && (v.value = o(s))
      } else if (v === void 0) {
        var f = i.get(u),
          g = f == null ? void 0 : f.v
        if (f !== void 0 && g !== te)
          return { enumerable: !0, configurable: !0, value: g, writable: !0 }
      }
      return v
    },
    has(c, u) {
      var g
      if (u === Ae) return !0
      var v = i.get(u),
        s = (v !== void 0 && v.v !== te) || Reflect.has(c, u)
      if (
        v !== void 0 ||
        (k !== null && (!s || ((g = Ne(c, u)) != null && g.writable)))
      ) {
        v === void 0 && ((v = ne(s ? R(c[u], d) : te)), i.set(u, v))
        var f = o(v)
        if (f === te) return !1
      }
      return s
    },
    set(c, u, v, s) {
      var p
      var f = i.get(u),
        g = u in c
      if (a && u === "length")
        for (var h = v; h < f.v; h += 1) {
          var m = i.get(h + "")
          m !== void 0 ? w(m, te) : h in c && ((m = ne(te)), i.set(h + "", m))
        }
      f === void 0
        ? (!g || ((p = Ne(c, u)) != null && p.writable)) &&
          ((f = ne(void 0)), w(f, R(v, d)), i.set(u, f))
        : ((g = f.v !== te), w(f, R(v, d)))
      var P = Reflect.getOwnPropertyDescriptor(c, u)
      if ((P != null && P.set && P.set.call(s, v), !g)) {
        if (a && typeof u == "string") {
          var E = i.get("length"),
            _ = Number(u)
          Number.isInteger(_) && _ >= E.v && w(E, _ + 1)
        }
        ir(l)
      }
      return !0
    },
    ownKeys(c) {
      o(l)
      var u = Reflect.ownKeys(c).filter((f) => {
        var g = i.get(f)
        return g === void 0 || g.v !== te
      })
      for (var [v, s] of i) s.v !== te && !(v in c) && u.push(v)
      return u
    },
    setPrototypeOf() {
      dn()
    },
  })
}
function ir(e, t = 1) {
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
  ie(On(e))
  try {
    Pr(e), (t = qr(e))
  } finally {
    ie(r)
  }
  return t
}
function Ar(e) {
  var t = Tr(e),
    r = (Te || e.f & Se) && e.deps !== null ? xt : ae
  de(e, r), e.equals(t) || ((e.v = t), (e.version = Ur()))
}
function Jt(e) {
  Pr(e),
    Ze(e, 0),
    de(e, Re),
    (e.v = e.children = e.deps = e.ctx = e.reactions = null)
}
function Ir(e) {
  k === null && S === null && cn(), S !== null && S.f & Se && un(), rr && sn()
}
function Dn(e, t) {
  var r = t.last
  r === null
    ? (t.last = t.first = e)
    : ((r.next = e), (e.prev = r), (t.last = e))
}
function He(e, t, r, n = !0) {
  var i = (e & $e) !== 0,
    a = k,
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
      parent: i ? null : a,
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
  var c =
    r &&
    l.deps === null &&
    l.first === null &&
    l.nodes_start === null &&
    l.teardown === null &&
    (l.f & mr) === 0
  if (!c && !i && n && (a !== null && Dn(l, a), S !== null && S.f & se)) {
    var u = S
    ;(u.children ?? (u.children = [])).push(l)
  }
  return l
}
function Ln(e) {
  const t = He(Je, null, !1)
  return de(t, ae), (t.teardown = e), t
}
function Ie(e) {
  Ir()
  var t = k !== null && (k.f & ue) !== 0 && F !== null && !F.m
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
  return He(Je | ue, e, !0, t)
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
    t.f & ue || we(t), (t = r)
  }
}
function we(e, t = !0) {
  var r = !1
  if ((t || e.f & nn) && e.nodes_start !== null) {
    for (var n = e.nodes_start, i = e.nodes_end; n !== null; ) {
      var a = n === i ? null : jt(n)
      n.remove(), (n = a)
    }
    r = !0
  }
  Nr(e, t && !r), Cr(e), Ze(e, 0), de(e, Re)
  var l = e.transitions
  if (l !== null) for (const c of l) c.stop()
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
    for (var i of e) i.out(n)
  } else t()
}
function er(e, t, r) {
  if (!(e.f & ce)) {
    if (((e.f ^= ce), e.transitions !== null))
      for (const l of e.transitions) (l.is_global || r) && t.push(l)
    for (var n = e.first; n !== null; ) {
      var i = n.next,
        a = (n.f & kt) !== 0 || (n.f & ue) !== 0
      er(n, t, a ? r : !1), (n = i)
    }
  }
}
function mt(e) {
  Lr(e, !0)
}
function Lr(e, t) {
  if (e.f & ce) {
    et(e) && Tt(e), (e.f ^= ce)
    for (var r = e.first; r !== null; ) {
      var n = r.next,
        i = (r.f & kt) !== 0 || (r.f & ue) !== 0
      Lr(r, i ? t : !1), (r = n)
    }
    if (e.transitions !== null)
      for (const a of e.transitions) (a.is_global || t) && a.in()
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
let ct = !1,
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
function ie(e) {
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
  var u
  var t = e.f
  if (t & ye) return !0
  if (t & xt) {
    var r = e.deps,
      n = (t & Se) !== 0
    if (r !== null) {
      var i,
        a,
        l = (t & gt) !== 0,
        d = n && k !== null && !Te,
        c = r.length
      if (l || d) {
        for (i = 0; i < c; i++)
          (a = r[i]),
            (l ||
              !(
                (u = a == null ? void 0 : a.reactions) != null && u.includes(e)
              )) &&
              (a.reactions ?? (a.reactions = [])).push(e)
        l && (e.f ^= gt)
      }
      for (i = 0; i < c; i++)
        if (((a = r[i]), et(a) && Ar(a), a.version > e.version)) return !0
    }
    ;(!n || (k !== null && !Te)) && de(e, ae)
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
  throw ((ct = !1), e)
}
function Gn(e) {
  return (e.f & Re) === 0 && (e.parent === null || (e.parent.f & Ht) === 0)
}
function Pt(e, t, r, n) {
  if (ct) {
    if ((r === null && (ct = !1), Gn(t))) throw e
    return
  }
  r !== null && (ct = !0)
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
    i = S,
    a = Te,
    l = fe,
    d = F,
    c = e.f
  ;(X = null),
    (re = 0),
    (be = null),
    (S = c & (ue | $e) ? null : e),
    (Te = !Oe && (c & Se) !== 0),
    (fe = null),
    (F = e.ctx)
  try {
    var u = (0, e.fn)(),
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
    return u
  } finally {
    ;(X = t), (re = r), (be = n), (S = i), (Te = a), (fe = l), (F = d)
  }
}
function Kn(e, t) {
  let r = t.reactions
  if (r !== null) {
    var n = Qr.call(r, e)
    if (n !== -1) {
      var i = r.length - 1
      i === 0 ? (r = t.reactions = null) : ((r[n] = r[i]), r.pop())
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
    de(e, ae)
    var r = k,
      n = F
    k = e
    try {
      t & wt ? Hn(e) : Nr(e), Cr(e), Mr(e)
      var i = qr(e)
      ;(e.teardown = typeof i == "function" ? i : null), (e.version = Br)
      var a = e.deps,
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
        var i = e[n]
        i.f & ae || (i.f ^= ae)
        var a = []
        Gr(i, a), Xn(a)
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
      if (!(n.f & (Re | ce)))
        try {
          et(n) &&
            (Tt(n),
            n.deps === null &&
              n.first === null &&
              n.nodes_start === null &&
              (n.teardown === null ? Or(n) : (n.fn = null)))
        } catch (i) {
          Pt(i, n, null, n.ctx)
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
    if (r & ($e | ue)) {
      if (!(r & ae)) return
      t.f ^= ae
    }
  }
  Pe.push(t)
}
function Gr(e, t) {
  var r = e.first,
    n = []
  e: for (; r !== null; ) {
    var i = r.f,
      a = (i & ue) !== 0,
      l = a && (i & ae) !== 0,
      d = r.next
    if (!l && !(i & ce))
      if (i & Je) {
        if (a) r.f ^= ae
        else
          try {
            et(r) && Tt(r)
          } catch (s) {
            Pt(s, r, null, r.ctx)
          }
        var c = r.first
        if (c !== null) {
          r = c
          continue
        }
      } else i & _r && n.push(r)
    if (d === null) {
      let s = r.parent
      for (; s !== null; ) {
        if (e === s) break e
        var u = s.next
        if (u !== null) {
          r = u
          continue e
        }
        s = s.parent
      }
    }
    r = d
  }
  for (var v = 0; v < n.length; v++) (c = n[v]), t.push(c), Gr(c, t)
}
function Kr(e) {
  var t = ft,
    r = Pe
  try {
    zr()
    const i = []
    ;(ft = Un), (Pe = i), (Ye = !1), Wr(r)
    var n = e == null ? void 0 : e()
    return (
      Bn(), (Pe.length > 0 || i.length > 0) && Kr(), (De = 0), (Qe = null), n
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
    var i = S.deps
    X === null && i !== null && i[re] === e
      ? re++
      : X === null
        ? (X = [e])
        : X.push(e),
      be !== null &&
        k !== null &&
        k.f & ae &&
        !(k.f & ue) &&
        be.includes(e) &&
        (de(k, ye), At(k))
  } else if (r && e.deps === null)
    for (var a = e, l = a.parent, d = a; l !== null; )
      if (l.f & se) {
        var c = l
        ;(d = c), (l = c.parent)
      } else {
        var u = l
        ;((v = u.deriveds) != null && v.includes(d)) ||
          (u.deriveds ?? (u.deriveds = [])).push(d)
        break
      }
  return r && ((a = e), et(a) && Ar(a)), e.v
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
        for (var i = 0; i < l.length; i++) {
          var a = l[i]
          ie(a.effect), ve(a.reaction), Et(a.fn)
        }
      } finally {
        ie(r), ve(n)
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
      for (let i in n) {
        const a = n[i].get
        if (a)
          try {
            a.call(e)
          } catch {}
      }
    }
  }
}
const Jn = ["touchstart", "touchmove"]
function $n(e) {
  return Jn.includes(e)
}
function ea(e) {
  var t = S,
    r = k
  ve(null), ie(null)
  try {
    return e()
  } finally {
    ve(t), ie(r)
  }
}
const Xr = new Set(),
  zt = new Set()
function ta(e, t, r, n) {
  function i(a) {
    if ((n.capture || Ke.call(t, a), !a.cancelBubble))
      return ea(() => r.call(this, a))
  }
  return (
    e.startsWith("pointer") || e.startsWith("touch") || e === "wheel"
      ? tr(() => {
          t.addEventListener(e, i, n)
        })
      : t.addEventListener(e, i, n),
    i
  )
}
function pe(e, t, r, n, i) {
  var a = { capture: n, passive: i },
    l = ta(e, t, r, a)
  ;(t === document.body || t === window || t === document) &&
    Ln(() => {
      t.removeEventListener(e, l, a)
    })
}
function ar(e) {
  for (var t = 0; t < e.length; t++) Xr.add(e[t])
  for (var r of zt) r(e)
}
function Ke(e) {
  var _
  var t = this,
    r = t.ownerDocument,
    n = e.type,
    i = ((_ = e.composedPath) == null ? void 0 : _.call(e)) || [],
    a = i[0] || e.target,
    l = 0,
    d = e.__root
  if (d) {
    var c = i.indexOf(d)
    if (c !== -1 && (t === document || t === window)) {
      e.__root = t
      return
    }
    var u = i.indexOf(t)
    if (u === -1) return
    c <= u && (l = c)
  }
  if (((a = i[l] || e.target), a !== t)) {
    Zr(e, "currentTarget", {
      configurable: !0,
      get() {
        return a || r
      },
    })
    var v = S,
      s = k
    ve(null), ie(null)
    try {
      for (var f, g = []; a !== null; ) {
        var h = a.assignedSlot || a.parentNode || a.host || null
        try {
          var m = a["__" + n]
          if (m !== void 0 && !a.disabled)
            if (Vt(m)) {
              var [P, ...E] = m
              P.apply(a, [e, ...E])
            } else m.call(a, e)
        } catch (p) {
          f ? g.push(p) : (f = p)
        }
        if (e.cancelBubble || h === t || h === null) break
        a = h
      }
      if (f) {
        for (let p of g)
          queueMicrotask(() => {
            throw p
          })
        throw f
      }
    } finally {
      ;(e.__root = t), delete e.currentTarget, ve(v), ie(s)
    }
  }
}
function ra(e) {
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
    i,
    a = !e.startsWith("<!>")
  return () => {
    i === void 0 && ((i = ra(a ? e : "<!>" + e)), r || (i = _t(i)))
    var l = n ? document.importNode(i, !0) : i.cloneNode(!0)
    if (r) {
      var d = _t(l),
        c = l.lastChild
      Wt(d, c)
    } else Wt(l, l)
    return l
  }
}
function na() {
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
function aa(e, t) {
  return ia(e, t)
}
const Ce = new Map()
function ia(
  e,
  { target: t, anchor: r, props: n = {}, events: i, context: a, intro: l = !0 }
) {
  Mn()
  var d = new Set(),
    c = (s) => {
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
  c(Yt(Xr)), zt.add(c)
  var u = void 0,
    v = Fn(() => {
      var s = r ?? t.appendChild(Zt())
      return (
        Ve(() => {
          if (a) {
            Be({})
            var f = F
            f.c = a
          }
          i && (n.$$events = i),
            (Gt = l),
            (u = e(s, n) || {}),
            (Gt = !0),
            a && Ue()
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
          zt.delete(c),
            s !== r && ((h = s.parentNode) == null || h.removeChild(s))
        }
      )
    })
  return oa.set(u, v), u
}
let oa = new WeakMap()
function Y(e, t, r = !1) {
  var n = e,
    i = null,
    a = null,
    l = te,
    d = r ? kt : 0,
    c = !1
  const u = (s, f = !0) => {
      ;(c = !0), v(f, s)
    },
    v = (s, f) => {
      l !== (l = s) &&
        (l
          ? (i ? mt(i) : f && (i = Ve(() => f(n))),
            a &&
              pt(a, () => {
                a = null
              }))
          : (a ? mt(a) : f && (a = Ve(() => f(n))),
            i &&
              pt(i, () => {
                i = null
              })))
    }
  $t(() => {
    ;(c = !1), t(u), c || v(null, null)
  }, d)
}
function vt(e, t) {
  return t
}
function la(e, t, r, n) {
  for (var i = [], a = t.length, l = 0; l < a; l++) er(t[l].e, i, !0)
  var d = a > 0 && i.length === 0 && r !== null
  if (d) {
    var c = r.parentNode
    Cn(c), c.append(r), n.clear(), me(e, t[0].prev, t[a - 1].next)
  }
  Dr(i, () => {
    for (var u = 0; u < a; u++) {
      var v = t[u]
      d || (n.delete(v.k), me(e, v.prev, v.next)), we(v.e, !d)
    }
  })
}
function dt(e, t, r, n, i, a = null) {
  var l = e,
    d = { flags: t, items: new Map(), first: null }
  {
    var c = e
    l = c.appendChild(Zt())
  }
  var u = null,
    v = !1
  $t(() => {
    var s = r(),
      f = Vt(s) ? s : s == null ? [] : Yt(s),
      g = f.length
    if (!(v && g === 0)) {
      v = g === 0
      {
        var h = S
        sa(f, d, l, i, t, (h.f & ce) !== 0, n)
      }
      a !== null &&
        (g === 0
          ? u
            ? mt(u)
            : (u = Ve(() => a(l)))
          : u !== null &&
            pt(u, () => {
              u = null
            })),
        r()
    }
  })
}
function sa(e, t, r, n, i, a, l, d) {
  var c = e.length,
    u = t.items,
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
  for (p = 0; p < c; p += 1) {
    if (((P = e[p]), (E = l(P, p)), (_ = u.get(E)), _ === void 0)) {
      var I = s ? s.e.nodes_start : r
      ;(g = ca(I, t, g, g === null ? t.first : g.next, P, E, p, n, i)),
        u.set(E, g),
        (h = []),
        (m = []),
        (s = g.next)
      continue
    }
    if ((ua(_, P, p), _.e.f & ce && mt(_.e), _ !== s)) {
      if (f !== void 0 && f.has(_)) {
        if (h.length < m.length) {
          var D = m[0],
            L
          g = D.prev
          var z = h[0],
            W = h[h.length - 1]
          for (L = 0; L < h.length; L += 1) ur(h[L], D, r)
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
            ur(_, s, r),
            me(t, _.prev, _.next),
            me(t, _, g === null ? t.first : g.next),
            me(t, g, _),
            (g = _)
        continue
      }
      for (h = [], m = []; s !== null && s.k !== E; )
        (a || !(s.e.f & ce)) && (f ?? (f = new Set())).add(s),
          m.push(s),
          (s = s.next)
      if (s === null) continue
      _ = s
    }
    h.push(_), (g = _), (s = _.next)
  }
  if (s !== null || f !== void 0) {
    for (var G = f === void 0 ? [] : Yt(f); s !== null; )
      (a || !(s.e.f & ce)) && G.push(s), (s = s.next)
    var J = G.length
    if (J > 0) {
      var K = c === 0 ? r : null
      la(t, G, K, u)
    }
  }
  ;(k.first = t.first && t.first.e), (k.last = g && g.e)
}
function ua(e, t, r, n) {
  wr(e.v, t), (e.i = r)
}
function ca(e, t, r, n, i, a, l, d, c, u) {
  var v = (c & mn) !== 0,
    s = (c & yn) === 0,
    f = v ? (s ? In(i) : ne(i)) : i,
    g = c & bn ? ne(l) : l,
    h = { i: g, v: f, k: a, a: null, e: null, prev: r, next: n }
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
function ur(e, t, r) {
  for (
    var n = e.next ? e.next.e.nodes_start : r,
      i = t ? t.e.nodes_start : r,
      a = e.e.nodes_start;
    a !== n;

  ) {
    var l = jt(a)
    i.before(a), (a = l)
  }
}
function me(e, t, r) {
  t === null ? (e.first = r) : ((t.next = r), (t.e.next = r && r.e)),
    r !== null && ((r.prev = t), (r.e.prev = t && t.e))
}
function q(e, t, r, n) {
  var i = e.__attributes ?? (e.__attributes = {})
  i[t] !== (i[t] = r) &&
    (t === "style" && "__styles" in e && (e.__styles = {}),
    t === "loading" && (e[on] = r),
    r == null
      ? e.removeAttribute(t)
      : typeof r != "string" && fa(e).includes(t)
        ? (e[t] = r)
        : e.setAttribute(t, r))
}
var cr = new Map()
function fa(e) {
  var t = cr.get(e.nodeName)
  if (t) return t
  cr.set(e.nodeName, (t = []))
  for (var r, n = e, i = Element.prototype; i !== n; ) {
    r = gr(n)
    for (var a in r) r[a].set && t.push(a)
    n = Qt(n)
  }
  return t
}
function je(e, t, r) {
  var n = e.__className,
    i = va(t)
  ;(n !== i || kr) &&
    (t == null ? e.removeAttribute("class") : (e.className = i),
    (e.__className = i))
}
function va(e, t) {
  return (e ?? "") + ""
}
const da = () => performance.now(),
  he = {
    tick: (e) => requestAnimationFrame(e),
    now: () => da(),
    tasks: new Set(),
  }
function Vr() {
  const e = he.now()
  he.tasks.forEach((t) => {
    t.c(e) || (he.tasks.delete(t), t.f())
  }),
    he.tasks.size !== 0 && he.tick(Vr)
}
function ha(e) {
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
function ga(e) {
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
    const [i, a] = n.split(":")
    if (!i || a === void 0) break
    const l = ga(i.trim())
    t[l] = a.trim()
  }
  return t
}
const _a = (e) => e
function Xe(e, t, r, n) {
  var i = (e & jn) !== 0,
    a = (e & En) !== 0,
    l = i && a,
    d = (e & Pn) !== 0,
    c = l ? "both" : i ? "in" : "out",
    u,
    v = t.inert,
    s,
    f
  function g() {
    var _ = S,
      p = k
    ve(null), ie(null)
    try {
      return (
        u ?? (u = r()(t, (n == null ? void 0 : n()) ?? {}, { direction: c }))
      )
    } finally {
      ve(_), ie(p)
    }
  }
  var h = {
      is_global: d,
      in() {
        var _
        if (((t.inert = v), !i)) {
          f == null || f.abort(),
            (_ = f == null ? void 0 : f.reset) == null || _.call(f)
          return
        }
        a || s == null || s.abort(),
          st(t, "introstart"),
          (s = Kt(t, g(), f, 1, () => {
            st(t, "introend"), s == null || s.abort(), (s = u = void 0)
          }))
      },
      out(_) {
        if (!a) {
          _ == null || _(), (u = void 0)
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
  if (((m.transitions ?? (m.transitions = [])).push(h), i && Gt)) {
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
function Kt(e, t, r, n, i) {
  var a = n === 1
  if (en(t)) {
    var l,
      d = !1
    return (
      tr(() => {
        if (!d) {
          var P = t({ direction: a ? "in" : "out" })
          l = Kt(e, P, r, n, i)
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
    return i(), { abort: Ge, deactivate: Ge, reset: Ge, t: () => n }
  const { delay: c = 0, css: u, tick: v, easing: s = _a } = t
  var f = []
  if (a && r === void 0 && (v && v(0, 1), u)) {
    var g = fr(u(0, 1))
    f.push(g, g)
  }
  var h = () => 1 - n,
    m = e.animate(f, { duration: c })
  return (
    (m.onfinish = () => {
      var P = (r == null ? void 0 : r.t()) ?? 1 - n
      r == null || r.abort()
      var E = n - P,
        _ = t.duration * Math.abs(E),
        p = []
      if (_ > 0) {
        if (u)
          for (
            var I = Math.ceil(_ / 16.666666666666668), D = 0;
            D <= I;
            D += 1
          ) {
            var L = P + E * s(D / I),
              z = u(L, 1 - L)
            p.push(fr(z))
          }
        ;(h = () => {
          var W = m.currentTime
          return P + E * s(W / _)
        }),
          v &&
            ha(() => {
              if (m.playState !== "running") return !1
              var W = h()
              return v(W, 1 - W), !0
            })
      }
      ;(m = e.animate(p, { duration: _, fill: "forwards" })),
        (m.onfinish = () => {
          ;(h = () => n), v == null || v(n, 1 - n), i()
        })
    }),
    {
      abort: () => {
        m && (m.cancel(), (m.effect = null), (m.onfinish = Ge))
      },
      deactivate: () => {
        i = Ge
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
      var i, a
      return (
        Sr(() => {
          ;(i = a),
            (a = []),
            tt(() => {
              e !== r(...a) &&
                (t(e, ...a), i && vr(r(...i), e) && t(null, ...i))
            })
        }),
        () => {
          tr(() => {
            a && vr(r(...a), e) && t(null, ...a)
          })
        }
      )
    }),
    e
  )
}
function pa(e = !1) {
  const t = F,
    r = t.l.u
  if (!r) return
  let n = () => Zn(t.s)
  if (e) {
    let i = 0,
      a = {}
    const l = Ee(() => {
      let d = !1
      const c = t.s
      for (const u in c) c[u] !== a[u] && ((a[u] = c[u]), (d = !0))
      return d && i++, i
    })
    n = () => o(l)
  }
  r.b.length &&
    Rn(() => {
      dr(t, n), Ft(r.b)
    }),
    Ie(() => {
      const i = tt(() => r.m.map(tn))
      return () => {
        for (const a of i) typeof a == "function" && a()
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
let ut = !1
function ma(e) {
  var t = ut
  try {
    return (ut = !1), [e(), ut]
  } finally {
    ut = t
  }
}
const ba = {
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
function ya(e, t, r) {
  return new Proxy({ props: e, exclude: t }, ba)
}
function wa(e) {
  for (var t = k, r = k; t !== null && !(t.f & (ue | $e)); ) t = t.parent
  try {
    return ie(t), e()
  } finally {
    ie(r)
  }
}
function xa(e, t, r, n) {
  var g
  var i = (r & wn) !== 0,
    a = !Fe || (r & xn) !== 0,
    l = (r & kn) !== 0
  ma(() => e[t])
  var d = Ae in e || an in e
  ;((g = Ne(e, t)) == null ? void 0 : g.set) ?? (d && l && t in e)
  var c = n,
    u = !0,
    v = () => (u && ((u = !1), (c = n)), c),
    s
  if (a)
    s = () => {
      var h = e[t]
      return h === void 0 ? v() : ((u = !0), h)
    }
  else {
    var f = wa(() => (i ? Ee : Nn)(() => e[t]))
    ;(f.f |= rn),
      (s = () => {
        var h = o(f)
        return h !== void 0 && (c = void 0), h === void 0 ? c : h
      })
  }
  return s
}
function It(e) {
  F === null && Fr(),
    Fe && F.l !== null
      ? ka(F).m.push(e)
      : Ie(() => {
          const t = tt(e)
          if (typeof t == "function") return t
        })
}
function Xt(e) {
  F === null && Fr(), It(() => () => tt(e))
}
function ka(e) {
  var t = e.l
  return t.u ?? (t.u = { a: [], b: [], m: [] })
}
const ja = "5"
typeof window < "u" &&
  (window.__svelte || (window.__svelte = { v: new Set() })).v.add(ja)
const Ea = (e) => e
function ht(e, { delay: t = 0, duration: r = 400, easing: n = Ea } = {}) {
  const i = +getComputedStyle(e).opacity
  return { delay: t, duration: r, easing: n, css: (a) => `opacity: ${a * i}` }
}
pn()
var Pa = O(
    '<div class="h-full overflow-y-auto"><div class="absolute bottom-1/3 space-y-4"><img class="h-1/2 w-full rounded-lg object-cover"> <h2 class="text-2xl font-bold text-white"> </h2> <p class="text-gray-300"> </p></div></div>'
  ),
  Ta = O(
    '<div class="flex h-full items-center justify-center text-gray-400">Hover over a project to see details</div>'
  ),
  Aa = O(
    '<div class=" mt-[5vh] flex h-[55vh] w-full flex-col rounded-lg bg-gray-800 p-6 transition-all duration-300"><div class="relative h-full w-full"><!></div></div>'
  )
function Ia(e, t) {
  Be(t, !1)
  let r = xa(t, "hoveredProject", 8)
  pa()
  var n = Aa(),
    i = b(n),
    a = b(i)
  {
    var l = (c) => {
        var u = Pa(),
          v = b(u),
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
            u,
            () => ht,
            () => ({ duration: 200 })
          ),
          Xe(
            2,
            u,
            () => ht,
            () => ({ duration: 50 })
          ),
          M(c, u)
      },
      d = (c) => {
        var u = Ta()
        Xe(
          1,
          u,
          () => ht,
          () => ({ duration: 800 })
        ),
          M(c, u)
      }
    Y(a, (c) => {
      r() ? c(l) : c(d, !1)
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
var Sa = O(
    '<div class="carousel-item absolute svelte-h8ccf6"><button><div class="absolute inset-0 flex items-center justify-center text-sm font-bold text-white"> </div></button></div>'
  ),
  Ma = (e, t, r) => !o(t) && r(),
  Ca = (e, t, r, n) => !o(t) && r.onProjectSelect(r.projects[o(n)]),
  Na = (e, t, r) => !o(t) && r(),
  Oa = O(
    '<div class="carousel-item absolute svelte-h8ccf6"><button><div class="absolute inset-0 flex items-center justify-center text-sm font-bold text-white"> </div></button></div>'
  ),
  Da = O("<button></button>"),
  La = O(
    '<div class="carousel-container mb-8 mt-auto w-full svelte-h8ccf6"><div class="carousel-content"><div class="flex items-center justify-between"><button class="carousel-nav-btn z-10 rounded-full bg-green-700 p-3 text-white shadow-lg transition-colors duration-200 hover:bg-green-600 svelte-h8ccf6" aria-label="Previous project"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button> <div class="carousel-items relative mx-4 h-[200px] flex-1 overflow-hidden svelte-h8ccf6"><div class="carousel-track absolute inset-0 flex items-center justify-center svelte-h8ccf6"><!> <div class="carousel-item absolute svelte-h8ccf6"><button><div class="absolute inset-0 flex items-center justify-center text-sm font-bold text-white"> </div></button></div> <div class="carousel-item absolute z-10 svelte-h8ccf6"><button><div class="absolute inset-0 flex items-center justify-center font-bold text-white"> </div></button></div> <div class="carousel-item absolute svelte-h8ccf6"><button><div class="absolute inset-0 flex items-center justify-center text-sm font-bold text-white"> </div></button></div> <!></div></div> <button class="carousel-nav-btn z-10 rounded-full bg-green-700 p-3 text-white shadow-lg transition-colors duration-200 hover:bg-green-600 svelte-h8ccf6" aria-label="Next project"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div> <div class="carousel-indicators flex justify-center space-x-2 svelte-h8ccf6"></div></div></div>'
  )
function Ra(e, t) {
  Be(t, !0)
  let r = Z(0),
    n = Z(!1),
    i = Z(0),
    a = Z(R([-100, 0, 100])),
    l = Z(R([0.75, 1, 0.75])),
    d = Z(R([0.6, 1, 0.6])),
    c = Z(0)
  const u = new Audio("/media/audio/projectSelect.mp3")
  ;(u.volume = 0.05),
    Ie(() => {
      v(), w(c, R(o(r)))
    })
  function v() {
    w(a, R([-100, 0, 100])),
      w(l, R([0.75, 1, 0.75])),
      w(d, R([0.6, 1, 0.6])),
      w(i, 0)
  }
  function s() {
    !Le.sfxMuted &&
      u &&
      ((u.currentTime = 0),
      u.play().catch((T) => {
        console.error("Playback failed:", T)
      }))
  }
  async function f() {
    if (o(n)) return
    w(n, !0), w(i, 1), s()
    let T = [...o(a)],
      H = [...o(l)],
      C = [...o(d)]
    const N = (o(r) + 1) % t.projects.length
    w(a, R([...T, 200])),
      w(l, R([...H, 0.5])),
      w(d, R([...C, 0])),
      await new Promise((U) => setTimeout(U, 10))
    for (let U = 0; U <= 100; U += 4) {
      const y = yt(U / 100)
      ;(o(a)[0] = T[0] - 100 * y),
        (o(a)[1] = T[1] - 100 * y),
        (o(a)[2] = T[2] - 100 * y),
        (o(a)[3] = 200 - 100 * y),
        (o(l)[0] = H[0] * (1 - y) + 0.5 * y),
        (o(l)[1] = H[1] * (1 - y) + 0.75 * y),
        (o(l)[2] = H[2] * (1 - y) + 1 * y),
        (o(l)[3] = 0.5 * (1 - y) + 0.75 * y),
        (o(d)[0] = Math.max(0, C[0] * (1 - y))),
        (o(d)[1] = Math.max(0.6, C[1] * (1 - y) + 0.6 * y)),
        (o(d)[2] = Math.max(0.6, C[2])),
        (o(d)[3] = 0 * (1 - y) + 0.6 * y),
        U >= 50 && o(c) !== N && (w(c, N), t.onProjectHover(t.projects[N])),
        await new Promise((le) => setTimeout(le, 10))
    }
    w(r, N), v(), w(n, !1), t.onProjectHover(m())
  }
  async function g() {
    if (o(n)) return
    w(n, !0), w(i, -1), s()
    let T = [...o(a)],
      H = [...o(l)],
      C = [...o(d)]
    const N = (o(r) - 1 + t.projects.length) % t.projects.length
    w(a, R([-200, ...T])),
      w(l, R([0.5, ...H])),
      w(d, R([0, ...C])),
      await new Promise((U) => setTimeout(U, 10))
    for (let U = 0; U <= 100; U += 4) {
      const y = yt(U / 100)
      ;(o(a)[0] = -200 + 100 * y),
        (o(a)[1] = T[0] + 100 * y),
        (o(a)[2] = T[1] + 100 * y),
        (o(a)[3] = T[2] + 100 * y),
        (o(l)[0] = 0.5 * (1 - y) + 0.75 * y),
        (o(l)[1] = H[0] * (1 - y) + 1 * y),
        (o(l)[2] = H[1] * (1 - y) + 0.75 * y),
        (o(l)[3] = H[2] * (1 - y) + 0.5 * y),
        (o(d)[0] = 0 * (1 - y) + 0.6 * y),
        (o(d)[1] = Math.max(0.6, C[0] * (1 - y) + 1 * y)),
        (o(d)[2] = Math.max(0.6, C[1] * (1 - y) + 0.6 * y)),
        (o(d)[3] = Math.max(0, C[2] * (1 - y))),
        U >= 50 && o(c) !== N && (w(c, N), t.onProjectHover(t.projects[N])),
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
  var p = La(),
    I = b(p),
    D = b(I),
    L = b(D)
  L.__click = g
  var z = j(L, 2),
    W = b(z),
    G = b(W)
  {
    var J = (T) => {
      var H = Sa(),
        C = b(H)
      const N = Ee(
        () => `hexagon-btn relative
                        ${(o(c) === h(-2) ? "bg-green-500" : "bg-green-700 hover:bg-green-600") ?? ""} svelte-h8ccf6`
      )
      var U = b(C),
        y = b(U)
      B(() => Q(y, t.projects[h(-2)].title)),
        B(() => {
          q(
            H,
            "style",
            `transform: translateX(${o(a)[0] ?? ""}%) scale(${o(l)[0] ?? ""}); opacity: ${o(d)[0] ?? ""};`
          ),
            je(C, o(N))
        }),
        M(T, H)
    }
    Y(G, (T) => {
      o(a).length > 3 && T(J)
    })
  }
  var K = j(G, 2),
    oe = b(K)
  const ge = Ee(
    () => `hexagon-btn relative
                      ${(o(c) === h(-1) ? "bg-green-500" : "bg-green-700 hover:bg-green-600") ?? ""} svelte-h8ccf6`
  )
  oe.__click = [Ma, n, g]
  var rt = b(oe),
    St = b(rt)
  B(() =>
    Q(St, o(n) && o(i) === 1 ? t.projects[o(r)].title : t.projects[h(-1)].title)
  )
  var Me = j(K, 2),
    xe = b(Me)
  xe.__click = [Ca, n, t, r]
  var nt = b(xe),
    at = b(nt)
  B(() =>
    Q(at, o(n) && o(i) === 1 ? t.projects[h(1)].title : t.projects[o(r)].title)
  )
  var qe = j(Me, 2),
    _e = b(qe)
  const Mt = Ee(
    () => `hexagon-btn relative
                      ${(o(c) === h(1) ? "bg-green-500" : "bg-green-700 hover:bg-green-600") ?? ""} svelte-h8ccf6`
  )
  _e.__click = [Na, n, f]
  var it = b(_e),
    Ct = b(it)
  B(() =>
    Q(Ct, o(n) && o(i) === 1 ? t.projects[h(2)].title : t.projects[h(1)].title)
  )
  var ot = j(qe, 2)
  {
    var Nt = (T) => {
      var H = Oa(),
        C = b(H)
      const N = Ee(
        () => `hexagon-btn relative
                        ${(o(c) === h(2) ? "bg-green-500" : "bg-green-700 hover:bg-green-600") ?? ""} svelte-h8ccf6`
      )
      var U = b(C),
        y = b(U)
      B(() => Q(y, t.projects[h(2)].title)),
        B(() => {
          q(
            H,
            "style",
            `transform: translateX(${o(a)[o(a).length - 1] ?? ""}%) scale(${o(l)[o(l).length - 1] ?? ""}); opacity: ${o(d)[o(d).length - 1] ?? ""};`
          ),
            je(C, o(N))
        }),
        M(T, H)
    }
    Y(ot, (T) => {
      o(a).length > 3 && T(Nt)
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
        var N = Da()
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
          `transform: translateX(${o(a)[o(a).length > 3 ? 1 : 0] ?? ""}%) scale(${o(l)[o(a).length > 3 ? 1 : 0] ?? ""}); opacity: ${o(d)[o(a).length > 3 ? 1 : 0] ?? ""};`
        ),
        je(oe, o(ge)),
        q(
          Me,
          "style",
          `transform: translateX(${o(a)[o(a).length > 3 ? 2 : 1] ?? ""}%) scale(${o(l)[o(a).length > 3 ? 2 : 1] ?? ""}); opacity: ${o(d)[o(a).length > 3 ? 2 : 1] ?? ""};`
        ),
        je(
          xe,
          `hexagon-btn relative
                      ${(o(c) === o(r) ? "bg-green-500" : "bg-green-700 hover:bg-green-600") ?? ""} svelte-h8ccf6`
        ),
        q(
          qe,
          "style",
          `transform: translateX(${o(a)[o(a).length > 3 ? 3 : 2] ?? ""}%) scale(${o(l)[o(a).length > 3 ? 3 : 2] ?? ""}); opacity: ${o(d)[o(a).length > 3 ? 3 : 2] ?? ""};`
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
ar(["click"])
var Fa = (e, t, r) => r.onClose(),
  Ha = (e, t, r) => e.key === "Enter" && r.onClose(),
  Ba = (e, t, r) => r.onClose(),
  Ua = O("<button></button>"),
  qa = O(
    '<img class="h-full w-full object-contain"> <button class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70" aria-label="Previous image"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button> <button class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70" aria-label="Next image"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button> <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2"></div>',
    1
  ),
  za = O('<img class="h-full w-full object-cover">'),
  Wa = O(
    '<section><h3 class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200">About this project</h3> <div class="prose prose-lg dark:prose-invert max-w-none"><p class="text-gray-700 dark:text-gray-300"> </p></div></section>'
  ),
  Ga = O(
    '<section><h3 class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200">Problem Statement</h3> <div class="prose prose-lg dark:prose-invert max-w-none"><p class="text-gray-700 dark:text-gray-300"> </p></div></section>'
  ),
  Ka = O(
    '<section><h3 class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200">Solution</h3> <div class="prose prose-lg dark:prose-invert max-w-none"><p class="text-gray-700 dark:text-gray-300"> </p></div></section>'
  ),
  Xa = O("<li> </li>"),
  Va = O(
    '<section><h3 class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200">Key Features</h3> <ul class="list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300"></ul></section>'
  ),
  Ya = O(
    '<section><h3 class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200">Challenges & Learnings</h3> <div class="prose prose-lg dark:prose-invert max-w-none"><p class="text-gray-700 dark:text-gray-300"> </p></div></section>'
  ),
  Qa = O(
    '<span class="rounded-full bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"> </span>'
  ),
  Za = O(
    '<section><h3 class="mb-3 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200">Technologies Used</h3> <div class="mt-3 flex flex-wrap gap-2"></div></section>'
  ),
  Ja = O(
    '<a target="_blank" rel="noopener noreferrer" class="flex items-center rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"><svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg> Live Demo</a>'
  ),
  $a = O(
    '<a target="_blank" rel="noopener noreferrer" class="flex items-center rounded-md bg-gray-800 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-900"><svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg> GitHub Repository</a>'
  ),
  ei = O(
    '<div role="dialog" aria-modal="true" aria-labelledby="modal-title" class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"><div class="absolute inset-0 bg-black/70" tabindex="0" role="button" aria-label="Close modal"></div> <div class="modal-container relative flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl dark:bg-gray-800 svelte-1lrpjpu"><div class="absolute right-4 top-4 z-10 flex flex-col items-center svelte-1lrpjpu"><button class="rounded-full bg-white/80 p-2 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700" aria-label="Close modal"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button> <span class="text-s text-gray-500 dark:text-gray-400">esc</span></div>  <div class="modal-content flex-grow overflow-y-auto svelte-1lrpjpu"><div class="relative h-72 w-full bg-gray-900 sm:h-80 md:h-96"><!></div> <div class="p-6 md:p-8"><h2 id="modal-title" class="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white"> </h2> <p class="mb-8 text-lg text-gray-700 dark:text-gray-300"> </p> <div class="space-y-8"><!> <!> <!> <!> <!> <!></div> <div class="mt-10 flex flex-wrap justify-center gap-4 border-t border-gray-200 pt-6 sm:justify-start dark:border-gray-700"><!> <!></div></div></div></div></div>'
  )
function ti(e, t) {
  Be(t, !0)
  const r = ya(t, ["$$slots", "$$events", "$$legacy"])
  let n = Z(null),
    i = Z(0)
  const a = new Audio("/media/audio/modalOpen.wav")
  a.volume = 0.05
  const l = new Audio("/media/audio/modalClose.wav")
  l.volume = 0.05
  function d() {
    var _, p
    ;(p = (_ = t.project) == null ? void 0 : _.galleryImages) != null &&
      p.length &&
      w(i, (o(i) + 1) % t.project.galleryImages.length)
  }
  function c() {
    var _, p
    ;(p = (_ = t.project) == null ? void 0 : _.galleryImages) != null &&
      p.length &&
      w(
        i,
        (o(i) - 1 + t.project.galleryImages.length) %
          t.project.galleryImages.length
      )
  }
  Ie(() => {
    t.project && w(i, 0)
  })
  function u(_) {
    var p, I, D, L
    _.key === "Escape"
      ? t.onClose()
      : _.key === "ArrowLeft" &&
          (I = (p = t.project) == null ? void 0 : p.galleryImages) != null &&
          I.length
        ? c()
        : _.key === "ArrowRight" &&
          (L = (D = t.project) == null ? void 0 : D.galleryImages) != null &&
          L.length &&
          d()
  }
  It(() => {
    document.addEventListener("keydown", u),
      (document.body.style.overflow = "hidden")
  }),
    Xt(() => {
      document.removeEventListener("keydown", u),
        (document.body.style.overflow = "")
    })
  function v() {
    !Le.sfxMuted &&
      a &&
      ((a.currentTime = 0),
      a.play().catch((_) => {
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
  var m = na(),
    P = or(m)
  {
    var E = (_) => {
      var p = ei(),
        I = b(p)
      ;(I.__click = [Fa, r, t]), (I.__keydown = [Ha, r, t])
      var D = j(I, 2),
        L = b(D),
        z = b(L)
      z.__click = [Ba, r, t]
      var W = j(L, 2),
        G = b(W),
        J = b(G)
      {
        var K = (x) => {
            var A = qa(),
              V = or(A),
              $ = j(V, 2)
            $.__click = c
            var ee = j($, 2)
            ee.__click = d
            var ke = j(ee, 2)
            dt(
              ke,
              21,
              () => t.project.galleryImages,
              vt,
              (We, ci, Dt) => {
                var lt = Ua()
                ;(lt.__click = () => w(i, R(Dt))),
                  q(lt, "aria-label", `Go to image ${Dt + 1}`),
                  B(() =>
                    je(
                      lt,
                      `h-2.5 w-2.5 rounded-full ${(Dt === o(i) ? "bg-white" : "bg-white/50") ?? ""}`
                    )
                  ),
                  M(We, lt)
              }
            ),
              B(() => {
                q(V, "src", t.project.galleryImages[o(i)]),
                  q(V, "alt", `${t.project.title} - Image ${o(i) + 1}`)
              }),
              M(x, A)
          },
          oe = (x) => {
            var A = za()
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
        at = b(nt)
      {
        var qe = (x) => {
          var A = Wa(),
            V = j(b(A), 2),
            $ = b(V),
            ee = b($)
          B(() => Q(ee, t.project.detailedDescription)), M(x, A)
        }
        Y(at, (x) => {
          t.project.detailedDescription && x(qe)
        })
      }
      var _e = j(at, 2)
      {
        var Mt = (x) => {
          var A = Ga(),
            V = j(b(A), 2),
            $ = b(V),
            ee = b($)
          B(() => Q(ee, t.project.problem)), M(x, A)
        }
        Y(_e, (x) => {
          t.project.problem && x(Mt)
        })
      }
      var it = j(_e, 2)
      {
        var Ct = (x) => {
          var A = Ka(),
            V = j(b(A), 2),
            $ = b(V),
            ee = b($)
          B(() => Q(ee, t.project.solution)), M(x, A)
        }
        Y(it, (x) => {
          t.project.solution && x(Ct)
        })
      }
      var ot = j(it, 2)
      {
        var Nt = (x) => {
          var A = Va(),
            V = j(b(A), 2)
          dt(
            V,
            21,
            () => t.project.features,
            vt,
            ($, ee) => {
              var ke = Xa(),
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
          var A = Ya(),
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
          var A = Za(),
            V = j(b(A), 2)
          dt(
            V,
            21,
            () => t.project.technologies,
            vt,
            ($, ee) => {
              var ke = Qa(),
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
          var A = Ja()
          B(() => q(A, "href", t.project.demoUrl)), M(x, A)
        }
        Y(N, (x) => {
          t.project.demoUrl && x(U)
        })
      }
      var y = j(N, 2)
      {
        var le = (x) => {
          var A = $a()
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
ar(["click", "keydown"])
var ri = O('<img alt="Background Muted" class="h-6 w-6">'),
  ni = O('<img alt="Background Unmuted" class="h-6 w-6">'),
  ai = O('<img alt="SFX Muted" class="h-6 w-6">'),
  ii = O('<img alt="SFX Unmuted" class="h-6 w-6">'),
  oi = O(
    '<div class="absolute left-4 top-4 z-50 flex flex-row gap-2"><button class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 transition hover:bg-blue-600" aria-label="Toggle Background Music"><!></button> <button class="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 transition hover:bg-green-600" aria-label="Toggle SFX"><!></button></div>'
  )
function li(e, t) {
  Be(t, !0)
  const r = "/media/images/backgroundmusic.svg",
    n = "/media/images/sfx.svg",
    i = "/media/images/mute.svg"
  let a = Z(!0)
  const l = new Audio("/media/audio/backgroundMusic.mp3")
  ;(l.volume = 0.2), (l.loop = !0)
  function d() {
    w(a, !o(a)),
      l &&
        ((l.muted = o(a)),
        o(a)
          ? l.pause()
          : l.play().catch((p) => {
              console.error("Playback failed:", p)
            }))
  }
  function c() {
    Le.sfxMuted = !Le.sfxMuted
  }
  function u(p) {
    console.log("Key pressed:", p.key),
      p.key === "m" || p.key === "M"
        ? (d(), c())
        : p.key === "b" || p.key === "B"
          ? d()
          : (p.key === "n" || p.key === "N") && c()
  }
  It(
    () => (
      document.addEventListener("keydown", u),
      () => {
        document.removeEventListener("keydown", u)
      }
    )
  )
  var v = oi(),
    s = b(v)
  s.__click = d
  var f = b(s)
  {
    var g = (p) => {
        var I = ri()
        q(I, "src", i), M(p, I)
      },
      h = (p) => {
        var I = ni()
        q(I, "src", r), M(p, I)
      }
    Y(f, (p) => {
      o(a) ? p(g) : p(h, !1)
    })
  }
  var m = j(s, 2)
  m.__click = c
  var P = b(m)
  {
    var E = (p) => {
        var I = ai()
        q(I, "src", i), M(p, I)
      },
      _ = (p) => {
        var I = ii()
        q(I, "src", n), M(p, I)
      }
    Y(P, (p) => {
      Le.sfxMuted ? p(E) : p(_, !1)
    })
  }
  M(e, v), Ue()
}
ar(["click"])
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
var si = O(
  '<main class="flex min-h-screen flex-col items-center overflow-hidden bg-gray-700 p-6"><!> <div class="relative w-full max-w-5xl flex-1"><!> <!></div> <!></main>'
)
function ui(e, t) {
  Be(t, !0)
  let r = Z(null),
    n = Z(null),
    i = Z(null)
  function a(m) {
    var P, E
    if (!o(n))
      switch (
        (["ArrowLeft", "ArrowRight", "Enter"].includes(m.key) &&
          m.preventDefault(),
        m.key)
      ) {
        case "ArrowLeft":
          ;(P = o(i)) == null || P.prev()
          break
        case "ArrowRight":
          ;(E = o(i)) == null || E.next()
          break
        case "Enter":
          o(r) && (w(n, R(o(r))), console.log(`Navigating to ${o(r).path}`))
          break
      }
  }
  It(() => {
    window.addEventListener("keydown", a), Lt.length > 0 && w(r, R(Lt[0]))
  }),
    Xt(() => {
      window.removeEventListener("keydown", a)
    })
  function l(m) {
    w(r, R(m))
  }
  function d(m) {
    w(n, R(m))
  }
  function c() {
    console.log(o(n) + " is closing"), w(n, null)
  }
  var u = si()
  pe("keydown", Bt, a)
  var v = b(u)
  li(v, {})
  var s = j(v, 2),
    f = b(s)
  Ia(f, {
    get hoveredProject() {
      return o(r)
    },
  })
  var g = j(f, 2)
  Yr(
    Ra(g, {
      projects: Lt,
      get hoveredProject() {
        return o(r)
      },
      onProjectHover: l,
      onProjectSelect: d,
    }),
    (m) => w(i, R(m)),
    () => o(i)
  )
  var h = j(s, 2)
  ti(h, {
    get project() {
      return o(n)
    },
    onClose: c,
  }),
    M(e, u),
    Ue()
}
aa(ui, { target: document.getElementById("app") })
