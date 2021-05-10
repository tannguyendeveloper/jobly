import { useContext } from "react";
import { Formik } from "formik";
import AppContext from "../../../contexts/AppContext";

import { Button } from "antd";
import { Form, Input } from "formik-antd";

import LoginFormSchema from "../../../form-schemas/LoginFormSchema";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginForm = () => {
  const AppState = useContext(AppContext);
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={AppState.login}
      validationSchema={LoginFormSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <Form {...layout} name="basic">
          <Form.Item label="Username" name="username">
            <Input id="Username" name="username"/>
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password id="Password" name="password"/>
          </Form.Item>

          <Form.Item {...tailLayout} name="hello">
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
