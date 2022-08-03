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
        name: "资源分组",
        urls: [
          "/app/manage/resources/group/list",
          "/app/manage/resources/page/list",
        ],
      },
    ],
  },
];

export default mfspaMenus;
