import { Button, Form, Input, Modal, Select, Space, Table, Tree } from "antd";
import React from "react";
import { NavigateFunction } from "react-router-dom";
import request from "../../../request/request";
import { parseQueryString } from "../../../request/requestUtil";
import {
  AccountBookOutlined,
  AimOutlined,
  AlertOutlined,
  ApartmentOutlined,
  ApiOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
  AudioOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "./index.less";

interface MenuProps {
  navigate?: NavigateFunction;
  location?: Location;
}

class Menu extends React.Component<MenuProps, any> {
  private icons = {
    AccountBookOutlined: <AccountBookOutlined />,
    AimOutlined: <AimOutlined />,
    AlertOutlined: <AlertOutlined />,
    ApartmentOutlined: <ApartmentOutlined />,
    ApiOutlined: <ApiOutlined />,
    AppstoreAddOutlined: <AppstoreAddOutlined />,
    AppstoreOutlined: <AppstoreOutlined />,
    AudioOutlined: <AudioOutlined />,
  };

  gotoGroupList = (menuInfo) => {
    const { menuId, menuName } = menuInfo;
    this.props.navigate(
      `/app/privileges/resources/menu/list?menuId=${menuId}&menuName=${menuName}`
    );
  };

  formRef = React.createRef() as any;
  private groupId: number = null;
  state = {
    menuList: [],
    modalVisible: false,
    groupName: null,
  };

  componentDidMount(): void {
    const { location } = window;
    const { href } = location;
    const { groupId, groupName } = parseQueryString(href);
    this.groupId = groupId;
    this.setState({ groupName });
    console.log(location.search);
    this.getMenu();
  }

  getMenu = async () => {
    const {
      data: { menuInfo: menuList },
    } = await request.get(`menuinfo/get`);
    console.log(menuList);
    this.setState({ menuList });
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

  private async savePage(menuData) {
    menuData.groupId = this.groupId;
    // request("", menuData);
    console.log(request);
    await request.post(`menuinfo/update`, menuData);
    this.setState({ modalVisible: false });
    this.getMenu();
  }

  private cancelAddPage = () => {
    this.formRef.resetFields();
    this.setState({ modalVisible: false });
  };

  private deletePage = async (menuInfo) => {
    const { menuId } = menuInfo;
    await request.del(`menuinfo/delete`, { menuId });
    this.getMenu();
  };

  private getTreeData = (menuList) => {
    return menuList.map((menu, index) => {
      const { menuName, icon } = menu;
      const IconComp = this.icons?.[icon];
      console.log(IconComp);
      return {
        title: menuName,
        key: index,
        icon: IconComp ? <IconComp></IconComp> : null,
        children: [],
      };
    });
  };

  render(): React.ReactNode {
    const { menuList, modalVisible, groupName } = this.state;
    const treeData = this.getTreeData(menuList);

    return (
      <div className="mfspa-menu">
        <div className="mfspa-menu-header">
          页面菜单配置
          <Button className="m-l-md" size="small" onClick={this.onToAddPage}>
            +添加
          </Button>
        </div>
        <Tree
          showIcon
          defaultExpandAll
          defaultSelectedKeys={["0-0-0"]}
          switcherIcon={<DownOutlined />}
          treeData={treeData}
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
              label="菜单名称"
              name="menuName"
              rules={[{ required: true, message: "请输入菜单名称" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="菜单图标"
              name="icon"
              rules={[{ required: true, message: "请选择菜单图标" }]}
            >
              <Select allowClear={false}>
                {Object.keys(this.icons).map((ico) => {
                  const Comp = this.icons?.[ico] as any;
                  return (
                    <Select.Option key={ico}>
                      <Comp />
                      {ico}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="备注"
              name="remark"
              rules={[{ required: true, message: "请输入菜单备注" }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Menu;
