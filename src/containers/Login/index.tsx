import React, { ChangeEvent, PureComponent } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { History } from "history";
import { APP_URL } from "../../constants";
import AppNavigation from "../../layouts/AppNavigation";
import {
  LoginTop,
  LoginWrapper,
  LoginBottom,
  LoginLoginLink,
  LoginFormWrapper,
} from "./styled";
import { Button } from "../../components/Button/styled";
import Input from "../../components/Input";
import { IAppState, ILoginForm } from "../../interfaces/states";
import {
  setLoginFieldForm,
  submitLogin,
  goBack,
  resetUserState,
} from "../../redux/actions/user";
import { connect } from "react-redux";

interface ILoginProps extends RouteComponentProps {
  history: History;
  submitLogin: (form: ILoginForm, history: History) => void;
  setLoginFieldForm: (name: string, value: string) => void;
  goBack: (page: "REGISTER" | "LOGIN", history: History) => void;
  state: IAppState;
  resetUserState: () => void;
}

class Login extends PureComponent<ILoginProps> {
  componentDidMount() {
    const { resetUserState } = this.props;
    resetUserState();
  }

  handleBack = () => {
    const { goBack, history } = this.props;
    goBack("LOGIN", history);
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { setLoginFieldForm } = this.props;

    setLoginFieldForm(name, value);
  };

  handleLogin = () => {
    const { state, history, submitLogin } = this.props;
    const { userReducer } = state;
    const { loginForm: form } = userReducer;

    submitLogin(form, history);
  };

  render() {
    const { userReducer } = this.props.state;
    const { loginForm: form, errorLoginForm: error } = userReducer;

    return (
      <AppNavigation title="Login" onClickNavigation={this.handleBack}>
        <LoginWrapper>
          <LoginTop>
            <LoginFormWrapper>
              <Input
                onChange={this.handleChange}
                name="email"
                id="email"
                placeholder="Email"
                label="Email"
                value={form.email}
                type="email"
                error={error?.email}
              />
              <Input
                onChange={this.handleChange}
                name="password"
                id="password"
                placeholder="Password"
                label="Password"
                type="password"
                value={form.password}
                error={error?.password}
              />
              <Button onClick={this.handleLogin}>Login</Button>
            </LoginFormWrapper>
          </LoginTop>
          <LoginBottom>
            <LoginLoginLink>
              Do not have an account?{" "}
              <Link to={APP_URL.REGISTER}>REGISTER</Link>
            </LoginLoginLink>
          </LoginBottom>
        </LoginWrapper>
      </AppNavigation>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({ state });

const mapDispatchToProps = {
  submitLogin,
  setLoginFieldForm,
  goBack,
  resetUserState,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
