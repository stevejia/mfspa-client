const updateStates = function (updateKeyValue, callback = null) {
  const stateObj = {};
  try {
    for (const key in updateKeyValue) {
      const updateKeyObj = updateState.bind(this)(
        key,
        updateKeyValue[key],
        true
      );
      Object.assign(stateObj, updateKeyObj);
    }
  } catch (error) {
    console.log(error);
  }

  this.setState(stateObj, () => {
    callback && callback();
  });
};

const updateState = function (
  prop,
  value,
  noNeedUpdate = false,
  callback = null
) {
  let updateValue = value;
  //如果事件不为空 取event.target.value;
  if (value) {
    if (value?.nativeEvent && value?.target) {
      updateValue = value?.target?.value;
    }
  }
  if (!prop) {
    if (!noNeedUpdate) {
      throw new Error("要更新的state调用链为空！");
    }
    console.error("要更新的state调用链为空！");
    return null;
  }
  const props = prop.split(".");
  const stateProp = props.shift();
  if (!(stateProp in this.state)) {
    if (!noNeedUpdate) {
      throw new Error("要更新的state目标属性并未存在state中！");
    }
    console.error("要更新的state目标属性并未存在state中！");
    return null;
  }
  let updatingObj = this.state?.[stateProp];

  //如果只有一层直接更新
  if (props.length === 0) {
    updatingObj = updateValue;
  } else {
    let item = updatingObj;
    const currentProps = [];
    let errorEnd = false;
    props.forEach((prop, index) => {
      //循环找到第n-1层引用
      //到第N时用对象引用更新数据
      currentProps.push(prop);
      if (index === props.length - 1) {
        if (
          item === null ||
          item === undefined ||
          Object.prototype.toString.call(item).indexOf("Object") === -1
        ) {
          errorEnd = true;
          return;
        }
        Object.assign(item, { [prop]: updateValue });
      } else {
        if (
          item === null ||
          item === undefined ||
          (Object.prototype.toString.call(item).indexOf("Object") === -1 &&
            Object.prototype.toString.call(item).indexOf("Array") === -1)
        ) {
          errorEnd = true;
          return;
        }
        item = item[prop];
      }
    });
    if (errorEnd) {
      if (!noNeedUpdate) {
        throw new Error(
          `调用链到${stateProp}.${currentProps.join(
            "."
          )}截止了，请检查调用链是否正确`
        );
      }
      console.error(
        `调用链到${stateProp}.${currentProps.join(
          "."
        )}截止了，请检查调用链是否正确`
      );
      return null;
    }
  }

  if (!noNeedUpdate) {
    this.setState({ [stateProp]: updatingObj }, () => callback && callback());
    return null;
  } else {
    return { [stateProp]: updatingObj };
  }
};

export default updateStates;
