import styled from "styled-components";
import { COLOR } from "../../constants";

export const IconsWrapper = styled.div`
    display: flex;
    flex-wrap:wrap;
    padding-top: 20px;
`

export const IconWrapper = styled.div`
    width: 20%;
    flex: 0 0 20%;
    font-size: 20px;
    justify-content: center;
    margin-bottom: 20px;`

export const Icon = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 100%;
    background: ${COLOR.PRIMARY};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    svg {
        fill: ${COLOR.WHITE};
    }
`