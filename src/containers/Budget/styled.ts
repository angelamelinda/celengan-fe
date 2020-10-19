import styled from "styled-components"
import { COLOR } from "../../constants";

export const BudgetWrapper = styled.div`
   `

export const BudgetPeriodicWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
        width: 25px;
        height: 25px;
        font-size: 25px;
    }
`

export const BudgetPeriodicPrevMonth = styled.div`
    margin-right: 5px;
`;

export const BudgetPeriodicNextMonth = styled.div`
    margin-left: 5px;
`

export const BudgetItemWrapper = styled.div`
    padding: 15px 0;
    display: block;
    color: ${COLOR.BLACK};

    &:not(:last-of-type) {
        border-bottom: 1px solid #e0e0e0;

    }
`

export const BudgetItemsWrapper = styled.div`
    padding: 0 15px;

    `

export const BudgetItem = styled.div`
    
`

export const BudgetItemNameCategory = styled.div`
    width: calc(100% - 50px);
    word-break: break-all;
`

export const BudgetItemCategory = styled.div`
    font-weight: 700;
`

export const BudgetItemTop = styled.div` display: flex;
    flex-wrap: nowrap;
    margin-bottom: 20px;
`

export const BudgetItemBottom = styled.div``

export const BudgetItemIcon = styled.div`background: ${COLOR.PRIMARY};
    flex:  0 0 40px;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background: ${COLOR.PRIMARY};
    color: ${COLOR.WHITE};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
`

export const BudgetItemName = styled.div`
    
`

export const BudgetItemAmount = styled.div`  
    width: 200px;
    text-align: right;
    word-break: break-all;`

export const BudgetItemProgressWrapper = styled.div`
    height: 8px;
    border-radius: 8px;
    background: #e0e0e0;
    overflow: hidden;
`;

export const BudgetItemProgress = styled.div<{
    width?: number;
}>`
    background: ${COLOR.PRIMARY};
    width: ${props => props.width || 0}%;
    transition: all .3s ease;
    height: 8px;

    ${BudgetItemWrapper}.overspent & {
        background: ${COLOR.RED};
    }

`

export const BudgetItemLeftAmount = styled.div`
    text-align: right;
    opacity: .6;
`

export const BudgetNotFound = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 75px);
    text-transform: uppercase;
    font-weight: 700;
    font-size: 32px;
    color: #e0e0e0;
`
