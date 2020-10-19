import styled from "styled-components";
import { COLOR } from "../../constants";

export const DashboardCTA = styled.div`
    a {
        padding: 10px;
        display: inline-block;
    }
    
`

export const DashboardCTAWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    text-align: center;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px dashed #e0e0e0;
`

export const DashboardWrapper = styled.div`
    padding: 15px;
`

export const DashboardReportBalance = styled.div`
    border-top: 1px solid #e0e0e0;
    margin-top: 10px;
    text-align: right;
    padding-top: 10px;
    color: ${COLOR.PRIMARY};
    
    &.defisit {
        color: ${COLOR.RED};
    }
`

export const DashboardReportExpenseIncomeBalance = styled.div`
    border: 1px solid #e0e0e0;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    cursor: pointer;
`

export const DashboardReportExpenseIncome = styled.div`

    > div {
        display: flex;
        justify-content: space-between;

        &:not(:last-of-type) {
            margin-bottom: 10px;
        }
    }
`


export const DashboardReportEIItem = styled.div`
    &.income {
        color: ${COLOR.PRIMARY}
    }

    &.expense {
        color: ${COLOR.RED}
    }

`

export const DashboardTitle = styled.div`
    font-weight: 700;
    margin-bottom: 10px;
    text-transform: uppercase;
    text-align: right;
    padding: 0 15px;
    color: ${COLOR.PRIMARY};
    letter-spacing: 1px;
`

export const DashboardChart = styled.div`
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px dashed #e0e0e0;
`