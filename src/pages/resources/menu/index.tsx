import {
  Button,
  Checkbox,
  Form,
  FormInstance,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
  Tooltip,
  Tree,
} from "antd";
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
  // PlusOutlined,
  // MinusOutlined,
  BarsOutlined,
  EditTwoTone,
  DeleteTwoTone,
  PlusSquareTwoTone,
  CopyTwoTone,
} from "@ant-design/icons";
import "./index.less";
import { DataNode } from "antd/lib/tree";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

interface MenuProps {
  navigate?: NavigateFunction;
  location?: Location;
}

interface MenuState {
  modalVisible: boolean;
  pageModalVisible: boolean;
  hoverNodeKey?: string | number;
  level: number;
  menuItem: { pId?: string | number; pName?: string };
  treeData: DataNode[];
  loading: boolean;
  pageList: Array<any>;
  selectedRows: Array<any>;
  menuPages: Array<any>;
}

class Menu extends React.Component<MenuProps, MenuState> {
  private icons = {
    AccountBookOutlined: <AccountBookOutlined />,
    AimOutlined: <AimOutlined />,
    AlertOutlined: <AlertOutlined />,
    ApartmentOutlined: <ApartmentOutlined />,
    ApiOutlined: <ApiOutlined />,
    AppstoreAddOutlined: <AppstoreAddOutlined />,
    AppstoreOutlined: <AppstoreOutlined />,
    AudioOutlined: <AudioOutlined />,
    BarsOutlined: <BarsOutlined />,
  };

  gotoGroupList = (menuInfo) => {
    const { menuId, menuName } = menuInfo;
    this.props.navigate(
      `/app/privileges/resources/menu/list?menuId=${menuId}&menuName=${menuName}`
    );
  };

  private columns: any = [
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
  ];

  private formRef: FormInstance<any>;
  private addPageMenuKey: string | number;
  private menuList;
  state = {
    modalVisible: false,
    hoverNodeKey: null,
    menuItem: { pId: null, pName: null },
    treeData: [],
    level: null,
    pageModalVisible: false,
    loading: false,
    pageList: [],
    selectedRows: [],
    menuPages: [],
  };

  async componentDidMount(): Promise<void> {
    const { location } = window;
    const { href } = location;
    console.log(location.search);
    await this.getMenu();
    this.getMenuPages();
  }

  getMenu = async () => {
    const {
      data: { treeNodes, menuList },
    } = await request.get(`menuinfo/get`);
    console.log(treeNodes);
    this.processTreeNodeIcon(treeNodes);
    this.setState({ treeData: treeNodes });
    this.menuList = menuList;
  };

  private processTreeNodeIcon(treeNodes: DataNode[]) {
    treeNodes.forEach((node) => {
      console.log(node.icon);
      node.icon = this.icons[node.icon as string];
      this.processTreeNodeIcon(node.children);
    });
  }

  private getMenuPages = async () => {
    const {
      data: { menuPages },
    } = await request.get(`menuinfo/getpages`);
    console.log(menuPages);
    this.setState({ menuPages });
  };

  private onToAddMenu = (node?: DataNode) => {
    const menuItem = {
      pId: node?.key,
      pName: node?.title as any,
    };
    this.setState({ modalVisible: true, menuItem }, () =>
      this.formRef.setFieldsValue(menuItem)
    );
  };

  private onToEditMenu = (node: DataNode) => {
    // console.log(menuItem);
    const menuItem = this.menuList.find((menu) => menu.menuId === node.key);
    if (menuItem.pId) {
      const parentMenuItem = this.menuList.find(
        (menu) => menu.menuId === menuItem.pId
      );
      menuItem.pName = parentMenuItem?.menuName;
    }
    if (!!menuItem) {
      this.setState({ modalVisible: true, menuItem }, () => {
        this.formRef.setFieldsValue(menuItem);
      });
    }
  };

  private onAddMenu = async () => {
    const values = await this.formRef.validateFields();
    this.saveMenu(values);
  };

  private async saveMenu(menuData) {
    menuData = { ...this.state.menuItem, ...menuData };
    await request.post(`menuinfo/update`, menuData);
    message.success("保存成功");
    this.setState({ modalVisible: false });
    this.getMenu();
  }

  private cancelAddMenu = () => {
    this.formRef.resetFields();
    this.setState({ modalVisible: false });
  };

  private deleteMenu = async (menuInfo) => {
    const { menuId } = menuInfo;
    await request.del(`menuinfo/delete`, { menuId });
    this.getMenu();
  };

  private toggleHoverNode = (node: { level: number } & DataNode) => {
    const { hoverNodeKey } = this.state;
    this.setState({
      hoverNodeKey: hoverNodeKey ? "" : node.key,
      level: node.level,
    });
  };

  private onToAddMenuPage = async (node: DataNode) => {
    this.addPageMenuKey = node.key;
    await this.getPageList();
    this.setState({ pageModalVisible: true });
  };

