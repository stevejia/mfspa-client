import {
  Button,
  Checkbox,
  Form,
  FormInstance,
  Input,
  Radio,
  Select,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import MfspaMarkdownEditor from "../../components/mfspa-markdown/editor";
import { SendOutlined } from "@ant-design/icons";
import "./publish.less";
import request from "../../request/request";
const ArticlePublish = (props) => {
  const [articleTags, setArticleTags] = useState<
    { name: string; key: string }[]
  >([]);
  useEffect(() => {
    getMenus();
  }, []);
  const getMenus = async () => {
    const {
      data: { menuList },
    } = await request.get(`menuinfo/getmenus`);
    const articleTags = menuList.find(
      (menu) => menu.name === "前端知识梳理"
    ).subMenus;
    setArticleTags(articleTags);
    console.log(articleTags);
  };
  const onFinish = () => {};
  const onFinishFailed = () => {};

  const formRef: React.Ref<FormInstance<any>> = useRef(null);
  const onEditorChange = (content: string) => {
    const formInstance = formRef.current;
    formRef.current.setFieldValue("content", content);
    formRef.current.validateFields(["content"]);
  };

  const onSaveArticle = async () => {
    const data = await formRef.current.validateFields();
    console.log(data);
  };

  return (
    <div className="article-publish-wrapper">
      <div className="publish-wrapper">
        <Button onClick={onSaveArticle} type="primary" icon={<SendOutlined />}>
          发布博客
        </Button>
      </div>
      <Form
        ref={formRef}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ type: 1 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className="article-form"
      >
        <Form.Item
          label="文章标题"
          name="title"
          rules={[{ required: true, message: "请输入文章标题！" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="文章类型"
          name="type"
          rules={[{ required: true, message: "请输入文章标题！" }]}
        >
          <Radio.Group>
            <Radio value={1}>原创</Radio>
            <Radio value={2}>转载</Radio>
            <Radio value={3}>翻译</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="文章标签"
          name="tag"
          rules={[{ required: true, message: "请输入文章标签！" }]}
        >
          <Select>
            {articleTags.map((at) => (
              <Select.Option value={+at.key} key={at.key}>
                {at.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="文章内容"
          name="content"
          rules={[{ required: true, message: "请输入文章内容" }]}
        >
          <MfspaMarkdownEditor
            onEditorChange={onEditorChange}
            content="# 我是一级标题\n\n~~~js\n  console.log(3333);\n~~~"
          ></MfspaMarkdownEditor>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ArticlePublish;
