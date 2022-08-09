const mfspaMenus = [
  {
    name: "概况",
    key: "summary",
    url: "/app/basis/base/overall",
  },
  {
    name: "快速入门",
    key: "module1",
    url: "/app/basis/base/quickstart",
  },
  {
    name: "资源组",
    key: "resources",
    subMenus: [
      {
        key: "groupList",
        name: "页面资源",
        url: "/app/manage/resources/group/list",
        relatedUrls: ["/app/manage/resources/page/list"],
      },
      {
        key: "menuList",
        name: "菜单配置",
        url: "/app/manage/resources/menu/list",
        relatedUrls: [],
      },
      {
        key: "versionPublish",
        name: "版本管理",
        url: "/app/manage/resources/version/publish",
        relatedUrls: [],
      },
    ],
  },
];

export default mfspaMenus;
