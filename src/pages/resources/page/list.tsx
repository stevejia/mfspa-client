import { Button, Form, Input, Modal, Space, Table } from "antd";
import React from "react";
import { NavigateFunction } from "react-router-dom";
import request from "../../../request/request";
import { parseQueryString } from "../../../request/requestUtil";

import "./list.less";

interface PageListProps {
  navigate?: NavigateFunction;
  location?: Location;
}

class PageList extends React.Component<PageListProps, any> {
  columns: any = [
    {
      title: "页面名称",
      dataIndex: "pageName",
      key: "pageName",
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark",
    },
    {
      title: "跳转链接",
      dataIndex: "pageUrl",
      key: "pageUrl",
    },
    {
      title: "权限code",
      dataIndex: "pageCode",
      key: "pageCode",
    },
    {
      width: 140,
      align: "center",
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>修改</a>
          <a onClick={() => this.deletePage(record)}>删除</a>
        </Space>
      ),
    },
  ];

  gotoGroupList = (pageInfo) => {
    const { pageId, pageName } = pageInfo;
    this.props.navigate(
      `/app/privileges/resources/page/list?pageId=${pageId}&pageName=${pageName}`
    );
  };

  formRef = React.createRef() as any;
  private groupId: number = null;
  state = {
    pageList: [],
    modalVisible: false,
    groupName: null,
  };

  componentDidMount(): void {
    debugger;
    const { location } = window;
    const { href } = location;
    const { groupId, groupName } = parseQueryString(href);
    this.groupId = groupId;
    this.setState({ groupName });
    console.log(location.search);
    this.getPageList();
  }

  getPageList = async () => {
    const {
      data: { pageList },
    } = await request.get(`pageinfo/get`);
    console.log(pageList);
    this.setState({ pageList });
  };

  private onToAddPage = () => {
    this.setState({ modalVisible: true }, () => this.formRef.resetFields());
  };

  private onAddPage = async () => {
    const values = await this.formRef.validateFields();
    console.log(values);
    console.log(this.formRef);
    console.log("啊啊啊啊啊啊啊啊啊啊啊啊");
    this.savePage(values);
  };

  private async savePage(pageData) {
    pageData.groupId = this.groupId;
    // request("", pageData);
    console.log(request);
    await request.post(`pageinfo/update`, pageData);
    this.setState({ modalVisible: false });
    this.getPageList();
  }

  private cancelAddPage = () => {
    this.formRef.resetFields();
    this.setState({ modalVisible: false });
  };

  private deletePage = async (pageInfo) => {
    const { pageId } = pageInfo;
    await request.del(`pageinfo/delete`, { pageId });
    this.getPageList();
  };
  render(): React.ReactNode {
    const { pageList, modalVisible, groupName } = this.state;
    return (
      <div className="mfspa-page">
        <div className="mfspa-page-header">
          {groupName ? `${groupName}/页面列表` : null}
          <Button className="m-l-md" size="small" onClick={this.onToAddPage}>
            +添加
          </Button>
        </div>
        <Table
          columns={this.columns}
          dataSource={pageList}
          pagination={false}
        />
        <Modal
          title="添加页面"
          visible={modalVisible}
          //   okButtonProps={{ htmlType: "submit" }}
          onOk={this.onAddPage}
          onCancel={this.cancelAddPage}
        >
          <Form
            ref={(ref) => (this.formRef = ref)}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            // onFinish={this.onAddPage}
            //   onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="资源组名称"
              name="pageName"
              rules={[{ required: true, message: "请输入页面名称" }]}
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
            <Form.Item
              label="pageUrl"
              name="pageUrl"
              rules={[{ required: true, message: "请输入跳转链接" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="pageCode"
              name="pageCode"
              rules={[{ required: true, message: "请输入权限code" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default PageList;
