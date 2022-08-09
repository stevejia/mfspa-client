import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
  Space,
  Table,
} from "antd";
import React from "react";
import { NavigateFunction } from "react-router-dom";
import request from "../../../request/request";
import { clone } from "../../../utils";

import "./publish.less";

interface VersionPublishProps {
  navigate?: NavigateFunction;
  location?: Location;
}

class VersionPublish extends React.Component<VersionPublishProps, any> {
  columns: any = [
    {
      title: "应用名称",
      dataIndex: "appName",
      key: "appName",
      width: 300,
    },
    {
      title: "当前版本",
      dataIndex: "currentVersion",
      key: "currentVersion",
      width: 300,
    },
    {
      width: 160,
      align: "center",
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => this.onToPublish(record)}>发布版本</a>
        </Space>
      ),
    },
  ];

  private formRef: FormInstance<any>;
  private publishItem;
  state = {
    appList: [],
    modalVisible: false,
    groupName: null,
    loading: false,
    versionList: [],
  };

  componentDidMount(): void {
    this.getAppList();
  }

  onToPublish = (appItem) => {
    console.log(appItem);
    const { publishedVersions, currentVersion: selectedVersion } = appItem;
    this.setState({ modalVisible: true, versionList: publishedVersions }, () =>
      this.formRef.setFieldsValue({ selectedVersion })
    );
    this.publishItem = appItem;
  };

  getAppList = async () => {
    this.setState({ loading: true });
    const {
      data: { appList },
    } = await request.get(`appinfo/list`);
    console.log(appList);
    this.setState({ appList, loading: false });
  };
  private onPublish = async () => {
    const { selectedVersion } = await this.formRef.validateFields();
    const appName = this.publishItem.appName;
    const data = { appName, version: selectedVersion };
    await this.publish(data);
    this.getAppList();
    this.setState({ modalVisible: false });
    // console.log(values);
  };

  private publish = async (data) => {
    await request.post("appinfo/publish", data);
  };

  private cancelPublish = () => {
    this.setState({ modalVisible: false });
  };

  render(): React.ReactNode {
    const { appList, modalVisible, groupName, loading, versionList } =
      this.state;
    return (
      <div className="mfspa-page">
        <Table
          columns={this.columns}
          dataSource={appList}
          rowKey="appName"
          pagination={false}
          loading={loading}
          bordered
        />
        <Modal
          title="发布版本"
          visible={modalVisible}
          //   okButtonProps={{ htmlType: "submit" }}
          onOk={this.onPublish}
          onCancel={this.cancelPublish}
          okText="确定"
          cancelText="取消"
        >
          <Form
            ref={(ref) => (this.formRef = ref)}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            autoComplete="off"
          >
            <Form.Item
              label="版本信息"
              name="selectedVersion"
              rules={[{ required: true, message: "请选择要发布版本信息" }]}
            >
              <Select>
                {versionList?.map((ver) => (
                  <Select.Option key={ver.appId} value={ver.appVersion}>
                    {ver.appVersion}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default VersionPublish;
