import { Button, Form, FormInstance, Input, Modal, Space, Table } from "antd";
import React from "react";
import { NavigateFunction } from "react-router-dom";
import request from "../../../request/request";
import { parseQueryString } from "../../../request/requestUtil";
import { clone } from "../../../utils";

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
      width: 300,
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark",
      width: 300,
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
      width: 160,
      align: "center",
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => this.onToEditPage(record)}>修改</a>
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

  private formRef: FormInstance<any>;
  private groupId: number = null;
  private defaultPageItem = {
    groupId: null,
    pageId: null,
    pageName: null,
    pageUrl: null,
    pageCode: null,
    remark: null,
  };
  private editPageItem = {
    groupId: null,
    pageId: null,
    pageName: null,
    pageUrl: null,
    pageCode: null,
    remark: null,
  };
  state = {
    pageList: [],
    modalVisible: false,
    groupName: null,
    loading: false,
  };

  componentDidMount(): void {
    const { location } = window;
    const { href } = location;
    const { groupId, groupName } = parseQueryString(href);
    this.groupId = groupId;
    this.setState({ groupName });
    console.log(location.search);
    this.getPageList();
  }

  getPageList = async () => {
    this.setState({ loading: true });
    const {
      data: { pageList },
    } = await request.get(`pageinfo/get`);
    console.log(pageList);
    this.setState({ pageList, loading: false });
  };

  private onToAddPage = () => {
    this.setState(
      {
        modalVisible: true,
      },
      () => this.formRef.setFieldsValue(this.defaultPageItem)
    );
    this.editPageItem = clone(this.defaultPageItem);
  };

  private onAddPage = async () => {
    const values = await this.formRef.validateFields();
    this.savePage(values);
  };

  private onToEditPage = (pageItem) => {
    this.setState({ modalVisible: true }, () =>
      this.formRef.setFieldsValue(pageItem)
    );
    this.editPageItem = pageItem;
  };

  private async savePage(pageData) {
    pageData = { ...this.editPageItem, ...pageData, groupId: this.groupId };
    // request("", pageData);
    console.log(request);
    await request.post(`pageinfo/update`, pageData);
    this.setState({ modalVisible: false });
    this.getPageList();
  }

  private cancelAddPage = () => {
    this.setState({
      modalVisible: false,
    });
  };

  private deletePage = async (pageInfo) => {
    const { pageId, pageName } = pageInfo;
    Modal.confirm({
      content: `确定删除页面[${pageName}]？`,
      okText: "确定",
      cancelText: "取消",
      onOk: async () => {
        await request.del(`pageinfo/delete`, { pageId });
        this.getPageList();
      },
    });
  };

  render(): React.ReactNode {
    const { pageList, modalVisible, groupName, loading } = this.state;
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
          rowKey="pageId"
          pagination={false}
          loading={loading}
          bordered
        />
        <Modal
          title="添加页面"
          width={1000}
          visible={modalVisible}
          //   okButtonProps={{ htmlType: "submit" }}
          onOk={this.onAddPage}
          onCancel={this.cancelAddPage}
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
              label="页面链接"
              name="pageUrl"
              rules={[{ required: true, message: "请输入页面链接" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="权限code"
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
