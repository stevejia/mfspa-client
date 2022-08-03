import {
  Button,
  Form,
  FormInstance,
  Input,
  message,
  Modal,
  Space,
  Table,
} from "antd";
import React from "react";
import { NavigateFunction } from "react-router-dom";
import request from "../../../request/request";
import { clone } from "../../../utils";

import "./list.less";

interface GroupListProps {
  navigate?: NavigateFunction;
}

class GroupList extends React.Component<GroupListProps, any> {
  columns: any = [
    {
      title: "页面资源组名称",
      dataIndex: "groupName",
      key: "groupName",
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark",
    },
    {
      title: "页面数量",
      dataIndex: "pageCount",
      key: "pageCount",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => this.gotoPageList(record)}>{text}</a>
        </Space>
      ),
    },
    {
      width: 140,
      align: "center",
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => this.onToEditGroup(record)}>修改</a>
          <a onClick={() => this.deleteGroup(record)}>删除</a>
        </Space>
      ),
    },
  ];

  gotoPageList = (groupInfo) => {
    const { groupId, groupName } = groupInfo;
    this.props.navigate(
      `/app/manage/resources/page/list?groupId=${groupId}&groupName=${groupName}`
    );
  };

  private formRef: FormInstance<any>;
  private defaultGroupItem = {
    groupId: null,
    groupName: "",
    remark: "",
  };
  state = {
    groupList: [],
    modalVisible: false,
  };

  componentDidMount(): void {
    this.getGroupList();
  }

  getGroupList = async () => {
    const {
      data: { groupInfo: groupList },
    } = await request.get(`groupinfo/get`);
    this.setState({ groupList });
  };

  private onToAddGroup = () => {
    this.setState(
      {
        modalVisible: true,
      },
      () => this.formRef.setFieldsValue(this.defaultGroupItem)
    );
  };

  private onAddGroup = async () => {
    const values = await this.formRef.validateFields();
    this.saveGroup(values);
  };

  private async saveGroup(groupData) {
    // request("", groupData);
    console.log(request);
    await request.post(`groupinfo/update`, groupData);
    this.setState({ modalVisible: false });
    this.getGroupList();
  }

  private cancelAddGroup = () => {
    this.formRef.resetFields();
    this.setState({ modalVisible: false });
  };

  private deleteGroup = async (groupInfo) => {
    const { groupId, groupName } = groupInfo;
    Modal.confirm({
      content: `确定删除分组[${groupName}]？`,
      okText: "确定",
      cancelText: "取消",
      async onOk() {
        await request.del(`groupinfo/delete`, { groupId });
        this.getGroupList();
      },
    });
  };

  private onToEditGroup = (groupInfo) => {
    this.setState(
      {
        modalVisible: true,
      },
      () => this.formRef.setFieldsValue(groupInfo)
    );
  };

  render(): React.ReactNode {
    const { groupList, modalVisible } = this.state;
    return (
      <div className="mfspa-page">
        <div className="mfspa-page-header">
          页面资源组
          <Button className="m-l-md" size="small" onClick={this.onToAddGroup}>
            +添加
          </Button>
        </div>
        <Table
          columns={this.columns}
          dataSource={groupList}
          pagination={false}
        />
        <Modal
          title="添加页面资源组"
          visible={modalVisible}
          //   okButtonProps={{ htmlType: "submit" }}
          onOk={this.onAddGroup}
          onCancel={this.cancelAddGroup}
          okText="确定"
          cancelText="取消"
        >
          <Form
            ref={(ref) => (this.formRef = ref)}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
          >
            <Form.Item
              label="资源组名称"
              name="groupName"
              rules={[{ required: true, message: "请输入资源组名称" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="备注"
              name="remark"
              rules={[{ required: true, message: "请输入资源组备注" }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default GroupList;
