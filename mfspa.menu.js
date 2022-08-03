const mfspaMenus = [
  {
    name: "概况",
    key: "summary",
    urls: "/app/basis/base/overall",
  },
  {
    name: "快速入门",
    key: "module1",
    urls: "/app/basis/base/quickstart",
  },
  {
    name: "资源组",
    key: "resources",
    subMenus: [
      {
        key: "groupList",
        name: "页面资源",
        urls: [
          "/app/manage/resources/group/list",
          "/app/manage/resources/page/list",
        ],
      },
      {
        key: "menuList",
        name: "菜单配置",
        urls: ["/app/manage/resources/menu/list"],
      },
    ],
  },
];

export default mfspaMenus;
