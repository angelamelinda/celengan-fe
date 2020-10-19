import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import { APP_URL, COLOR, MONTHS } from '../../constants';
import { IAppState } from '../../interfaces/states';
import AppNavigation from '../../layouts/AppNavigation';
import {
  DashboardChart,
  DashboardCTA,
  DashboardCTAWrapper,
  DashboardReportBalance,
  DashboardReportEIItem,
  DashboardReportExpenseIncome,
  DashboardReportExpenseIncomeBalance,
  DashboardSubtitle,
  DashboardTitle,
  DashboardWrapper,
} from './styled';
import { getReport } from '../../redux/actions/dashboard';
import { History } from 'history';
import {
  convertMoneyToIDR,
  generateRandomColor,
  getDaysInMonth,
  getLocalStorage,
  removeLocalStorage,
} from '../../helpers';

interface IDashboardProps extends RouteComponentProps {
  state: IAppState;
  getReport: () => void;
  history: History;
}

class Dashboard extends PureComponent<IDashboardProps> {
  currentPeriodDate = new Date();
  currentPeriodMonth = MONTHS[this.currentPeriodDate.getMonth()];
  currentPeriodYear = this.currentPeriodDate.getFullYear();

  componentDidMount() {
    const { getReport } = this.props;
    getReport();
  }

  handleClickCashflow = () => {
    const { history } = this.props;
    history.push(APP_URL.CASHFLOW);
  };

  getTransactionPerDay = () => {
    const { state } = this.props;
    const { dashboardReducer } = state;
    const { report } = dashboardReducer;

    let dataBarCashflow: any = {
      labels: [],
      datasets: [
        {
          label: `Budget Allocation`,
          backgroundColor: [],
          borderWidth: 1,
          data: [],
        },
        {
          label: `Budget Realization`,
          backgroundColor: [],
          borderWidth: 1,
          data: [],
        },
      ],
    };

    report?.budgetReport.map((budget) => {
      if (budget && budget.budget && budget.budget.name) {
        const backgroundColor = generateRandomColor();
        dataBarCashflow = {
          ...dataBarCashflow,
          labels: [...dataBarCashflow.labels, budget.budget.name],
          datasets: [
            {
              ...dataBarCashflow.datasets[0],
              data: [...dataBarCashflow.datasets[0].data, budget.budget.amount],
              backgroundColor: [
                ...dataBarCashflow.datasets[0].backgroundColor,
                backgroundColor,
              ],
            },
            {
              ...dataBarCashflow.datasets[1],
              data: [...dataBarCashflow.datasets[1].data, budget.totalExpenses],
              backgroundColor: [
                ...dataBarCashflow.datasets[1].backgroundColor,
                backgroundColor,
              ],
            },
          ],
        };
      }
    });

    return {
      allocation: {
        labels: dataBarCashflow.labels,
        datasets: [dataBarCashflow.datasets[0]],
      },
      realization: {
        labels: dataBarCashflow.labels,
        datasets: [dataBarCashflow.datasets[1]],
      },
    };
  };

  getBarData = () => {
    const { state } = this.props;
    const { dashboardReducer } = state;
    const { report } = dashboardReducer;
    const date = new Date();
    const lastDate = getDaysInMonth(date.getMonth(), date.getFullYear());
    let dataBarCashflow: any = {
      labels: [],
      datasets: [
        {
          label: `Transaction Expense`,
          backgroundColor: COLOR.RED,
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(238, 0, 0, .6)',
          data: [],
        },
        {
          label: `Transaction Income`,
          backgroundColor: COLOR.PRIMARY,
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 162, 1, .6)',
          data: [],
        },
      ],
    };

    for (let i = 1; i <= lastDate; i++) {
      dataBarCashflow = {
        ...dataBarCashflow,
        labels: [...dataBarCashflow.labels, i],
      };

      // eslint-disable-next-line
      const isFound = report?.dailyReport.some((item) => {
        if (new Date(item.date as string).getDate() === i) {
          dataBarCashflow = {
            ...dataBarCashflow,
            datasets: [
              {
                ...dataBarCashflow.datasets[0],
                data: [...dataBarCashflow.datasets[0].data, item.totalExpenses],
              },
              {
                ...dataBarCashflow.datasets[1],
                data: [...dataBarCashflow.datasets[1].data, item.totalIncome],
              },
            ],
          };

          return true;
        }
      });

      if (!isFound) {
        dataBarCashflow = {
          ...dataBarCashflow,
          datasets: [
            {
              ...dataBarCashflow.datasets[0],
              data: [...dataBarCashflow.datasets[0].data, 0],
            },
            {
              ...dataBarCashflow.datasets[1],
              data: [...dataBarCashflow.datasets[1].data, 0],
            },
          ],
        };
      }
    }

