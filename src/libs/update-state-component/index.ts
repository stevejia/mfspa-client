import React from "react";
import updateStates from "./updateState";
import { clone, equals, isNullOrEmpty } from "./utils";

export default class UpdateStateComponent<T, K> extends React.Component<T, K> {
  state = {} as K;
  private propState = null;
  /**
   *
   * @param props 组件的参数
   * @param propState 组件的model 可以为空
   */
  constructor(props, propState) {
    super(props);
    this.propState = propState;
  }

  public static updateStateFromProps(propsData, preState, cloneDeep = true) {
    let data = null;
    if (isNullOrEmpty(propsData)) {
      return data;
    }
    Object.keys(propsData).forEach((key) => {
      const { [`origin${key}`]: originData } = preState;

      //clone 防止指针引用污染
      const newPropData = clone(propsData[key]);
      if (!equals(originData, newPropData)) {
        data = {
          ...data,
          ...{
            [key]: newPropData,
            [`origin${key}`]: cloneDeep ? clone(newPropData) : newPropData,
          },
        };
      }
    });
    return data;
  }

  /**
   *
   * @param prop 需要更新的prop链条 例如 a.b.c.xxx
   * @param eventOrValue 可以是值 也可以是event对象会默认取 event.target.value 如果需要从event中取checked等非value属性需要自己通过event.target.xxx获取
   * @param withPropState 是否需要包含model的名称
   */
  stateChange(prop, eventOrValue, withPropState = true) {
    if (!prop) {
      prop = this.propState;
    } else {
      prop =
        withPropState && this.propState ? `${this.propState}.${prop}` : prop;
    }
    updateStates.bind(this)({ [prop]: eventOrValue });
  }
}
