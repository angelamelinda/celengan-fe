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
  DashboardTitle,
  DashboardWrapper,
} from './styled';
import { getReport } from '../../redux/actions/dashboard';
import { History } from 'history';
import {
  convertMoneyToIDR,
  generateRandomColor,
  getDaysInMonth,
} from '../../helpers';

interface IDashboardProps extends RouteComponentProps {
  state: IAppState;
  getReport: () => void;
  history: History;
}

class Dashboard extends PureComponent<IDashboardProps> {
  componentDidMount() {
    const { getReport } = this.props;
    getReport();
  }

  handleClickCashflow = () => {
    const { history } = this.props;
    history.push(APP_URL.CASHFLOW);
  };

  getBudgetData = () => {
    const { state } = this.props;
    const { dashboardReducer } = state;
    const { report } = dashboardReducer;
    let dataBarCashflow: any = {
      labels: [],
      datasets: [
        {
          label: `Budget ${MONTHS[new Date().getMonth()]}`,
          backgroundColor: [],
          borderWidth: 1,
          data: [],
        },
      ],
    };

    report?.budgetReport.map((budget) => {
      dataBarCashflow = {
        ...dataBarCashflow,
        labels: [...dataBarCashflow.labels, budget.budget.name],
        datasets: [
          {
            ...dataBarCashflow.datasets[0],
            data: [...dataBarCashflow.datasets[0].data, budget.budget.amount],
            backgroundColor: [
              ...dataBarCashflow.datasets[0].backgroundColor,
              generateRandomColor(),
            ],
          },
        ],
      };
    });

    return dataBarCashflow;
  };

  getBarData = (type: string) => {
    const { state } = this.props;
    const { dashboardReducer } = state;
    const { report } = dashboardReducer;
    const date = new Date();
    const lastDate = getDaysInMonth(date.getMonth(), date.getFullYear());
    let dataBarCashflow: any = {
      labels: [],
      datasets: [
        {
          label: `Cashflow ${type === 'expense' ? 'Expense' : 'Income'} ${
            MONTHS[new Date().getMonth()]
          }`,
          backgroundColor: type === 'expense' ? COLOR.RED : COLOR.PRIMARY,
          borderWidth: 1,
          hoverBackgroundColor:
            type === 'expense' ? `rgba(238, 0, 0, .6)` : `rgba(0, 162, 1, .6)`,
          data: [],
        },
      ],
    };

    for (let i = 1; i <= lastDate; i++) {
      const prevDataBarCashflow = { ...dataBarCashflow };
      dataBarCashflow = {
        ...prevDataBarCashflow,
        labels: [...prevDataBarCashflow.labels, i],
      };

      const isFound = report?.dailyReport.some((item) => {
        const prevDataBarCashflow = { ...dataBarCashflow };
        const date = new Date(item.date).getDate();
        if (Number(date) === i) {
          dataBarCashflow = {
            ...prevDataBarCashflow,
            datasets: [
              {
                ...prevDataBarCashflow.datasets[0],
                data: [
                  ...prevDataBarCashflow.datasets[0].data,
                  type === 'expense' ? item.totalExpenses : item.totalIncome,
                ],
              },
            ],
          };
        }
      });

      if (!isFound) {
        const prevDataBarCashflow = { ...dataBarCashflow };

        dataBarCashflow = {
          ...prevDataBarCashflow,
          datasets: [
            {
              ...prevDataBarCashflow.datasets[0],
              data: [...prevDataBarCashflow.datasets[0].data, 0],
            },
          ],
        };
      }
    }

    return dataBarCashflow;
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
    return (
      <AppNavigation title="Dashboard">
        <DashboardWrapper>
          <DashboardTitle>SUMMARY CASHFLOW</DashboardTitle>
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
              <Link to={APP_URL.BUDGET}>See Budget</Link>
            </DashboardCTA>
            <DashboardCTA>
              <Link to={APP_URL.CASHFLOW}>See Cashflow</Link>
            </DashboardCTA>
          </DashboardCTAWrapper>
          <DashboardTitle>CASHFLOW PIE CHART</DashboardTitle>
          <DashboardChart>
            <Pie data={dataPieCashflow} />
          </DashboardChart>
          <DashboardTitle>CASHFLOW BAR CHART</DashboardTitle>
          <DashboardChart>
            <Bar
              data={() => this.getBarData('expense')}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: true,
              }}
            />
          </DashboardChart>
          <DashboardChart>
            <Bar
              data={() => this.getBarData('income')}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: true,
              }}
            />
          </DashboardChart>
          <DashboardTitle>BUDGET PIE CHART</DashboardTitle>
          <DashboardChart>
            <Pie data={() => this.getBudgetData()} />
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
