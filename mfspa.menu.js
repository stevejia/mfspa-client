const mfspaMenus = [
  {
    name: "概况",
    key: "summary",
    url: "https://www.baidu.com/",
  },
  {
    name: "模块1",
    key: "module1",
    subMenus: [
      {
        key: "page1",
        name: "页面1",
        url: "/app/testA/module1/page1/list",
        relatedUrls: [
          "/app/testA/module1/page1/manage",
          "/app/testA/module1/page1/detail",
        ],
      },
    ],
  },
];

export default mfspaMenus;
