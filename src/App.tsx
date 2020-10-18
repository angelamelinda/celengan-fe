import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppContainer, GlobalStyle } from './App.styled';
import { APP_URL } from './constants';
import Login from './containers/Login';
import Register from './containers/Register';
import Dashboard from './containers/Dashboard';
import Budget from './containers/Budget';
import Cashflow from './containers/Cashflow';
import Splashscreen from './containers/Splashscreen';
import { getLocalStorage } from './helpers';
import { connect } from 'react-redux';
import { IAppState } from './interfaces/states';
import Loader from './components/Loader';
import { LoaderWrapper } from './components/Loader/styled';
import Notification from './components/Notification';
import Icons from './containers/Icons';
import Category from './containers/Category';
import BudgetDetail from './containers/BudgetDetail';
import CashflowDetail from './containers/CashflowDetail';

interface IApp {
  state: IAppState;
}

const App: FC<IApp> = ({ state }) => {
  const routing = (token: string | null) => {
    if (token) {
      return (
        <Switch>
          <Route exact path={APP_URL.DASHBOARD} component={Dashboard} />
          <Route exact path={APP_URL.BUDGET} component={Budget} />
          <Route exact path={APP_URL.ICONS} component={Icons} />
          <Route exact path={APP_URL.CATEGORY} component={Category} />
          <Route exact path={APP_URL.NEW_BUDGET} component={BudgetDetail} />
          <Route exact path={APP_URL.BUDGET_DETAIL} component={BudgetDetail} />
          <Route exact path={APP_URL.BUDGET} component={Budget} />
          <Route exact path={APP_URL.NEW_CASHFLOW} component={CashflowDetail} />
          <Route
            exact
            path={APP_URL.CASHFLOW_DETAIL}
            component={CashflowDetail}
          />
          <Route exact path={APP_URL.CASHFLOW} component={Cashflow} />
        </Switch>
      );
    }

    return (
      <Switch>
        <Route exact path={APP_URL.REGISTER} component={Register} />
        <Route exact path={APP_URL.LOGIN} component={Login} />
        <Route component={Splashscreen} />
      </Switch>
    );
  };

  const token = getLocalStorage('token');
  const { commonReducer } = state;
  const { isLoading, notification } = commonReducer;
  return (
    <AppContainer className="App">
      <GlobalStyle />
      {routing(token)}
      {isLoading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      {notification && <Notification />}
    </AppContainer>
  );
};

const mapStateToProps = (state: IAppState) => ({ state });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
