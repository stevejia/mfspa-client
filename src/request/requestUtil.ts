export default null;
export const parseQueryString = (url) => {
  var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
    arr_url = reg_url.exec(url),
    ret: { [key: string]: any } = {};
  if (arr_url && arr_url[1]) {
    var str_para = arr_url[1],
      result;
    while ((result = reg_para.exec(str_para)) != null) {
      ret[result[1]] = decodeURIComponent(result[2]);
    }
  }
  return ret;
};

export const queryStringify = (paramsObject) => {
  const params = tileParams(paramsObject) || {};
  const queryStr = Object.keys(params)
    .map((key) => {
      return `${key}=${params[key]}`;
    })
    .join("&");

  return queryStr;
};

export const getQueryString = (url, paramsObject) => {
  let urlWithQuery = url;
  const queryStr = queryStringify(paramsObject);
  const hasParam = url.indexOf("?") > -1;
  if (!!queryStr) {
    if (hasParam) {
      urlWithQuery += queryStr;
    } else {
      urlWithQuery += "?" + queryStr;
    }
  }
  return urlWithQuery;
};

let keyValue = {};

const tileParams = (paramsObject) => {
  keyValue = {};
  const params = _tileParams(paramsObject, "", true);
  return params;
};

const _tileParams = (paramsObject, parentKey, firstLevel = false) => {
  //如果不是一个对象，则返回空对象
  if (typeof paramsObject !== "object") {
    console.log("end");
    return;
  }
  //如果是null 返回空对象
  if (!paramsObject) {
    return;
  }

  //如果是数组
  if (firstLevel && paramsObject instanceof Array) {
    console.error("入参第一层不能为数组");
    return;
  }

  if (paramsObject instanceof Array) {
    paramsObject.forEach((item, index) => {
      if (parentKey) {
        delete keyValue[parentKey];
      }
      const chainKey = parentKey ? `${parentKey}[${index}]` : `[${index}]`;
      keyValue[chainKey] = item;
      _tileParams(item, chainKey);
    });
    return;
  }

  Object.keys(paramsObject).forEach((key) => {
    if (parentKey) {
      delete keyValue[parentKey];
    }
    const chainKey = parentKey ? `${parentKey}.${key}` : key;
    const chainValue = paramsObject[key];
    keyValue[chainKey] = chainValue;

    _tileParams(chainValue, chainKey);
  });
  return keyValue;
};

const unfoldParams = (tiledParams) => {
  const unfoldedParams = {};
  Object.keys(tiledParams).forEach((key) => {
    let subObject = unfoldedParams;
    const keys = key.split(".");
    const subValue = tiledParams[key];
    keys.forEach((subkey, index) => {
      const _keys = getKeys(subkey);
      const isArr = isArray(_keys);
      const [arrKey, arrIndex] = _keys;

      if (isArr) {
        subObject[arrKey] = subObject[arrKey] || [];
        subObject[arrKey][arrIndex] = {};
        if (index === keys.length - 1) {
          subObject[arrKey][arrIndex] = subValue;
        }
        subObject = subObject[arrKey][arrIndex];
        return;
      }
      subObject[arrKey] = subObject[arrKey] || {};
      if (index === keys.length - 1) {
        subObject[arrKey] = subValue;
      }
      subObject = subObject[arrKey];
    });
  });
  console.log(JSON.stringify(unfoldedParams, null, 2));
  return unfoldedParams;
};

const getKeys = (key) => {
  const keys = key.replace(/\]/g, "").split("[");
  return keys;
};

const isArray = (keys) => {
  return keys.length === 2;
};

const cleanParams = (obj) => {
  const objType = getObjectType(obj);
  if (objType === "Array") {
    obj.forEach((item) => {
      cleanParams(item);
    });
  } else if (objType === "Object") {
    Object.keys(obj).forEach((key) => {
      const propObj = obj[key];
      const propType = getObjectType(propObj);
      if (propType === "Undefined" || propType === "Null") {
        delete obj[key];
      } else {
        cleanParams(propObj);
      }
    });
  }
};

const getObjectType = (obj) => {
  const typeString = Object.prototype.toString.call(obj);
  return typeString.slice(8, -1);
};

export { cleanParams };
