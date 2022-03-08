import React from "react";
import { Container, Button, Label, Input, FormGroup } from "reactstrap";

/** @author: istiklal */

const LoginForm = ({ onAuth, onChange }) => {
  return (
    <Container id="loginFormContainer">
      <form onSubmit={onAuth} type="multipart-form-data">
        <h3>Yönetici Girişi</h3>
        <hr />
        <Container className="form-group" id="formPartsContainer">
          {/* {error && <div className="alert-danger">{error}</div>} */}
          <FormGroup row>
            <Label htmlFor="userName" sm="4">
              Kullanıcı Adı
            </Label>
            <Container className="field" sm="8">
              <Input
                className="form-control"
                bsSize="sm"
                type="text"
                name="userName"
                id="userName"
                onChange={onChange}
                required={true}
              />
            </Container>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="password" sm="4">
              Şifre
            </Label>
            <Container className="field" sm="8">
              <Input
                className="form-control"
                bsSize="sm"
                type="password"
                name="password"
                id="password"
                onChange={onChange}
                required={true}
              />
            </Container>
          </FormGroup>
          <br />
          <Container>
            <FormGroup row>
              <Button type="submit" color="success" size="sm" block>
                GİRİŞ
              </Button>
            </FormGroup>
          </Container>
        </Container>
      </form>
    </Container>
  );
};

export default LoginForm;
