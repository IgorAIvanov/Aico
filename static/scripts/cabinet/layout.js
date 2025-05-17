(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // node_modules/.deno/hono@4.7.9/node_modules/hono/dist/jsx/constants.js
  var DOM_RENDERER = Symbol("RENDERER");
  var DOM_ERROR_HANDLER = Symbol("ERROR_HANDLER");
  var DOM_STASH = Symbol("STASH");
  var DOM_INTERNAL_TAG = Symbol("INTERNAL");
  var DOM_MEMO = Symbol("MEMO");
  var PERMALINK = Symbol("PERMALINK");

  // node_modules/.deno/hono@4.7.9/node_modules/hono/dist/jsx/dom/utils.js
  var setInternalTagFlag = (fn) => {
    ;
    fn[DOM_INTERNAL_TAG] = true;
    return fn;
  };

  // node_modules/.deno/hono@4.7.9/node_modules/hono/dist/jsx/dom/context.js
  var createContextProviderFunction = (values) => ({ value, children }) => {
    if (!children) {
      return void 0;
    }
    const props = {
      children: [
        {
          tag: setInternalTagFlag(() => {
            values.push(value);
          }),
          props: {}
        }
      ]
    };
    if (Array.isArray(children)) {
      props.children.push(...children.flat());
    } else {
      props.children.push(children);
    }
    props.children.push({
      tag: setInternalTagFlag(() => {
        values.pop();
      }),
      props: {}
    });
    const res = { tag: "", props, type: "" };
    res[DOM_ERROR_HANDLER] = (err) => {
      values.pop();
      throw err;
    };
    return res;
  };
  var createContext = (defaultValue) => {
    const values = [defaultValue];
    const context = createContextProviderFunction(values);
    context.values = values;
    context.Provider = context;
    globalContexts.push(context);
    return context;
  };

  // node_modules/.deno/hono@4.7.9/node_modules/hono/dist/jsx/context.js
  var globalContexts = [];
  var useContext = (context) => {
    return context.values.at(-1);
  };

  // node_modules/.deno/hono@4.7.9/node_modules/hono/dist/jsx/intrinsic-element/common.js
  var deDupeKeyMap = {
    title: [],
    script: ["src"],
    style: ["data-href"],
    link: ["href"],
    meta: ["name", "httpEquiv", "charset", "itemProp"]
  };
  var domRenderers = {};
  var dataPrecedenceAttr = "data-precedence";

  // node_modules/.deno/hono@4.7.9/node_modules/hono/dist/jsx/children.js
  var toArray = (children) => Array.isArray(children) ? children : [children];

  // node_modules/.deno/hono@4.7.9/node_modules/hono/dist/jsx/utils.js
  var normalizeElementKeyMap = /* @__PURE__ */ new Map([
    ["className", "class"],
    ["htmlFor", "for"],
    ["crossOrigin", "crossorigin"],
    ["httpEquiv", "http-equiv"],
    ["itemProp", "itemprop"],
    ["fetchPriority", "fetchpriority"],
    ["noModule", "nomodule"],
    ["formAction", "formaction"]
  ]);
  var normalizeIntrinsicElementKey = (key) => normalizeElementKeyMap.get(key) || key;
  var styleObjectForEach = (style2, fn) => {
    for (const [k, v] of Object.entries(style2)) {
      const key = k[0] === "-" || !/[A-Z]/.test(k) ? k : k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
      fn(
        key,
        v == null ? null : typeof v === "number" ? !key.match(
          /^(?:a|border-im|column(?:-c|s)|flex(?:$|-[^b])|grid-(?:ar|[^a])|font-w|li|or|sca|st|ta|wido|z)|ty$/
        ) ? `${v}px` : `${v}` : v
      );
    }
  };

  // node_modules/.deno/hono@4.7.9/node_modules/hono/dist/jsx/dom/render.js
  var HONO_PORTAL_ELEMENT = "_hp";
  var eventAliasMap = {
    Change: "Input",
    DoubleClick: "DblClick"
  };
  var nameSpaceMap = {
    svg: "2000/svg",
    math: "1998/Math/MathML"
  };
  var buildDataStack = [];
  var refCleanupMap = /* @__PURE__ */ new WeakMap();
  var nameSpaceContext = void 0;
  var getNameSpaceContext2 = () => nameSpaceContext;
  var isNodeString = (node) => "t" in node;
  var eventCache = {
    onClick: ["click", false]
  };
  var getEventSpec = (key) => {
    if (!key.startsWith("on")) {
      return void 0;
    }
    if (eventCache[key]) {
      return eventCache[key];
    }
    const match = key.match(/^on([A-Z][a-zA-Z]+?(?:PointerCapture)?)(Capture)?$/);
    if (match) {
      const [, eventName, capture] = match;
      return eventCache[key] = [(eventAliasMap[eventName] || eventName).toLowerCase(), !!capture];
    }
    return void 0;
  };
  var toAttributeName = (element, key) => nameSpaceContext && element instanceof SVGElement && /[A-Z]/.test(key) && (key in element.style || key.match(/^(?:o|pai|str|u|ve)/)) ? key.replace(/([A-Z])/g, "-$1").toLowerCase() : key;
  var applyProps = (container, attributes, oldAttributes) => {
    attributes ||= {};
    for (let key in attributes) {
      const value = attributes[key];
      if (key !== "children" && (!oldAttributes || oldAttributes[key] !== value)) {
        key = normalizeIntrinsicElementKey(key);
        const eventSpec = getEventSpec(key);
        if (eventSpec) {
          if (oldAttributes?.[key] !== value) {
            if (oldAttributes) {
              container.removeEventListener(eventSpec[0], oldAttributes[key], eventSpec[1]);
            }
            if (value != null) {
              if (typeof value !== "function") {
                throw new Error(`Event handler for "${key}" is not a function`);
              }
              container.addEventListener(eventSpec[0], value, eventSpec[1]);
            }
          }
        } else if (key === "dangerouslySetInnerHTML" && value) {
          container.innerHTML = value.__html;
        } else if (key === "ref") {
          let cleanup;
          if (typeof value === "function") {
            cleanup = value(container) || (() => value(null));
          } else if (value && "current" in value) {
            value.current = container;
            cleanup = () => value.current = null;
          }
          refCleanupMap.set(container, cleanup);
        } else if (key === "style") {
          const style2 = container.style;
          if (typeof value === "string") {
            style2.cssText = value;
          } else {
            style2.cssText = "";
            if (value != null) {
              styleObjectForEach(value, style2.setProperty.bind(style2));
            }
          }
        } else {
          if (key === "value") {
            const nodeName = container.nodeName;
            if (nodeName === "INPUT" || nodeName === "TEXTAREA" || nodeName === "SELECT") {
              ;
              container.value = value === null || value === void 0 || value === false ? null : value;
              if (nodeName === "TEXTAREA") {
                container.textContent = value;
                continue;
              } else if (nodeName === "SELECT") {
                if (container.selectedIndex === -1) {
                  ;
                  container.selectedIndex = 0;
                }
                continue;
              }
            }
          } else if (key === "checked" && container.nodeName === "INPUT" || key === "selected" && container.nodeName === "OPTION") {
            ;
            container[key] = value;
          }
          const k = toAttributeName(container, key);
          if (value === null || value === void 0 || value === false) {
            container.removeAttribute(k);
          } else if (value === true) {
            container.setAttribute(k, "");
          } else if (typeof value === "string" || typeof value === "number") {
            container.setAttribute(k, value);
          } else {
            container.setAttribute(k, value.toString());
          }
        }
      }
    }
    if (oldAttributes) {
      for (let key in oldAttributes) {
        const value = oldAttributes[key];
        if (key !== "children" && !(key in attributes)) {
          key = normalizeIntrinsicElementKey(key);
          const eventSpec = getEventSpec(key);
          if (eventSpec) {
            container.removeEventListener(eventSpec[0], value, eventSpec[1]);
          } else if (key === "ref") {
            refCleanupMap.get(container)?.();
          } else {
            container.removeAttribute(toAttributeName(container, key));
          }
        }
      }
    }
  };
  var invokeTag = (context, node) => {
    node[DOM_STASH][0] = 0;
    buildDataStack.push([context, node]);
    const func = node.tag[DOM_RENDERER] || node.tag;
    const props = func.defaultProps ? {
      ...func.defaultProps,
      ...node.props
    } : node.props;
    try {
      return [func.call(null, props)];
    } finally {
      buildDataStack.pop();
    }
  };
  var getNextChildren = (node, container, nextChildren, childrenToRemove, callbacks) => {
    if (node.vR?.length) {
      childrenToRemove.push(...node.vR);
      delete node.vR;
    }
    if (typeof node.tag === "function") {
      node[DOM_STASH][1][STASH_EFFECT]?.forEach((data) => callbacks.push(data));
    }
    node.vC.forEach((child) => {
      if (isNodeString(child)) {
        nextChildren.push(child);
      } else {
        if (typeof child.tag === "function" || child.tag === "") {
          child.c = container;
          const currentNextChildrenIndex = nextChildren.length;
          getNextChildren(child, container, nextChildren, childrenToRemove, callbacks);
          if (child.s) {
            for (let i = currentNextChildrenIndex; i < nextChildren.length; i++) {
              nextChildren[i].s = true;
            }
            child.s = false;
          }
        } else {
          nextChildren.push(child);
          if (child.vR?.length) {
            childrenToRemove.push(...child.vR);
            delete child.vR;
          }
        }
      }
    });
  };
  var findInsertBefore = (node) => {
    for (; ; node = node.tag === HONO_PORTAL_ELEMENT || !node.vC || !node.pP ? node.nN : node.vC[0]) {
      if (!node) {
        return null;
      }
      if (node.tag !== HONO_PORTAL_ELEMENT && node.e) {
        return node.e;
      }
    }
  };
  var removeNode = (node) => {
    if (!isNodeString(node)) {
      node[DOM_STASH]?.[1][STASH_EFFECT]?.forEach((data) => data[2]?.());
      refCleanupMap.get(node.e)?.();
      if (node.p === 2) {
        node.vC?.forEach((n) => n.p = 2);
      }
      node.vC?.forEach(removeNode);
    }
    if (!node.p) {
      node.e?.remove();
      delete node.e;
    }
    if (typeof node.tag === "function") {
      updateMap.delete(node);
      fallbackUpdateFnArrayMap.delete(node);
      delete node[DOM_STASH][3];
      node.a = true;
    }
  };
  var apply = (node, container, isNew) => {
    node.c = container;
    applyNodeObject(node, container, isNew);
  };
  var findChildNodeIndex = (childNodes, child) => {
    if (!child) {
      return;
    }
    for (let i = 0, len = childNodes.length; i < len; i++) {
      if (childNodes[i] === child) {
        return i;
      }
    }
    return;
  };
  var cancelBuild = Symbol();
  var applyNodeObject = (node, container, isNew) => {
    const next = [];
    const remove = [];
    const callbacks = [];
    getNextChildren(node, container, next, remove, callbacks);
    remove.forEach(removeNode);
    const childNodes = isNew ? void 0 : container.childNodes;
    let offset;
    let insertBeforeNode = null;
    if (isNew) {
      offset = -1;
    } else if (!childNodes.length) {
      offset = 0;
    } else {
      const offsetByNextNode = findChildNodeIndex(childNodes, findInsertBefore(node.nN));
      if (offsetByNextNode !== void 0) {
        insertBeforeNode = childNodes[offsetByNextNode];
        offset = offsetByNextNode;
      } else {
        offset = findChildNodeIndex(childNodes, next.find((n) => n.tag !== HONO_PORTAL_ELEMENT && n.e)?.e) ?? -1;
      }
      if (offset === -1) {
        isNew = true;
      }
    }
    for (let i = 0, len = next.length; i < len; i++, offset++) {
      const child = next[i];
      let el;
      if (child.s && child.e) {
        el = child.e;
        child.s = false;
      } else {
        const isNewLocal = isNew || !child.e;
        if (isNodeString(child)) {
          if (child.e && child.d) {
            child.e.textContent = child.t;
          }
          child.d = false;
          el = child.e ||= document.createTextNode(child.t);
        } else {
          el = child.e ||= child.n ? document.createElementNS(child.n, child.tag) : document.createElement(child.tag);
          applyProps(el, child.props, child.pP);
          applyNodeObject(child, el, isNewLocal);
        }
      }
      if (child.tag === HONO_PORTAL_ELEMENT) {
        offset--;
      } else if (isNew) {
        if (!el.parentNode) {
          container.appendChild(el);
        }
      } else if (childNodes[offset] !== el && childNodes[offset - 1] !== el) {
        if (childNodes[offset + 1] === el) {
          container.appendChild(childNodes[offset]);
        } else {
          container.insertBefore(el, insertBeforeNode || childNodes[offset] || null);
        }
      }
    }
    if (node.pP) {
      delete node.pP;
    }
    if (callbacks.length) {
      const useLayoutEffectCbs = [];
      const useEffectCbs = [];
      callbacks.forEach(([, useLayoutEffectCb, , useEffectCb, useInsertionEffectCb]) => {
        if (useLayoutEffectCb) {
          useLayoutEffectCbs.push(useLayoutEffectCb);
        }
        if (useEffectCb) {
          useEffectCbs.push(useEffectCb);
        }
        useInsertionEffectCb?.();
      });
      useLayoutEffectCbs.forEach((cb) => cb());
      if (useEffectCbs.length) {
        requestAnimationFrame(() => {
          useEffectCbs.forEach((cb) => cb());
        });
      }
    }
  };
  var isSameContext = (oldContexts, newContexts) => !!(oldContexts && oldContexts.length === newContexts.length && oldContexts.every((ctx, i) => ctx[1] === newContexts[i][1]));
  var fallbackUpdateFnArrayMap = /* @__PURE__ */ new WeakMap();
  var build = (context, node, children) => {
    const buildWithPreviousChildren = !children && node.pC;
    if (children) {
      node.pC ||= node.vC;
    }
    let foundErrorHandler;
    try {
      children ||= typeof node.tag == "function" ? invokeTag(context, node) : toArray(node.props.children);
      if (children[0]?.tag === "" && children[0][DOM_ERROR_HANDLER]) {
        foundErrorHandler = children[0][DOM_ERROR_HANDLER];
        context[5].push([context, foundErrorHandler, node]);
      }
      const oldVChildren = buildWithPreviousChildren ? [...node.pC] : node.vC ? [...node.vC] : void 0;
      const vChildren = [];
      let prevNode;
      for (let i = 0; i < children.length; i++) {
        if (Array.isArray(children[i])) {
          children.splice(i, 1, ...children[i].flat());
        }
        let child = buildNode(children[i]);
        if (child) {
          if (typeof child.tag === "function" && !child.tag[DOM_INTERNAL_TAG]) {
            if (globalContexts.length > 0) {
              child[DOM_STASH][2] = globalContexts.map((c) => [c, c.values.at(-1)]);
            }
            if (context[5]?.length) {
              child[DOM_STASH][3] = context[5].at(-1);
            }
          }
          let oldChild;
          if (oldVChildren && oldVChildren.length) {
            const i2 = oldVChildren.findIndex(
              isNodeString(child) ? (c) => isNodeString(c) : child.key !== void 0 ? (c) => c.key === child.key && c.tag === child.tag : (c) => c.tag === child.tag
            );
            if (i2 !== -1) {
              oldChild = oldVChildren[i2];
              oldVChildren.splice(i2, 1);
            }
          }
          if (oldChild) {
            if (isNodeString(child)) {
              if (oldChild.t !== child.t) {
                ;
                oldChild.t = child.t;
                oldChild.d = true;
              }
              child = oldChild;
            } else {
              const pP = oldChild.pP = oldChild.props;
              oldChild.props = child.props;
              oldChild.f ||= child.f || node.f;
              if (typeof child.tag === "function") {
                const oldContexts = oldChild[DOM_STASH][2];
                oldChild[DOM_STASH][2] = child[DOM_STASH][2] || [];
                oldChild[DOM_STASH][3] = child[DOM_STASH][3];
                if (!oldChild.f && ((oldChild.o || oldChild) === child.o || oldChild.tag[DOM_MEMO]?.(pP, oldChild.props)) && isSameContext(oldContexts, oldChild[DOM_STASH][2])) {
                  oldChild.s = true;
                }
              }
              child = oldChild;
            }
          } else if (!isNodeString(child) && nameSpaceContext) {
            const ns = useContext(nameSpaceContext);
            if (ns) {
              child.n = ns;
            }
          }
          if (!isNodeString(child) && !child.s) {
            build(context, child);
            delete child.f;
          }
          vChildren.push(child);
          if (prevNode && !prevNode.s && !child.s) {
            for (let p = prevNode; p && !isNodeString(p); p = p.vC?.at(-1)) {
              p.nN = child;
            }
          }
          prevNode = child;
        }
      }
      node.vR = buildWithPreviousChildren ? [...node.vC, ...oldVChildren || []] : oldVChildren || [];
      node.vC = vChildren;
      if (buildWithPreviousChildren) {
        delete node.pC;
      }
    } catch (e) {
      node.f = true;
      if (e === cancelBuild) {
        if (foundErrorHandler) {
          return;
        } else {
          throw e;
        }
      }
      const [errorHandlerContext, errorHandler, errorHandlerNode] = node[DOM_STASH]?.[3] || [];
      if (errorHandler) {
        const fallbackUpdateFn = () => update([0, false, context[2]], errorHandlerNode);
        const fallbackUpdateFnArray = fallbackUpdateFnArrayMap.get(errorHandlerNode) || [];
        fallbackUpdateFnArray.push(fallbackUpdateFn);
        fallbackUpdateFnArrayMap.set(errorHandlerNode, fallbackUpdateFnArray);
        const fallback = errorHandler(e, () => {
          const fnArray = fallbackUpdateFnArrayMap.get(errorHandlerNode);
          if (fnArray) {
            const i = fnArray.indexOf(fallbackUpdateFn);
            if (i !== -1) {
              fnArray.splice(i, 1);
              return fallbackUpdateFn();
            }
          }
        });
        if (fallback) {
          if (context[0] === 1) {
            context[1] = true;
          } else {
            build(context, errorHandlerNode, [fallback]);
            if ((errorHandler.length === 1 || context !== errorHandlerContext) && errorHandlerNode.c) {
              apply(errorHandlerNode, errorHandlerNode.c, false);
              return;
            }
          }
          throw cancelBuild;
        }
      }
      throw e;
    } finally {
      if (foundErrorHandler) {
        context[5].pop();
      }
    }
  };
  var buildNode = (node) => {
    if (node === void 0 || node === null || typeof node === "boolean") {
      return void 0;
    } else if (typeof node === "string" || typeof node === "number") {
      return { t: node.toString(), d: true };
    } else {
      if ("vR" in node) {
        node = {
          tag: node.tag,
          props: node.props,
          key: node.key,
          f: node.f,
          type: node.tag,
          ref: node.props.ref,
          o: node.o || node
        };
      }
      if (typeof node.tag === "function") {
        ;
        node[DOM_STASH] = [0, []];
      } else {
        const ns = nameSpaceMap[node.tag];
        if (ns) {
          nameSpaceContext ||= createContext("");
          node.props.children = [
            {
              tag: nameSpaceContext,
              props: {
                value: node.n = `http://www.w3.org/${ns}`,
                children: node.props.children
              }
            }
          ];
        }
      }
      return node;
    }
  };
  var replaceContainer = (node, from, to) => {
    if (node.c === from) {
      node.c = to;
      node.vC.forEach((child) => replaceContainer(child, from, to));
    }
  };
  var updateSync = (context, node) => {
    node[DOM_STASH][2]?.forEach(([c, v]) => {
      c.values.push(v);
    });
    try {
      build(context, node, void 0);
    } catch {
      return;
    }
    if (node.a) {
      delete node.a;
      return;
    }
    node[DOM_STASH][2]?.forEach(([c]) => {
      c.values.pop();
    });
    if (context[0] !== 1 || !context[1]) {
      apply(node, node.c, false);
    }
  };
  var updateMap = /* @__PURE__ */ new WeakMap();
  var currentUpdateSets = [];
  var update = async (context, node) => {
    context[5] ||= [];
    const existing = updateMap.get(node);
    if (existing) {
      existing[0](void 0);
    }
    let resolve;
    const promise = new Promise((r) => resolve = r);
    updateMap.set(node, [
      resolve,
      () => {
        if (context[2]) {
          context[2](context, node, (context2) => {
            updateSync(context2, node);
          }).then(() => resolve(node));
        } else {
          updateSync(context, node);
          resolve(node);
        }
      }
    ]);
    if (currentUpdateSets.length) {
      ;
      currentUpdateSets.at(-1).add(node);
    } else {
      await Promise.resolve();
      const latest = updateMap.get(node);
      if (latest) {
        updateMap.delete(node);
        latest[1]();
      }
    }
    return promise;
  };
  var renderNode = (node, container) => {
    const context = [];
    context[5] = [];
    context[4] = true;
    build(context, node, void 0);
    context[4] = false;
    const fragment = document.createDocumentFragment();
    apply(node, fragment, true);
    replaceContainer(node, fragment, container);
    container.replaceChildren(fragment);
  };
  var render = (jsxNode, container) => {
    renderNode(buildNode({ tag: "", props: { children: jsxNode } }), container);
  };
  var createPortal = (children, container, key) => ({
    tag: HONO_PORTAL_ELEMENT,
    props: {
      children
    },
    key,
    e: container,
    p: 1
  });

  // node_modules/.deno/hono@4.7.9/node_modules/hono/dist/jsx/hooks/index.js
  var STASH_SATE = 0;
  var STASH_EFFECT = 1;
  var STASH_CALLBACK = 2;
  var STASH_MEMO = 3;
  var resolvedPromiseValueMap = /* @__PURE__ */ new WeakMap();
  var isDepsChanged = (prevDeps, deps) => !prevDeps || !deps || prevDeps.length !== deps.length || deps.some((dep, i) => dep !== prevDeps[i]);
  var updateHook = void 0;
  var pendingStack = [];
  var useState = (initialState) => {
    const resolveInitialState = () => typeof initialState === "function" ? initialState() : initialState;
    const buildData = buildDataStack.at(-1);
    if (!buildData) {
      return [resolveInitialState(), () => {
      }];
    }
    const [, node] = buildData;
    const stateArray = node[DOM_STASH][1][STASH_SATE] ||= [];
    const hookIndex = node[DOM_STASH][0]++;
    return stateArray[hookIndex] ||= [
      resolveInitialState(),
      (newState) => {
        const localUpdateHook = updateHook;
        const stateData = stateArray[hookIndex];
        if (typeof newState === "function") {
          newState = newState(stateData[0]);
        }
        if (!Object.is(newState, stateData[0])) {
          stateData[0] = newState;
          if (pendingStack.length) {
            const [pendingType, pendingPromise] = pendingStack.at(-1);
            Promise.all([
              pendingType === 3 ? node : update([pendingType, false, localUpdateHook], node),
              pendingPromise
            ]).then(([node2]) => {
              if (!node2 || !(pendingType === 2 || pendingType === 3)) {
                return;
              }
              const lastVC = node2.vC;
              const addUpdateTask = () => {
                setTimeout(() => {
                  if (lastVC !== node2.vC) {
                    return;
                  }
                  update([pendingType === 3 ? 1 : 0, false, localUpdateHook], node2);
                });
              };
              requestAnimationFrame(addUpdateTask);
            });
          } else {
            update([0, false, localUpdateHook], node);
          }
        }
      }
    ];
  };
  var useCallback = (callback, deps) => {
    const buildData = buildDataStack.at(-1);
    if (!buildData) {
      return callback;
    }
    const [, node] = buildData;
    const callbackArray = node[DOM_STASH][1][STASH_CALLBACK] ||= [];
    const hookIndex = node[DOM_STASH][0]++;
    const prevDeps = callbackArray[hookIndex];
    if (isDepsChanged(prevDeps?.[1], deps)) {
      callbackArray[hookIndex] = [callback, deps];
    } else {
      callback = callbackArray[hookIndex][0];
    }
    return callback;
  };
  var use = (promise) => {
    const cachedRes = resolvedPromiseValueMap.get(promise);
    if (cachedRes) {
      if (cachedRes.length === 2) {
        throw cachedRes[1];
      }
      return cachedRes[0];
    }
    promise.then(
      (res) => resolvedPromiseValueMap.set(promise, [res]),
      (e) => resolvedPromiseValueMap.set(promise, [void 0, e])
    );
    throw promise;
  };
  var useMemo = (factory, deps) => {
    const buildData = buildDataStack.at(-1);
    if (!buildData) {
      return factory();
    }
    const [, node] = buildData;
    const memoArray = node[DOM_STASH][1][STASH_MEMO] ||= [];
    const hookIndex = node[DOM_STASH][0]++;
    const prevDeps = memoArray[hookIndex];
    if (isDepsChanged(prevDeps?.[1], deps)) {
      memoArray[hookIndex] = [factory(), deps];
    }
    return memoArray[hookIndex][0];
  };

  // node_modules/.deno/hono@4.7.9/node_modules/hono/dist/jsx/dom/intrinsic-element/components.js
  var components_exports2 = {};
  __export(components_exports2, {
    button: () => button,
    clearCache: () => clearCache,
    composeRef: () => composeRef,
    form: () => form,
    input: () => input,
    link: () => link,
    meta: () => meta,
    script: () => script,
    style: () => style,
    title: () => title
  });

  // node_modules/.deno/hono@4.7.9/node_modules/hono/dist/jsx/dom/hooks/index.js
  var FormContext = createContext({
    pending: false,
    data: null,
    method: null,
    action: null
  });
  var actions = /* @__PURE__ */ new Set();
  var registerAction = (action) => {
    actions.add(action);
    action.finally(() => actions.delete(action));
  };

  // node_modules/.deno/hono@4.7.9/node_modules/hono/dist/jsx/dom/intrinsic-element/components.js
  var clearCache = () => {
    blockingPromiseMap = /* @__PURE__ */ Object.create(null);
    createdElements = /* @__PURE__ */ Object.create(null);
  };
  var composeRef = (ref, cb) => {
    return useMemo(
      () => (e) => {
        let refCleanup;
        if (ref) {
          if (typeof ref === "function") {
            refCleanup = ref(e) || (() => {
              ref(null);
            });
          } else if (ref && "current" in ref) {
            ref.current = e;
            refCleanup = () => {
              ref.current = null;
            };
          }
        }
        const cbCleanup = cb(e);
        return () => {
          cbCleanup?.();
          refCleanup?.();
        };
      },
      [ref]
    );
  };
  var blockingPromiseMap = /* @__PURE__ */ Object.create(null);
  var createdElements = /* @__PURE__ */ Object.create(null);
  var documentMetadataTag = (tag, props, preserveNodeType, supportSort, supportBlocking) => {
    if (props?.itemProp) {
      return {
        tag,
        props,
        type: tag,
        ref: props.ref
      };
    }
    const head = document.head;
    let { onLoad, onError, precedence, blocking, ...restProps } = props;
    let element = null;
    let created = false;
    const deDupeKeys = deDupeKeyMap[tag];
    let existingElements = void 0;
    if (deDupeKeys.length > 0) {
      const tags = head.querySelectorAll(tag);
      LOOP:
        for (const e of tags) {
          for (const key of deDupeKeyMap[tag]) {
            if (e.getAttribute(key) === props[key]) {
              element = e;
              break LOOP;
            }
          }
        }
      if (!element) {
        const cacheKey = deDupeKeys.reduce(
          (acc, key) => props[key] === void 0 ? acc : `${acc}-${key}-${props[key]}`,
          tag
        );
        created = !createdElements[cacheKey];
        element = createdElements[cacheKey] ||= (() => {
          const e = document.createElement(tag);
          for (const key of deDupeKeys) {
            if (props[key] !== void 0) {
              e.setAttribute(key, props[key]);
            }
            if (props.rel) {
              e.setAttribute("rel", props.rel);
            }
          }
          return e;
        })();
      }
    } else {
      existingElements = head.querySelectorAll(tag);
    }
    precedence = supportSort ? precedence ?? "" : void 0;
    if (supportSort) {
      restProps[dataPrecedenceAttr] = precedence;
    }
    const insert = useCallback(
      (e) => {
        if (deDupeKeys.length > 0) {
          let found = false;
          for (const existingElement of head.querySelectorAll(tag)) {
            if (found && existingElement.getAttribute(dataPrecedenceAttr) !== precedence) {
              head.insertBefore(e, existingElement);
              return;
            }
            if (existingElement.getAttribute(dataPrecedenceAttr) === precedence) {
              found = true;
            }
          }
          head.appendChild(e);
        } else if (existingElements) {
          let found = false;
          for (const existingElement of existingElements) {
            if (existingElement === e) {
              found = true;
              break;
            }
          }
          if (!found) {
            head.insertBefore(
              e,
              head.contains(existingElements[0]) ? existingElements[0] : head.querySelector(tag)
            );
          }
          existingElements = void 0;
        }
      },
      [precedence]
    );
    const ref = composeRef(props.ref, (e) => {
      const key = deDupeKeys[0];
      if (preserveNodeType === 2) {
        e.innerHTML = "";
      }
      if (created || existingElements) {
        insert(e);
      }
      if (!onError && !onLoad) {
        return;
      }
      let promise = blockingPromiseMap[e.getAttribute(key)] ||= new Promise(
        (resolve, reject) => {
          e.addEventListener("load", resolve);
          e.addEventListener("error", reject);
        }
      );
      if (onLoad) {
        promise = promise.then(onLoad);
      }
      if (onError) {
        promise = promise.catch(onError);
      }
      promise.catch(() => {
      });
    });
    if (supportBlocking && blocking === "render") {
      const key = deDupeKeyMap[tag][0];
      if (props[key]) {
        const value = props[key];
        const promise = blockingPromiseMap[value] ||= new Promise((resolve, reject) => {
          insert(element);
          element.addEventListener("load", resolve);
          element.addEventListener("error", reject);
        });
        use(promise);
      }
    }
    const jsxNode = {
      tag,
      type: tag,
      props: {
        ...restProps,
        ref
      },
      ref
    };
    jsxNode.p = preserveNodeType;
    if (element) {
      jsxNode.e = element;
    }
    return createPortal(
      jsxNode,
      head
    );
  };
  var title = (props) => {
    const nameSpaceContext2 = getNameSpaceContext2();
    const ns = nameSpaceContext2 && useContext(nameSpaceContext2);
    if (ns?.endsWith("svg")) {
      return {
        tag: "title",
        props,
        type: "title",
        ref: props.ref
      };
    }
    return documentMetadataTag("title", props, void 0, false, false);
  };
  var script = (props) => {
    if (!props || ["src", "async"].some((k) => !props[k])) {
      return {
        tag: "script",
        props,
        type: "script",
        ref: props.ref
      };
    }
    return documentMetadataTag("script", props, 1, false, true);
  };
  var style = (props) => {
    if (!props || !["href", "precedence"].every((k) => k in props)) {
      return {
        tag: "style",
        props,
        type: "style",
        ref: props.ref
      };
    }
    props["data-href"] = props.href;
    delete props.href;
    return documentMetadataTag("style", props, 2, true, true);
  };
  var link = (props) => {
    if (!props || ["onLoad", "onError"].some((k) => k in props) || props.rel === "stylesheet" && (!("precedence" in props) || "disabled" in props)) {
      return {
        tag: "link",
        props,
        type: "link",
        ref: props.ref
      };
    }
    return documentMetadataTag("link", props, 1, "precedence" in props, true);
  };
  var meta = (props) => {
    return documentMetadataTag("meta", props, void 0, false, false);
  };
  var customEventFormAction = Symbol();
  var form = (props) => {
    const { action, ...restProps } = props;
    if (typeof action !== "function") {
      ;
      restProps.action = action;
    }
    const [state, setState] = useState([null, false]);
    const onSubmit = useCallback(
      async (ev) => {
        const currentAction = ev.isTrusted ? action : ev.detail[customEventFormAction];
        if (typeof currentAction !== "function") {
          return;
        }
        ev.preventDefault();
        const formData = new FormData(ev.target);
        setState([formData, true]);
        const actionRes = currentAction(formData);
        if (actionRes instanceof Promise) {
          registerAction(actionRes);
          await actionRes;
        }
        setState([null, true]);
      },
      []
    );
    const ref = composeRef(props.ref, (el) => {
      el.addEventListener("submit", onSubmit);
      return () => {
        el.removeEventListener("submit", onSubmit);
      };
    });
    const [data, isDirty] = state;
    state[1] = false;
    return {
      tag: FormContext,
      props: {
        value: {
          pending: data !== null,
          data,
          method: data ? "post" : null,
          action: data ? action : null
        },
        children: {
          tag: "form",
          props: {
            ...restProps,
            ref
          },
          type: "form",
          ref
        }
      },
      f: isDirty
    };
  };
  var formActionableElement = (tag, {
    formAction,
    ...props
  }) => {
    if (typeof formAction === "function") {
      const onClick = useCallback((ev) => {
        ev.preventDefault();
        ev.currentTarget.form.dispatchEvent(
          new CustomEvent("submit", { detail: { [customEventFormAction]: formAction } })
        );
      }, []);
      props.ref = composeRef(props.ref, (el) => {
        el.addEventListener("click", onClick);
        return () => {
          el.removeEventListener("click", onClick);
        };
      });
    }
    return {
      tag,
      props,
      type: tag,
      ref: props.ref
    };
  };
  var input = (props) => formActionableElement("input", props);
  var button = (props) => formActionableElement("button", props);
  Object.assign(domRenderers, {
    title,
    script,
    style,
    link,
    meta,
    form,
    input,
    button
  });

  // node_modules/.deno/hono@4.7.9/node_modules/hono/dist/jsx/dom/jsx-dev-runtime.js
  var jsxDEV = (tag, props, key) => {
    if (typeof tag === "string" && components_exports2[tag]) {
      tag = components_exports2[tag];
    }
    return {
      tag,
      type: tag,
      props,
      key,
      ref: props.ref
    };
  };

  // cabinet/layout.tsx
  var sidebarItems = [
    {
      icon: /* @__PURE__ */ jsxDEV("svg", { width: "28", height: "28", fill: "none", viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ jsxDEV("rect", { x: "3", y: "3", width: "7", height: "7", rx: "2", fill: "#555" }),
        /* @__PURE__ */ jsxDEV("rect", { x: "14", y: "3", width: "7", height: "7", rx: "2", fill: "#555" }),
        /* @__PURE__ */ jsxDEV("rect", { x: "14", y: "14", width: "7", height: "7", rx: "2", fill: "#555" }),
        /* @__PURE__ */ jsxDEV("rect", { x: "3", y: "14", width: "7", height: "7", rx: "2", fill: "#555" })
      ] }),
      label: "Dashboard",
      selected: false
    },
    {
      icon: /* @__PURE__ */ jsxDEV("svg", { width: "28", height: "28", fill: "none", viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ jsxDEV("path", { d: "M7 18c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H7zm0 2h10c2.21 0 4-1.79 4-4V7c0-2.21-1.79-4-4-4H7C4.79 3 3 4.79 3 7v9c0 2.21 1.79 4 4 4z", fill: "#555" }),
        /* @__PURE__ */ jsxDEV("path", { d: "M16 11V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v2", stroke: "#fff", strokeWidth: "2" })
      ] }),
      label: "Orders",
      selected: false
    },
    {
      icon: /* @__PURE__ */ jsxDEV("svg", { width: "28", height: "28", fill: "none", viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ jsxDEV("path", { d: "M4 17l6-6 5 5 5-9", stroke: "#1976d2", strokeWidth: "2", fill: "none" }),
        /* @__PURE__ */ jsxDEV("circle", { cx: "4", cy: "17", r: "2", fill: "#1976d2" }),
        /* @__PURE__ */ jsxDEV("circle", { cx: "10", cy: "11", r: "2", fill: "#1976d2" }),
        /* @__PURE__ */ jsxDEV("circle", { cx: "15", cy: "16", r: "2", fill: "#1976d2" }),
        /* @__PURE__ */ jsxDEV("circle", { cx: "20", cy: "7", r: "2", fill: "#1976d2" })
      ] }),
      label: "Page 2",
      selected: true
    }
  ];
  function Layout() {
    return /* @__PURE__ */ jsxDEV("div", { style: {
      minHeight: "100vh",
      background: "#fff",
      fontFamily: "Roboto, Arial, sans-serif",
      display: "flex",
      flexDirection: "column"
    }, children: [
      /* @__PURE__ */ jsxDEV("div", { style: {
        height: 56,
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        justifyContent: "space-between"
      }, children: [
        /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
          /* @__PURE__ */ jsxDEV("button", { style: {
            background: "none",
            border: "none",
            cursor: "pointer",
            marginRight: 8,
            padding: 0
          }, children: /* @__PURE__ */ jsxDEV("svg", { width: "28", height: "28", fill: "#1976d2", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsxDEV("rect", { x: "4", y: "6", width: "16", height: "2", rx: "1" }),
            /* @__PURE__ */ jsxDEV("rect", { x: "4", y: "11", width: "16", height: "2", rx: "1" }),
            /* @__PURE__ */ jsxDEV("rect", { x: "4", y: "16", width: "16", height: "2", rx: "1" })
          ] }) }),
          /* @__PURE__ */ jsxDEV("svg", { width: "32", height: "32", viewBox: "0 0 32 32", style: { marginRight: 8 }, children: [
            /* @__PURE__ */ jsxDEV("rect", { width: "32", height: "32", rx: "6", fill: "#1976d2" }),
            /* @__PURE__ */ jsxDEV("rect", { x: "7", y: "7", width: "8", height: "8", rx: "2", fill: "#fff" }),
            /* @__PURE__ */ jsxDEV("rect", { x: "17", y: "7", width: "8", height: "8", rx: "2", fill: "#fff" }),
            /* @__PURE__ */ jsxDEV("rect", { x: "17", y: "17", width: "8", height: "8", rx: "2", fill: "#fff" })
          ] }),
          /* @__PURE__ */ jsxDEV("span", { style: { fontWeight: 700, fontSize: 24, color: "#1976d2" }, children: "Toolpad" })
        ] }),
        /* @__PURE__ */ jsxDEV("button", { style: {
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0
        }, children: /* @__PURE__ */ jsxDEV("svg", { width: "28", height: "28", fill: "#1976d2", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ jsxDEV("path", { d: "M12 3a9 9 0 1 0 9 9", stroke: "#1976d2", strokeWidth: "2", fill: "none" }),
          /* @__PURE__ */ jsxDEV("path", { d: "M12 3v6l4 2", stroke: "#1976d2", strokeWidth: "2", fill: "none" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", flex: 1, minHeight: 0 }, children: [
        /* @__PURE__ */ jsxDEV("nav", { style: {
          width: 110,
          background: "#fff",
          borderRight: "1px solid #e0e0e0",
          paddingTop: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }, children: [
          /* @__PURE__ */ jsxDEV("div", { style: {
            fontWeight: 600,
            color: "#666",
            fontSize: 15,
            marginBottom: 16,
            width: "100%",
            textAlign: "center"
          }, children: "Main items" }),
          sidebarItems.map((item) => /* @__PURE__ */ jsxDEV(
            "div",
            {
              style: {
                width: "90%",
                marginBottom: 8,
                borderRadius: 12,
                background: item.selected ? "#e3f0fc" : "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "8px 0",
                cursor: "pointer",
                border: item.selected ? "1.5px solid #b6d6f6" : "1.5px solid transparent",
                transition: "background 0.2s"
              },
              children: [
                /* @__PURE__ */ jsxDEV("div", { children: item.icon }),
                /* @__PURE__ */ jsxDEV("div", { style: {
                  fontSize: 14,
                  color: item.selected ? "#1976d2" : "#222",
                  marginTop: 2,
                  fontWeight: item.selected ? 600 : 400
                }, children: item.label })
              ]
            },
            item.label
          ))
        ] }),
        /* @__PURE__ */ jsxDEV("main", { style: {
          flex: 1,
          padding: "32px 32px",
          background: "#fff"
        }, children: [
          /* @__PURE__ */ jsxDEV("div", { style: { fontSize: 16, color: "#888", marginBottom: 8 }, children: [
            "Dashboard / ",
            /* @__PURE__ */ jsxDEV("span", { style: { color: "#555" }, children: "Page 2" })
          ] }),
          /* @__PURE__ */ jsxDEV("div", { style: { fontSize: 44, fontWeight: 500, marginBottom: 16, color: "#222" }, children: "Page 2" }),
          /* @__PURE__ */ jsxDEV("div", { style: { fontSize: 24, color: "#333" }, children: "This is Page 2" })
        ] })
      ] })
    ] });
  }
  var root = document.getElementById("root");
  render(/* @__PURE__ */ jsxDEV(Layout, {}), root);
})();
