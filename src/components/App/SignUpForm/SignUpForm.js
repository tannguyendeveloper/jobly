import { useContext } from "react";
import { Formik } from "formik";
import AppContext from "../../../contexts/AppContext";

import { Button, Spin } from "antd";
import { Form, Input } from "formik-antd";

import SignUpFormSchema from "../../../form-schemas/SignUpFormSchema";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const SignUpForm = () => {
  const {signup} = useContext(AppContext);
  return (
    <Formik
      initialValues={{ username: "", password: "", firstName:"", lastName: "", email: "" }}
      onSubmit={async (values, {setSubmitting})=> {
        // register
        try {
          const response = await signup(values);
          setSubmitting(false);
        } catch (e) {
          console.error(e);
          setSubmitting(false);
        }
        
      }}
      validationSchema={SignUpFormSchema}
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
        <Spin spinning={isSubmitting}>
        <Form {...layout} name="basic">
          <Form.Item label="Username" name="username">
            <Input id="Username" name="username"/>
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password id="Password" name="password"/>
          </Form.Item>

          <Form.Item label="First Name" name="firstName">
            <Input id="firstName" name="firstName"/>
          </Form.Item>

          <Form.Item label="Last Name" name="lastName">
            <Input id="lastName" name="lastName"/>
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input id="email" name="email"/>
          </Form.Item>
          <Form.Item {...tailLayout} name="hello">
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        </Spin>
      )}
    </Formik>
  );
}

export default SignUpForm;