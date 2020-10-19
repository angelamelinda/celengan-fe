import styled from "styled-components";
import { COLOR } from "../../constants";

export const CategoryWrapper = styled.div`
    padding: 20px 15px;
`

export const CategoryItem = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    position: relative;

    &:not(:last-of-type) {
        border-bottom: 1px solid #e0e0e0;
    }
`

export const CategoryItemIcon = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 100%;
    background: ${COLOR.PRIMARY};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    font-size: calc(20 / 16 * 1rem);
    
    svg {
        fill: ${COLOR.WHITE}
    }
`

export const CategoryItemName = styled.div`
    width: calc(100% - 50px - 62px);
`

export const CategoryCTA = styled.div`
    display: flex;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);

    > div:not(:first-of-type) {
        margin-left: 10px;
    }
`

export const CategoryCTADelete = styled.div`
    opacity: .8;

`

export const CategoryCTAUpdate = styled.div`
    color: ${COLOR.PRIMARY};
`

export const CategoryNotFound = styled.div`
    text-align: center;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 75px);
    text-transform: uppercase;
    font-weight: 700;
    font-size: 32px;
    color: #e0e0e0;
`