  private onAddMenuPage = async () => {
    const { selectedRows } = this.state;

    const saveData = selectedRows.map((sr) => {
      return {
        menuId: this.addPageMenuKey,
        pageName: sr.pageName,
        remark: sr.remark,
        pageId: sr.pageId,
        pageUrl: sr.pageUrl,
      };
    });

    await this.saveMenuPages(saveData);

    this.setState({ pageModalVisible: false });
  };

  private saveMenuPages = async (saveData) => {
    await request.post("menuinfo/updatepages", { menuPages: saveData });
    // this.getMenu();
    this.getMenuPages();
  };

  private cancelAddMenuPage = () => {
    this.setState({ pageModalVisible: false });
  };

  private getPageList = async () => {
    this.setState({ loading: true });
    const {
      data: { pageList },
    } = await request.get(`pageinfo/get`);
    console.log(pageList);
    this.setState({ pageList, loading: false });
  };

  private toggleChecked = async (e: CheckboxChangeEvent, pageItem) => {
    const {
      target: { checked },
    } = e;
    pageItem.checked = checked ? 1 : 0;
    await request.post("menuinfo/updatepages", { menuPages: pageItem });
    message.success("修改成功！");
  };

  private setDefault = (pageItem, pages) => {
    pages.forEach((page) => {
      page.isDefault = 0;
    });
    pageItem.isDefault = 1;
    pageItem.checked = 1;

    this.saveMenuPages(pages);
  };

  render(): React.ReactNode {
    const {
      treeData,
      modalVisible,
      hoverNodeKey,
      menuItem,
      level,
      pageModalVisible,
      pageList,
      loading,
      menuPages,
    } = this.state;
    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
        this.setState({ selectedRows });
      },
      getCheckboxProps: (record: any) => ({
        disabled: false, // Column configuration not to be checked
        name: record.pageId,
      }),
    };

    return (
      <div className="mfspa-menu">
        <div className="mfspa-menu-header">
          页面菜单配置
          <Button
            className="m-l-md"
            size="small"
            onClick={() => this.onToAddMenu()}
          >
            +添加
          </Button>
        </div>
        <Tree
          showIcon
          defaultExpandAll
          defaultSelectedKeys={["0-0-0"]}
          switcherIcon={<DownOutlined />}
          treeData={treeData}
          titleRender={(node: { level: number } & DataNode) => {
            const pages = menuPages.filter((page) => page.menuId === node.key);
            return (
              <span>
                <span
                  onMouseOver={() => this.toggleHoverNode(node)}
                  onMouseLeave={() => this.toggleHoverNode(node)}
                >
                  {node.title}

                  <span
                    onMouseOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    {node.key === hoverNodeKey && level < 2 && (
                      <>
                        <PlusSquareTwoTone
                          className="m-l-md"
                          onClick={() => this.onToAddMenu(node)}
                        />
                        <EditTwoTone
                          className="m-l-md"
                          onClick={() => this.onToEditMenu(node)}
                        />

                        <DeleteTwoTone className="m-l-md m-r-xs" />
                      </>
                    )}
                    {node.key === hoverNodeKey && level >= 2 && (
                      <>
                        <EditTwoTone
                          className="m-l-md"
                          onClick={() => this.onToEditMenu(node)}
                        />
                        <CopyTwoTone
                          className="m-l-md m-r-xs"
                          onClick={() => this.onToAddMenuPage(node)}
                        />
                      </>
                    )}
                    {!!pages?.length && (
                      <div
                        className="menu-pages"
                        onMouseOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        {pages.map((p) => (
                          <Checkbox
                            key={p.menuPageId}
                            checked={!!p.checked}
                            onChange={(e) => this.toggleChecked(e, p)}
                          >
                            <Tooltip
                              placement="right"
                              title={
                                <Button
                                  size="small"
                                  onClick={() => this.setDefault(p, pages)}
                                >
                                  设为默认
                                </Button>
                              }
                            >
                              <span className="menu-page-item">
                                {!!p.isDefault && (
                                  <span className="menu-page-default">
                                    [默认]
                                  </span>
                                )}
                                {p.pageName}
                              </span>
                            </Tooltip>
                          </Checkbox>
                        ))}
                      </div>
                    )}
                  </span>
                </span>
              </span>
            );
          }}
        />
        <Modal
          title="添加菜单"
          visible={modalVisible}
          //   okButtonProps={{ htmlType: "submit" }}
          onOk={this.onAddMenu}
          onCancel={this.cancelAddMenu}
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
            {!!menuItem.pId && (
              <Form.Item
                label="上级菜单"
                name="pName"
                rules={[{ required: true, message: "请输入菜单名称" }]}
              >
                <Input disabled />
              </Form.Item>
            )}
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
                      {Comp}
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

        <Modal
          width={1000}
          title="添加页面"
          visible={pageModalVisible}
          //   okButtonProps={{ htmlType: "submit" }}
          onOk={this.onAddMenuPage}
          onCancel={this.cancelAddMenuPage}
          okText="确定"
          cancelText="取消"
        >
          <Table
            rowSelection={{ type: "checkbox", ...rowSelection }}
            columns={this.columns}
            dataSource={pageList}
            rowKey="pageId"
            pagination={false}
            loading={loading}
            bordered
          />
        </Modal>
      </div>
    );
  }
}

export default Menu;
