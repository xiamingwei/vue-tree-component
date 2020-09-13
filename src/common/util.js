export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}

// 递归为树生成唯一path(key)值
export function setPath(nodes, isRoot = true) {
    nodes.map(node => {
        if (isRoot) {
            // 设置根节点标识, 其余按二进制来
            node.path = 'root'
            isRoot = false
        }

        if (node.children) {
            node.children.map((children, index) => {
                let path = node.path === 'root' ? '' : node.path
                children.path = `${path}${index}`
            })
            setPath(node.children, false)
        }
    })

    return nodes
}

export function debounce(fun, delay = 500) {
    let last, ctx, args;
    return function() {
        ctx = this;
        args = arguments;
        clearTimeout(last);
        last = setTimeout(function() {
            fun.apply(ctx, args)
        }, delay);
    }
}

export function throttle(fun, delay) {
    let last, ctx, args;
    return function() {
        ctx = this;
        args = arguments;

        if (!last) {
            fun.apply(ctx, args);
            last = setTimeout(function() {
                last = undefined;
            }, delay)
        }
    }
}

export function EncodeGetUrl(url) {
    let urlArr = url.split('?')
    let encodeUrl = urlArr[0]
    if (urlArr.length > 1) {
        encodeUrl += '?'
        let paramArr = urlArr[1].split('&')
        let encodeparamArr = []
        paramArr.forEach((item, index) => {
            let key = item.split('=')[0]
            let value = item.split('=')[1]
            encodeparamArr.push(key + '=' + encodeURIComponent(value))
        })
        encodeUrl += encodeparamArr.join('&')
    }
    return encodeUrl
}