    return dataBarCashflow;
  };

  handleLogout = () => {
    removeLocalStorage('token');
    removeLocalStorage('user');
    window.location.href = APP_URL.LOGIN;
  };

  render() {
    const { state } = this.props;
    const { dashboardReducer } = state;
    const { report } = dashboardReducer;
    const dataPieCashflow = {
      labels: ['Expense', 'Income'],
      datasets: [
        {
          data: [report?.totalExpenses, report?.totalIncome],
          backgroundColor: [COLOR.RED, COLOR.PRIMARY],
        },
      ],
    };

    const transactionPerDay = this.getTransactionPerDay();

    const user = getLocalStorage('user');

    return (
      <AppNavigation
        title="Dashboard"
        onLogout={this.handleLogout}
        username={(user && JSON.parse(user).username) || undefined}
        bottomNavigation={true}
      >
        <DashboardWrapper>
          <DashboardTitle>SUMMARY TRANSACTION</DashboardTitle>
          <DashboardSubtitle>{`${this.currentPeriodMonth} ${this.currentPeriodYear}`}</DashboardSubtitle>
          <DashboardReportExpenseIncomeBalance
            onClick={this.handleClickCashflow}
          >
            <DashboardReportExpenseIncome>
              <DashboardReportEIItem className="income">
                <span>Total Income:</span>
                <span>
                  {report ? convertMoneyToIDR(report.totalIncome) : '-'}
                </span>
              </DashboardReportEIItem>
              <DashboardReportEIItem className="expense">
                <span>Total Expense:</span>
                <span>
                  {report ? convertMoneyToIDR(report.totalExpenses) : '-'}
                </span>
              </DashboardReportEIItem>
            </DashboardReportExpenseIncome>
            <DashboardReportBalance
              className={
                report && report.totalBalance < 0 ? 'defisit' : 'surplus'
              }
            >
              {report ? convertMoneyToIDR(report.totalBalance) : '-'}
            </DashboardReportBalance>
          </DashboardReportExpenseIncomeBalance>
          <DashboardCTAWrapper>
            <DashboardCTA>
              <Link to={APP_URL.BUDGET}>Budget</Link>
            </DashboardCTA>
            <DashboardCTA>
              <Link to={APP_URL.CASHFLOW}>Transaction</Link>
            </DashboardCTA>
          </DashboardCTAWrapper>
          <DashboardTitle>INCOME vs EXPENSE</DashboardTitle>
          <DashboardSubtitle>{`${this.currentPeriodMonth} ${this.currentPeriodYear}`}</DashboardSubtitle>
          <DashboardChart>
            <Pie data={dataPieCashflow} />
          </DashboardChart>
          <DashboardTitle>TRANSACTION PER DAY</DashboardTitle>
          <DashboardSubtitle>{`${this.currentPeriodMonth} ${this.currentPeriodYear}`}</DashboardSubtitle>
          <DashboardChart>
            <Bar
              data={this.getBarData}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: true,
              }}
            />
          </DashboardChart>
          <DashboardTitle>BUDGET ALLOCATION</DashboardTitle>
          <DashboardSubtitle>{`${this.currentPeriodMonth} ${this.currentPeriodYear}`}</DashboardSubtitle>
          <DashboardChart>
            <Pie data={transactionPerDay.allocation} />
          </DashboardChart>
          <DashboardTitle>BUDGET REALIZATION</DashboardTitle>
          <DashboardSubtitle>{`${this.currentPeriodMonth} ${this.currentPeriodYear}`}</DashboardSubtitle>
          <DashboardChart>
            <Pie data={transactionPerDay.realization} />
          </DashboardChart>
        </DashboardWrapper>
      </AppNavigation>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({ state });

const mapDispatchToProps = {
  getReport,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Dashboard));
