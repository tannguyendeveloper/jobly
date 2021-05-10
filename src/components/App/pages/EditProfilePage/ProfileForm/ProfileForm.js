import { useCallback, useContext } from "react";
import { Formik } from "formik";

import AppContext from "../../../../../contexts/AppContext";
import ProfileFormSchema from "../../../../../form-schemas/ProfileFormSchema";

import { Button, Spin, message } from "antd";
import { Form, Input } from "formik-antd";

import JoblyAPI from "../../../../../api/JoblyAPI";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ProfileForm = () => {
  const AppState = useContext(AppContext);
  console.log(AppState);
  const initialValues = AppState.user.user;
  delete(initialValues.applications);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={AppState.updateUser}
      validationSchema={ProfileFormSchema}
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
            <Input id="Username" name="username" disabled/>
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

          <Form.Item label="Password" name="password">
            <Input.Password id="Password" name="password"/>
          </Form.Item>

          <Form.Item {...tailLayout} name="hello">
            <Button type="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
        </Spin>
      )}
    </Formik>
  );
}

export default ProfileForm;