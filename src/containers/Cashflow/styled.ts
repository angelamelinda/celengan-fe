import styled from "styled-components";
import { COLOR } from "../../constants";

export const CashflowWrapper = styled.div``

export const CashflowPeriodicWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
        width: 25px;
        height: 25px;
        font-size: 25px;
    }
`

export const CashflowPeriodicPrevMonth = styled.div`
    margin-right: 5px;
`;

export const CashflowPeriodicNextMonth = styled.div`
    margin-left: 5px;
`

export const CashflowNotFound = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 75px);
    text-transform: uppercase;
    font-weight: 700;
    font-size: 32px;
    color: #e0e0e0;
`

export const CashflowItemWrapper = styled.div`
    &:not(:empty) {
        padding: 15px 20px;
    }`

export const CashflowItemDate = styled.div`
    padding: 10px 10px 0;
    border: 1px solid #e0e0e0;

    &:not(:last-of-type) {
        margin-bottom: 20px;
    }
`

export const CashflowDateAmount = styled.div`
display: flex;`

export const CashflowDateWrapper = styled.div`
    display: flex;
    width: 100%;
`

export const CashflowDate = styled.div`
    font-size: calc(20 / 16 * 1rem);
    background: ${COLOR.PRIMARY};
    color: ${COLOR.WHITE};
    padding: 10px;
    border-radius: 12px;
    margin-right: 10px;
    margin-left: -20px;
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
}
`

export const CashflowDateDayMonthYear = styled.div`

`

export const CashflowDateDay = styled.div`font-weight: 700;
text-transform: uppercase;`

export const CashflowDateMonthYear = styled.div`
display: inline-flex;`

export const CashflowDateMonth = styled.div`
margin-right: 5px;
`

export const CashflowDateYear = styled.div``

export const CashflowExpenseIncomeWrapper = styled.div`
    text-align: right;
`

export const CashflowExpense = styled.div`
color: ${COLOR.RED};
`

export const CashflowIncome = styled.div`
color: ${COLOR.PRIMARY};

`


export const CashflowSpent = styled.div``

export const CashflowItemDetailWrapper = styled.div`
margin-top: 15px;

`

export const CashflowItemDetail = styled.div`
    display: flex;
    position: relative;
    padding-bottom: 15px;
    align-items:flex-start;

    &:not(:last-of-type) {
        > div:last-of-type {
            border-bottom: 1px solid #e0e0e0;
        }
    }
`



export const CashflowItemDetailNameAmount = styled.div`
    width: calc(100% - 40px);
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
`

export const CashflowItemDetailNameNotes = styled.div`
    width: 50%;

`

export const CashflowItemDetailName = styled.div`
    font-weight: 700;
`

export const CashflowItemDetailNotes = styled.div`
    margin-top: 5px;
    opacity: .6;
    font-size: calc(14 / 16 * 1rem);
`
export const CashflowItemDetailAmount = styled.div`
    color: ${COLOR.PRIMARY};

    ${CashflowItemDetail}.expense & {
        color: ${COLOR.RED};
    }
`

export const CashflowItemDetailIcon = styled.div`
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 1px solid ${COLOR.PRIMARY};
    display: flex;
    color: ${COLOR.PRIMARY};
    margin-right: 10px;

    ${CashflowItemDetail}.expense & {
        border-color: ${COLOR.RED};
        color: ${COLOR.RED};
    }
`