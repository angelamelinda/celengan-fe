import React, { PureComponent } from 'react';
import { History } from 'history';
import { IAppState, ICashflowResponse } from '../../interfaces/states';
import AppNavigation from '../../layouts/AppNavigation';
import {
  goBack,
  getCashflows,
  setRangeDate,
} from '../../redux/actions/cashflow';
import { APP_URL, MONTHS, DAYS } from '../../constants';
import { convertMoneyToIDR, getDate } from '../../helpers';
import {
  CashflowExpenseIncomeWrapper,
  CashflowExpense,
  CashflowIncome,
  CashflowDate,
  CashflowDateAmount,
  CashflowDateDay,
  CashflowDateDayMonthYear,
  CashflowDateMonth,
  CashflowDateMonthYear,
  CashflowDateWrapper,
  CashflowDateYear,
  CashflowItemDate,
  CashflowItemWrapper,
  CashflowNotFound,
  CashflowPeriodicNextMonth,
  CashflowPeriodicPrevMonth,
  CashflowPeriodicWrapper,
  CashflowItemDetail,
  CashflowItemDetailAmount,
  CashflowItemDetailIcon,
  CashflowItemDetailName,
  CashflowItemDetailNameAmount,
  CashflowItemDetailWrapper,
  CashflowItemDetailNameNotes,
  CashflowItemDetailNotes,
} from './styled';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { getIcons } from '../../helpers/getIcons';

interface ICashflowProps extends RouteComponentProps {
  state: IAppState;
  history: History;
  goBack: (history: History) => void;
  getCashflows: (date?: { start_date: string; end_date: string }) => void;
  setRangeDate: (startDate: string, endDate: string) => void;
}

class Cashflow extends PureComponent<ICashflowProps> {
  componentDidMount() {
    const { getCashflows, state } = this.props;
    const { cashflowReducer } = state;
    const { rangeDate } = cashflowReducer;
    getCashflows({
      start_date: rangeDate.startDate,
      end_date: rangeDate.endDate,
    });
  }

  handleClickAdd = () => {
    const { history } = this.props;
    history.push(APP_URL.NEW_CASHFLOW);
  };

  handleClickBack = () => {
    const { goBack, history } = this.props;
    goBack(history);
  };

  handleClickNav = (type: 'prev' | 'next') => {
    const { state, setRangeDate, getCashflows } = this.props;
    const { cashflowReducer } = state;
    const { rangeDate } = cashflowReducer;
    const d = new Date(rangeDate.startDate);
    const month = d.getMonth();

    if (type === 'prev') {
      d.setMonth(month - 1);
    } else if (type === 'next') {
      d.setMonth(month + 1);
    }

    const newDate = getDate(d.toISOString());
    setRangeDate(newDate.startDate, newDate.endDate);
    getCashflows({ start_date: newDate.startDate, end_date: newDate.endDate });
  };

  handleClickCashflow = (id: string) => {
    const { history } = this.props;
    history.push(APP_URL.CASHFLOW_DETAIL.replace(':id', id));
  };

  render() {
    const { state } = this.props;
    const { cashflowReducer, commonReducer } = state;
    const { cashflows, rangeDate } = cashflowReducer;
    const { isLoading } = commonReducer;
    const d = new Date(rangeDate.startDate);

    return (
      <AppNavigation
        title="Cashflow"
        onClickAdd={this.handleClickAdd}
        onClickNavigation={this.handleClickBack}
      >
        <CashflowPeriodicWrapper>
          <CashflowPeriodicPrevMonth
            onClick={() => this.handleClickNav('prev')}
          >
            <MdNavigateBefore />
          </CashflowPeriodicPrevMonth>
          {`${MONTHS[d.getMonth()]} ${d.getFullYear()}`}
          <CashflowPeriodicNextMonth
            onClick={() => this.handleClickNav('next')}
          >
            <MdNavigateNext />
          </CashflowPeriodicNextMonth>
        </CashflowPeriodicWrapper>
        {cashflows && cashflows.length === 0 && !isLoading && (
          <CashflowNotFound>Cashflow is Empty</CashflowNotFound>
        )}
        <CashflowItemWrapper>
          {cashflows &&
            cashflows.map((report: ICashflowResponse, id) => {
              const { date, details, totalExpenses, totalIncome } = report;
              const d = new Date(date);
              const day = d.getDay();
              const dd = d.getDate();
              const MMM = d.getMonth();
              const YYYY = d.getFullYear();

              return (
                <CashflowItemDate key={id}>
                  <CashflowDateAmount>
                    <CashflowDateWrapper>
                      <CashflowDate>{dd}</CashflowDate>
                      <CashflowDateDayMonthYear>
                        <CashflowDateDay>{DAYS[day]}</CashflowDateDay>
                        <CashflowDateMonthYear>
                          <CashflowDateMonth>{MONTHS[MMM]}</CashflowDateMonth>
                          <CashflowDateYear>{YYYY}</CashflowDateYear>
                        </CashflowDateMonthYear>
                      </CashflowDateDayMonthYear>
                    </CashflowDateWrapper>
                    <CashflowExpenseIncomeWrapper>
                      <CashflowIncome>
                        {convertMoneyToIDR(totalIncome)}
                      </CashflowIncome>
                      <CashflowExpense>
                        {convertMoneyToIDR(totalExpenses)}
                      </CashflowExpense>
                    </CashflowExpenseIncomeWrapper>
                  </CashflowDateAmount>
                  <CashflowItemDetailWrapper>
                    {details &&
                      details.map((detail, id) => {
                        return (
                          <CashflowItemDetail
                            onClick={() => this.handleClickCashflow(detail._id)}
                            key={id}
                            className={
                              detail.type === 'expense' ? 'expense' : 'income'
                            }
                          >
                            <CashflowItemDetailIcon>
                              {getIcons(detail.category.icon)}
                            </CashflowItemDetailIcon>
                            <CashflowItemDetailNameAmount>
                              <CashflowItemDetailNameNotes>
                                <CashflowItemDetailName>
                                  {detail.category.name}
                                </CashflowItemDetailName>
                                <CashflowItemDetailNotes>
                                  {detail.notes}
                                </CashflowItemDetailNotes>
                              </CashflowItemDetailNameNotes>
                              <CashflowItemDetailAmount>
                                {convertMoneyToIDR(detail.amount)}
                              </CashflowItemDetailAmount>
                            </CashflowItemDetailNameAmount>
                          </CashflowItemDetail>
                        );
                      })}
                  </CashflowItemDetailWrapper>
                </CashflowItemDate>
              );
            })}
        </CashflowItemWrapper>
      </AppNavigation>
    );
  }
}
const mapStateToProps = (state: IAppState) => ({ state });

const mapDispatchToProps = {
  getCashflows,
  goBack,
  setRangeDate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Cashflow));
