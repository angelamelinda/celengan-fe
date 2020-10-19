import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { History } from 'history';
import { IAppState, IBudget } from '../../interfaces/states';
import AppNavigation from '../../layouts/AppNavigation';
import {
  BudgetItemAmount,
  BudgetItemBottom,
  BudgetItemCategory,
  BudgetItemIcon,
  BudgetItemLeftAmount,
  BudgetItemName,
  BudgetItemNameCategory,
  BudgetItemProgress,
  BudgetItemProgressWrapper,
  BudgetItemsWrapper,
  BudgetItemTop,
  BudgetItemWrapper,
  BudgetNotFound,
  BudgetPeriodicNextMonth,
  BudgetPeriodicPrevMonth,
  BudgetPeriodicWrapper,
  BudgetWrapper,
} from './styled';
import {
  goBack,
  getBudgets,
  setBudgetRangeDate,
  setSelectedBudget,
} from '../../redux/actions/budget';
import { getIcons } from '../../helpers/getIcons';
import { APP_URL, MONTHS } from '../../constants';
import { convertMoneyToIDR, getDate } from '../../helpers';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

interface IBudgetProps extends RouteComponentProps {
  state: IAppState;
  getBudgets: (date?: { start_date: string; end_date: string }) => void;
  goBack: (history: History) => void;
  history: History;
  setBudgetRangeDate: (startDate: string, endDate: string) => void;
  setSelectedBudget: (selectedBudget: IBudget | undefined) => void;
}

class Budget extends PureComponent<IBudgetProps> {
  componentDidMount() {
    const { getBudgets, state } = this.props;
    const { budgetReducer } = state;
    const { rangeDate } = budgetReducer;

    getBudgets({
      start_date: rangeDate.startDate,
      end_date: rangeDate.endDate,
    });
  }

  handleBack = () => {
    const { goBack, history } = this.props;
    goBack(history);
  };

  handleAdd = () => {
    const { history, setSelectedBudget } = this.props;

    setSelectedBudget(undefined);
    history.push(APP_URL.NEW_BUDGET);
  };

  handleClickNav = (type: 'prev' | 'next') => {
    const { state, setBudgetRangeDate, getBudgets } = this.props;
    const { budgetReducer } = state;
    const { rangeDate } = budgetReducer;
    const d = new Date(rangeDate.startDate);
    const month = d.getMonth();

    if (type === 'prev') {
      d.setMonth(month - 1);
    } else if (type === 'next') {
      d.setMonth(month + 1);
    }

    const newDate = getDate(d.toISOString());
    setBudgetRangeDate(newDate.startDate, newDate.endDate);
    getBudgets({ start_date: newDate.startDate, end_date: newDate.endDate });
  };

  handleClickBudgetItem = (budget: IBudget) => {
    const { state, history, setSelectedBudget } = this.props;
    const { budgetReducer } = state;
    const { isSetBudget } = budgetReducer;

    if (isSetBudget) {
      setSelectedBudget(budget);
      history.goBack();
    } else {
      history.push(APP_URL.BUDGET_DETAIL.replace(':id', budget._id as string));
    }
  };

  render() {
    const { state } = this.props;
    const { budgetReducer, commonReducer } = state;
    const { budgets, rangeDate, isSetBudget } = budgetReducer;
    const { isLoading } = commonReducer;
    const d = new Date(rangeDate.startDate);
    return (
      <AppNavigation
        title="Budgets"
        onClickNavigation={this.handleBack}
        onClickAdd={isSetBudget ? undefined : this.handleAdd}
        bottomNavigation={true}
      >
        <BudgetWrapper>
          {!isSetBudget && (
            <BudgetPeriodicWrapper>
              <BudgetPeriodicPrevMonth
                onClick={() => this.handleClickNav('prev')}
              >
                <MdNavigateBefore />
              </BudgetPeriodicPrevMonth>
              {`${MONTHS[d.getMonth()]} ${d.getFullYear()}`}
              <BudgetPeriodicNextMonth
                onClick={() => this.handleClickNav('next')}
              >
                <MdNavigateNext />
              </BudgetPeriodicNextMonth>
            </BudgetPeriodicWrapper>
          )}
          <BudgetItemsWrapper>
            {budgets && budgets.length === 0 && !isLoading && (
              <BudgetNotFound>Budget is Empty</BudgetNotFound>
            )}
            {budgets &&
              budgets.map((budget, id) => {
                const { category } = budget;
                return (
                  <BudgetItemWrapper
                    onClick={() => this.handleClickBudgetItem(budget)}
                    key={id}
                    className={
                      budget.amount - budget.spent < 0 ? 'overspent' : ''
                    }
                  >
                    <BudgetItemTop>
                      <BudgetItemIcon>{getIcons(category.icon)}</BudgetItemIcon>
                      <BudgetItemNameCategory>
                        <BudgetItemCategory>
                          {category && category.name
                            ? category.name
                            : 'uncategorized'}
                        </BudgetItemCategory>
                        <BudgetItemName>{budget.name}</BudgetItemName>
                      </BudgetItemNameCategory>
                      <BudgetItemAmount>
                        {convertMoneyToIDR(budget.amount)}
                      </BudgetItemAmount>
                    </BudgetItemTop>
                    <BudgetItemBottom>
                      <BudgetItemLeftAmount>
                        {budget.amount - budget.spent < 0
                          ? `overspent ${convertMoneyToIDR(
                              Math.abs(budget.amount - budget.spent),
                            )}`
                          : `left ${convertMoneyToIDR(
                              budget.amount - budget.spent,
                            )}`}
                      </BudgetItemLeftAmount>
                      <BudgetItemProgressWrapper>
                        <BudgetItemProgress
                          width={Math.round(
                            (budget.spent / budget.amount) * 100,
                          )}
                        />
                      </BudgetItemProgressWrapper>
                    </BudgetItemBottom>
                  </BudgetItemWrapper>
                );
              })}
          </BudgetItemsWrapper>
        </BudgetWrapper>
      </AppNavigation>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({ state });

const mapDispatchToProps = {
  getBudgets,
  goBack,
  setBudgetRangeDate,
  setSelectedBudget,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Budget));
